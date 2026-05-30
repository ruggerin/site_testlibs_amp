# Playbook — Blocos de serviço (`ServiceBlock`)

Referência do padrão Figma Desktop **2:893** para as seções Branding, Performance, Tecnologia e Conteúdo em `/servicos`.

**Implementação:**
- `src/components/ServiceBlock.tsx` — layout vertical (não usar grid 2 colunas imagem|texto)
- `src/data/service-layouts.ts` — medidas por `service.id` (Figma por grupo `titulo`)
- `src/data/services.ts` — copy e imagens

---

## 1. Erro comum (imagem 2 / layout antigo)

| Errado | Certo |
|--------|--------|
| Grid `lg:grid-cols-2` (imagem ao lado do título) | Coluna: imagem → título → card |
| Imagem `w-full` 100% do viewport | Imagem **1360px / 1920** = **70,83%**, alinhada à **esquerda** |
| Título com `FRAME` 1440px e mesmo recuo para todos | Recuo e `%` do grupo `titulo` **por serviço** |
| `flex-wrap` inline para BRANDING & DESIGN | `position: absolute` dentro do container do título |
| Título colado no topo da seção | `sectionPt` + `titleTail` + overlap pequeno |

A faixa **cream à direita** da imagem é intencional no Figma (não esticar a imagem para 1920px).

---

## 2. Estrutura vertical

```
<section style={{ paddingTop: layout.sectionPt }}>
  <div max-w-[1920px]>
    <!-- 1. Imagem -->
    <div style={{ width: min(1360px, 70.833%) }}>
      <aspect 1360/450 + Image object-cover objectPosition />
    </div>

    <!-- 2. Título (fluxo, não absolute na imagem) -->
    <div style={{ marginTop: calc(-1 * titleOverlap), paddingLeft/Right: titleInset }}>
      <div style={{ maxWidth: titleMaxW }}>
        <!-- desktop: spans/p absolutos com titlePos em % -->
      </div>
    </div>
    <div style={{ height: titleTail }} />  <!-- reserva antes do card -->

    <!-- 3. Card + colunas cinzas -->
    <grid lg:cols-[718px_1fr] />
  </div>
</section>
```

- **`titleOverlap`**: invasão na imagem; **menor** = título mais baixo (`clamp(0.5rem, 2.2vw, 2.75rem)`).
- **`titleTail`**: espaço abaixo do bloco de título antes do card (`clamp(14rem, 24vw, 28rem)`).

---

## 3. Tipografia

```ts
const TITLE_LINE = figmaClamp(250, { min: 48, max: 250, vw: 13 });
const TITLE_AMP  = figmaClamp(450, { min: 72, max: 450, vw: 23.4 });
const SUBTITLE   = figmaClamp(32,  { min: 14, max: 32,  vw: 1.67 });
```

- Display: Darker Grotesque Black, `lineHeight: 0.64` (linhas) / `0.36` (`&`).
- Tags: Inter semibold, uppercase; esquerda `text-align: right`, direita `left` (Figma `style_3S0WJX` / `style_OZYPAG`).

---

## 4. Branding vs Performance (Figma)

| Campo | Branding `2:970` | Performance `2:951` |
|-------|------------------|---------------------|
| `titleInset` | `206px` (10,73vw) | **`20px`** (1,04vw) |
| `titleMaxW` | `1621px` | **`1881px`** |
| `sectionPt` | maior (após hero) | **`~9.5rem`** (gap ~150px entre blocos) |
| Grupo titulo | `1621×467` @ x:206, y:375 | `1881×461` @ **x:20**, y:381 |
| `line1` maxWidth | 66% (evita colidir com tag direita) | 78% |

Posições em `%: `(x / largura_grupo_titulo)`, `(y / altura_grupo_titulo)` — ver `service-layouts.ts`.

**Grupo `txt` aninhado:** quando o Figma tem `titulo` → `txt` → palavras, usar `titleTxtInset` (% do `titulo`) no wrapper do display e posições **dentro do `txt`** (ex. Performance: inset `11.11%`, `&` em `10.6%` de 1462px). Tags ficam no container externo (`subtitle` / `subtitle2`).

**Recorte da imagem:** `objectPosition` por serviço (ex. branding `58% 32%`, performance `52% 34%`) para não colar elementos na borda direita do frame 1360×450.

---

## 5. Novo serviço ou ajuste fino

1. Abrir grupo `titulo` no Figma (frame 1920).
2. Anotar: `x/y` do grupo, largura×altura, cada texto (`line1`, `&`, `line2`, tags).
3. Adicionar entrada em `SERVICE_LAYOUTS` com `%` e `clamp` nos insets.
4. Não reutilizar o recuo de Branding em Performance (foi a causa principal do desvio).

---

## 6. Armadilhas

- **`imageSide` em `services.ts`**: legado do layout 2 colunas; **não** usado no `ServiceBlock` atual.
- **Título full-bleed com `FRAME`**: empurra o bloco e quebra alinhamento com imagem 1360px.
- **Overlap grande** (`~75px`): título sobe demais; usuário pediu “mais baixo na seção”.
- **Performance com `titleInset: 206px`**: desalinha “Performance” em relação à imagem (Figma usa 20px).
- **Conteúdo com banner 1360×450**: Figma `2:925` não tem Mask group; `conteudo-social.png` é ícone do card → `showHeroImage: false`. Layout: Social (topo, 6%), `&` (51,8%, 0), conteúdo (19%, 54%), tags em `1466×413`.
