import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import OpenAI from 'openai';

const app = express();

app.use(cors({ origin: true }));
app.use(express.json());

const openai = process.env.OPENAI_API_KEY
  ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  : null;

const SYSTEM_PROMPT = `Você é o guia do portfólio de Pablo Toledo, desenvolvedor fullstack focado em sistemas SaaS, automação, dashboards, fluxos de pagamento e integrações com IA.

Responda de forma profissional, objetiva e estratégica. Priorize:
- Projetos reais: Nutrify (plataforma de nutrição com IA), Playlix (SaaS com roles), MyAnna (automação WhatsApp), dashboards
- SIGBL — Sistema Integrado de Gestão do Banco de Leite: plataforma em desenvolvimento para operação de banco de leite humano, com implementação prevista em Volta Redonda (RJ); impacto social em saúde materno-infantil; stack React (Vite), TypeScript, Tailwind, arquitetura modular
- Stack: React, Node.js, Firebase, OpenAI API, Stripe, Mercado Pago, Flutter
- Resultados: faturamento R$ 150k+, liderança de 6 pessoas
- Evolução: de exposição precoce (~11 anos) a sistemas monetizados em 2024

Seja conciso. Evite frases genéricas. Foque em sistemas, decisões técnicas e impacto de negócio.`;

app.get('/api/health', (req, res) => {
  res.json({
    ok: true,
    openai: !!openai,
    timestamp: new Date().toISOString(),
  });
});

app.post('/api/chat', async (req, res) => {
  if (!openai) {
    return res.status(503).json({
      error: 'OPENAI_API_KEY não configurada',
      fallback: true,
    });
  }

  const { message, messages: history = [] } = req.body;

  if (!message || typeof message !== 'string') {
    return res.status(400).json({ error: 'Mensagem inválida' });
  }

  try {
    const apiMessages = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...history.slice(-10).map((m) => ({
        role: m.role === 'user' ? 'user' : 'assistant',
        content: m.content,
      })),
      { role: 'user', content: message.trim() },
    ];

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: apiMessages,
      max_tokens: 800,
      temperature: 0.7,
    });

    const content = completion.choices[0]?.message?.content?.trim() || 'Não foi possível gerar uma resposta.';

    res.json({
      content,
      model: completion.model,
      usage: completion.usage,
    });
  } catch (err) {
    console.error('[chat]', err);
    res.status(500).json({
      error: err.message || 'Erro ao processar com GPT',
      fallback: true,
    });
  }
});

export default app;
