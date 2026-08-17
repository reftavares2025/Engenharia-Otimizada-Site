import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Grid, Center, GizmoHelper, GizmoViewport } from '@react-three/drei';
import {
  Layers,
  RotateCw,
  ShieldCheck,
  MessageSquare,
  Box,
  Eye,
  CheckCircle2,
  Maximize2
} from 'lucide-react';
import { buildWhatsAppLink } from '../utils/whatsapp';
import { ChaletAFrame3D } from './r3f/models/ChaletAFrame3D';
import { ChaletAlpino3D } from './r3f/models/ChaletAlpino3D';
import { GalpaoIndustrial3D } from './r3f/models/GalpaoIndustrial3D';
import { EdificioComercial3D } from './r3f/models/EdificioComercial3D';
import { ModuloPreFabricado3D } from './r3f/models/ModuloPreFabricado3D';
import { Viewer3DControls, Model3DType } from './r3f/types';
import { Interactive3DViewerModal } from './r3f/Interactive3DViewerModal';

export interface Project3DParams {
  projectType: string; // 'chalé' | 'galpão' | 'comercial' | 'metálico'
  city: string;
  areaM2: number;
  hasLand: string;
  hasArchitectural: string;
  isApproved: string;
  // Chalet specific:
  bedrooms?: string;
  hasGourmet?: boolean;
  hasChurrasqueira?: boolean;
  hasGarage?: boolean;
  hasSubsolo?: boolean;
  hasMezzanine?: boolean;
  hasSondagemSPT?: string;
}

interface Props {
  params: Project3DParams;
}

