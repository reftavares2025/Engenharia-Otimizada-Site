import { ProjectImage } from '../types';
import { APP_IMAGES } from '../assets/images';

export const PROJECT_GALLERY: ProjectImage[] = [
  {
    id: 'proj-1',
    title: 'Chalé A-Frame Compacto em Aço Estrutural',
    category: 'chale',
    categoryLabel: 'Chalés & Turismo',
    imageUrl: APP_IMAGES.chaleAframe,
    description: 'Chalé A-Frame em aço estrutural de alta precisão, ideal para investimento em pousadas, vilas turísticas e Airbnb. Estrutura metálica negra com vidraçaria panorâmica de piso ao teto.',
    specs: ['Pequeno Padrão Compacto', 'Estrutura em Aço Otimizado', 'Fachada com Vidraçaria Panorâmica', 'Montagem Rápida no Local']
  },
  {
    id: 'proj-2',
    title: 'Chalé de Alto Padrão com Mezanino e Piscina',
    category: 'chale',
    categoryLabel: 'Chalés & Turismo',
    imageUrl: APP_IMAGES.chaleAlpino,
    description: 'Chalé de alto padrão em estrutura metálica com mezanino panorâmico iluminado, pé-direito duplo e piscina integrada no deck frontal. Projeto arquitetônico exclusivo e luxuoso.',
    specs: ['Alto Padrão & Luxo', 'Mezanino com Vidraçaria Dupla', 'Piscina Integrada no Deck', 'Estrutura Metálica Otimizada']
  },
  {
    id: 'proj-3',
    title: 'Edifício Comercial Corporativo Pré-Fabricado',
    category: 'comercial',
    categoryLabel: 'Edifícios Comerciais',
    imageUrl: APP_IMAGES.edificioComercial,
    description: 'Prédio comercial urbano construído com estrutura e painéis verticais pré-fabricados de concreto, lajes alveolares protendidas e fachada integrada com pele de vidro.',
    specs: ['Estrutura 100% Pré-Fabricada', 'Fachada Integrada com Vidro', 'Lajes Protendidas Alveolares', 'Obra Rápida sem Desperdício']
  },
  {
    id: 'proj-4',
    title: 'Estrutura Metálica Otimizada e Cobertura de Grande Vão',
    category: 'metalico',
    categoryLabel: 'Estrutura Metálica',
    imageUrl: APP_IMAGES.estruturaMetalica,
    description: 'Projeto e montagem de estrutura metálica leve com tesouras e treliças de aço de alta resistência, proporcionando grande vão livre e fechamento em platibanda metálica.',
    specs: ['Tesouras e Treliças Metálicas', 'Vão Livre Amplo Sem Pilares', 'Tratamento Anticorrosivo', 'Projeto e ART Inclusos']
  },
  {
    id: 'proj-5',
    title: 'Galpão Logístico em Concreto Pré-Fabricado',
    category: 'pre-fabricado',
    categoryLabel: 'Pré-Fabricado de Concreto',
    imageUrl: APP_IMAGES.galpaoLogistico,
    description: 'Galpão industrial e logístico executado com pilares em concreto pré-fabricado, fechamento lateral em placas alveolares termoacústicas e alto pé-direito livre para armazenamento.',
    specs: ['Pilares Pré-Fabricados de Concreto', 'Painéis Alveolares de Fechamento', 'Pé-direito Livre 10m - 14m', 'Cálculo Estrutural para Alta Carga']
  },
  {
    id: 'proj-6',
    title: 'Complexo Industrial Misto (Concreto & Estrutura Metálica)',
    category: 'pre-fabricado',
    categoryLabel: 'Pré-Fabricado & Aço',
    imageUrl: APP_IMAGES.complexoIndustrial,
    description: 'Vista de obra industrial de grande porte associando pilares pré-fabricados de concreto e cobertura metálica treliçada com piso armado para tráfego de carretas.',
    specs: ['Estrutura Mista Concreto e Aço', 'Piso Industrial de Alta Resistência', 'Docas de Carga e Descarga', 'Acompanhamento Técnico Presencial']
  },
  // Obras reais executadas — foto de canteiro/drone, não renderização.
  {
    id: 'proj-7',
    title: 'Galpão Pré-Fabricado — Obra Concluída',
    category: 'pre-fabricado',
    categoryLabel: 'Pré-Fabricado de Concreto',
    imageUrl: APP_IMAGES.obraRealGalpaoAereo,
    description: 'Galpão em concreto pré-fabricado entregue e em operação, com fechamento de fachada em painéis e faixa de ventilação superior. Vista aérea da obra concluída.',
    specs: ['Obra Real Entregue', 'Fachada em Painéis Pré-Fabricados', 'Faixa de Ventilação Superior'],
    isRealPhoto: true,
    brandCredit: 'Fabricação RBR Pré-Fabricados · Execução JVR Construtora'
  },
  {
    id: 'proj-8',
    title: 'Edifício Comercial Pré-Fabricado — Obra Concluída',
    category: 'comercial',
    categoryLabel: 'Edifícios Comerciais',
    imageUrl: APP_IMAGES.obraRealEdificioComercialAereo,
    description: 'Edifício comercial de dois pavimentos em estrutura pré-fabricada, térreo em pilotis e fachada mista, entregue em área urbana consolidada. Vista aérea da obra concluída.',
    specs: ['Obra Real Entregue', 'Térreo em Pilotis', 'Fachada Mista Concreto e Vidro'],
    isRealPhoto: true,
    brandCredit: 'Fabricação RBR Pré-Fabricados · Execução JVR Construtora'
  },
  {
    id: 'proj-9',
    title: 'Estrutura Pré-Fabricada em Fase de Montagem',
    category: 'pre-fabricado',
    categoryLabel: 'Pré-Fabricado de Concreto',
    imageUrl: APP_IMAGES.obraRealEstruturaMontagem,
    description: 'Esqueleto estrutural em concreto pré-fabricado durante a fase de montagem — pilares, vigas e laje já erguidos, evidenciando a agilidade do sistema pré-fabricado frente à alvenaria convencional.',
    specs: ['Obra em Andamento', 'Montagem Rápida de Pilares e Vigas', 'Acompanhamento Técnico Presencial'],
    isRealPhoto: true,
    brandCredit: 'Fabricação RBR Pré-Fabricados · Execução JVR Construtora'
  },
  {
    id: 'proj-10',
    title: 'Pré-Projeto Estrutural em Terreno Rural',
    category: 'pre-fabricado',
    categoryLabel: 'Pré-Fabricado de Concreto',
    imageUrl: APP_IMAGES.renderPreProjetoTerreno,
    description: 'Renderização de pré-projeto para estrutura pré-fabricada de múltiplos pavimentos em terreno rural, ainda na fase de estudo de viabilidade antes da fabricação.',
    specs: ['Pré-Projeto / Estudo de Viabilidade', 'Estrutura de Múltiplos Pavimentos', 'Fabricação RBR Pré-Fabricados']
  },
  {
    id: 'proj-11',
    title: 'Chalé Flutuante em Steel Frame',
    category: 'chale',
    categoryLabel: 'Chalés & Turismo',
    imageUrl: APP_IMAGES.chaleFlutuanteSteelFrame,
    description: 'Conceito exclusivo de chalé flutuante sobre plataforma de flutuadores, estrutura em steel frame com cobertura de vidro (céu de cristal) e mezanino integrado — ideal para lagos e represas.',
    specs: ['Plataforma Flutuante em Metalon', 'Cobertura de Vidro (Céu de Cristal)', 'Mezanino com Cama King', 'Pé-Direito de até 7,0m']
  }
];



