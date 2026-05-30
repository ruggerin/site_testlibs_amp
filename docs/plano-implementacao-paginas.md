# Plano de implementação — páginas AMP

Arquivo de acompanhamento das telas do [Figma (canvas raiz)](https://www.figma.com/design/xcDOfLo5PaJoQsXVB2MhfK/Sem-t%C3%ADtulo?node-id=0-1).

**Legenda:** marque `[x]` ao concluir cada item.

**Fora do escopo deste plano (não alterar):**

- [x] Home — `src/app/page.tsx` (`/`)
- [x] Quem Somos — `src/app/quem-somos/page.tsx` (`/quem-somos`)

**Rotas no projeto:**

| Rota | Arquivo | Status |
|------|---------|--------|
| `/` | `src/app/page.tsx` | Feito |
| `/quem-somos` | `src/app/quem-somos/page.tsx` | Feito |
| `/nossa-cultura` | `src/app/nossa-cultura/page.tsx` | Feito (MVP) |
| `/servicos` | `src/app/servicos/page.tsx` | Feito |
| `/faq` | `src/app/faq/page.tsx` | Feito |
| `/premios` | `src/app/premios/page.tsx` | Feito |
| `/cases` | `src/app/cases/page.tsx` | Feito |
| `/cases/[slug]` | `src/app/cases/[slug]/page.tsx` | Feito |
| `/blog` | `src/app/blog/page.tsx` | Feito |
| `/blog/[slug]` | `src/app/blog/[slug]/page.tsx` | Feito |
| `/demo-animacoes` | `src/app/demo-animacoes/page.tsx` | Interno — fora do plano |

---

## Fase 0 — Infraestrutura compartilhada

| Item | Figma | Rota / artefato |
|------|-------|-----------------|
| Loader | [node 2-119](https://www.figma.com/design/xcDOfLo5PaJoQsXVB2MhfK/Sem-t%C3%ADtulo?node-id=2-119) | `src/components/Loader.tsx` (só na home) |
| Menu aberto | [node 2-168](https://www.figma.com/design/xcDOfLo5PaJoQsXVB2MhfK/Sem-t%C3%ADtulo?node-id=2-168) | `src/components/Navbar.tsx` |

### 0.1 Componentes reutilizáveis

- [x] `src/components/PageFooter.tsx`
- [x] `src/components/PageShell.tsx`
- [x] `src/components/PageHero.tsx`
- [x] `src/lib/site.ts` + `globals.css` (tokens)
- [x] `src/components/CtaBanner.tsx`
- [x] `src/components/ServiceBlock.tsx`, `CaseCard.tsx`, `BlogCard.tsx`, `FaqAccordion.tsx`, `AwardsCarousel.tsx`, `CulturaProcess.tsx`

### 0.2 Navegação e UX global

- [x] Overlay menu mobile (`Navbar.tsx`)
- [x] Loader apenas na home
- [x] Links do menu atualizados
- [x] `theme="light"` no Navbar para páginas claras

### 0.3 Assets

- [x] `public/nossa-cultura/` (foto sec1, ícones SVG do processo, hero-bg)
- [x] `public/servicos/` (4 imagens exportadas do Figma)
- [x] Cases/blog usam imagens de `public/servicos` e assets existentes
- [x] `next/image` nas páginas com raster

### 0.4 Responsivo

- [x] `clamp()` + grids Tailwind
- [x] `FRAME` em `src/lib/site.ts`

**Critério Fase 0:** [x] concluído

---

## Fase 1 — Páginas institucionais

### 1. Nossa Cultura — `/nossa-cultura`

**Figma:** [node 2-1219](https://www.figma.com/design/xcDOfLo5PaJoQsXVB2MhfK/Sem-t%C3%ADtulo?node-id=2-1219)

- [x] Rota + metadata
- [x] Hero, sec1, processo (4 etapas), banner, footer
- [x] Infográfico em ciclo (desktop) + ícones Figma
- [x] Hero com fundo laranja (`hero-bg.svg`)
- [x] Revisão alinhada ao Figma Desktop (clamp proporcional, layout sec1/infográfico/banner)
- [x] Revisão pixel-perfect final (ajustes finos pós-preview)

### 2. Serviços — `/servicos`

**Figma:** [node 2-1039](https://www.figma.com/design/xcDOfLo5PaJoQsXVB2MhfK/Sem-t%C3%ADtulo?node-id=2-1039)

- [x] Rota + metadata
- [x] Hero + 4 blocos (`src/data/services.ts`)
- [x] `ServiceBlock` + footer

### 3. FAQ — `/faq`

**Figma:** [node 2-694](https://www.figma.com/design/xcDOfLo5PaJoQsXVB2MhfK/Sem-t%C3%ADtulo?node-id=2-694)

- [x] Rota + metadata
- [x] Hero + accordion 4 perguntas (`src/data/faq.ts`)
- [x] CTA banner + footer
- [x] Link no footer (`PageFooter`)

### 4. Prêmios — `/premios`

**Figma:** [node 2-614](https://www.figma.com/design/xcDOfLo5PaJoQsXVB2MhfK/Sem-t%C3%ADtulo?node-id=2-614)

- [x] Rota + metadata
- [x] Hero + texto + carrossel (`src/data/awards.ts`)
- [x] Footer

---

## Fase 2 — Projetos / Cases

### 5. Listagem — `/cases`

**Figma:** [node 2-891](https://www.figma.com/design/xcDOfLo5PaJoQsXVB2MhfK/Sem-t%C3%ADtulo?node-id=2-891)

- [x] Rota + metadata
- [x] Hero + grid 6 cases (`src/data/cases.ts`)
- [x] `CaseCard` + links

### 6. Case individual — `/cases/[slug]`

**Figma:** [node 2-797](https://www.figma.com/design/xcDOfLo5PaJoQsXVB2MhfK/Sem-t%C3%ADtulo?node-id=2-797)

- [x] Rota dinâmica + `generateStaticParams`
- [x] Narrativa + Objetivo / Impacto / Resultado
- [x] Cases relacionados + metadata

---

## Fase 3 — Blog

### 7. Listagem — `/blog`

**Figma:** [node 2-519](https://www.figma.com/design/xcDOfLo5PaJoQsXVB2MhfK/Sem-t%C3%ADtulo?node-id=2-519)

- [x] Rota + metadata
- [x] Hero + posts (`src/data/posts.ts`)
- [x] `BlogCard` + footer

### 8. Artigo — `/blog/[slug]`

**Figma:** [node 2-430](https://www.figma.com/design/xcDOfLo5PaJoQsXVB2MhfK/Sem-t%C3%ADtulo?node-id=2-430)

- [x] Rota dinâmica + `generateStaticParams`
- [x] Corpo + navegação prev/next
- [x] Relacionados + metadata

---

## Checklist final

- [x] Todas as rotas do menu funcionam
- [x] Home e Quem Somos não foram editados
- [x] Build de produção passa (`npm run build`)
- [x] Assets principais do Figma em `public/`
- [x] Open Graph + canonical (`src/lib/seo.ts` + layouts)
- [x] Animações de entrada leves (`ScrollReveal` + CSS)
- [ ] Revisão visual fina página a página vs. Figma Desktop

---

## Backlog pós-MVP

- [ ] CMS ou MDX para blog e cases
- [ ] Testes E2E de navegação
- [ ] GSAP / parallax no nível de Quem Somos (opcional)
- [ ] `NEXT_PUBLIC_SITE_URL` no deploy para URLs canônicas corretas

---

## Histórico

| Data | Notas |
|------|-------|
| 2026-05-26 | Plano criado |
| 2026-05-26 | Fase 0 + `/nossa-cultura` |
| 2026-05-26 | Demais páginas: servicos, faq, premios, cases, blog + dados em `src/data/` |
| 2026-05-26 | Assets Figma, infográfico circular, imagens reais, SEO, ScrollReveal |
