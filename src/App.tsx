import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { TechnicalCredibility } from './components/TechnicalCredibility';
import { ServicesSection } from './components/ServicesSection';
import { ChaletSpecialty } from './components/ChaletSpecialty';
import { ProjectFlowSection } from './components/ProjectFlowSection';
import { BotQualification } from './components/BotQualification';
import { ProjectCalculator } from './components/ProjectCalculator';
import { GallerySection } from './components/GallerySection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { CoverageSection } from './components/CoverageSection';
import { PartnersSection } from './components/PartnersSection';
import { FAQSection } from './components/FAQSection';
import { ContactCTA } from './components/ContactCTA';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { AIChatWidget } from './components/AIChatWidget';
import { SocialProofToast } from './components/SocialProofToast';
import { Footer } from './components/Footer';
import { ConsultationModal } from './components/ConsultationModal';
import { PageHeaderBanner } from './components/PageHeaderBanner';
import { PageNavigationHub } from './components/PageNavigationHub';

export type PageId =
  | 'inicio'
  | 'pre-fabricados'
  | 'chales'
  | 'fluxo-de-projeto'
  | 'projetos'
  | 'assistente-ia'
  | 'calculadora'
  | 'parceiros'
  | 'faq'
  | 'contato';

const VALID_PAGES: PageId[] = [
  'inicio',
  'pre-fabricados',
  'chales',
  'fluxo-de-projeto',
  'projetos',
  'assistente-ia',
  'calculadora',
  'parceiros',
  'faq',
  'contato'
];

// One <title> + meta description per page, so each real URL below is
// distinguishable to Google instead of every route sharing the homepage's tags.
const PAGE_META: Record<PageId, { title: string; description: string }> = {
  'inicio': {
    title: 'Régis Tavares | Engenharia Otimizada, Pré-Fabricados e Chalés de Luxo em Angatuba-SP',
    description: 'Régis Tavares Engenharia Civil - Fabricação própria de pré-fabricados, chalés em aço, projetos arquitetônicos personalizados e estruturais com atendimento em SP e PR. Cobrimos qualquer orçamento coerente!'
  },
  'pre-fabricados': {
    title: 'Pré-Fabricados de Concreto & Galpões Logísticos | Régis Tavares Engenharia',
    description: 'Estruturas e painéis alveolares verticais em concreto usinado Fck 35-50 MPa. Agilidade, alta resistência e redução do custo por m².'
  },
  'chales': {
    title: 'Chalés em Estrutura Metálica & Steel Frame | Régis Tavares Engenharia',
    description: 'Projeto e montagem de chalés A-Frame e Alpinos para terrenos rurais, inclinações e turismo. Liberdade total para comprar o aço onde desejar.'
  },
  'fluxo-de-projeto': {
    title: 'Fluxo da Obra & Viabilidade Técnica | Régis Tavares Engenharia',
    description: 'Conheça o processo de engenharia passo a passo: da visita técnica presencial até a entrega final no canteiro.'
  },
  'projetos': {
    title: 'Portfólio de Obras & Modelos 3D | Régis Tavares Engenharia',
    description: 'Projetos executados e renderizações de galpões logísticos, edifícios comerciais, chalés metálicos e estruturas de grande vão.'
  },
  'assistente-ia': {
    title: 'Assistente Técnica Engª. Olívia & Simulador 3D | Régis Tavares Engenharia',
    description: 'Responda às perguntas para gerar em tempo real o modelo tridimensional interativo da sua obra com estimativa de aço NBR 8800.'
  },
  'calculadora': {
    title: 'Simulador de Custos & Prazos | Régis Tavares Engenharia',
    description: 'Monte a estimativa otimizada da sua obra selecionando área, tipo de construção e cidade para envio direto ao Eng. Régis Tavares.'
  },
  'parceiros': {
    title: 'Parceiros, Usinas & Fornecedores de Elite | Régis Tavares Engenharia',
    description: 'Insumos de aço, concreto usinado e sistemas de ancoragem com rastreabilidade, laudos de fábrica e certificação ABNT.'
  },
  'faq': {
    title: 'Perguntas Frequentes & Dúvidas Técnicas (FAQ) | Régis Tavares Engenharia',
    description: 'Respostas detalhadas sobre regulamentação municipal, ART, sondagem de solo, prazos de pré-fabricados e orçamento.'
  },
  'contato': {
    title: 'Contato Direto com a Engenharia & Localização | Régis Tavares Engenharia',
    description: 'Fale diretamente com o Eng. Régis Tavares. Fábrica em Angatuba-SP com atendimento em São Paulo, Paraná e projetos para todo o Brasil.'
  }
};

