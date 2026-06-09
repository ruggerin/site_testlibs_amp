# Plano de ajustes de redação — site AMP

Backlog de copy solicitado pelo cliente. Cada linha abaixo mapeia um item do [`revisao_texto.csv`](./revisao_texto.csv) e/ou do PDF [`[AMP] Ajustes site.pdf`](./%5BAMP%5D%20Ajustes%20site.pdf).

**Última auditoria:** 02/06/2026  
**Legenda de status:** `✅ feito` · `🔧 dev` (só código) · `🟡 revisar` (quase ok / validar com cliente) · `⏳ cliente` (aguarda material) · `❓ dúvida` (decisão do cliente)

---

## Visão geral

| Status | Itens |
|--------|-------|
| ✅ Feito | 23 |
| ⏳ Aguarda cliente | 2 |
| ❓ Sem especificação | 2 |

**Sprint 1 (dev):** implementada em 02/06/2026.  
**Sprint 2 (dev):** implementada em 02/06/2026.

---

## Sprint 1 — Copy no código (fazer agora)

Tarefas independentes, sem dependência de assets.

### T-01 · Manifesto Quem Somos — alinhar ao PDF
| Campo | Valor |
|-------|-------|
| **Status** | ✅ feito |
| **Página** | `/quem-somos` |
| **Arquivo** | `src/app/quem-somos/page.tsx` |
| **PDF** | Pág. 1 |
| **CSV** | Linha 4 |

**O que fazer**

1. Corrigir `MANIFESTO_LONG` — substituir trechos conforme tabela abaixo.
2. Corrigir `MANIFESTO_INTRO` — trocar *"onde"* por *"no qual"*.
3. ~~Decisão de layout~~ → resolvido em **T-08** (citação removida; ver Sprint 2).
4. ~~Unir `BRIDGE_HARMONIA` + `MANIFESTO_INTRO`~~ → feito em `MANIFESTO_BRIDGE_INTRO` (T-08).

| Trecho | Site hoje | Texto alvo (PDF) |
|--------|-----------|------------------|
| Performance sem branding | *queimar* recurso | **gastar** recurso |
| Abertura do parágrafo | *Na AMP, acreditamos que tudo precisa estar **interligando*** | ***Para nós da AMP**, tudo precisa estar **interligado*** |
| Vírgula após Então | *Então um conteúdo* | *Então**,** um conteúdo* |
| Transformação | *transforma* em uma operação | ***as transformamos** em uma operação* |
| Hub 360 | *sistema **onde*** | *sistema **no qual*** |

**Critério de aceite:** texto do manifesto igual ao PDF pág. 1, palavra por palavra (sem citação criativo).

---

### T-02 · FAQ — 4 respostas do PDF
| Campo | Valor |
|-------|-------|
| **Status** | ✅ feito |
| **Página** | `/faq` |
| **Arquivo** | `src/data/faq.ts` |
| **PDF** | Pág. 7 |
| **CSV** | Linha 28 |

**Substituir `answer` de cada item:**

**Pergunta 1**
```
Focamos o nosso trabalho em empresas que já têm uma operação validada e procuram escala. Seja um negócio local que queira dominar a região ou uma marca nacional, a nossa estrutura está desenhada para quem tem ambição de crescimento.
```
*(remover "real" no final; trocar "a querer" → "que queira")*

**Pergunta 2**
```
O marketing de performance é método. Enquanto as campanhas de tráfego pago podem gerar leads nos primeiros dias, a estratégia completa de posicionamento e ROI sólido consolida-se geralmente entre os primeiros 60 e 90 dias de parceria.
```
*(remover "não é magia,")*

**Pergunta 3** — ✅ já alinhada; não alterar.

**Pergunta 4**
```
Não trabalhamos com pacotes prontos. O investimento é calculado com base em seus objetivos de faturamento e no desafio do seu setor. O primeiro passo é o diagnóstico gratuito para avaliarmos se estamos alinhados.
```
*(faturação → faturamento; percebermos → avaliarmos)*

