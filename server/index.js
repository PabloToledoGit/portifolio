import app from './app.js';

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`[server] http://localhost:${PORT}`);
  console.log(
    `[server] OpenAI: ${process.env.OPENAI_API_KEY ? 'configurado' : 'não configurado (use fallback local)'}`
  );
});
