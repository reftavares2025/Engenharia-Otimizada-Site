/**
 * Utility function to generate deep WhatsApp links with pre-filled contextual messages.
 */
export function buildWhatsAppLink(topic: string, details?: string, extraParams?: Record<string, string | number | boolean>): string {
  const phone = "5519990154309";
  let message = `Olá Eng. Régis! Vi no site da Régis Tavares Engenharia e gostaria de solicitar atendimento sobre:\n👉 *${topic.trim()}*`;
  
  if (details && details.trim()) {
    message += `\n\n*Informações:* ${details.trim()}`;
  }

  if (extraParams && Object.keys(extraParams).length > 0) {
    message += `\n\n*Dados Adicionais:*`;
    for (const [key, value] of Object.entries(extraParams)) {
      if (value !== undefined && value !== null && value !== '') {
        message += `\n• ${key}: ${value}`;
      }
    }
  }

  message += `\n\n📍 *Atendimento:* Montagem e Obras presenciais em SP & PR e Projetos para todo o Brasil.`;

  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}
