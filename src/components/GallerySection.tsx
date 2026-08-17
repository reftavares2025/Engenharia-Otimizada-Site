import React, { useState } from 'react';
import { PROJECT_GALLERY } from '../data/projects';
import { ProjectImage } from '../types';
import { LazyImage } from './LazyImage';
import {
  Check,
  X,
  MessageSquare,
  Layers,
  Maximize2,
  Grid,
  Home,
  Warehouse,
  Building2,
  Wrench,
  Filter,
  Box,
  RotateCw,
  Sparkles
} from 'lucide-react';
import { buildWhatsAppLink } from '../utils/whatsapp';
import { Portfolio3DShowcase } from './r3f/Portfolio3DShowcase';
import { Interactive3DViewerModal } from './r3f/Interactive3DViewerModal';
import { Model3DType } from './r3f/types';
import { Model3DCanvas } from './r3f/Model3DCanvas';

export const GallerySection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('todos');
  const [selectedProject, setSelectedProject] = useState<ProjectImage | null>(null);
  const [modalMode, setModalMode] = useState<'2d' | '3d'>('2d');

  // Dedicated 3D Fullscreen Modal State
  const [is3DModalOpen, setIs3DModalOpen] = useState(false);
  const [selected3DModel, setSelected3DModel] = useState<Model3DType>('chale-aframe');

  const categories = [
    {
      id: 'todos',
      label: 'Todos os Projetos',
      icon: Grid,
      count: PROJECT_GALLERY.length
    },
    {
      id: 'pre-fabricado',
      label: 'Pré-Fabricados',
      icon: Warehouse,
      count: PROJECT_GALLERY.filter((p) => p.category === 'pre-fabricado').length
    },
    {
      id: 'chale',
      label: 'Chalés em Aço',
      icon: Home,
      count: PROJECT_GALLERY.filter((p) => p.category === 'chale').length
    },
    {
      id: 'metalico',
      label: 'Estruturas Metálicas',
      icon: Wrench,
      count: PROJECT_GALLERY.filter((p) => p.category === 'metalico').length
    },
    {
      id: 'comercial',
      label: 'Edifícios Comerciais',
      icon: Building2,
      count: PROJECT_GALLERY.filter((p) => p.category === 'comercial').length
    }
  ];

  const filteredProjects =
    activeTab === 'todos'
      ? PROJECT_GALLERY
      : PROJECT_GALLERY.filter((p) => p.category === activeTab);

  const mapProjectTo3DModel = (project: ProjectImage): Model3DType => {
    const title = project.title.toLowerCase();
    const cat = project.category.toLowerCase();
    if (title.includes('a-frame') || (cat === 'chale' && title.includes('compacto'))) {
      return 'chale-aframe';
    }
    if (cat === 'chale' || title.includes('alpino') || title.includes('pousada')) {
      return 'chale-alpino';
    }
    if (title.includes('edifício') || title.includes('comercial') || cat === 'comercial') {
      return 'edificio-comercial';
    }
    if (title.includes('galpão') || title.includes('logístico') || cat === 'pre-fabricado') {
      return 'galpao-industrial';
    }
    return 'modulo-pre-moldado';
  };

  const handleOpen3DDirect = (modelId: Model3DType) => {
    setSelected3DModel(modelId);
    setIs3DModalOpen(true);
  };

  const getWhatsAppForProject = (project: ProjectImage) => {
    return buildWhatsAppLink(
      `Interesse na Obra / Portfólio: ${project.title}`,
      `Gostaria de solicitar um orçamento para um projeto similar a este: "${project.title}".\n• Categoria: ${project.categoryLabel}\n• Especificações: ${project.specs.join(', ')}`
    );
  };

  return (
    <section id="projetos" className="py-16 sm:py-24 bg-stone-900 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/15 px-3.5 py-1 rounded-full text-[10px] font-mono font-extrabold text-slate-200 uppercase tracking-widest">
            <Layers className="w-3.5 h-3.5 text-amber-400" />
            <span>Portfólio de Obras, Renders & Modelos 3D</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light font-display tracking-tight text-slate-100">
            Engenharia de Alta Performance <span className="font-bold text-amber-400 italic">em Ação</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-300 font-normal">
            Inspecione nossos modelos tridimensionais interativos em Three.js / Fiber e confira as fotos e renders detalhados de galpões, edifícios e chalés.
          </p>
        </div>

        {/* 1. EMBEDDED INTERACTIVE 3D MODEL SHOWCASE (REACT THREE FIBER) */}
        <Portfolio3DShowcase onOpenModelModal={handleOpen3DDirect} />

        {/* 2. CATEGORY FILTER & 2D/3D RENDERS GALLERY */}
        <div className="space-y-8 pt-4">
          <div className="text-center space-y-2">
            <div className="flex items-center justify-center gap-2 text-xs text-slate-400 font-mono">
              <Filter className="w-3.5 h-3.5 text-amber-400" />
              <span>Galeria de Renders Arquitetônicos & Obras Executadas:</span>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2.5 pt-2">
              {categories.map((cat) => {
                const Icon = cat.icon;
                const isActive = activeTab === cat.id;

                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveTab(cat.id)}
                    className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
                      isActive
                        ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20 scale-105 border border-amber-400'
                        : 'bg-white/10 backdrop-blur-md text-slate-300 hover:bg-white/20 hover:text-white border border-white/15'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? 'text-slate-950' : 'text-amber-400'}`} />
                    <span>{cat.label}</span>
                    <span
                      className={`ml-1 text-[10px] font-mono font-extrabold px-2 py-0.5 rounded-full ${
                        isActive
                          ? 'bg-slate-950/20 text-slate-950'
                          : 'bg-white/10 text-slate-300'
                      }`}
                    >
                      {cat.count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Projects Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => {
              const model3DId = mapProjectTo3DModel(project);

              return (
                <div
                  key={project.id}
                  className="bg-white/10 backdrop-blur-xl border border-white/15 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:border-white/30 transition-all duration-300 group flex flex-col justify-between"
                >
                  <div>
                    <LazyImage
                      src={project.imageUrl}
                      alt={project.title}
                      loading="lazy"
                      containerClassName="relative aspect-[16/10] bg-slate-950 overflow-hidden cursor-pointer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onClick={() => {
                        setSelectedProject(project);
                        setModalMode('2d');
                      }}
                    >
                      <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 pointer-events-none z-10">
                        <span className="bg-white/90 text-slate-900 text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-lg flex items-center gap-1.5 backdrop-blur-sm">
                          <Maximize2 className="w-3.5 h-3.5 text-slate-900" />
                          <span>Ampliar Render</span>
                        </span>
                      </div>
                      <span className="absolute top-3 left-3 z-10 bg-slate-950/80 text-white text-[9px] font-mono font-extrabold px-2.5 py-1 rounded uppercase tracking-widest backdrop-blur-md border border-white/10">
                        {project.categoryLabel}
                      </span>
                    </LazyImage>

                    <div className="p-6 space-y-3">
                      <h3 className="text-base font-bold font-display text-white group-hover:text-amber-300 transition-colors">
                        {project.title}
                      </h3>

                      <p className="text-xs text-slate-300 leading-relaxed line-clamp-2 font-normal">
                        {project.description}
                      </p>

                      <div className="pt-2 flex flex-wrap gap-1.5">
                        {project.specs.map((spec, idx) => (
                          <span
                            key={idx}
                            className="bg-white/10 border border-white/10 text-slate-200 text-[9px] font-mono px-2 py-0.5 rounded"
                          >
                            {spec}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="px-6 pb-6 pt-2 space-y-2">
                    {/* 3D Inspection Quick Trigger */}
                    <button
                      onClick={() => handleOpen3DDirect(model3DId)}
                      className="w-full inline-flex items-center justify-center gap-2 bg-amber-500/20 hover:bg-amber-500 hover:text-slate-950 text-amber-300 text-xs font-bold uppercase tracking-wider py-2.5 rounded-xl transition-all border border-amber-500/30"
                    >
                      <Box className="w-3.5 h-3.5" />
                      <span>Inspecionar em 3D Real</span>
                    </button>

                    <a
                      href={getWhatsAppForProject(project)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-emerald-600 text-white text-xs font-bold uppercase tracking-wider py-2.5 rounded-xl transition-colors border border-white/15 shadow-sm"
                    >
                      <MessageSquare className="w-3.5 h-3.5 fill-current" />
                      <span>Orçamento deste Projeto</span>
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Modal Lightbox with 2D/3D Switcher */}
        {selectedProject && (
          <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6">
            <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative animate-in zoom-in-95 duration-200">
              
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 z-10 bg-slate-800 hover:bg-slate-700 text-white p-2 rounded-full transition-colors border border-slate-700"
                aria-label="Fechar modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="grid md:grid-cols-12 gap-6 p-6 sm:p-8">
                {/* Visual Viewport (2D or 3D R3F) */}
                <div className="md:col-span-7 bg-slate-950 rounded-2xl overflow-hidden border border-slate-800 flex flex-col justify-between">
                  {/* View Mode Switcher Header */}
                  <div className="p-2 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between">
                    <span className="text-[10px] font-mono text-slate-400 font-bold uppercase px-2">
                      Modo de Exibição:
                    </span>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => setModalMode('2d')}
                        className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all ${
                          modalMode === '2d'
                            ? 'bg-amber-500 text-slate-950'
                            : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        Render 2D
                      </button>
                      <button
                        onClick={() => setModalMode('3d')}
                        className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all flex items-center gap-1 ${
                          modalMode === '3d'
                            ? 'bg-amber-500 text-slate-950'
                            : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        <Box className="w-3.5 h-3.5" />
                        <span>Modelo 3D</span>
                      </button>
                    </div>
                  </div>

                  {modalMode === '2d' ? (
                    <div className="w-full min-h-[300px] max-h-[450px] flex items-center justify-center p-2">
                      <LazyImage
                        src={selectedProject.imageUrl}
                        alt={selectedProject.title}
                        loading="lazy"
                        containerClassName="w-full h-full flex items-center justify-center"
                        className="w-full h-auto max-h-[420px] object-cover rounded-xl"
                      />
                    </div>
                  ) : (
                    <div className="w-full h-[360px] relative">
                      <Model3DCanvas
                        modelType={mapProjectTo3DModel(selectedProject)}
                        controls={{
                          wireframe: false,
                          xray: false,
                          explodedOffset: 0,
                          showFoundation: true,
                          showColumns: true,
                          showSlabs: true,
                          showRoof: true,
                          showWalls: true,
                          autoRotate: true
                        }}
                        cameraPreset="iso"
                      />
                      <button
                        onClick={() => {
                          setSelected3DModel(mapProjectTo3DModel(selectedProject));
                          setIs3DModalOpen(true);
                          setSelectedProject(null);
                        }}
                        className="absolute bottom-3 right-3 z-10 bg-slate-900/90 hover:bg-amber-500 hover:text-slate-950 text-white text-[11px] font-bold px-3 py-1.5 rounded-xl border border-slate-700 flex items-center gap-1.5"
                      >
                        <Maximize2 className="w-3 h-3" />
                        <span>Abrir Inspecionador Completo</span>
                      </button>
                    </div>
                  )}
                </div>

                {/* Specs and Details */}
                <div className="md:col-span-5 flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    <span className="inline-block bg-amber-500/20 border border-amber-500/30 text-amber-300 text-xs font-extrabold px-2.5 py-1 rounded-md uppercase tracking-wider">
                      {selectedProject.categoryLabel}
                    </span>

                    <h3 className="text-xl font-bold font-display text-white">
                      {selectedProject.title}
                    </h3>

                    <p className="text-xs text-slate-300 leading-relaxed">
                      {selectedProject.description}
                    </p>

                    <div className="space-y-1.5 pt-2">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                        Especificações Técnicas:
                      </h4>
                      <ul className="space-y-1 text-xs text-slate-200">
                        {selectedProject.specs.map((spec, i) => (
                          <li key={i} className="flex items-center gap-2">
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                            <span>{spec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-800 space-y-2">
                    <button
                      onClick={() => {
                        setSelected3DModel(mapProjectTo3DModel(selectedProject));
                        setIs3DModalOpen(true);
                        setSelectedProject(null);
                      }}
                      className="w-full flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold uppercase tracking-wider py-3 rounded-xl transition-all shadow-md"
                    >
                      <Box className="w-4 h-4" />
                      <span>Inspecionar Estrutura 3D em Tela Cheia</span>
                    </button>

                    <a
                      href={getWhatsAppForProject(selectedProject)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold uppercase tracking-wider py-3 rounded-xl transition-colors shadow-lg"
                    >
                      <MessageSquare className="w-4 h-4 fill-current" />
                      <span>Falar no WhatsApp sobre este Projeto</span>
                    </a>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* Global 3D Viewer Fullscreen Modal */}
        <Interactive3DViewerModal
          isOpen={is3DModalOpen}
          onClose={() => setIs3DModalOpen(false)}
          initialModel={selected3DModel}
        />

      </div>
    </section>
  );
};
