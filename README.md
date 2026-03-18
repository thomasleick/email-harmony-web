# Email Harmony Web

Um classificador e analisador inteligente de e-mails, refatorado com base em práticas **Component Driven** e arquitetura **Feature-Sliced/Clean Architecture**, focado em escalabilidade e manutenção de longo prazo.

## 🚀 Visão Geral do Projeto

Este projeto é a evolução focada em engenharia avançada de um frontend legado (criado por ferramentas no-code/low-code). Ele classifica e-mails em **Produtivos** ou **Improdutivos** e, com base nisso, sugere respostas inteligentes. Toda a casca interage de forma limpa com um adapter de serviço, habilitando a fácil integração com uma API genérica e realística por trás.

## 💻 Stack Utilizada

- **Framework:** Next.js 15 (App Router)
- **Linguagem:** TypeScript
- **Estilização:** Tailwind CSS v4 + CVA (Class Variance Authority)
- **Componentes Base:** shadcn/ui & Radix UI (Lucide p/ ícones, Framer Motion p/ animações)
- **Gerenciamento de Estado Global:** Zustand
- **Ferramental de Código:** ESLint v9, Prettier
- **Qualidade de Código:** Strict Types & Aliases de importação com `@/*`.

## 📁 Estrutura de Pastas (Arquitetura)

Adotamos a segregação por base/domínio inspirada no FSD (Feature-Sliced Design):

\`\`\`
src/
├── app/                  # Next.js App Router (Páginas, CSS globais e layouts)
├── components/
│   ├── layout/          # Componentes globais estúpidos (Navbar, Footer)
│   └── ui/              # Componentes de UI primitivos (Tokens shadcn, Buttons)
├── features/             # Fatias de domínio da aplicação
│   ├── email-analysis/  # Domínio centralizador: Análise do email
│   │   ├── components/  # Presentational (EmailInput, ResultsPanel)
│   │   ├── containers/  # Smart Components orquestradores (Ex: EmailAnalysisContainer)
│   │   ├── domain/      # Types explícitos e entidades de negócio
│   │   ├── hooks/       # Hooks de orquestração local (Clean handlers)
│   │   └── services/    # Adapter Pattern para a API externa (mock x real)
│   └── history/         # Domínio agregador: Histórico local
│       ├── components/ 
│       ├── domain/     
│       └── store/       # Zustand store p/ gerência do histórico globalizado
└── lib/                  # Utilitários globais genéricos (ex: clsx/twMerge)
\`\`\`

## 🛠 Como Rodar o Projeto

1. Certifique-se de ter o **Node.js** (v20+) instalado.
2. Baixe as dependências:
   \`\`\`bash
   npm install
   \`\`\`
3. Inicie o servidor de desenvolvimento:
   \`\`\`bash
   npm run dev
   \`\`\`
4. Acesse [http://localhost:3000](http://localhost:3000).

## 📐 Padrões Adotados & Decisões Arquiteturais

1. **Containers vs Presentational Components:** 
   No \`app/page.tsx\`, não há lógicas soltas. A página é unicamente compositiva. O \`EmailAnalysisContainer.tsx\` funciona como um maestro, lidando com os dados via Custom Hooks e Zustand, e os injeta transparentemente nos componentes "burros" (\`EmailInput\`, \`ResultsPanel\`).
   
2. **Camada de Adapters para Services:**
   As chamadas de API são isoladas no padão Adapter (vide \`IEmailService\`). Atualmente uma implementação fluída mockada (\`EmailMockService\`) imita temporariamente o backend. Alternar para a API real nunca quebra a UI — pois ambas obedecem ao mesmo contrato de payload/resposta.
   
3. **Gerenciamento Desacoplado de Estado:**
   No lugar do clássico *prop drilling* que degrada performace e clareza, o histórico gerencial roda sobre \`Zustand\` (\`useHistoryStore.ts\`), o que permite que \`HistorySidebar\` subscreva somente às fatias de dados de que necessita isoladamente e de forma autônoma.

## 🤝 Boas Práticas para Contribuição

- Siga a arquitetura definida e **não cruze domínios desnecessariamente**: Uma *feature* deve se comunicar com o exterior por meio da sua public API (Camada de Service ou Container exportado).
- Realize o run de *linting* e aderência ao *Prettier* antes do PULL REQUEST:
  \`\`\`bash
  npm run lint
  npx prettier --write .
  \`\`\`
- Utilize o padão rigoroso de **Semantic Commits**:
  - \`feat(scope): add new login flow\`
  - \`refactor(email): decouple logic to custom hook\`
  - \`fix(history): resolve timestamp timezone error\`
