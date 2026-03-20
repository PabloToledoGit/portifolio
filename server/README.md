# Backend do Guia do Portfólio

Servidor Node.js + Express que integra o chat do portfólio com a API da OpenAI (GPT).

As dependências (`express`, `cors`, `openai`, `dotenv`) estão na **raiz** do monorepo para o deploy na **Vercel** (`api/index.js` importa `server/app.js`). Localmente, use `npm install` na raiz e os scripts abaixo.

## Configuração

1. Na **raiz** do projeto: copie `.env.example` para `.env` (se existir) ou crie `.env`
2. Adicione sua chave da OpenAI: `OPENAI_API_KEY=sk-...`
3. (Opcional) Defina `PORT=3001` se quiser outra porta

## Execução

```bash
# Na raiz — apenas o backend
npm run dev:server

# Backend + frontend (na raiz do projeto)
npm run dev:all
```

## Deploy na Vercel

1. Conecte o repositório na Vercel (framework **Vite** detectado automaticamente).
2. Em **Settings → Environment Variables**, adicione `OPENAI_API_KEY` (Production / Preview).
3. O build usa `npm run build` (frontend em `dist`); as rotas `/api/*` são tratadas pela Serverless Function em `api/index.js` (rewrite em `vercel.json`).
4. No frontend em produção, use `VITE_API_URL` vazio ou omita — as chamadas vão para o mesmo domínio (`/api/chat`, `/api/health`).

## Endpoints

- `GET /api/health` — Verifica se o backend e a OpenAI estão configurados
- `POST /api/chat` — Envia mensagem e recebe resposta do GPT

### Exemplo POST /api/chat

```json
{
  "message": "Conte sobre o Nutrify",
  "messages": [
    { "role": "user", "content": "..." },
    { "role": "assistant", "content": "..." }
  ]
}
```

Resposta: `{ "content": "...", "model": "gpt-4o-mini", "usage": {...} }`

## Fallback

Se `OPENAI_API_KEY` não estiver configurada ou o backend estiver indisponível, o frontend usa respostas locais curadas.
