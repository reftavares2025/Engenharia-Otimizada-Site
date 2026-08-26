// Vercel's Node runtime resolves this via Node's native ESM loader (it does
// not bundle api/*.ts into one file), which requires an explicit extension
// on relative imports — ".ts" source, but the specifier must say ".js"
// (confirmed live: omitting it threw ERR_MODULE_NOT_FOUND in production).
import { getChatReply, type ChatHistoryItem } from "./_lib/chat.js";

// Vercel Serverless Function — this is what actually answers /api/chat when
// the site is deployed (rtengenharia.vercel.app runs as a static Vite build,
// so a plain Express route in server.ts only works in local dev; anything
// under /api becomes a real serverless route on Vercel).
export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const { message, history } = req.body || {};

  if (!message || typeof message !== "string") {
    res.status(400).json({ error: "Mensagem é obrigatória." });
    return;
  }

  const result = await getChatReply(
    message,
    Array.isArray(history) ? (history as ChatHistoryItem[]) : []
  );

  res.status(result.errorStatus || 200).json({
    reply: result.reply,
    recommendedAction: result.recommendedAction,
    ...(result.errorStatus ? { error: "Erro ao processar mensagem." } : {}),
  });
}
