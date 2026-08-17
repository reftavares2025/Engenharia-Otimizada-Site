import React from 'react';
import { Viewer3DControls } from '../types';

interface Props {
  controls: Viewer3DControls;
}

export const ModuloPreFabricado3D: React.FC<Props> = ({ controls }) => {
  const {
    wireframe,
    xray,
    explodedOffset,
    showFoundation,
    showColumns,
    showSlabs,
    showRoof,
    showWalls
  } = controls;

  const opacity = xray ? 0.35 : 1.0;
  const transparent = xray;

  const concreteColor = '#94a3b8';
  const concreteDark = '#64748b';
  const rebarColor = '#ef4444'; // Red for steel rebar / armaduras
  const neopreneColor = '#1e293b'; // Dark black for neoprene pad
  const groutColor = '#e2e8f0'; // Grauteamento

  const exp = explodedOffset * 1.6;

  return (
    <group position={[0, 0, 0]}>
      {/* 1. CÁLICE DE FUNDAÇÃO (FOUNDATION SOCKET BLOCK under Y <= 0) */}
      {showFoundation && (
        <group position={[0, -0.6 - exp * 0.8, 0]}>
          {/* Base Block */}
          <mesh position={[0, 0, 0]} castShadow receiveShadow>
            <boxGeometry args={[2.2, 1.2, 2.2]} />
            <meshStandardMaterial
              color={concreteDark}
              roughness={0.9}
              wireframe={wireframe}
              transparent={transparent}
              opacity={opacity}
            />
          </mesh>

          {/* Calice Cavity Hole Rim (Colarinho do Cálice) */}
          <mesh position={[0, 0.45, 0]} castShadow>
            <boxGeometry args={[1.8, 0.3, 1.8]} />
            <meshStandardMaterial color="#475569" roughness={0.9} wireframe={wireframe} />
          </mesh>

          {/* Grout Layer (Graute de Ancoragem) at top */}
          <mesh position={[0, 0.58, 0]}>
            <boxGeometry args={[1.0, 0.08, 1.0]} />
            <meshStandardMaterial color={groutColor} roughness={0.5} wireframe={wireframe} />
          </mesh>
        </group>
      )}

      {/* 2. PILAR PRÉ-FABRICADO COM CONSOLO (PRECAST COLUMN WITH CORBEL starting at Y=0) */}
      {showColumns && (
        <group position={[0, 1.7, 0]}>
          {/* Main Column Shaft (60x60cm, 3.4m height) */}
          <mesh position={[0, 0, 0]} castShadow>
            <boxGeometry args={[0.7, 3.4, 0.7]} />
            <meshStandardMaterial
              color={concreteColor}
              roughness={0.8}
              wireframe={wireframe}
              transparent={transparent}
              opacity={opacity}
            />
          </mesh>

          {/* Embedded Foundation Rebars at Column Base (Armaduras de Espera) */}
          <group position={[0, -1.8, 0]}>
            {[-0.22, 0.22].map((rx, rxi) =>
              [-0.22, 0.22].map((rz, rzi) => (
                <mesh key={`rebar-col-${rxi}-${rzi}`} position={[rx, 0, rz]}>
                  <cylinderGeometry args={[0.02, 0.02, 0.5, 8]} />
                  <meshStandardMaterial color={rebarColor} metalness={0.8} />
                </mesh>
              ))
            )}
          </group>

          {/* Corbel / Consolo de Apoio da Viga */}
          <group position={[0.5, 0.2, 0]}>
            {/* Trapezoidal Corbel Body */}
            <mesh castShadow>
              <boxGeometry args={[0.45, 0.55, 0.65]} />
              <meshStandardMaterial color={concreteDark} roughness={0.8} wireframe={wireframe} />
            </mesh>

            {/* Chumbador Metálico de Espera no Consolo */}
            <mesh position={[0.08, 0.35, 0]}>
              <cylinderGeometry args={[0.02, 0.02, 0.2, 8]} />
              <meshStandardMaterial color={rebarColor} metalness={0.9} />
            </mesh>
          </group>

          {/* Consolo Secundário Oposto para Viga de Travamento */}
          <group position={[-0.45, -0.4, 0]}>
            <mesh castShadow>
              <boxGeometry args={[0.35, 0.45, 0.55]} />
              <meshStandardMaterial color={concreteDark} roughness={0.8} wireframe={wireframe} />
            </mesh>
          </group>
        </group>
      )}

      {/* 3. ELASTOMERIC BEARING PAD (NEOPRENE FRETADO) */}
      <group position={[0.58, 2.0 + exp * 0.5, 0]}>
        <mesh castShadow>
          <boxGeometry args={[0.28, 0.04, 0.45]} />
          <meshStandardMaterial color={neopreneColor} roughness={0.3} metalness={0.2} />
        </mesh>
      </group>

      {/* 4. VIGA PRÉ-FABRICADA EM T INVERTIDO (PRECAST BEAM) */}
      <group position={[1.4 + exp, 2.3 + exp * 0.8, 0]}>
        {/* Beam Body */}
        <mesh position={[0, 0, 0]} castShadow>
          <boxGeometry args={[1.5, 0.6, 0.45]} />
          <meshStandardMaterial
            color={concreteColor}
            roughness={0.7}
            wireframe={wireframe}
            transparent={transparent}
            opacity={opacity}
          />
        </mesh>

        {/* Beam Flange Ledge for Slab Seating (Dente da Viga) */}
        <mesh position={[0, -0.15, 0.3]} castShadow>
          <boxGeometry args={[1.5, 0.3, 0.2]} />
          <meshStandardMaterial color={concreteDark} roughness={0.7} wireframe={wireframe} />
        </mesh>

        {/* Embedded Steel Reinforcement Loop */}
        <mesh position={[-0.4, 0.35, 0]}>
          <torusGeometry args={[0.08, 0.015, 8, 16]} />
          <meshStandardMaterial color={rebarColor} metalness={0.8} />
        </mesh>
        <mesh position={[0.4, 0.35, 0]}>
          <torusGeometry args={[0.08, 0.015, 8, 16]} />
          <meshStandardMaterial color={rebarColor} metalness={0.8} />
        </mesh>
      </group>

      {/* 5. LAJE ALVEOLAR PROTENDIDA (HOLLOW CORE SLAB SEATING) */}
      {showSlabs && (
        <group position={[1.4 + exp, 2.55 + exp * 1.2, 0.8 + exp * 0.5]}>
          {/* Main Hollow Slab Segment */}
          <mesh castShadow receiveShadow>
            <boxGeometry args={[1.4, 0.22, 1.2]} />
            <meshStandardMaterial
              color="#cbd5e1"
              roughness={0.6}
              wireframe={wireframe}
              transparent={transparent}
              opacity={opacity}
            />
          </mesh>

          {/* Internal Hollow Cores (Alvéolos) */}
          {[-0.4, 0, 0.4].map((hX, hIdx) => (
            <mesh key={`alveolo-${hIdx}`} position={[hX, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.06, 0.06, 1.22, 16]} />
              <meshStandardMaterial color="#334155" />
            </mesh>
          ))}

          {/* Prestressing Steel Strands (Cordoalhas de Protensão) */}
          {[-0.5, -0.25, 0, 0.25, 0.5].map((sX, sIdx) => (
            <mesh key={`strand-${sIdx}`} position={[sX, -0.06, 0]} rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.012, 0.012, 1.24, 8]} />
              <meshStandardMaterial color={rebarColor} metalness={0.9} />
            </mesh>
          ))}
        </group>
      )}
    </group>
  );
};
