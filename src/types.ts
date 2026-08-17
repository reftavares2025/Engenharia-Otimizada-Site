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
