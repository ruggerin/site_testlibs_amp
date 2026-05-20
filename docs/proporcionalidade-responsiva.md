# Plano — Proporcionalidade Responsiva
**Arquivo alvo principal:** `src/app/quem-somos/page.tsx` + `src/components/TeamSection.tsx`

---

## 1. Diagnóstico

### Por que acontece

O design foi concebido para monitores largos (1440 px+, ~900 px de altura). Os tamanhos de fonte usam `vw` (largura da viewport), mas o espaço útil de cada slide é determinado pela **altura** (`100svh`). Num laptop padrão (1366×768) o `vw` cresce normalmente, mas a tela é baixa, então fontes grandes e paddings fixos consomem a altura disponível antes do conteúdo terminar.

### Exemplo concreto — seção Time (1366×768)

| Elemento | Valor atual | Altura renderizada |
|---|---|---|
| Título "time" `clamp(48px, 13vw, 156px)` | 13vw = 177px → capped 156px | **140 px** (leading 0.9) |
| Gap mb-8/mb-12 | fixo | **48 px** |
| 7 itens de lista `py-3.5 sm:py-4` | 16px × 2 + fonte 22px | **7 × 66 px = 462 px** |
| Botão "Ver mais" + mt-8 | fixo | **43 px** |
| **Total coluna esquerda** | | **693 px** |
| Padding `py-16 sm:py-20` | fixo 80px × 2 | **160 px** |
| **Total mínimo da seção** | | **853 px** |
| **Viewport disponível** | 768 px | **overflow: 85 px** ❌ |

### Seções com overflow confirmado ou provável

| Seção | Overflow estimado (1366×768) | Prioridade |
|---|---|---|
| Time | 85 px | 🔴 Alta |
| Manifesto slide 2 (texto longo) | ~280 px | 🔴 Alta |
| Estamos Aqui | ~60 px | 🟡 Média |
| Em Excelente Companhia | ~40 px | 🟡 Média |
| Manifesto slide 1 | ~20 px | 🟢 Baixa |

---

## 2. Sistema de Solução

### Princípio: Three-axis clamping

Substituir `clamp(min, Xvw, max)` por `clamp(min, min(Xvw, Ysvh), max)`.

O CSS `min()` aceita múltiplos argumentos e retorna o menor. Assim a fonte respeita **tanto a largura quanto a altura** da viewport:

```css
/* ANTES — só responde à largura */
font-size: clamp(40px, 13vw, 156px);
/* → 1366×768: 156px (capped), mas ainda grande */

/* DEPOIS — responde a largura E altura */
font-size: clamp(36px, min(11vw, 16svh), 130px);
/* → 1366×768: min(150px, 122px) = 122px ✓ */
/* → 1920×1080: min(211px, 172px) = 172px (capped 130px) ✓ */
/* → 375×812 mobile: min(41px, 130px) = 41px ✓ */
```

### Padrões a aplicar globalmente

```
FONTES GRANDES (títulos display):
  clamp(36px, min(11vw, 16svh), 130px)     ← "time", "estamos", "aqui"
  clamp(32px, min(9vw, 14svh), 100px)      ← subtítulos médios

PADDING VERTICAL DAS SEÇÕES:
  py: clamp(1.5rem, 5svh, 5rem)
  → 768px height: 5% × 768 = 38px (vs. 80px fixo)
  → 1080px height: 5% × 1080 = 54px ✓

GAPS INTERNOS (mb-8, mt-8 entre blocos):
  margin: clamp(0.75rem, 2svh, 2rem)
  → proporcional à altura disponível

PADDING DOS ITENS DE LISTA:
  py: clamp(6px, 1.2svh, 16px)
  → 768px: 9px (vs. 16px fixo)
  → 1080px: 13px ✓
  → Salva 7 × 2 × 7px = 98px no TeamSection
```

---

## 3. Plano por Seção

### 3.1 Constante `SECTION_SCREEN` — `page.tsx` linha 20

```tsx
// ANTES
const SECTION_SCREEN = "min-h-[100svh] w-full max-w-[100vw] overflow-x-hidden";

// DEPOIS — adiciona overflow-y-hidden para clip visual, 
// mas conteúdo cresce via min-h (não h-) para não cortar
// Sem mudança aqui — a solução está nos internos de cada seção.
// SECTION_SCREEN permanece igual.
```

> A constante não muda. O fix é inteiramente nos elementos internos.

---

### 3.2 TeamSection — `src/components/TeamSection.tsx`

**Mudanças necessárias:**

#### a) Padding da seção (linha 85)
```tsx
// ANTES
className="team-section flex min-h-[100svh] ... py-16 sm:py-20"

// DEPOIS
className="team-section flex min-h-[100svh] ..."
style={{ paddingTop: "clamp(1.5rem, 4svh, 5rem)", paddingBottom: "clamp(1.5rem, 4svh, 5rem)" }}
```
Impacto: -84 px no total (80px → 38px × 2)

