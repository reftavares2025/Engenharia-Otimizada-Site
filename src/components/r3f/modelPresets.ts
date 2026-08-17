import { Model3DConfig } from './types';

export const MODEL_3D_PRESETS: Model3DConfig[] = [
  {
    id: 'chale-aframe',
    title: 'Chalé A-Frame em Aço Estrutural',
    category: 'chale',
    categoryLabel: 'Chalés & Turismo',
    shortDesc: 'Estrutura triangular em perfis tubulares de aço de alta precisão com mezanino panorâmico.',
    fullDesc: 'Modelo arquitetônico de chalé estilo A-Frame compacto e sustentável. Pilares inclinados em perfis de aço estrutural ASTM A36 / ASTM A572 soldados e parafusados, vigamento para mezanino com piso deck e fachada inteiriça em pele de vidro com reforço contra empuxo de vento (NBR 6123 e NBR 8800).',
    dimensions: {
      widthM: 7.0,
      lengthM: 8.5,
      heightM: 6.8,
      areaM2: 59.5
    },
    structuralSystem: 'Perfis Metálicos Tubulares & Vigamento I/W',
    norms: ['NBR 8800 (Estruturas de Aço)', 'NBR 6123 (Forças de Vento)', 'NBR 6122 (Fundações)'],
    estimatedSteelKg: 2450,
    assemblyDays: '10 a 15 dias',
    cameraInitPos: [13, 9, 14],
    cameraTarget: [0, 3.2, 0],
    highlights: [
      'Montagem ultra-rápida sem desperdício de materiais',
      'Pé-direito duplo de 6.8m com mezanino panorâmico',
      'Estrutura projetada para terrenos inclinados e montanhosos',
      'Fixação com chumbadores de alta ancoragem em sapatas'
    ]
  },
  {
    id: 'chale-alpino',
    title: 'Chalé Alpino de Luxo com Mezanino & Deck',
    category: 'chale',
    categoryLabel: 'Chalés de Alto Padrão',
    shortDesc: 'Estrutura metálica de 2 pavimentos com vigas em balanço, área gourmet e varanda suspensa.',
    fullDesc: 'Chalé sofisticado de dois pavimentos com pilares em perfil I metálico, tesouras de cobertura assimétricas, balanço frontal para varanda panorâmica e laje em Steel Deck ou Painéis Termoacústicos. Ideal para hospedagens de alto ticket e moradias de campo.',
    dimensions: {
      widthM: 9.0,
      lengthM: 11.0,
      heightM: 7.6,
      areaM2: 99.0
    },
    structuralSystem: 'Perfis Estruturais W & Perfis Tubulares de Alta Resistência',
    norms: ['NBR 8800 (Aço)', 'NBR 14323 (Proteção contra Fogo)', 'NBR 6123 (Vento)'],
    estimatedSteelKg: 4200,
    assemblyDays: '15 a 22 dias',
    cameraInitPos: [16, 11, 16],
    cameraTarget: [0, 3.8, 0],
    highlights: [
      'Dois pavimentos com vão livre e mezanino espaçoso',
      'Varanda frontal em balanço metálico de alta estética',
      'Deck térreo para espaço gourmet e hidromassagem',
      'Cálculo otimizado para economia de até 25% no peso do aço'
    ]
  },
  {
    id: 'galpao-industrial',
    title: 'Galpão Logístico (Pré-Fabricado & Metálico)',
    category: 'pre-fabricado',
    categoryLabel: 'Galpões & Indústria',
    shortDesc: 'Pilares pré-fabricados de concreto usinado Fck 40 MPa com consolos e cobertura metálica treliçada.',
    fullDesc: 'Módulo de galpão comercial/industrial de grande vão livre. Conta com blocos de fundação tipo cálice, pilares de concreto pré-moldado com consolos para ponte rolante e vigas de travamento, tesouras de duas águas metálicas em perfis dobrados e terças tipo Z para telhas termoacústicas.',
    dimensions: {
      widthM: 15.0,
      lengthM: 24.0,
      heightM: 8.5,
      areaM2: 360.0
    },
    structuralSystem: 'Misto: Pilares em Concreto Pré-Fabricado + Cobertura Metálica',
    norms: ['NBR 9062 (Pré-Moldados de Concreto)', 'NBR 6118 (Concreto Armado)', 'NBR 8800 (Aço)'],
    estimatedConcreteM3: 45,
    estimatedSteelKg: 8900,
    assemblyDays: '20 a 30 dias',
    cameraInitPos: [26, 16, 28],
    cameraTarget: [0, 4.0, 0],
    highlights: [
      'Vão livre de 15m sem pilares intermediários para máxima manobra',
      'Consolos estruturais prontos para ponte rolante de até 10 toneladas',
      'Painéis alveolares verticais de fechamento rápido',
      'Durabilidade centenária com concreto de alta densidade Fck 40'
    ]
  },
  {
    id: 'edificio-comercial',
    title: 'Edifício Comercial Pré-Fabricado (3 Pavimentos)',
    category: 'comercial',
    categoryLabel: 'Edifícios Pré-Fabricados',
    shortDesc: 'Pórtico pré-fabricado em concreto protendido com lajes alveolares e vigas de transição.',
    fullDesc: 'Edifício multi-pavimento projetado com sistema 100% pré-fabricado em concreto de alta performance. Pilares contínuos com nós rígidos/articulados, vigas pré-moldadas protendidas, lajes alveolares extrudadas de grande sobrecarga e núcleo para caixa de escadas e elevador.',
    dimensions: {
      widthM: 12.0,
      lengthM: 16.0,
      heightM: 10.5,
      areaM2: 384.0
    },
    structuralSystem: 'Pilares, Vigas e Lajes Alveolares Pré-Fabricadas de Concreto',
    norms: ['NBR 9062', 'NBR 6118', 'NBR 14859 (Lajes Alveolares)'],
    estimatedConcreteM3: 88,
    estimatedSteelKg: 11200,
    assemblyDays: '30 a 45 dias',
    cameraInitPos: [22, 15, 24],
    cameraTarget: [0, 5.0, 0],
    highlights: [
      'Redução de até 60% no tempo de execução comparado ao moldado in loco',
      'Lajes alveolares protendidas suportando sobrecargas de 500 kgf/m²',
      'Excelente isolamento acústico e térmico entre pavimentos',
      'Perfeita modulação para instalação de pele de vidro'
    ]
  },
  {
    id: 'modulo-pre-moldado',
    title: 'Módulo de Ligação Estrutural (Pilar + Consolo + Viga + Laje)',
    category: 'pre-fabricado',
    categoryLabel: 'Detalhamento Técnico Construtivo',
    shortDesc: 'Corte de detalhe tridimensional em macroescala: pilar com consolo, aparelho de apoio e laje alveolar.',
    fullDesc: 'Visualização aproximada e explodida de um nó estrutural de pré-fabricado de concreto. Permite inspecionar a interface de ancoragem: cálice de fundação com grauteamento, consolo com almofada de neoprene fretado elastomérico, viga calha/viga de travamento e encaixe da laje alveolar protendida.',
    dimensions: {
      widthM: 4.5,
      lengthM: 4.5,
      heightM: 5.5,
      areaM2: 20.25
    },
    structuralSystem: 'Nó Estrutural Pré-Fabricado NBR 9062',
    norms: ['NBR 9062 (Projeto e Execução de Pré-Moldados)', 'NBR 6118', 'NBR 19718'],
    estimatedConcreteM3: 6.5,
    estimatedSteelKg: 650,
    assemblyDays: 'Inspeção de Detalhe',
    cameraInitPos: [8, 6, 8],
    cameraTarget: [0, 2.2, 0],
    highlights: [
      'Visualização da armadura de espera e chumbadores metálicos',
      'Neoprene elastomérico para acomodação de deformações e rotações',
      'Cálice de embutimento para fundação direta',
      'Explosão de montagem em 3D para entender a união das peças'
    ]
  }
];
