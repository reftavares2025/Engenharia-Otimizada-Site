export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'geral' | 'pre-fabricado' | 'chales' | 'projetos' | 'atendimento' | 'custos-prazos';
  keywords?: string[];
}

export interface ProjectImage {
  id: string;
  title: string;
  category: 'galpao' | 'chale' | 'comercial' | 'metalico' | 'pre-fabricado';
  categoryLabel: string;
  imageUrl: string;
  localUrl?: string;
  description: string;
  location?: string;
  specs: string[];
  /** True for an actual jobsite photo (drone/ground), as opposed to a 3D render. */
  isRealPhoto?: boolean;
  /** Who executed the physical work, when different from the rendering studio — shown as credit. */
  brandCredit?: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
  suggestedAction?: 'whatsapp' | 'calculator' | 'faq';
  whatsappUrl?: string;
}

export interface EstimateFormData {
  projectType: string;
  areaM2: number;
  city: string;
  hasArchitecturalProject: boolean;
  needsStructuralCalculation: boolean;
  needsOnsiteSupervision: boolean;
}