**Critério de aceite:** respostas idênticas ao PDF pág. 7.

---

### T-03 · Ponto final — banner Cases
| Campo | Valor |
|-------|-------|
| **Status** | ✅ feito |
| **Página** | `/cases` |
| **Arquivo** | `src/components/CasesChampionBanner.tsx` |
| **CSV** | Linha 27 |

**Alterar:** acrescentar `.` ao final de:
> Na AMP, somos obcecados por performance, resultados e em transformar sua marca em uma referência de sucesso**.**

---

### T-04 · Ponto final — banner Prêmios
| Campo | Valor |
|-------|-------|
| **Status** | ✅ feito |
| **Página** | `/premios` |
| **Arquivo** | `src/components/PremiosChampionBanner.tsx` |
| **CSV** | Linha 23 |

Mesma copy do T-03 — adicionar ponto final.

---

### T-05 · Aspas tipográficas — CTA Prêmios
| Campo | Valor |
|-------|-------|
| **Status** | ✅ feito |
| **Página** | `/premios` |
| **Arquivo** | `src/components/PremiosChampionBanner.tsx` |
| **CSV** | Linha 24 (mesmo padrão de Projetos) |

**Hoje:** `&quot;legalzinho&quot;` (aspas retas HTML)  
**Alinhar com Cases:** `&ldquo;legalzinho&rdquo;` (aspas tipográficas)

> Chega de ser “legalzinho”. Seja o campeão do seu jogo.

---

### T-06 · Cultura — item 1 do infográfico
| Campo | Valor |
|-------|-------|
| **Status** | ✅ feito |
| **Página** | `/nossa-cultura` |
| **Arquivo** | `src/components/CulturaProcess.tsx` → `DEFAULT_STEPS[0].description` |
| **PDF** | Pág. 3 |
| **CSV** | Linha 7 |

**Chamada (PDF):**
> Antes de qualquer plano, levamos em consideração:

`description` do passo 1 enxugada para só essa frase (bullets do infográfico carregam o restante).

---

## Sprint 2 — Copy no código (concluída)

### T-07 · Aspas no CTA de Projetos
| Campo | Valor |
|-------|-------|
| **Status** | ✅ feito |
| **Página** | `/cases` |
| **Arquivo** | `src/components/CasesChampionBanner.tsx` |
| **PDF** | Pág. 7 — *"Ajustar as aspas aqui"* (print no PDF) |

Usa `&ldquo;legalzinho&rdquo;` — alinhado ao padrão tipográfico do T-05 (Prêmios).

---

### T-08 · Citação criativo no manifesto
| Campo | Valor |
|-------|-------|
| **Status** | ✅ feito |
| **Arquivo** | `src/app/quem-somos/page.tsx` |

Removidos `QUOTE_CRIATIVO`, animação GSAP e bloco laranja. Bloco 2 do manifesto só com `MANIFESTO_LONG`. `BRIDGE_HARMONIA` + `MANIFESTO_INTRO` unificados em `MANIFESTO_BRIDGE_INTRO` (como no PDF).

---

## Sprint 3 — Aguarda material do cliente

### T-09 · Imagens restantes dos prêmios
| Campo | Valor |
|-------|-------|
| **Status** | ⏳ cliente |
| **Pasta** | `public/assets/premios/` |
| **CSV** | Linha 20 |

**No repositório hoje (5 arquivos):**
- `PREMIO-PMKT-2022-OURO.webp`
- `PREMIO-PMKT-BRONZE-2022.webp`
- `PREMIO-PMKT-2021.webp`
- `PREMIO-PMKT-2019-PRATA.webp`
- `PREMIO-PMKT-2019-BRONZE.webp`

**Quando receber:** adicionar `.webp` na pasta e registrar em `src/data/awards.ts`.

---

