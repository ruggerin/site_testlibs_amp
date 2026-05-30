# Playbook — Hero título + chamada (Quem Somos & Nossa Cultura)

Documento de referência para reproduzir o padrão **título display + taglines** usado em `/quem-somos` e `/nossa-cultura`, incluindo sangria lateral artística, escala proporcional e armadilhas que encontramos ao ajustar resoluções.

**Implementação:**
- `src/app/quem-somos/page.tsx` — hero inline (QUEM / SOMOS)
- `src/components/CulturaHero.tsx` — espelho calibrado (NOSSA / CULTURA)
- `src/lib/figma-scale.ts` — `figmaClamp()` para px do Figma 1920
- `src/lib/site.ts` — `FRAME` (`max-w-[1440px] mx-auto`)

---

## 1. Composição geral

| Camada | Função |
|--------|--------|
| **Título display** | 1–2 palavras enormes (Darker Grotesque Black), sangram para fora da tela |
| **Slot de imagem** | Uma letra virou foto (`em` + aspect ratio do Figma) |
| **Chamadas** | Inter semibold, cream/branco, barra decorativa 10×14px, dentro do `FRAME` |
| **Parallax** | GSAP `xPercent: ±22` nos wraps ao rolar |

Cultura espelha Quem Somos:

| Quem Somos | Nossa Cultura |
|------------|---------------|
| QUEM (direita, +2vw) | NOSSA (direita, +2vw) |
| SOMOS (esquerda, −2vw) | CULTURA (esquerda, −2vw) |
| Foto no “O” | Foto na “U” |

---

## 2. Sangria artística (margem lateral “negativa”)

Não usar `margin-left: -Xpx` no grid. O efeito é **`translateX` em `vw`** no próprio título, para escalar com a largura da tela:

```tsx
// Direita — palavra sangra para fora pela borda direita
transform: "translateX(2vw)"   // QUEM, NOSSA

// Esquerda — sangra para fora pela borda esquerda
transform: "translateX(-2vw)"  // SOMOS, CULTURA (no h1 inteiro)
```

- Wrapper: `absolute` + `right-0` ou `left-0` + `whitespace-nowrap`
- Seção cultura: `overflow-visible` no hero (sangria visível); evitar `overflow-x` no body que gere scroll horizontal indesejado
- Quem somos: `overflow-hidden` na section — sangria é cortada de forma controlada

**Regra:** sangria sempre em **`vw`**, nunca só em `px` fixo, para manter a mesma “agressividade” visual em 1366 e 1920.

---

## 3. Escala do título display

### Quem Somos — `clamp` direto em `vw`

```tsx
// SOMOS
fontSize: "clamp(3rem, 25vw, 40rem)"
transform: "translateX(-2vw)"

// QUEM
fontSize: "clamp(3rem, 27vw, 44rem)"
transform: "translateX(2vw)"
```

Calibração empírica por palavra (25vw vs 27vw).

### Nossa Cultura — `figmaClamp` a partir do Figma 1920

```tsx
const ARTBOARD_W = 1920;
const TITLE_PX = 465;

const TITLE_SIZE = figmaClamp(TITLE_PX, {
  min: 180,
  max: TITLE_PX,
  vw: (TITLE_PX / ARTBOARD_W) * 100, // ≈ 24.22vw
});
```

Fórmula em `figma-scale.ts`:

```text
clamp(minPx, vw%, maxPx)
vw% = (pxFigma / 1920) × 100
```

Tipografia compartilhada: `lineHeight: 0.78`, `letterSpacing: -0.04em`.

---

## 4. Letra substituída por imagem (`em` + Figma)

Medidas do Figma são convertidas para **`em`** usando o **tamanho da fonte do título no Figma** (465px), não o tamanho renderizado — assim o slot escala junto com `font-size`:

```tsx
const U_WIDTH_EM = 425 / 465; // largura do retângulo ÷ fonte Figma

width: `${U_WIDTH_EM}em`
height: `calc(${U_WIDTH_EM}em * ${732 / 425})`
```

Micro-ajustes de kerning entre pedaços do texto:

```tsx
transform: `translateX(${(280 - 283) / TITLE_PX}em)` // offsets em px Figma → em
```

SOMOS (quem-somos) usa `0.65em` como largura do slot da foto — proporção do glifo, não do retângulo Figma.

---

## 5. Chamadas (taglines) — FRAME e posição

### Grid editorial

```tsx
import { FRAME } from "@/lib/site";
// FRAME = "max-w-[1440px] mx-auto w-full"
// + px-5 sm:px-8 md:px-16  → 64px lateral em desktop
```

Chamadas ficam **dentro** do `FRAME`; títulos display ficam **full-bleed** (fora da caixa de conteúdo).

### Tamanho da fonte das chamadas

```tsx
figmaClamp(52, { min: 18, max: 52, vw: (52 / 1920) * 100 }) // ≈ 2.7vw
```

| Viewport | Tamanho aproximado |
|----------|-------------------|
| 1366 | ~37px |
| 1920 | 52px (teto Figma) |