#### b) Título "time" (linha 96)
```tsx
// ANTES
fontSize: "clamp(48px, 13vw, 156px)"

// DEPOIS
fontSize: "clamp(36px, min(11vw, 16svh), 130px)"
```
Impacto: 156px → ~122px = -34 px

#### c) Gap abaixo do título (linha 91)
```tsx
// ANTES
className="relative mb-8 sm:mb-12"

// DEPOIS
className="relative"
style={{ marginBottom: "clamp(0.75rem, 2svh, 3rem)" }}
```
Impacto: 48px → ~15px = -33 px

#### d) Padding dos itens de lista (linha 123)
```tsx
// ANTES
className="team-item group flex w-full ... py-3.5 text-left ... sm:py-4 ..."

// DEPOIS — remover py-3.5 sm:py-4, aplicar via style
className="team-item group flex w-full ... text-left ..."
style={{ paddingTop: "clamp(5px, 1.1svh, 14px)", paddingBottom: "clamp(5px, 1.1svh, 14px)" }}
```
Impacto: 7 × 2 × (16-9px) = -98 px

#### e) Tamanho fonte dos itens (linha 128)
```tsx
// ANTES
text-[clamp(15px,1.65vw,32px)]

// DEPOIS
text-[clamp(13px,min(1.4vw,2.2svh),28px)]
```

#### f) Botão "Ver mais" (linha 151)
```tsx
// ANTES
className="mt-8 flex items-center gap-2 ... sm:mt-10"

// DEPOIS
className="flex items-center gap-2 ..."
style={{ marginTop: "clamp(0.75rem, 2svh, 2.5rem)" }}
```
Impacto: 40px → ~15px = -25 px

**Total de altura recuperada no TeamSection: ~274 px**
**Novo total: 693 - 274 = ~580 px + padding ~76 px = 656 px < 768 px ✓**

---

### 3.3 Manifesto Slide 2 — `page.tsx` linha ~647

O `MANIFESTO_LONG` tem 4 parágrafos com `leading-[2.2]`. Numa tela baixa, esse espaçamento sozinho infla o texto drasticamente.