### T-10 · Nova premiação (item extra)
| Campo | Valor |
|-------|-------|
| **Status** | ⏳ cliente |
| **Arquivo** | `src/data/awards.ts` |
| **CSV** | Linha 21 |

Cliente deve enviar: imagem + título exato (ex. `PMKT 2021 - PRATA`) + ordem no carrossel.

---

## Concluído ✅

Itens já implementados no código (não requerem ação).

| ID | Área | Ajuste | Arquivo |
|----|------|--------|---------|
| ✅-01 | HOME | Endereço **Limonge** (com E) | `src/app/page.tsx` |
| ✅-02 | TIME | Remover Fernando e Emanuel | `public/assets/team/team.json` |
| ✅-03 | TIME | Bio Geise Araújo (1ª pessoa) | `public/assets/team/team.json` |
| ✅-04 | QUEM SOMOS | Citação década (*"Ao longo de mais de uma década..."*) | `quem-somos/page.tsx` |
| ✅-05 | QUEM SOMOS | Headline mapa: *Presença local com alcance nacional.* | `EstamosAquiSection.tsx` |
| ✅-06 | QUEM SOMOS | Box clientes — copy *Grandes marcas não aceitam...* | `ClientsSection.tsx` |
| ✅-07 | CULTURA | Box preto — *Em vez de apenas pensarmos fora da caixa...* | `CulturaBanner.tsx` |
| ✅-08 | SERVIÇOS | Tecnologia & Web — copy completa | `servicos-sections.ts` |
| ✅-09 | SERVIÇOS | Social e Conteúdo — copy completa | `servicos-sections.ts` |
| ✅-10 | SERVIÇOS | CTA sem vírgula após CONECTA | `ServicosConnectBanner.tsx` |
| ✅-11 | SERVIÇOS | Tag tecnologia com ponto final | `servicos-sections.ts` |
| ✅-12 | PRÊMIOS | Remover placeholder do carrossel | `awards.ts` / `AwardsCarousel.tsx` |
| ✅-13 | PRÊMIOS | Destaque PMKT 2021 - PRATA | `awards.ts` |
| ✅-14 | PRÊMIOS | Headline *O padrão de qualidade que nos move.* | `PremiosIntro.tsx` |
| ✅-15 | PROJETOS | Hero — *o resultado deixa de ser esforço.* (com ponto) | `CasesHero.tsx` |

---

## Sem escopo definido

| CSV | Notas |
|-----|-------|
| Logos parceiros (linha 29) | Célula vazia — aguardar briefing |
| Blog (linha 30) | Célula vazia — aguardar briefing |

---

## Textos oficiais (referência PDF)

Copiar destes blocos ao implementar T-01 e T-02.

### Quem Somos — manifesto (pág. 1)

```
Ao longo de mais de uma década, a AMP entendeu que resultados consistentes não nascem de esforços isolados.

Eles nascem da harmonia entre estratégia, criatividade e análise. Ser uma agência de marketing 360 vai além de reunir serviços sob o mesmo teto. Trata-se de operar como um verdadeiro hub de marketing, sendo um sistema no qual cada frente conversa, se alimenta e evolui em conjunto.

Sabemos bem como funciona: branding sem performance é só um quadro bonito na parede, e performance sem branding é gastar recurso com quem não vai lembrar o seu nome amanhã.

Para nós da AMP, tudo precisa estar interligado e falando a mesma língua. Então, um conteúdo só pode ser eficaz se trouxer público qualificado, e a tecnologia só faz sentido se a experiência do seu cliente for tão fluida e intuitiva que ele nem perceba o que está sendo vendido.

É assim que pegamos aquele monte de ações soltas que você fazia antes e as transformamos em uma operação de verdade. Com clareza para você decidir, eficiência para o seu time respirar e crescimento para o seu caixa sentir o impacto.

No fim das contas, entregamos o que falta em quase toda agência por aí: coerência.
```

