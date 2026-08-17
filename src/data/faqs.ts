import { FAQItem } from '../types';

export const FAQ_DATA: FAQItem[] = [
  // --- ATENDIMENTO & LOCALIZAÇÃO (SP, PR E BRASIL) ---
  {
    id: 'faq-atendimento-obras',
    question: 'Qual é a região de atendimento para montagem, fabricação e execução presencial de obras?',
    answer: 'Nossa fábrica e centro logístico estão estrategicamente localizados em Angatuba-SP. Atendemos presencialmente com fabricação própria, transporte, montagem e acompanhamento técnico de obras em municípios dos estados de São Paulo e Paraná (como Sorocaba, Itapetininga, Botucatu, Avaré, Capão Bonito, Campinas, Piracicaba, Tatuí, Jundiaí, Sengés, Jaguariaíva, Castro e Região). Entre em contato diretamente via WhatsApp para alinharmos a logística da sua região!',
    category: 'atendimento',
    keywords: ['atendimento obras SP PR', 'Angatuba', 'Sorocaba', 'Itapetininga', 'Botucatu', 'Avaré', 'Campinas', 'Sengés', 'Paraná', 'obras pré-fabricadas']
  },
  {
    id: 'faq-cidades-atendidas',
    question: 'Quais cidades do interior de São Paulo e Paraná estão na área de montagem de pré-fabricados e chalés?',
    answer: 'Atendemos com equipe própria de montagem em Angatuba, Itapetininga, Sorocaba, Botucatu, Avaré, Capão Bonito, Itapeva, Tatuí, Boituva, Cerquilho, Tietê, Piracicaba, Campinas, Indaiatuba, Jundiaí, Região Metropolitana de SP, Sengés-PR, Jaguariaíva-PR, Castro-PR e demais municípios paulistas e paranaenses. Fale conosco pelo WhatsApp para tirar dúvidas sobre sua cidade e receber atendimento personalizado.',
    category: 'atendimento',
    keywords: ['cidades atendidas pré-fabricado', 'Avaré', 'Itapetininga', 'Botucatu', 'Sorocaba', 'Itapeva', 'Sengés', 'Paraná']
  },
  {
    id: 'faq-projetos-todo-brasil',
    question: 'Vocês atendem desenvolvimento de projetos arquitetônicos e estruturais em todo o Brasil?',
    answer: 'Sim! Para elaboração de Projeto Arquitetônico Personalizado, Projeto Estrutural em Aço ou Concreto, Detalhamento Executivo de Fundações e Emissão de ART (Anotação de Responsabilidade Técnica) do CREA, atendemos clientes de TODO O BRASIL de forma 100% digital, com reunião por videoconferência e envio dos arquivos executivos prontos para construção.',
    category: 'atendimento',
    keywords: ['projetos todo o brasil', 'projeto arquitetônico online', 'cálculo estrutural EAD', 'ART CREA nacional']
  },

  // --- CHALÉS EM AÇO & SONDAGEM SPT ---
  {
    id: 'faq-chale-regra',
    question: 'Como funciona a compra do aço e a montagem para construção de Chalés A-Frame e Alpinos?',
    answer: 'Quando o assunto é Chalé, nossa solução construtiva é ESTRITAMENTE em Estrutura Metálica Otimizada! O cliente possui total liberdade para COMPRAR O AÇO ONDE QUISER (distribuidores locais, siderúrgicas ou através das nossas indicações diretas com desconto). Nossa equipe de engenharia desenvolve o projeto estrutural completo, realiza os cortes e furações computadorizadas das peças e envia nossa equipe técnica especializada para efetuar a montagem ágil no terreno.',
    category: 'chales',
    keywords: ['chalé estrutura metálica', 'comprar aço onde quiser', 'corte computadorizado aço', 'montagem chalé A-frame', 'chalé airbnb']
  },
  {
    id: 'faq-chale-vantagens-terreno',
    question: 'Por que o chalé em estrutura metálica é a melhor opção para terrenos inclinados ou áreas rurais?',
    answer: 'Chalés em estrutura metálica de aço possuem peso próprio consideravelmente menor que construções convencionais de alvenaria. Isso reduz a carga sobre o solo, exigindo fundações mais leves e baratas (como sapatas isoladas ou pilotis), além de viabilizar o transporte em terrenos de difícil acesso sem a necessidade de canteiro de obras pesado ou consumo excessivo de água e madeira.',
    category: 'chales',
    keywords: ['chalé terreno inclinado', 'pilotis chalé', 'fundação leve chalé', 'chalé área rural', 'montagem rápida chalé']
  },
  {
    id: 'faq-fundacao-sondagem',
    question: 'De quem é a responsabilidade da Fundação da obra e o que é o Laudo de Sondagem (SPT)?',
    answer: 'A execução física da fundação fica sob responsabilidade do cliente. A Régis Tavares Engenharia Civil desenvolve o projeto executivo de fundações otimizado, porém necessitamos obrigatoriamente do LAUDO DE SONDAGEM DE SOLO (SPT) do lote. O teste SPT identifica a capacidade de carga e resistência de cada camada do terreno (NBR 6122), permitindo calcular a quantidade exata de aço, profundidade de estacas e volume de concreto sem desperdícios ou riscos de recalque.',
    category: 'chales',
    keywords: ['fundação chalé galpão', 'laudo de sondagem SPT', 'NBR 6122', 'capacidade de carga solo', 'estacas e sapatas']
  },

  // --- PRÉ-FABRICADOS & ESTRUTURAS METÁLICAS ---
  {
    id: 'faq-fabricante-direto',
    question: 'Vocês são fabricantes diretos ou intermediários de pré-fabricados de concreto?',
    answer: 'Somos FABRICANTES DIRETOS com parque industrial próprio em Angatuba-SP! Não somos revendedores nem corretores de obras. Fabricamos nossos próprios pilares, vigas, terças e painéis em fôrmas metálicas industriais com concreto de alta resistência (fck elevado) e controle tecnológico de cura laboratorial, garantindo preço direto da fábrica e controle total de qualidade.',
    category: 'pre-fabricado',
    keywords: ['fabricante pré-fabricado', 'fábrica própria Angatuba', 'sem intermediários', 'concreto alta resistência', 'fck']
  },
  {
    id: 'faq-pre-fabricado-vs-alvenaria',
    question: 'Qual a economia e velocidade do pré-fabricado de concreto comparado à alvenaria tradicional?',
    answer: 'A construção pré-fabricada reduz o tempo de execução da estrutura em até 60% em relação à alvenaria convencional moldada in loco. Além disso, elimina até 85% do desperdício de materiais na obra (madeiras de fôrma, pregos, entulhos) e reduz o custo total final em até 30%, pois a estrutura chega pronta para ser içada e montada rapidamente com guindaste.',
    category: 'pre-fabricado',
    keywords: ['economia pré-fabricado 30%', 'velocidade de obra 60%', 'sem desperdício entulho', 'içamento guindaste galpão']
  },
  {
    id: 'faq-normas-tecnicas',
    question: 'Quais normas técnicas da ABNT são aplicadas no cálculo das estruturas pré-fabricadas e metálicas?',
    answer: 'Todos os projetos da Régis Tavares Engenharia Civil seguem rigorosamente as normas ABNT: NBR 9062 (Projeto e execução de estruturas de concreto pré-moldado), NBR 8800 (Projeto de estruturas de aço e mistas de aço e concreto), NBR 6118 (Projeto de estruturas de concreto), NBR 6122 (Projeto e execução de fundações) e NBR 6123 (Forças devidas ao vento em edificações).',
    category: 'pre-fabricado',
    keywords: ['NBR 9062 pré-moldado', 'NBR 8800 estrutura metálica', 'NBR 6122 fundações', 'NBR 6123 carga de vento', 'normas ABNT CREA']
  },
  {
    id: 'faq-predio-comercial-pre-fabricado',
    question: 'É possível construir edifícios comerciais e prédios corporativos em pré-fabricado?',
    answer: 'Perfeitamente! Fabricamos e montamos estruturas para edifícios comerciais multiníveis (2 a 5 pavimentos ou mais) utilizando pilares pré-fabricados de concreto com consolos, vigas protendidas e lajes alveolares protendidas. Essa tecnologia permite vãos livres amplos para escritórios, shoppings e lojas, aceitando fechamento em pele de vidro ou painéis arquitetônicos.',
    category: 'pre-fabricado',
    keywords: ['prédio comercial pré-fabricado', 'edifício corporativo pré-moldado', 'lajes alveolares protendidas', 'vão livre escritórios']
  },
  {
    id: 'faq-estrutura-mista',
    question: 'Como funciona a combinação de pilares pré-fabricados de concreto com cobertura em estrutura metálica?',
    answer: 'Esta é a solução ideal e mais econômica para galpões industriais e logísticos de grande porte. Os pilares pré-fabricados de concreto oferecem altíssima resistência ao fogo, estabilidade estrutural e excelente custo por metro linear. Já a cobertura com tesouras e treliças metálicas vence vãos livres de 15m a 40m com peso reduzido sobre as fundações.',
    category: 'pre-fabricado',
    keywords: ['galpão misto concreto e aço', 'pilares concreto tesoura metálica', 'galpão logístico grande vão', 'resistência ao fogo']
  },

  // --- PROJETOS ARQUITETÔNICOS & ART ---
  {
    id: 'faq-projeto-arquitetonico',
    question: 'Vocês desenvolvem o Projeto Arquitetônico personalizado do zero para o meu lote?',
    answer: 'Sim! Nosso setor de arquitetura e engenharia cria o projeto arquitetônico personalizado considerando a topografia do seu terreno, melhor aproveitamento de iluminação solar, ventilação natural, legislação municipal de zoneamento e código de obras local, entregando plantas humanizadas, cortes e modelagem 3D.',
    category: 'projetos',
    keywords: ['projeto arquitetônico personalizado', 'desenho arquitetônico', 'planta de casa pré-fabricada', 'projeto 3D lote']
  },
  {
    id: 'faq-art-crea-inclusa',
    question: 'O projeto estrutural e a Anotação de Responsabilidade Técnica (ART/CREA) já estão inclusos?',
    answer: 'Com certeza! Todas as nossas estruturas e projetos acompanham o Caderno de Memória de Cálculo Estrutural e a ART (Anotação de Responsabilidade Técnica) devidamente registrada no CREA (Conselho Regional de Engenharia e Agronomia) com engenheiro civil responsável habilitado.',
    category: 'projetos',
    keywords: ['ART CREA inclusa', 'projeto estrutural assinado', 'engenheiro civil responsável', 'memória de cálculo']
  },
  {
    id: 'faq-aprovacao-prefeitura',
    question: 'Os projetos fornecidos pela empresa podem ser aprovados na Prefeitura Municipal e no Corpo de Bombeiros?',
    answer: 'Sim! Entregamos toda a documentação técnica exigida pelas prefeituras municipais (plantas baixas, cortes, elevações, memorial descritivo e ART do autor do projeto) e pelo Corpo de Bombeiros (projetos de combate a incêndio / AVCB), prontos para dar entrada nos órgãos competentes.',
    category: 'projetos',
    keywords: ['aprovação prefeitura', 'habite-se galpão', 'AVCB corpo de bombeiros', 'memorial descritivo obra']
  },

  // --- CUSTOS, ORÇAMENTOS & CONDIÇÕES ---
  {
    id: 'faq-cobrir-orcamento',
    question: 'Como funciona o compromisso de cobrir qualquer orçamento de concorrente?',
    answer: 'Garantimos os melhores valores do mercado por sermos fabricantes diretos! Caso você possua um orçamento prévio de pré-fabricado ou estrutura metálica fornecido por outra empresa, basta nos apresentar a proposta detalhada. Nossa equipe de engenharia avaliará a equivalência técnica e apresentaremos uma proposta com valor coberto e melhores condições!',
    category: 'custos-prazos',
    keywords: ['cobrimos orçamento concorrente', 'menor preço pré-fabricado', 'garantia de preço fábrica', 'cotação equivalente']
  },
  {
    id: 'faq-dados-para-cotacao',
    question: 'Quais dados eu preciso informar para receber uma cotação e estimativa de valor por m²?',
    answer: 'Para gerar sua cotação precisa, precisamos de: 1) Cidade e local exato da obra (para cálculo de frete e montagem); 2) Dimensões ou área estimada em m² (ex: 200m²); 3) Finalidade (galpão, chalé em aço, prédio comercial); 4) Pé-direito desejado; e 5) Se já possui projeto arquitetônico ou laudo de sondagem SPT.',
    category: 'custos-prazos',
    keywords: ['orçamento m2 galpão', 'cotação rápida chalé', 'preço metro quadrado pré-fabricado', 'estimativa de custo obra']
  },
  {
    id: 'faq-financiamento-bancario',
    question: 'Estruturas pré-fabricadas e chalés em aço aceitam financiamento bancário (Caixa, BNDES)?',
    answer: 'Sim! Como fornecemos projetos completos com registro no CREA e ART emitida, nossos projetos e estruturas enquadram-se perfeitamente nas exigências de financiamento para construção da Caixa Econômica Federal (Sistema FGHab / SBPE / Pro-Cotista) e linhas de crédito industrial/comercial via BNDES e bancos privados.',
    category: 'custos-prazos',
    keywords: ['financiamento caixa pré-fabricado', 'crédito BNDES galpão', 'financiamento chalé', 'aprovação bancária obra']
  }
];
