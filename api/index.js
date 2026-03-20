/**
 * Serverless entry para Vercel — reexporta a app Express (rotas /api/*).
 * @see https://vercel.com/docs/functions/runtimes/node-js
 */
import app from '../server/app.js';

export default app;