function pathFromPage(pageId: PageId): string {
  return pageId === 'inicio' ? '/' : `/${pageId}`;
}

function pageFromPath(pathname: string): PageId {
  const clean = pathname.replace(/^\/+|\/+$/g, '');
  return clean && (VALID_PAGES as string[]).includes(clean) ? (clean as PageId) : 'inicio';
}

export default function App() {
  const [activePage, setActivePage] = useState<PageId>(() =>
    typeof window !== 'undefined' ? pageFromPath(window.location.pathname) : 'inicio'
  );
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);

  // Sync state with the real URL path (not a #hash) so each page is a
  // distinct, crawlable/indexable URL — back/forward still works via popstate.
  useEffect(() => {
    const handlePopState = () => {
      setActivePage(pageFromPath(window.location.pathname));
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Keep <title> and the meta description in sync with the active page, so
  // Google sees distinct, relevant tags per URL instead of one shared set.
  useEffect(() => {
    const meta = PAGE_META[activePage];
    document.title = meta.title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', meta.description);
    document
      .querySelector('link[rel="canonical"]')
      ?.setAttribute('href', `https://rtengenharia.vercel.app${pathFromPage(activePage)}`);
  }, [activePage]);

  const handleSelectPage = (pageId: string) => {
    const target = (VALID_PAGES as string[]).includes(pageId) ? (pageId as PageId) : 'inicio';
    setActivePage(target);
    window.history.pushState({}, '', pathFromPage(target));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenConsultation = () => {
    setIsConsultationOpen(true);
  };

  const handleCloseConsultation = () => {
    setIsConsultationOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans flex flex-col selection:bg-red-500 selection:text-white">
      {/* Navigation Header */}
      <Header
        activePage={activePage}
        onSelectPage={handleSelectPage}
        onOpenConsultation={handleOpenConsultation}
      />

      {/* Main Content Areas Rendered Per Selected Page */}
      <main className="flex-grow">
        
        {/* ================= PAGE: INÍCIO ================= */}
        {activePage === 'inicio' && (
          <div className="space-y-0 animate-in fade-in duration-300">
            {/* 1. Hero Section */}
            <Hero onSelectPage={handleSelectPage} />

            {/* Technical Authority & Credibility Bar */}
            <TechnicalCredibility onOpenConsultation={handleOpenConsultation} />

            {/* Page Hub - Quick Access Cards to all sub-pages */}
            <PageNavigationHub onSelectPage={handleSelectPage} activePage={activePage} />

            {/* 2. Key Engineering Services */}
            <ServicesSection />

            {/* 3. Chalets Specialty Overview */}
            <ChaletSpecialty />

            {/* 4. Client Testimonials */}
            <TestimonialsSection />

            {/* 5. Contact CTA */}
            <ContactCTA />
          </div>
        )}

        {/* ================= PAGE: PRÉ-FABRICADOS ================= */}
        {activePage === 'pre-fabricados' && (
          <div className="space-y-0 animate-in fade-in duration-300">
            <PageHeaderBanner
              title="Sistemas Pré-Fabricados & Galpões Logísticos"
              subtitle="Estruturas e painéis alveolares verticais em concreto usinado Fck 35-50 MPa. Agilidade, alta resistência e redução do custo por m²."
              categoryTag="Pré-Fabricados de Concreto"
              onSelectPage={handleSelectPage}
            />

            {/* Partners & Quality Materials */}
            <PartnersSection />

            {/* Coverage Area Map */}
            <CoverageSection />

            {/* Navigation Hub */}
            <PageNavigationHub onSelectPage={handleSelectPage} activePage={activePage} />

            {/* Contact CTA */}
            <ContactCTA />
          </div>
        )}

        {/* ================= PAGE: CHALÉS DE LUXO ================= */}
        {activePage === 'chales' && (
          <div className="space-y-0 animate-in fade-in duration-300">
            <PageHeaderBanner
              title="Chalés em Estrutura Metálica & Steel Frame"
              subtitle="Projeto e montagem para terrenos rurais, inclinações e turismo. Liberdade total para comprar o aço onde desejar."
              categoryTag="Especialidade Chalés A-Frame & Alpinos"
              onSelectPage={handleSelectPage}
            />

            {/* Specialized Chalet Section */}
            <ChaletSpecialty />

            {/* Renders Portfolio Gallery */}
            <GallerySection />

            {/* Navigation Hub */}
            <PageNavigationHub onSelectPage={handleSelectPage} activePage={activePage} />

            {/* Contact CTA */}
            <ContactCTA />
          </div>
        )}

        {/* ================= PAGE: FLUXO DA OBRA ================= */}
        {activePage === 'fluxo-de-projeto' && (
          <div className="space-y-0 animate-in fade-in duration-300">
            <PageHeaderBanner
              title="Fluxo da Obra & Viabilidade Técnica"
              subtitle="Conheça o processo de engenharia passo a passo: da visita técnica presencial até a entrega final no canteiro."
              categoryTag="Ciclo de Vida do Projeto"
              onSelectPage={handleSelectPage}
            />

            {/* Interactive 4-step Engineering Lifecycle */}
            <ProjectFlowSection onOpenConsultation={handleOpenConsultation} />

            {/* Coverage Section */}
            <CoverageSection />

            {/* Navigation Hub */}
            <PageNavigationHub onSelectPage={handleSelectPage} activePage={activePage} />

            {/* Contact CTA */}
            <ContactCTA />
          </div>
        )}

        {/* ================= PAGE: PORTFÓLIO DE PROJETOS ================= */}
        {activePage === 'projetos' && (
          <div className="space-y-0 animate-in fade-in duration-300">
            <PageHeaderBanner
              title="Portfólio de Obras & Modelos 3D"
              subtitle="Projetos executados e renderizações de galpões logísticos, edifícios comerciais, chalés metálicos e estruturas de grande vão."
              categoryTag="Galeria de Obras"
              onSelectPage={handleSelectPage}
            />

            {/* Portfolio Renders & Works Gallery */}
            <GallerySection />

            {/* Testimonials */}
            <TestimonialsSection />

            {/* Navigation Hub */}
            <PageNavigationHub onSelectPage={handleSelectPage} activePage={activePage} />

            {/* Contact CTA */}
            <ContactCTA />
          </div>
        )}

        {/* ================= PAGE: ASSISTENTE IA & MODELO 3D ================= */}
        {activePage === 'assistente-ia' && (
          <div className="space-y-0 animate-in fade-in duration-300">
            <PageHeaderBanner
              title="Assistente Técnica Engª. Olívia & Simulador 3D"
              subtitle="Responda às perguntas para gerar em tempo real o modelo tridimensional interativo da sua obra com estimativa de aço NBR 8800."
              categoryTag="Modelagem 3D & Simulação Técnica"
              onSelectPage={handleSelectPage}
            />

            {/* AI Bot Qualification & Real-Time 3D Renderer */}
            <BotQualification />

            {/* Navigation Hub */}
            <PageNavigationHub onSelectPage={handleSelectPage} activePage={activePage} />

            {/* Contact CTA */}
            <ContactCTA />
          </div>
        )}

        {/* ================= PAGE: CALCULADORA ================= */}
        {activePage === 'calculadora' && (
          <div className="space-y-0 animate-in fade-in duration-300">
            <PageHeaderBanner
              title="Simulador de Projetos & Estimativa de Custos"
              subtitle="Monte a estimativa otimizada da sua obra selecionando área, tipo de construção e cidade para envio direto ao Eng. Régis Tavares."
              categoryTag="Calculadora de Engenharia"
              onSelectPage={handleSelectPage}
            />

            {/* Calculator Component */}
            <ProjectCalculator />

            {/* Navigation Hub */}
            <PageNavigationHub onSelectPage={handleSelectPage} activePage={activePage} />

            {/* Contact CTA */}
            <ContactCTA />
          </div>
        )}

        {/* ================= PAGE: FORNECEDORES & QUALIDADE ================= */}
        {activePage === 'parceiros' && (
          <div className="space-y-0 animate-in fade-in duration-300">
            <PageHeaderBanner
              title="Parceiros, Usinas & Fornecedores de Elite"
              subtitle="Insumos de aço, concreto usinado e sistemas de ancoragem com rastreabilidade, laudos de fábrica e certificação ABNT."
              categoryTag="Controle Tecnológico & Matérias-Primas"
              onSelectPage={handleSelectPage}
            />

            {/* Partners & Suppliers */}
            <PartnersSection />

            {/* Navigation Hub */}
            <PageNavigationHub onSelectPage={handleSelectPage} activePage={activePage} />

            {/* Contact CTA */}
            <ContactCTA />
          </div>
        )}

        {/* ================= PAGE: FAQ ================= */}
        {activePage === 'faq' && (
          <div className="space-y-0 animate-in fade-in duration-300">
            <PageHeaderBanner
              title="Perguntas Frequentes & Dúvidas Técnicas (FAQ)"
              subtitle="Respostas detalhadas sobre regulamentação municipal, ART, sondagem de solo, prazos de pré-fabricados e orçamento."
              categoryTag="Transparência & Engenharia"
              onSelectPage={handleSelectPage}
            />

            {/* FAQ Accordion List with Real-time Search */}
            <FAQSection />

            {/* Navigation Hub */}
            <PageNavigationHub onSelectPage={handleSelectPage} activePage={activePage} />

            {/* Contact CTA */}
            <ContactCTA />
          </div>
        )}

        {/* ================= PAGE: CONTATO ================= */}
        {activePage === 'contato' && (
          <div className="space-y-0 animate-in fade-in duration-300">
            <PageHeaderBanner
              title="Contato Direto com a Engenharia & Localização"
              subtitle="Fale diretamente com o Eng. Régis Tavares. Fábrica em Angatuba-SP com atendimento em São Paulo, Paraná e projetos para todo o Brasil."
              categoryTag="Atendimento & Sede Fabril"
              onSelectPage={handleSelectPage}
            />

            {/* Contact Form & WhatsApp */}
            <ContactCTA />

            {/* Coverage Area Map */}
            <CoverageSection />

            {/* Navigation Hub */}
            <PageNavigationHub onSelectPage={handleSelectPage} activePage={activePage} />
          </div>
        )}

      </main>

      {/* Floating WhatsApp Action Button */}
      <FloatingWhatsApp />

      {/* Floating AI Chat — the one assistant on the site backed by real Gemini AI */}
      <AIChatWidget />

      {/* Discrete Social Proof Notification Toast */}
      <SocialProofToast />

      {/* Technical Consultation Modal */}
      <ConsultationModal
        isOpen={isConsultationOpen}
        onClose={handleCloseConsultation}
      />

      {/* Civil Engineering Footer */}
      <Footer onSelectPage={handleSelectPage} />
    </div>
  );
}