Sempre escalar pelo **artboard 1920**, não por um viewport onde o layout foi calibrado à mão (ex.: 1366), senão fica grande demais na tela “menor” ou pequeno demais na “maior”.

### Posicionamento (cultura)

| Chamada | Desktop |
|---------|---------|
| “Visão holística…” | `md:left-[3%]`, `md:max-w-[25.1%]`, `top-[8%]` |
| “Marketing integrado…” | `md:ml-[48%]`, `md:w-max` — alinhada ao bloco **LTURA** |

Quem somos usa **`clamp(px, vw, px)`** para offsets (ex.: `left: clamp(96px, 22vw, 368px)`), mesma filosofia: mínimo, fluido, máximo.

---

## 6. Quebra de linha da chamada longa (lição principal)

**Problema:** em 1920, `figmaClamp` chega a 52px, mas a caixa da chamada obedece ao `FRAME` (máx. 1440px) + `ml-[48%]`. A linha 1 quebra antes do `\n` → 3 linhas em vez de 2.

**O que não funcionou bem:**

| Tentativa | Por quê falhou |
|-----------|----------------|
| Artboard 1366 + `transform: scale()` | Cortava sangria horizontal do título |
| Fonte travada em `37px × (100vw/1366)` | Pequena demais em 1920 |
| Fonte `52px` calibrada em 1366 (`vw = 52/1366`) | Grande demais em 1366, desproporcional ao Figma |
| Só aumentar `max-w` sem markup | Ainda quebrava com fonte no teto |

**Solução que ficou:**

1. **Duas linhas no markup** (não depender só de `\n`):
   ```tsx
   <span className="md:whitespace-nowrap">Marketing integrado não</span>
   <span>acontece por acaso.</span>
   ```
2. **Container `md:w-max`** — largura = conteúdo, não `%` estreita demais
3. **Fonte `figmaClamp` com vw do artboard 1920** (igual tagline superior)
4. **`md:ml-[48%]`** — alinhamento com LTURA

---

## 7. Posição vertical do bloco CULTURA (telas largas)

Calibrado em **1366** (`top: 58%`). Em **1920+** o bloco sobe sem mudar o 1366:

```tsx
const REF_VIEWPORT_W = 1366;
const LIFT = `max(0px, (100vw - ${REF_VIEWPORT_W}px) * ${46 / (1920 - REF_VIEWPORT_W)})`;

const CULTURA_TOP = `calc(58% - ${LIFT})`;
const TAG2_OFFSET = `calc(58svh - ${LIFT} + 10.5vw)`;
```

- Em 1366: `LIFT = 0` → comportamento original
- Em 1920: `LIFT ≈ 46px` → CULTURA ~6% mais alto; tagline inferior sobe junto

Padrão reutilizável: **`valorBase - max(0, (100vw - refMin) × fator)`** com fator = deltaDesejado / (larguraMax − refMin).

---

## 8. GSAP (entrada + scroll)

Mesma timeline nos dois heros:

- Entrada: wrap `x: ±36 → 0`, texto `scale 1.24 → 1`, blur, stagger `.cultura-tagline` / `.hero-tagline`
- Scroll: `.hero-quem-wrap` / `.hero-nossa-wrap` → `xPercent: 22`; `.hero-somos-wrap` / `.hero-cultura-wrap` → `xPercent: -22`

`transformOrigin` do título na entrada: lado da sangria (`right center` / `left center`).

---

## 9. Checklist rápido para novo hero no mesmo estilo

- [ ] Título: `figmaClamp` ou `clamp(…vw…)` + `whitespace-nowrap` + sangria `±2vw`
- [ ] Slot de imagem em `em` a partir das medidas Figma ÷ fonte display Figma
- [ ] Chamadas dentro de `FRAME` + padding lateral responsivo
- [ ] Fonte das chamadas: `vw = px / 1920 × 100`
- [ ] Quebras de copy críticas: linhas explícitas + `nowrap` na linha 1 se necessário
- [ ] Se calibrar posição em 1366 mas quiser ajuste em 1920: usar `max(0, (100vw - 1366px) × fator)` em `top` / `paddingTop` acoplados
- [ ] Não misturar fonte em `vw` full-screen com largura em `%` do `FRAME` sem testar 1366 **e** 1920
- [ ] Testar sangria com `overflow-visible` vs scroll horizontal da página

---

## 10. Referência numérica (Figma → código)

| Token | Valor |
|-------|--------|
| Artboard | 1920 × 1080 |
| Título cultura | 465px |
| Slot U | 425 × 732 @ fonte 465 |
| Chamada | 52px @ 1920 → `2.7vw` |
| Sangria | ±2vw |
| FRAME max | 1440px, `md:px-16` (64px) |
| CULTURA `top` base | 58% @ 1366 |
| Lift até 1920 | 46px |

---

*Última revisão: alinhado ao estado de `CulturaHero.tsx` e hero de `quem-somos/page.tsx` após ajustes de proporção 1366 / 1920.*
