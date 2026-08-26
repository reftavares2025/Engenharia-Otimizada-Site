/**
 * Lead Scoring and Background CRM / Google Sheets Capture
 * Régis Tavares Engenharia Civil
 */

export interface LeadData {
  nome: string;
  telefone: string;
  email?: string;
  cidade?: string;
  tipoProjeto?: string;
  areaM2?: number;
  terreno?: string;
  aprovacao?: string;
  sondagemSPT?: string;
  quartos?: string;
  mezanino?: boolean;
  temSubsolo?: boolean;
  canal?: string;
  origem?: string;
  dataHora?: string;
}

export interface LeadScoreResult {
  score: number;
  maxScore: number;
  level: '🔥 QUENTE' | '🟡 MORNO' | '🧊 FRIO';
  tag: string;
  recommendation: string;
}

/**
 * Calculates lead qualification score based on feasibility indicators (0 to 10 points).
 */
export function calculateLeadScore(data: Partial<LeadData>): LeadScoreResult {
  let score = 0;

  // 1. Terreno (Max: 3)
  const terreno = (data.terreno || '').toLowerCase();
  if (terreno.includes('próprio') || terreno.includes('proprio') || terreno.includes('quitado')) {
    score += 3;
  } else if (terreno.includes('negociação') || terreno.includes('negociacao') || terreno.includes('compra')) {
    score += 2;
  } else {
    score += 0;
  }

  // 2. Projeto Aprovado na Prefeitura (Max: 3)
  const aprov = (data.aprovacao || '').toLowerCase();
  if (aprov.includes('aprovado') || aprov.includes('alvará') || aprov.includes('alvara')) {
    score += 3;
  } else if (aprov.includes('andamento')) {
    score += 2;
  } else {
    score += 1;
  }

  // 3. Localização dentro do raio presencial SP / PR (Max: 2)
  const cidade = (data.cidade || '').toUpperCase();
  if (
    cidade.includes('SP') ||
    cidade.includes('PR') ||
    cidade.includes('SÃO PAULO') ||
    cidade.includes('PARANÁ') ||
    cidade.includes('SOROCABA') ||
    cidade.includes('ANGATUBA') ||
    cidade.includes('ITAPETININGA') ||
    cidade.includes('CURITIBA')
  ) {
    score += 2;
  } else {
    score += 1; // Demais estados: projetos remotos
  }

  // 4. Sondagem SPT / Fundação (Max: 2)
  const spt = (data.sondagemSPT || '').toLowerCase();
  if (spt.includes('sim') || spt.includes('pronto') || spt.includes('laudo')) {
    score += 2;
  } else if (spt.includes('orçar') || spt.includes('orcar') || spt.includes('junto')) {
    score += 1;
  } else {
    score += 1;
  }

  const maxScore = 10;

  if (score >= 7) {
    return {
      score,
      maxScore,
      level: '🔥 QUENTE',
      tag: '🔥 LEAD QUENTE - ALTA PRIORIDADE',
      recommendation: 'Responder em até 15 minutos e oferecer visita técnica presencial imediata.'
    };
  } else if (score >= 4) {
    return {
      score,
      maxScore,
      level: '🟡 MORNO',
      tag: '🟡 LEAD MORNO - EM MATURAÇÃO',
      recommendation: 'Enviar fotos de obras similares e fazer follow-up em 48-72h.'
    };
  } else {
    return {
      score,
      maxScore,
      level: '🧊 FRIO',
      tag: '🧊 LEAD FRIO - FASE INICIAL',
      recommendation: 'Cadastrar em lista de transmissão mensal de novidades.'
    };
  }
}

/**
 * Captures lead silently in background (localStorage backup + Google Sheets Webhook).
 */
export async function captureLeadSilently(data: LeadData): Promise<void> {
  const scoreResult = calculateLeadScore(data);
  const now = new Date().toISOString();

  const payload = {
    ...data,
    dataHora: now,
    pontuacao: `${scoreResult.score}/${scoreResult.maxScore}`,
    classificacao: scoreResult.level,
    recomendacao: scoreResult.recommendation
  };

  // 1. Always store locally in browser cache so no lead is lost
  try {
    const existing = JSON.parse(localStorage.getItem('rt_leads_database') || '[]');
    existing.unshift(payload);
    localStorage.setItem('rt_leads_database', JSON.stringify(existing.slice(0, 100)));
  } catch (err) {
    console.warn('Local lead storage error:', err);
  }

  // 2. Dispatch to Google Sheets Webhook
  const webhookUrl =
    (import.meta as any).env?.VITE_GOOGLE_SHEETS_WEBHOOK_URL ||
    (window as any).__RT_GOOGLE_SHEETS_URL__ ||
    'https://script.google.com/macros/s/AKfycbyYpQoX34_oatVaGDB82AqFynlZoEE0rgrulHHpQEuDjc9Z4lDW0mW_e7oXcRASpLEr/exec';

  if (webhookUrl && webhookUrl.startsWith('http')) {
    try {
      await fetch(webhookUrl, {
        method: 'POST',
        mode: 'no-cors', // Google Apps Script Web App standard
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
    } catch (err) {
      console.warn('Webhook dispatch failed, lead saved locally:', err);
    }
  }
}
