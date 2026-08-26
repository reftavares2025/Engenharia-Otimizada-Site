import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";
import { getChatReply, type ChatHistoryItem } from "./api/_lib/chat";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// API endpoint for the technical assistant chat (local dev only — in
// production on Vercel, api/chat.ts serves this same logic as a serverless
// function, since the deployed site is a static Vite build).
app.post("/api/chat", async (req, res) => {
  const { message, history } = req.body;

  if (!message || typeof message !== "string") {
    return res.status(400).json({ error: "Mensagem é obrigatória." });
  }

  const result = await getChatReply(
    message,
    Array.isArray(history) ? (history as ChatHistoryItem[]) : []
  );

  return res.status(result.errorStatus || 200).json({
    reply: result.reply,
    recommendedAction: result.recommendedAction,
    ...(result.errorStatus ? { error: "Erro ao processar mensagem." } : {}),
  });
});

// API endpoint to calculate quick project preliminary estimate
app.post("/api/estimate", (req, res) => {
  const { type, area, location, hasProject } = req.body;

  const areaNum = parseFloat(area) || 100;
  let estimatedDays = Math.ceil(areaNum / 15);
  if (estimatedDays < 10) estimatedDays = 10;
  if (estimatedDays > 45) estimatedDays = 45;

  let highlight = "Estrutura pré-fabricada de alta resistência com garantia de fabricação própria.";
  if (type === "chale") {
    highlight = "Especialidade em Chalés de Pequeno a Grande Padrão. Design sofisticado e montagem rápida.";
  } else if (type === "galpao") {
    highlight = "Galpão Logístico em pré-fabricado com pé-direito livre e fundações otimizadas.";
  } else if (type === "comercial") {
    highlight = "Edifício Comercial pré-fabricado com painéis arquitetônicos e fachada moderna.";
  }

  const whatsappMessage = encodeURIComponent(
    `Olá Eng. Régis! Fiz uma simulação no site para um projeto do tipo ${type || "Geral"}, com área de aproximadamente ${areaNum}m² em ${location || "Angatuba e Região"}. Gostaria de solicitar um orçamento personalizado e verificar os detalhes!`
  );

  return res.json({
    area: areaNum,
    estimatedDays,
    highlight,
    whatsappUrl: `https://wa.me/5515998606403?text=${whatsappMessage}`,
  });
});

async function startServer() {
  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*all", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
