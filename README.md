# 🚀 Como Rodar

1 - Instale dependências:
npm install

2 - Crie um arquivo .env na raiz do frontend:
VITE_API_URL=http://localhost:8080/api

3 - Inicie o servidor de desenvolvimento:
npm run dev

4 - Acesse no navegador:
http://localhost:5173

# 🌐 Variável de Ambiente

VITE_API_URL → URL base do backend

# 📁 Estrutura de Pastas
frontend/src/
 ├── api/        # Configuração Axios
 ├── services/   # Serviços para consumir API
 ├── pages/      # Páginas principais
 ├── components/ # Componentes reutilizáveis
 ├── hooks/      # Hooks customizados
 ├── utils/      # Funções utilitárias

# 🔄 Fluxo de Navegação

-Cadastro de Usuário (RegisterUser.jsx)
Cadastra email e horário de envio → POST /users

-Listagem de Fontes (Sources.jsx)
Lista apenas fontes ativas → GET /news-sources
Checkbox para seleção

=Assinaturas (Subscriptions.jsx)
Seleção de fonte e quantidade de notícias → POST /users/{userId}/subscriptions
Lista atualiza automaticamente
Remoção → DELETE /users/{userId}/subscriptions/{newsSourceId}

-Configurações do Usuário (UserSettings.jsx)
Atualiza horário → PUT /users/{userId}/horario
Desativa conta → DELETE /users/{userId}

-Cancelamento via Token (/cancel/:token)
GET /unsubscribe?token={token} → desativa usuário
Mostra mensagem final de descadastro

# ⚙️ Dependências

React + Vite – Estrutura principal
Axios – Requisições HTTP
React Router DOM – Navegação entre páginas
Instalação:
npm install axios react-router-dom

# 📌 Observações

Nenhum estado global complexo.
Sem UI frameworks pesados.
Testes automatizados não implementados.
Fluxo simples e direto para demonstrar integração real com backend.