export const Project3DViewer: React.FC<Props> = ({ params }) => {
  const [wireframe, setWireframe] = useState(false);
  const [xray, setXray] = useState(false);
  const [autoRotate, setAutoRotate] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [showFoundation, setShowFoundation] = useState(true);
  const [showColumns, setShowColumns] = useState(true);
  const [showSlabs, setShowSlabs] = useState(params.hasMezzanine ?? true);
  const [showRoof, setShowRoof] = useState(true);
  const [showWalls, setShowWalls] = useState(true);

  // Calculated estimates based on m²
  const area = params.areaM2 || 60;
  const typeKey = (params.projectType || '').toLowerCase();
  const isChalet = typeKey.includes('chal');
  const isComercial =
    typeKey.includes('comercial') || typeKey.includes('predio') || typeKey.includes('prédio');
  const isMetalico =
    typeKey.includes('metalic') || typeKey.includes('metálic') || typeKey.includes('aço');
  const isGalpao = !isChalet && !isComercial && !isMetalico;

  // Choose R3F Model key based on qualification parameters
  let activeModelKey: Model3DType = 'chale-aframe';
  if (isChalet) {
    activeModelKey = area > 75 ? 'chale-alpino' : 'chale-aframe';
  } else if (isComercial) {
    activeModelKey = 'edificio-comercial';
  } else if (isGalpao) {
    activeModelKey = 'galpao-industrial';
  } else {
    activeModelKey = 'modulo-pre-moldado';
  }

  const estimatedSteelKg = Math.round(area * (isChalet ? 38 : isMetalico ? 32 : 28));
  const estimatedConcreteM3 = Math.round(area * 0.32);

  const controls: Viewer3DControls = {
    wireframe,
    xray,
    explodedOffset: 0,
    showFoundation,
    showColumns,
    showSlabs,
    showRoof,
    showWalls,
    autoRotate
  };

  const whatsappMessage = `Olá Eng. Régis Tavares! Acabei de personalizar um modelo 3D no Assistente Técnico com as seguintes características:\n• Tipo: ${params.projectType}\n• Cidade da Obra: ${params.city}\n• Área: ${area} m²\n• Terreno: ${params.hasLand}\n• Sondagem SPT: ${params.hasSondagemSPT || 'A definir'}\n\nGostaria de entender a viabilidade e agendar uma análise técnica.`;
  const whatsappUrl = buildWhatsAppLink(
    `Simulação 3D: ${params.projectType} (${area}m²)`,
    whatsappMessage
  );

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col">
      {/* Top Header Controls */}
      <div className="p-4 bg-slate-950 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <Box className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-sm font-bold text-white font-display">
                Simulador 3D R3F • {params.projectType.toUpperCase()}
              </h4>
              <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-mono font-bold px-2 py-0.5 rounded border border-emerald-500/30">
                {area} m²
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              Cidade: {params.city} • NBR 8800 / NBR 9062
            </p>
          </div>
        </div>

        {/* Action Pills */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setAutoRotate(!autoRotate)}
            className={`p-2 rounded-xl text-xs transition-all flex items-center gap-1.5 ${
              autoRotate
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                : 'bg-slate-800 text-slate-400 border border-slate-700'
            }`}
            title="Giro 360°"
          >
            <RotateCw className={`w-3.5 h-3.5 ${autoRotate ? 'animate-spin' : ''}`} />
            <span className="text-[10px] font-mono hidden sm:inline">360°</span>
          </button>

          <button
            onClick={() => setWireframe(!wireframe)}
            className={`px-2.5 py-1.5 rounded-xl text-[11px] font-bold transition-all ${
              wireframe
                ? 'bg-amber-500 text-slate-950 shadow-sm'
                : 'bg-slate-800 text-slate-300 border border-slate-700 hover:bg-slate-700'
            }`}
          >
            BIM Wireframe
          </button>

          <button
            onClick={() => setIsModalOpen(true)}
            className="px-2.5 py-1.5 rounded-xl text-[11px] font-bold bg-slate-800 text-white border border-slate-700 hover:bg-amber-500 hover:text-slate-950 transition-all flex items-center gap-1"
          >
            <Maximize2 className="w-3 h-3" />
            <span className="hidden sm:inline">Inspecionar</span>
          </button>
        </div>
      </div>

      {/* Main R3F Canvas Viewport */}
      <div className="relative w-full h-[360px] sm:h-[420px] bg-slate-950">
        <Canvas
          shadows
          camera={{ position: [14, 10, 16], fov: 45, near: 0.1, far: 1000 }}
          gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
          className="w-full h-full"
        >
          <color attach="background" args={['#090d16']} />
          <ambientLight intensity={0.9} />
          <directionalLight position={[15, 30, 15]} intensity={1.5} castShadow />
          <directionalLight position={[-15, 10, -15]} intensity={0.6} />
          <pointLight position={[0, 10, 0]} intensity={0.5} color="#38bdf8" />

          <OrbitControls
            makeDefault
            enableDamping
            dampingFactor={0.05}
            autoRotate={autoRotate}
            autoRotateSpeed={1.2}
            minDistance={4}
            maxDistance={50}
            maxPolarAngle={Math.PI / 2 + 0.05}
          />

          <Grid
            position={[0, -0.42, 0]}
            args={[40, 40]}
            cellSize={1.0}
            cellColor="#334155"
            sectionSize={5.0}
            sectionColor="#38bdf8"
            fadeDistance={35}
          />

          <Center position={[0, 0, 0]}>
            {activeModelKey === 'chale-aframe' && <ChaletAFrame3D controls={controls} />}
            {activeModelKey === 'chale-alpino' && <ChaletAlpino3D controls={controls} />}
            {activeModelKey === 'galpao-industrial' && (
              <GalpaoIndustrial3D controls={controls} />
            )}
            {activeModelKey === 'edificio-comercial' && (
              <EdificioComercial3D controls={controls} />
            )}
            {activeModelKey === 'modulo-pre-moldado' && (
              <ModuloPreFabricado3D controls={controls} />
            )}
          </Center>

          <GizmoHelper alignment="bottom-right" margin={[50, 50]}>
            <GizmoViewport axisColors={['#ef4444', '#22c55e', '#3b82f6']} labelColor="#ffffff" />
          </GizmoHelper>
        </Canvas>

        {/* Quick Layer Switchers at bottom overlay */}
        <div className="absolute bottom-3 left-3 right-3 z-10 flex flex-wrap items-center justify-between gap-2 bg-slate-950/80 backdrop-blur-md border border-slate-800/90 p-2 rounded-2xl">
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setShowSlabs(!showSlabs)}
              className={`px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold transition-all ${
                showSlabs
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                  : 'bg-slate-900 text-slate-500'
              }`}
            >
              Mezanino / Laje: {showSlabs ? 'ON' : 'OFF'}
            </button>

            <button
              onClick={() => setShowRoof(!showRoof)}
              className={`px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold transition-all ${
                showRoof
                  ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40'
                  : 'bg-slate-900 text-slate-500'
              }`}
            >
              Cobertura: {showRoof ? 'ON' : 'OFF'}
            </button>
          </div>

          <div className="text-[10px] font-mono text-slate-400 hidden sm:block">
            Arraste para girar em 3D
          </div>
        </div>
      </div>

      {/* Bottom Technical Indicators & WhatsApp CTA */}
      <div className="p-4 bg-slate-950 border-t border-slate-800 space-y-3">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-2.5">
            <div className="text-[10px] font-mono text-slate-400">Área Estimada</div>
            <div className="text-sm font-bold text-amber-400 font-mono">{area} m²</div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-2.5">
            <div className="text-[10px] font-mono text-slate-400">Estimativa Aço</div>
            <div className="text-sm font-bold text-sky-400 font-mono">
              ~{estimatedSteelKg} kg
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-2.5 col-span-2 sm:col-span-1">
            <div className="text-[10px] font-mono text-slate-400">Estimativa Concreto</div>
            <div className="text-sm font-bold text-emerald-400 font-mono">
              ~{estimatedConcreteM3} m³
            </div>
          </div>
        </div>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider py-3 px-4 rounded-xl transition-all shadow-lg flex items-center justify-center gap-2"
        >
          <MessageSquare className="w-4 h-4 fill-current" />
          <span>Enviar Esta Simulação 3D para o Eng. Régis no WhatsApp</span>
        </a>
      </div>

      {/* Full Modal Viewer */}
      <Interactive3DViewerModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialModel={activeModelKey}
      />
    </div>
  );
};