### Quem Somos — mapa (pág. 2)

```
Presença local com alcance nacional.
```

### Quem Somos — clientes (pág. 3)

```
Grandes marcas não aceitam amadorismo. Se elas confiam a estratégia de crescimento à AMP, talvez você devesse se perguntar por que a sua marca ainda não está aqui.
```

### Cultura (pág. 3)

```
Antes de qualquer plano, levamos em consideração:

Em vez de apenas pensarmos fora da caixa, construímos uma nova: aquela onde sua marca brilha enquanto a concorrência tenta entender o que aconteceu.
```

### Serviços — Tecnologia (pág. 4)

```
Desenvolvemos páginas com lógica e clareza. O design de UI/UX atua como base para garantir que a navegação flua, que a informação apareça no tempo certo e que o usuário tenha uma experiência intuitiva.
A tecnologia, para nós, está além do suporte. Ela compõe a estrutura que sustenta o tráfego, viabiliza a coleta de dados e dá continuidade à estratégia.
```

### Serviços — Social e Conteúdo (pág. 5)

```
Ao trabalhar com a lógica de Inbound Marketing — isto é, entendendo o que dizer, quando dizer e o porquê — não existe a produção por obrigação nem o calendário vazio de intenção.
A presença, sozinha, não equivale a posicionamento.
O nosso conteúdo constrói percepção, abre caminho para mídia e mantém o ecossistema inteiro ativo.
```

### Prêmios (pág. 8)

```
O padrão de qualidade que nos move.
```

---

## Mapa CSV → tarefas

| Linha CSV | Tarefa | Status |
|-----------|--------|--------|
| 2 HOME | ✅-01 | ✅ |
| 3–4 TIME | ✅-02, ✅-03 | ✅ |
| 5 Manifesto | T-01, T-08 | ✅ |
| 6 Mapa | ✅-05 | ✅ |
| 7 Clientes | ✅-06 | ✅ |
| 8 Cultura item 1 | T-06 | ✅ |
| 9 Cultura box | ✅-07 | ✅ |
| 10–11 Serviços | ✅-08, ✅-09 | ✅ |
| 12 CTA vírgula | ✅-10 | ✅ |
| 13 Placeholder prêmios | ✅-12 | ✅ |
| 14 PMKT destaque | ✅-13 | ✅ |
| 15 Imagens prêmios | T-09 | ⏳ |
| 16 Premiação extra | T-10 | ⏳ |
| 17 Headline prêmios | ✅-14 | ✅ |
| 18 Ponto banner prêmios | T-04 | ✅ |
| 19 Aspas projetos | T-07 | ✅ |
| 20 Ponto tecnologia | ✅-11 | ✅ |
| 21 Ponto hero projetos | ✅-15 | ✅ |
| 22 Ponto banner projetos | T-03 | ✅ |
| 23 FAQ | T-02 | ✅ |
| 24–25 Parceiros / Blog | — | ❓ |

---

## Ordem de execução recomendada

```
1. T-02  FAQ (rápido, arquivo único)
2. T-03  Ponto Cases
3. T-04  Ponto Prêmios
4. T-05  Aspas Prêmios
5. T-01  Manifesto (maior diff — fazer com resposta do T-08)
6. T-06  Cultura item 1 (após resposta do cliente)
7. T-07  Validar aspas Cases (visual)
8. T-09  Prêmios imagens (quando cliente enviar)
9. T-10  Premiação extra (quando cliente enviar)
```

---

## Histórico

| Data | Ação |
|------|------|
| 02/06/2026 | v1 — auditoria inicial |
| 02/06/2026 | v2 — backlog com IDs, sprints, textos oficiais e critérios de aceite |
| 02/06/2026 | Sprint 1 implementada — T-01 a T-05 + FAQ |
| 02/06/2026 | Sprint 2 implementada — T-06, T-07, T-08 (manifesto + cultura) |
