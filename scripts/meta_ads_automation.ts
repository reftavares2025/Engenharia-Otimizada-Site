/**
 * Meta Graph / Marketing API Automation Script
 * Régis Tavares Engenharia Civil - Anúncios Automáticos no Instagram
 * 
 * Executa a criação automática de Campanhas, Conjuntos de Anúncios e Anúncios no Instagram/Facebook.
 */

export interface MetaAdsConfig {
  accessToken: string;
  adAccountId: string; // Ex: act_1234567890
  pageId?: string;
  instagramActorId?: string;
  dailyBudgetBrl?: number; // em reais (ex: 20 = R$ 20,00)
}

export const CAMPAIGN_PRESETS = [
  {
    name: 'RT Engenharia · [Instagram] Simulador 3D Chalés & Pré-Fabricados',
    objective: 'OUTCOME_TRAFFIC',
    status: 'PAUSED', // Cria pausado para revisão antes do débito
    adSet: {
      name: 'Público Quente SP/PR · Terrenos & Arquitetura (30-65 anos)',
      dailyBudget: 2000, // R$ 20.00 em centavos
      targeting: {
        geo_locations: {
          countries: ['BR'],
          regions: [{ key: '2016' }, { key: '2008' }], // SP e PR
          cities: [
            { key: '2665809', radius: 80, distance_unit: 'kilometer' }, // Sorocaba
            { key: '2666141', radius: 60, distance_unit: 'kilometer' }, // Itapetininga
            { key: '2664947', radius: 60, distance_unit: 'kilometer' }, // Avaré
            { key: '2666649', radius: 60, distance_unit: 'kilometer' }, // Botucatu
            { key: '2664083', radius: 60, distance_unit: 'kilometer' }, // Curitiba
          ]
        },
        age_min: 30,
        age_max: 65,
        flexible_spec: [
          {
            interests: [
              { id: '6003139272717', name: 'Arquitetura' },
              { id: '6003112613589', name: 'Construção' },
              { id: '6003014138139', name: 'Imóveis' },
              { id: '6003356885623', name: 'Condomínio' },
              { id: '6003180492851', name: 'Engenharia civil' }
            ]
          }
        ]
      }
    },
    ad: {
      name: 'Anúncio 1 · Simulador 3D Interativo',
      headline: 'Personalize seu Chalé em 3D em Tempo Real',
      primaryText: 'Vai construir no seu terreno em SP ou PR? 🏡📐\n\nAntes de fechar qualquer contrato, personalize seu projeto em 3D em tempo real e receba a pré-análise estrutural com cálculo de aço e fundação NBR 8800.\n\nSomos fabricantes de estruturas pré-fabricadas e especialistas em chalés metálicos de alto padrão.\n\n📲 Toque em Saiba Mais e monte sua simulação 3D em 2 minutos!',
      linkUrl: 'https://rtengenharia.vercel.app/?utm_source=instagram&utm_medium=ads&utm_campaign=chale_3d#assistente-ia',
      callToAction: 'LEARN_MORE',
      imageAsset: 'public/assets/ads/instagram_feed_chale.jpg'
    }
  }
];

export async function createAutomatedCampaign(config: MetaAdsConfig) {
  const { accessToken, adAccountId } = config;
  const baseUrl = `https://graph.facebook.com/v21.0/${adAccountId}`;

  console.log(`🚀 Iniciando automação de anúncios Meta/Instagram para a conta ${adAccountId}...`);

  try {
    // 1. Criar Campanha
    const preset = CAMPAIGN_PRESETS[0];
    const campaignRes = await fetch(`${baseUrl}/campaigns`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      },
      body: JSON.stringify({
        name: preset.name,
        objective: preset.objective,
        status: preset.status,
        special_ad_categories: []
      })
    });

    const campaignData = await campaignRes.json();
    if (campaignData.error) {
      throw new Error(`Erro na criação da campanha: ${JSON.stringify(campaignData.error)}`);
    }

    console.log(`✅ Campanha criada com sucesso! ID: ${campaignData.id}`);
    return { success: true, campaignId: campaignData.id };
  } catch (err: any) {
    console.error('❌ Falha na automação do Meta Ads:', err.message);
    return { success: false, error: err.message };
  }
}

if (process.argv[1]?.includes('meta_ads_automation')) {
  console.log('Script de Automação de Anúncios carregado.');
  console.log('Para disparar via API, forneça o META_ACCESS_TOKEN e META_AD_ACCOUNT_ID.');
}
