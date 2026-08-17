import React, { useState } from 'react';
import {
  X,
  RotateCw,
  Eye,
  Layers,
  Sparkles,
  Maximize2,
  Minimize2,
  Compass,
  CheckCircle2,
  MessageSquare,
  Box,
  Cpu,
  ChevronRight,
  Sliders,
  ShieldCheck,
  Building2,
  Home,
  Warehouse
} from 'lucide-react';
import { Model3DType, Viewer3DControls } from './types';
import { MODEL_3D_PRESETS } from './modelPresets';
import { Model3DCanvas } from './Model3DCanvas';
import { buildWhatsAppLink } from '../../utils/whatsapp';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  initialModel?: Model3DType;
}

export const Interactive3DViewerModal: React.FC<Props> = ({
  isOpen,
  onClose,
  initialModel = 'chale-aframe'
}) => {
  const [selectedModel, setSelectedModel] = useState<Model3DType>(initialModel);
  const [cameraPreset, setCameraPreset] = useState<'iso' | 'front' | 'top' | 'side'>('iso');

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

  const [activeTab, setActiveTab] = useState<'controls' | 'specs' | 'layers'>('controls');

  if (!isOpen) return null;

  const currentPreset =
    MODEL_3D_PRESETS.find((m) => m.id === selectedModel) || MODEL_3D_PRESETS[0];

  const handleSelectModel = (id: Model3DType) => {
    setSelectedModel(id);
    setCameraPreset('iso');
  };

  const toggleControl = (key: keyof Viewer3DControls) => {
    setControls((prev) => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const getWhatsAppLinkForModel = () => {
    const text = `Gostaria de solicitar viabilidade e orçamento para o modelo 3D: "${currentPreset.title}".\n• Dimensões: ${currentPreset.dimensions.widthM}m x ${currentPreset.dimensions.lengthM}m (${currentPreset.dimensions.areaM2}m²)\n• Sistema: ${currentPreset.structuralSystem}\n• Estimativa: ${currentPreset.estimatedSteelKg ? `${currentPreset.estimatedSteelKg} kg de aço` : ''} ${currentPreset.estimatedConcreteM3 ? `${currentPreset.estimatedConcreteM3} m³ de concreto` : ''}`;
    return buildWhatsAppLink(`Interesse no Modelo 3D: ${currentPreset.title}`, text);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-slate-950/90 backdrop-blur-xl animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative w-full max-w-7xl h-[92vh] max-h-[900px] bg-slate-900 border border-slate-700/80 rounded-3xl overflow-hidden shadow-2xl flex flex-col">
        {/* Top Header Bar */}
        <div className="px-4 sm:px-6 py-3.5 bg-slate-950 border-b border-slate-800 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
              <Box className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="text-sm sm:text-base font-bold text-white truncate font-display">
                  {currentPreset.title}
                </h3>
                <span className="hidden sm:inline-flex bg-amber-500/20 text-amber-300 text-[10px] font-mono font-bold px-2 py-0.5 rounded uppercase border border-amber-500/30">
                  {currentPreset.categoryLabel}
                </span>
              </div>
              <p className="text-[11px] text-slate-400 truncate hidden md:block">
                {currentPreset.shortDesc}
              </p>
            </div>
          </div>

          {/* Model Switcher Dropdown / Pills on Desktop */}
          <div className="flex items-center gap-2">
            <div className="hidden lg:flex items-center bg-slate-900 border border-slate-800 rounded-xl p-1 gap-1">
              {MODEL_3D_PRESETS.map((m) => (
                <button
                  key={m.id}
                  onClick={() => handleSelectModel(m.id)}
                  className={`px-2.5 py-1 text-[11px] font-bold rounded-lg transition-all ${
                    selectedModel === m.id
                      ? 'bg-amber-500 text-slate-950 shadow-sm'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  {m.title.split(' ')[0]} {m.title.split(' ')[1]}
                </button>
              ))}
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800 transition-colors"
              title="Fechar Inspecionador 3D"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Model Selector Bar on Mobile/Tablet */}
        <div className="lg:hidden px-3 py-2 bg-slate-950/80 border-b border-slate-800/80 overflow-x-auto flex gap-1.5 no-scrollbar">
          {MODEL_3D_PRESETS.map((m) => (
            <button
              key={m.id}
              onClick={() => handleSelectModel(m.id)}
              className={`whitespace-nowrap px-3 py-1 text-xs font-semibold rounded-lg shrink-0 transition-all ${
                selectedModel === m.id
                  ? 'bg-amber-500 text-slate-950 font-bold'
                  : 'bg-slate-800/60 text-slate-300 hover:bg-slate-800'
              }`}
            >
              {m.title}
            </button>
          ))}
        </div>

        {/* Main Canvas & Side Panel Body */}
        <div className="flex-1 relative flex flex-col md:flex-row overflow-hidden">
          {/* 3D Viewport Canvas Container */}
          <div className="flex-1 h-[55%] md:h-full relative bg-slate-950">
            <Model3DCanvas
              modelType={selectedModel}
              controls={controls}
              cameraPreset={cameraPreset}
            />

            {/* In-Canvas Floating Camera & Quick Controls Bar */}
            <div className="absolute top-3 left-3 z-10 flex flex-wrap items-center gap-1.5 bg-slate-950/85 backdrop-blur-md border border-slate-800 p-1.5 rounded-2xl shadow-xl">
              <span className="text-[10px] font-mono text-slate-400 px-1.5 uppercase font-bold hidden sm:inline">
                Câmera:
              </span>
              <button
                onClick={() => setCameraPreset('iso')}
                className={`px-2.5 py-1 rounded-xl text-[11px] font-bold transition-all ${
                  cameraPreset === 'iso'
                    ? 'bg-amber-500 text-slate-950'
                    : 'text-slate-300 hover:bg-slate-800'
                }`}
              >
                Isométrica
              </button>
              <button
                onClick={() => setCameraPreset('front')}
                className={`px-2.5 py-1 rounded-xl text-[11px] font-bold transition-all ${
                  cameraPreset === 'front'
                    ? 'bg-amber-500 text-slate-950'
                    : 'text-slate-300 hover:bg-slate-800'
                }`}
              >
                Fachada
              </button>
              <button
                onClick={() => setCameraPreset('top')}
                className={`px-2.5 py-1 rounded-xl text-[11px] font-bold transition-all ${
                  cameraPreset === 'top'
                    ? 'bg-amber-500 text-slate-950'
                    : 'text-slate-300 hover:bg-slate-800'
                }`}
              >
                Planta
              </button>
              <button
                onClick={() => setCameraPreset('side')}
                className={`px-2.5 py-1 rounded-xl text-[11px] font-bold transition-all ${
                  cameraPreset === 'side'
                    ? 'bg-amber-500 text-slate-950'
                    : 'text-slate-300 hover:bg-slate-800'
                }`}
              >
                Corte
              </button>

              <div className="h-4 w-px bg-slate-800 mx-1 hidden sm:block" />

              <button
                onClick={() => toggleControl('autoRotate')}
                className={`p-1.5 rounded-xl text-xs transition-all flex items-center gap-1 ${
                  controls.autoRotate
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    : 'text-slate-400 hover:bg-slate-800'
                }`}
                title="Giro Automático 360°"
              >
                <RotateCw
                  className={`w-3.5 h-3.5 ${controls.autoRotate ? 'animate-spin' : ''}`}
                />
                <span className="text-[10px] font-mono hidden md:inline">
                  {controls.autoRotate ? 'Giro Ativo' : 'Girar'}
                </span>
              </button>
            </div>

            {/* Touch / Mouse Interaction Hint */}
            <div className="absolute bottom-3 left-3 z-10 bg-slate-950/70 backdrop-blur-md border border-slate-800/80 px-3 py-1.5 rounded-xl text-[10px] font-mono text-slate-400 flex items-center gap-2 pointer-events-none">
              <Compass className="w-3.5 h-3.5 text-amber-400" />
              <span>Arraste para girar • Scroll/Pinça para zoom • Shift + arraste para mover</span>
            </div>
          </div>

          {/* Side Engineering & Inspector Control Panel */}
          <div className="w-full md:w-80 lg:w-96 h-[45%] md:h-full bg-slate-900 border-t md:border-t-0 md:border-l border-slate-800 flex flex-col">
            {/* Panel Tabs */}
            <div className="grid grid-cols-3 p-2 bg-slate-950/60 border-b border-slate-800 gap-1 text-xs">
              <button
                onClick={() => setActiveTab('controls')}
                className={`py-2 px-1 rounded-xl font-bold flex items-center justify-center gap-1.5 transition-all ${
                  activeTab === 'controls'
                    ? 'bg-amber-500 text-slate-950 shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Sliders className="w-3.5 h-3.5" />
                <span>Visualização</span>
              </button>
              <button
                onClick={() => setActiveTab('layers')}
                className={`py-2 px-1 rounded-xl font-bold flex items-center justify-center gap-1.5 transition-all ${
                  activeTab === 'layers'
                    ? 'bg-amber-500 text-slate-950 shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Camadas</span>
              </button>
              <button
                onClick={() => setActiveTab('specs')}
                className={`py-2 px-1 rounded-xl font-bold flex items-center justify-center gap-1.5 transition-all ${
                  activeTab === 'specs'
                    ? 'bg-amber-500 text-slate-950 shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Ficha Técnica</span>
              </button>
            </div>

            {/* Panel Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 text-slate-200">
              {/* TAB 1: VISUALIZATION CONTROLS */}
              {activeTab === 'controls' && (
                <div className="space-y-4">
                  {/* Exploded View Slider */}
                  <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-3.5 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-white flex items-center gap-1.5">
                        <Box className="w-3.5 h-3.5 text-amber-400" />
                        <span>Vista Explodida (Montagem)</span>
                      </span>
                      <span className="font-mono text-amber-400 font-bold text-[11px]">
                        {Math.round(controls.explodedOffset * 100)}%
                      </span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.05"
                      value={controls.explodedOffset}
                      onChange={(e) =>
                        setControls((prev) => ({
                          ...prev,
                          explodedOffset: parseFloat(e.target.value)
                        }))
                      }
                      className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
                    />
                    <p className="text-[10px] text-slate-400">
                      Afaste vigas, pilares e coberturas para inspecionar nós e encaixes estruturais.
                    </p>
                  </div>

                  {/* Rendering Mode Toggles */}
                  <div className="space-y-2">
                    <span className="text-[11px] font-mono uppercase font-bold text-slate-400 tracking-wider">
                      Modos de Renderização
                    </span>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => toggleControl('wireframe')}
                        className={`p-3 rounded-2xl border text-left transition-all ${
                          controls.wireframe
                            ? 'bg-amber-500/20 border-amber-500/50 text-amber-300 font-bold'
                            : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:bg-slate-800'
                        }`}
                      >
                        <div className="text-xs font-bold">Modo Wireframe</div>
                        <div className="text-[10px] text-slate-400 mt-0.5">Eixos e malha BIM</div>
                      </button>

                      <button
                        onClick={() => toggleControl('xray')}
                        className={`p-3 rounded-2xl border text-left transition-all ${
                          controls.xray
                            ? 'bg-sky-500/20 border-sky-500/50 text-sky-300 font-bold'
                            : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:bg-slate-800'
                        }`}
                      >
                        <div className="text-xs font-bold">Raio-X (Transparência)</div>
                        <div className="text-[10px] text-slate-400 mt-0.5">Visão do interior</div>
                      </button>
                    </div>
                  </div>

                  {/* Quick Model Details Card */}
                  <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-3.5 space-y-2">
                    <div className="text-xs font-bold text-white">Resumo do Sistema</div>
                    <div className="text-xs text-slate-300 leading-relaxed">
                      {currentPreset.fullDesc}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: STRUCTURAL LAYERS */}
              {activeTab === 'layers' && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-mono uppercase font-bold text-slate-400">
                      Ocultar / Exibir Elementos
                    </span>
                    <button
                      onClick={() =>
                        setControls((prev) => ({
                          ...prev,
                          showFoundation: true,
                          showColumns: true,
                          showSlabs: true,
                          showRoof: true,
                          showWalls: true
                        }))
                      }
                      className="text-[10px] text-amber-400 hover:underline font-mono"
                    >
                      Exibir Tudo
                    </button>
                  </div>

                  {[
                    { key: 'showFoundation', label: '1. Fundação & Sapatas', desc: 'Blocos tipo cálice e estacas' },
                    { key: 'showColumns', label: '2. Pilares & Vigas Principais', desc: 'Esqueleto em aço / concreto' },
                    { key: 'showSlabs', label: '3. Lajes & Mezaninos', desc: 'Painéis alveolares e decks' },
                    { key: 'showRoof', label: '4. Cobertura & Tesouras', desc: 'Treliças e telhas termoacústicas' },
                    { key: 'showWalls', label: '5. Fechamentos & Vidros', desc: 'Painéis verticais e pele de vidro' }
                  ].map((layer) => {
                    const isVisible = controls[layer.key as keyof Viewer3DControls];
                    return (
                      <div
                        key={layer.key}
                        onClick={() => toggleControl(layer.key as keyof Viewer3DControls)}
                        className={`p-3 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                          isVisible
                            ? 'bg-slate-950/80 border-slate-700/80 text-white'
                            : 'bg-slate-950/30 border-slate-900 text-slate-500 opacity-60'
                        }`}
                      >
                        <div>
                          <div className="text-xs font-bold">{layer.label}</div>
                          <div className="text-[10px] text-slate-400">{layer.desc}</div>
                        </div>
                        <div
                          className={`w-5 h-5 rounded-lg flex items-center justify-center border ${
                            isVisible
                              ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400'
                              : 'border-slate-800 text-slate-600'
                          }`}
                        >
                          {isVisible ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Eye className="w-3 h-3" />}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* TAB 3: ENGINEERING SPECS */}
              {activeTab === 'specs' && (
                <div className="space-y-4">
                  {/* Dimension Grid */}
                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-3">
                      <div className="text-[10px] font-mono text-slate-400 uppercase">Área Total</div>
                      <div className="text-base font-bold text-amber-400 font-mono">
                        {currentPreset.dimensions.areaM2} m²
                      </div>
                      <div className="text-[10px] text-slate-500">
                        {currentPreset.dimensions.widthM}m x {currentPreset.dimensions.lengthM}m
                      </div>
                    </div>

                    <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-3">
                      <div className="text-[10px] font-mono text-slate-400 uppercase">Pé-direito / Altura</div>
                      <div className="text-base font-bold text-white font-mono">
                        {currentPreset.dimensions.heightM} m
                      </div>
                      <div className="text-[10px] text-slate-500">Vão livre otimizado</div>
                    </div>

                    {currentPreset.estimatedSteelKg && (
                      <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-3">
                        <div className="text-[10px] font-mono text-slate-400 uppercase">Estimativa Aço</div>
                        <div className="text-sm font-bold text-sky-400 font-mono">
                          ~{currentPreset.estimatedSteelKg} kg
                        </div>
                        <div className="text-[10px] text-slate-500">NBR 8800</div>
                      </div>
                    )}

                    {currentPreset.estimatedConcreteM3 && (
                      <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-3">
                        <div className="text-[10px] font-mono text-slate-400 uppercase">Volume Concreto</div>
                        <div className="text-sm font-bold text-emerald-400 font-mono">
                          ~{currentPreset.estimatedConcreteM3} m³
                        </div>
                        <div className="text-[10px] text-slate-500">Fck 35-50 MPa</div>
                      </div>
                    )}
                  </div>

                  {/* Highlights List */}
                  <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-3.5 space-y-2">
                    <div className="text-xs font-bold text-white flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                      <span>Diferenciais Estruturais</span>
                    </div>
                    <ul className="space-y-1.5 text-xs text-slate-300">
                      {currentPreset.highlights.map((h, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Technical Norms Tag Pills */}
                  <div className="space-y-1.5">
                    <div className="text-[10px] font-mono uppercase text-slate-400">Normas Técnicas Atendidas:</div>
                    <div className="flex flex-wrap gap-1.5">
                      {currentPreset.norms.map((norm, i) => (
                        <span
                          key={i}
                          className="bg-slate-800/80 text-slate-300 text-[10px] font-mono px-2 py-1 rounded-lg border border-slate-700/60"
                        >
                          {norm}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Direct CTA on Panel */}
            <div className="p-4 bg-slate-950 border-t border-slate-800">
              <a
                href={getWhatsAppLinkForModel()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider py-3.5 px-4 rounded-xl shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center gap-2 transform hover:-translate-y-0.5"
              >
                <MessageSquare className="w-4 h-4 text-slate-950 fill-slate-950" />
                <span>Orçar Este Modelo no WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
