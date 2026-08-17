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
  }
];



