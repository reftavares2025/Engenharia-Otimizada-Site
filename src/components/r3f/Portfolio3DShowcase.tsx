import React, { useState } from 'react';
import {
  Box,
  RotateCw,
  Maximize2,
  Layers,
  Sparkles,
  ChevronRight,
  ShieldCheck,
  Compass,
  Building2,
  Home,
  Warehouse,
  Wrench,
  MessageSquare
} from 'lucide-react';
import { Model3DType, Viewer3DControls } from './types';
import { MODEL_3D_PRESETS } from './modelPresets';
import { Model3DCanvas } from './Model3DCanvas';
import { Interactive3DViewerModal } from './Interactive3DViewerModal';
import { buildWhatsAppLink } from '../../utils/whatsapp';

interface Props {
  onOpenModelModal?: (modelId: Model3DType) => void;
  className?: string;
}

export const Portfolio3DShowcase: React.FC<Props> = ({ onOpenModelModal, className = '' }) => {
  const [activeModel, setActiveModel] = useState<Model3DType>('chale-aframe');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalModel, setModalModel] = useState<Model3DType>('chale-aframe');

  const [controls, setControls] = useState<Viewer3DControls>({
    wireframe: false,
    xray: false,
    explodedOffset: 0,
    showFoundation: true,
    showColumns: true,
    showSlabs: true,
    showRoof: true,
    showWalls: true,
    autoRotate: true
  });

  const currentPreset =
    MODEL_3D_PRESETS.find((m) => m.id === activeModel) || MODEL_3D_PRESETS[0];

  const handleOpenModal = (modelId: Model3DType) => {
    if (onOpenModelModal) {
      onOpenModelModal(modelId);
    } else {
      setModalModel(modelId);
      setIsModalOpen(true);
    }
  };

  const modelTabs = [
    {
      id: 'chale-aframe' as Model3DType,
      label: 'Chalé A-Frame',
      icon: Home,
      tag: 'Aço Estrutural'
    },
    {
      id: 'chale-alpino' as Model3DType,
      label: 'Chalé Alpino Mezanino',
      icon: Sparkles,
      tag: 'Alto Padrão'
    },
    {
      id: 'galpao-industrial' as Model3DType,
      label: 'Galpão Pré-Fabricado',
      icon: Warehouse,
      tag: 'Grande Vão'
    },
    {
      id: 'edificio-comercial' as Model3DType,
      label: 'Edifício Comercial',
      icon: Building2,
      tag: '3 Pavimentos'
    },
    {
      id: 'modulo-pre-moldado' as Model3DType,
      label: 'Nó Pré-Moldado (Macro)',
      icon: Wrench,
      tag: 'Detalhe Técnico'
    }
  ];

  const whatsappUrl = buildWhatsAppLink(
    `Interesse no Modelo 3D: ${currentPreset.title}`,
    `Olá Eng. Régis Tavares! Estava navegando pelo Visualizador 3D do site e gostei muito do modelo "${currentPreset.title}" (${currentPreset.dimensions.areaM2}m²).\n\nGostaria de entender a viabilidade e solicitar um orçamento técnico.`
  );

  return (
    <div className={`relative ${className}`}>
      {/* Container Box */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
        {/* Top Control Bar */}
        <div className="p-4 sm:p-6 bg-slate-950 border-b border-slate-800/80 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-full text-[10px] font-mono font-bold text-amber-400 uppercase tracking-widest mb-1.5">
              <Box className="w-3.5 h-3.5 text-amber-400" />
              <span>Modelador Tridimensional Interativo • Three.js / Fiber</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white font-display">
              Inspecione as Estruturas em <span className="text-amber-400 italic">3D Real</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Gire com o mouse ou toque, alterne entre galpões, chalés e módulos para ver pilares, vigas e lajes.
            </p>
          </div>

          {/* Model Selector Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 lg:pb-0 no-scrollbar">
            {modelTabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeModel === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveModel(tab.id)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                    isActive
                      ? 'bg-amber-500 text-slate-950 shadow-md scale-105'
                      : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-slate-950' : 'text-amber-400'}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 3D Canvas Area */}
        <div className="grid lg:grid-cols-12 min-h-[420px] sm:min-h-[480px]">
          {/* Left Canvas Viewport */}
          <div className="lg:col-span-8 relative bg-slate-950 h-[360px] sm:h-[450px] lg:h-auto">
            <Model3DCanvas modelType={activeModel} controls={controls} cameraPreset="iso" />

            {/* Quick Floating Action Controls */}
            <div className="absolute top-3 left-3 z-10 flex items-center gap-2">
              <button
                onClick={() =>
                  setControls((prev) => ({ ...prev, autoRotate: !prev.autoRotate }))
                }
                className={`px-3 py-1.5 rounded-xl text-xs font-bold backdrop-blur-md border transition-all flex items-center gap-1.5 ${
                  controls.autoRotate
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                    : 'bg-slate-950/80 text-slate-300 border-slate-800'
                }`}
              >
                <RotateCw
                  className={`w-3.5 h-3.5 ${controls.autoRotate ? 'animate-spin' : ''}`}
                />
                <span className="text-[11px]">{controls.autoRotate ? 'Giro 360° On' : 'Pausado'}</span>
              </button>

              <button
                onClick={() =>
                  setControls((prev) => ({ ...prev, wireframe: !prev.wireframe }))
                }
                className={`px-3 py-1.5 rounded-xl text-xs font-bold backdrop-blur-md border transition-all ${
                  controls.wireframe
                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                    : 'bg-slate-950/80 text-slate-300 border-slate-800'
                }`}
              >
                <span className="text-[11px]">Wireframe BIM</span>
              </button>
            </div>

            {/* Expand Fullscreen Modal Button */}
            <button
              onClick={() => handleOpenModal(activeModel)}
              className="absolute top-3 right-3 z-10 bg-slate-950/80 hover:bg-amber-500 hover:text-slate-950 text-white backdrop-blur-md border border-slate-800 px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-lg group"
            >
              <Maximize2 className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
              <span>Inspecionar em Tela Cheia</span>
            </button>

            {/* Bottom Interaction Hint */}
            <div className="absolute bottom-3 left-3 z-10 bg-slate-950/70 backdrop-blur-md border border-slate-800/80 px-3 py-1 rounded-xl text-[10px] font-mono text-slate-400 flex items-center gap-1.5 pointer-events-none">
              <Compass className="w-3 h-3 text-amber-400" />
              <span>Clique e arraste para orbitar • Scroll para zoom</span>
            </div>
          </div>

          {/* Right Summary & Quick Specs Sidebar */}
          <div className="lg:col-span-4 p-6 bg-slate-900 border-t lg:border-t-0 lg:border-l border-slate-800 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div>
                <span className="text-[10px] font-mono uppercase font-bold text-amber-400 tracking-wider">
                  {currentPreset.categoryLabel}
                </span>
                <h4 className="text-lg font-bold text-white font-display mt-0.5">
                  {currentPreset.title}
                </h4>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                  {currentPreset.shortDesc}
                </p>
              </div>

              {/* Quick Dimension Grid */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-2.5">
                  <div className="text-[10px] font-mono text-slate-400">Área Estimada</div>
                  <div className="text-sm font-bold text-amber-400 font-mono">
                    {currentPreset.dimensions.areaM2} m²
                  </div>
                </div>
                <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-2.5">
                  <div className="text-[10px] font-mono text-slate-400">Pé-direito / Altura</div>
                  <div className="text-sm font-bold text-white font-mono">
                    {currentPreset.dimensions.heightM} m
                  </div>
                </div>
              </div>

              {/* Key Bullet Highlights */}
              <div className="space-y-1.5">
                <div className="text-[11px] font-bold text-slate-200">Destaques Construtivos:</div>
                <ul className="space-y-1 text-xs text-slate-300">
                  {currentPreset.highlights.slice(0, 3).map((h, i) => (
                    <li key={i} className="flex items-start gap-1.5 text-[11px]">
                      <span className="text-amber-400 font-bold">•</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2.5 pt-2">
              <button
                onClick={() => handleOpenModal(activeModel)}
                className="w-full bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs uppercase tracking-wider py-3 px-4 rounded-xl border border-slate-700 transition-all flex items-center justify-center gap-2"
              >
                <Layers className="w-4 h-4 text-amber-400" />
                <span>Explodir Camadas & Raio-X</span>
              </button>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider py-3 px-4 rounded-xl shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center gap-2 transform hover:-translate-y-0.5"
              >
                <MessageSquare className="w-4 h-4 text-slate-950 fill-slate-950" />
                <span>Orçar Este Modelo no WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Standalone Modal when opened from this showcase */}
      <Interactive3DViewerModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialModel={modalModel}
      />
    </div>
  );
};
