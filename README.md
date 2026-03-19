# Email Harmony Web 🛡️

Uma solução premium de triagem inteligente de emails, desenvolvida com **Next.js 15** e focada em extrair o máximo valor operacional de comunicações financeiras através de **IA Generativa (Gemini 1.5 Flash)**.

## 🚀 Experiência Premium (UX/UI)

Este projeto foi elevado para um patamar de ferramenta profissional ("Sênior"), entregando:
1.  **Glassmorphism & Aesthetics:** Interface rica usando `backdrop-blur` e gradientes mesh animados para um visual de software moderno e fluido.
2.  **Dark Mode Nativo:** Suporte completo a temas Light/Dark com persistência automática via `localStorage` e toggle animado com **Framer Motion**.
3.  **Dashboard de Analytics:** Painel de Business Intelligence em tempo real que monitora produtividade, backlog de emails críticos e média de prioridade da sessão.
4.  **Triagem Inteligente:** Visualizadores de "Priority Pulse" que destacam automaticamente emails de alta urgência e sentimento negativo no histórico.
5.  **Exportação de Inteligência:** Funcionalidade de exportar relatórios `.txt` detalhados contendo todo o raciocínio da IA e métricas de score.

## 💻 Stack Tecnológica

-   **Framework:** Next.js 15 (App Router / Turbopack)
-   **Estilização:** Tailwind CSS + Framer Motion (Animações ricas)
-   **Estado:** Zustand (com middleware `persist` para histórico e temas)
-   **Ícones:** Lucide React
-   **Feedback:** Sonner (Toasts de alta fidelidade)

## 📁 Arquitetura (FSD Inspired)

Seguimos uma segregação rigorosa por domínios e funcionalidades:
-   `features/email-analysis`: Core da aplicação (Input, Results, Analytics).
-   `features/history`: Persistência e display de atendimentos anteriores.
-   `features/theme`: Motor de temas Light/Dark.
-   **Adapter Pattern:** Chamadas de API isoladas em `services`, permitindo alternar entre Mock e Produção sem afetar a UI.

## 🛠 Instalação e Execução

1.  **Dependências:**
    ```bash
    npm install
    ```
2.  **Desenvolvimento:**
    ```bash
    npm run dev
    ```
3.  **Build de Produção:**
    ```bash
    npm run build
    ```

## 📐 Padrões de Código
- **Clean Components**: Separação clara entre Containers (maestros de dados) e Presentational (UI pura).
- **TypeScript Strict**: Tipagem completa para todos os retornos de análise da IA.
- **Semantic Commits**: Padronização de histórico de commits para rastreabilidade.