#### a) Padding da seção (linha 649)
```tsx
// ANTES
className={`manifesto-slide-2 ${SECTION_SCREEN} flex flex-col justify-center bg-[#141414] py-14 sm:py-20`}

// DEPOIS
className={`manifesto-slide-2 ${SECTION_SCREEN} flex flex-col justify-center bg-[#141414]`}
style={{ paddingTop: "clamp(1.5rem, 4svh, 5rem)", paddingBottom: "clamp(1.5rem, 4svh, 5rem)" }}
```

#### b) Line-height do texto longo (linha 668)
```tsx
// ANTES
leading-[2.2]

// DEPOIS — usa valor responsivo via CSS
// Substituir a classe pela prop style:
style={{ fontFamily: "var(--font-inter)", lineHeight: "clamp(1.7, 0.3svh + 1.5, 2.2)" }}
// Numa tela baixa: lineHeight cai de 2.2 para ~1.7, economizando espaço vertical
```

Alternativa mais simples se CSS calc em lineHeight der problema:
```tsx
// Solução pragmática: separar em 2 breakpoints
className="... leading-[1.8] lg:leading-[2.2]"
```

#### c) Padding interno da coluna direita (linha 666)
```tsx
// ANTES
className="manifesto-slide-2-parallax will-change-transform px-5 pb-8 pt-6 sm:px-8 lg:px-10 lg:pb-10 lg:pt-8"

// DEPOIS
className="manifesto-slide-2-parallax will-change-transform px-5 sm:px-8 lg:px-10"
style={{ paddingTop: "clamp(0.75rem, 2svh, 2rem)", paddingBottom: "clamp(0.75rem, 2svh, 2.5rem)" }}
```

---

### 3.4 Manifesto Slide 1 — `page.tsx` linha ~591

#### a) Padding da seção (linha 593)
```tsx
// ANTES
className={`manifesto-slide-1 ${SECTION_SCREEN} flex flex-col justify-center bg-[#141414] py-14 sm:py-20`}

// DEPOIS
className={`manifesto-slide-1 ${SECTION_SCREEN} flex flex-col justify-center bg-[#141414]`}
style={{ paddingTop: "clamp(1.5rem, 4svh, 5rem)", paddingBottom: "clamp(1.5rem, 4svh, 5rem)" }}
```

#### b) Altura mínima da imagem (linha 598)
```tsx
// ANTES
className="... lg:min-h-[min(58vh,520px)]"

// DEPOIS
className="... lg:min-h-[min(50svh,460px)]"
// svh ao invés de vh — usa altura da viewport sem a barra de endereços
```

#### c) Gap da coluna direita (linha 611)
```tsx
// ANTES
className="flex flex-col gap-8 lg:gap-10"

// DEPOIS
className="flex flex-col"
style={{ gap: "clamp(1rem, 2.5svh, 2.5rem)" }}
```

---

### 3.5 Estamos Aqui — `page.tsx` linha ~708

#### a) Padding da seção
```tsx
// ANTES
className={`${SECTION_SCREEN} flex flex-col justify-center bg-[#232323] py-16 sm:py-20`}

// DEPOIS
className={`${SECTION_SCREEN} flex flex-col justify-center bg-[#232323]`}
style={{ paddingTop: "clamp(1.5rem, 4svh, 5rem)", paddingBottom: "clamp(1.5rem, 4svh, 5rem)" }}
```

#### b) Títulos "ESTAMOS" e "AQUI" (linhas 712, 715)
```tsx
// ANTES
fontSize: "clamp(40px, 13vw, 156px)"

// DEPOIS
fontSize: "clamp(36px, min(10vw, 14svh), 130px)"
```

#### c) Gap mb-8 abaixo dos títulos e mb-10 abaixo do texto (linhas 716, 720)
```tsx
// ANTES
className="... mb-8"     // 32px
className="... mb-10 ..."  // 40px

// DEPOIS — via style
style={{ marginBottom: "clamp(0.5rem, 1.5svh, 2rem)" }}  // título
style={{ marginBottom: "clamp(0.75rem, 2svh, 2.5rem)" }} // texto
```

#### d) Estados: padding e fonte
```tsx
// ANTES
className="state-item ... py-2.5 ..."
text-[clamp(14px,1.65vw,32px)]

// DEPOIS
style={{ paddingTop: "clamp(4px, 0.9svh, 10px)", paddingBottom: "clamp(4px, 0.9svh, 10px)" }}
text-[clamp(13px,min(1.4vw,2svh),26px)]
```

---

### 3.6 Em Excelente Companhia — `page.tsx` linha ~769

#### a) Padding da seção
```tsx
// ANTES
className={`${SECTION_SCREEN} clients-section ... py-16 ... sm:py-20`}

// DEPOIS
className={`${SECTION_SCREEN} clients-section ...`}
style={{ paddingTop: "clamp(1.5rem, 4svh, 5rem)", paddingBottom: "clamp(1.5rem, 4svh, 5rem)" }}
```

#### b) Títulos "Em excelente" / "companhia" (linhas 776, 780)
```tsx
// ANTES
fontSize: "clamp(36px, 13vw, 156px)"

// DEPOIS
fontSize: "clamp(32px, min(10vw, 14svh), 130px)"
```

#### c) Gaps mb-10 sm:mb-12 e mb-14 sm:mb-16
```tsx
// ANTES (clients-title div)
className="clients-title"  // sem gap explícito nos filhos

// DEPOIS (parágrafo abaixo dos títulos)
style={{ marginBottom: "clamp(1.5rem, 3svh, 4rem)" }}
```

---

## 4. Mudanças Não-Dimensionais (Zero Risco)

Essas mudanças não afetam o layout mas melhoram a robustez:

### 4.1 Adicionar `overflow-y: auto` nas seções que ainda puderem vazar
Para evitar que o overflow quebre o snap em monitores muito pequenos (< 680px de altura, tablets portrait extremos), adicionar `overflow-y: auto` como fallback:

```tsx
// No SECTION_SCREEN ou individualmente nas seções problemáticas:
// Considerar para casos extremos apenas
```

### 4.2 Breakpoint de aspect-ratio para layout de tablet landscape
Em dispositivos 1024×600 (tablet landscape), o layout muda para 2 colunas (`md:`) mas a altura é baixa. Considerar um breakpoint extra:

```css
@media (max-height: 700px) and (min-width: 768px) {
  /* regras de emergência */
}
```

Este breakpoint pode ser usado via Tailwind com plugin `tailwind-scrollbar` ou inline style.

---

## 5. Ordem de Implementação

| Passo | Arquivo | Impacto | Risco |
|---|---|---|---|
| 1 | `TeamSection.tsx` — padding seção | Alto | Baixo |
| 2 | `TeamSection.tsx` — título + gap | Alto | Baixo |
| 3 | `TeamSection.tsx` — itens da lista | Alto | Baixo |
| 4 | `page.tsx` — padding Manifesto slides 1 e 2 | Alto | Baixo |
| 5 | `page.tsx` — leading-[2.2] → responsivo | Médio | Médio |
| 6 | `page.tsx` — Estamos Aqui (padding + títulos) | Médio | Baixo |
| 7 | `page.tsx` — Em Excelente Companhia | Baixo | Baixo |

**Estratégia recomendada:** implementar passo a passo, testando no browser com DevTools em 1366×768 (viewport preset "Laptop") após cada passo.

---

## 6. Viewport de Referência para Testes

| Preset DevTools | Dimensões | Representa |
|---|---|---|
| Laptop | 1366 × 768 | Laptop padrão (caso crítico) |
| Laptop L | 1440 × 900 | Referência do design |
| 1080p | 1920 × 1080 | Monitor padrão |
| iPad Landscape | 1024 × 768 | Tablet landscape |
| iPhone SE | 375 × 667 | Mobile pequeno |

O critério de aceite: **todas as seções devem caber visualmente em 1366×768 sem overflow visível.**
