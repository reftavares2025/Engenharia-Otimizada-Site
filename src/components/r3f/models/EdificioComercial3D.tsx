import React from 'react';
import { Viewer3DControls } from '../types';

interface Props {
  controls: Viewer3DControls;
}

export const EdificioComercial3D: React.FC<Props> = ({ controls }) => {
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
  const slabColor = '#cbd5e1';
  const glassColor = '#38bdf8';
  const steelAccent = '#f59e0b';

  const w = 12.0;
  const l = 16.0;
  const numFloors = 3;
  const floorHeight = 3.5;
  const totalH = numFloors * floorHeight;

  const expY = explodedOffset * 5.0;

  const gridX = [-w / 2 + 1, 0, w / 2 - 1];
  const gridZ = [-l / 2 + 1, 0, l / 2 - 1];

  return (
    <group position={[0, 0, 0]}>
      {/* 1. FOUNDATION & PLINTH (Under Ground Level Y <= 0) */}
      {showFoundation && (
        <group position={[0, 0, 0]}>
          {/* Base Concrete Radier */}
          <mesh position={[0, -0.15, 0]} receiveShadow>
            <boxGeometry args={[w + 1.2, 0.3, l + 1.2]} />
            <meshStandardMaterial color={concreteDark} roughness={0.8} wireframe={wireframe} />
          </mesh>

          {/* Sapatas Cálice dos Pilares Centrais e Periféricos */}
          {gridX.map((x, xi) =>
            gridZ.map((z, zi) => (
              <mesh key={`fnd-col-${xi}-${zi}`} position={[x, -0.55, z]} castShadow>
                <boxGeometry args={[1.4, 0.6, 1.4]} />
                <meshStandardMaterial color="#475569" roughness={0.9} wireframe={wireframe} />
              </mesh>
            ))
          )}
        </group>
      )}

      {/* 2. PRECAST CONCRETE COLUMNS (PILOS CONTÍNUOS MULTIPAVIMENTO from Y=0 to Y=totalH) */}
      {showColumns && (
        <group position={[0, 0, 0]}>
          {gridX.map((x, xi) =>
            gridZ.map((z, zi) => (
              <group key={`bldg-col-${xi}-${zi}`} position={[x, 0, z]}>
                {/* Column Main Shaft starting at Y=0 */}
                <mesh position={[0, totalH / 2, 0]} castShadow>
                  <boxGeometry args={[0.5, totalH, 0.5]} />
                  <meshStandardMaterial
                    color={concreteColor}
                    roughness={0.8}
                    wireframe={wireframe}
                    transparent={transparent}
                    opacity={opacity}
                  />
                </mesh>

                {/* Multi-floor Corbels / Consolos nos níveis 1 e 2 */}
                {Array.from({ length: numFloors }).map((_, fIdx) => {
                  const yPos = (fIdx + 1) * floorHeight - 0.3;
                  return (
                    <group key={`corbel-f-${fIdx}`} position={[0, yPos, 0]}>
                      {/* Corbel X+ */}
                      <mesh position={[0.32, 0, 0]} castShadow>
                        <boxGeometry args={[0.25, 0.4, 0.4]} />
                        <meshStandardMaterial color={concreteDark} wireframe={wireframe} />
                      </mesh>
                      {/* Corbel X- */}
                      <mesh position={[-0.32, 0, 0]} castShadow>
                        <boxGeometry args={[0.25, 0.4, 0.4]} />
                        <meshStandardMaterial color={concreteDark} wireframe={wireframe} />
                      </mesh>
                    </group>
                  );
                })}
              </group>
            ))
          )}

          {/* Concrete Perimeter Beams (Vigas Portantes Pré-Moldadas em T Invertido / L) */}
          {Array.from({ length: numFloors }).map((_, fIdx) => {
            const yBeam = (fIdx + 1) * floorHeight - 0.2 + (fIdx + 1) * (expY / numFloors);
            return (
              <group key={`beams-floor-${fIdx}`} position={[0, yBeam, 0]}>
                {/* Longitudinal Edge Beams */}
                <mesh position={[-w / 2 + 1, 0, 0]} castShadow>
                  <boxGeometry args={[0.35, 0.55, l]} />
                  <meshStandardMaterial color={concreteColor} roughness={0.8} wireframe={wireframe} />
                </mesh>
                <mesh position={[0, 0, 0]} castShadow>
                  <boxGeometry args={[0.4, 0.55, l]} />
                  <meshStandardMaterial color={concreteColor} roughness={0.8} wireframe={wireframe} />
                </mesh>
                <mesh position={[w / 2 - 1, 0, 0]} castShadow>
                  <boxGeometry args={[0.35, 0.55, l]} />
                  <meshStandardMaterial color={concreteColor} roughness={0.8} wireframe={wireframe} />
                </mesh>

                {/* Transverse Cross Beams */}
                <mesh position={[0, 0, -l / 2 + 1]} castShadow>
                  <boxGeometry args={[w - 0.5, 0.55, 0.35]} />
                  <meshStandardMaterial color={concreteColor} roughness={0.8} wireframe={wireframe} />
                </mesh>
                <mesh position={[0, 0, 0]} castShadow>
                  <boxGeometry args={[w - 0.5, 0.55, 0.35]} />
                  <meshStandardMaterial color={concreteColor} roughness={0.8} wireframe={wireframe} />
                </mesh>
                <mesh position={[0, 0, l / 2 - 1]} castShadow>
                  <boxGeometry args={[w - 0.5, 0.55, 0.35]} />
                  <meshStandardMaterial color={concreteColor} roughness={0.8} wireframe={wireframe} />
                </mesh>
              </group>
            );
          })}
        </group>
      )}

      {/* 3. HOLLOW CORE SLABS (LAJES ALVEOLARES PROTENDIDAS) */}
      {showSlabs && (
        <group position={[0, 0, 0]}>
          {Array.from({ length: numFloors }).map((_, fIdx) => {
            const ySlab = (fIdx + 1) * floorHeight + (fIdx + 1) * (expY / numFloors);
            return (
              <group key={`slab-floor-${fIdx}`} position={[0, ySlab, 0]}>
                {/* Laje Alveolar (Modularidade de 1.20m por placa) */}
                {Array.from({ length: 8 }).map((_, slabIdx) => {
                  const zOffset = -l / 2 + (slabIdx + 0.5) * (l / 8);
                  return (
                    <mesh key={`placa-${slabIdx}`} position={[0, 0.08, zOffset]} castShadow receiveShadow>
                      <boxGeometry args={[w - 0.2, 0.18, l / 8 - 0.05]} />
                      <meshStandardMaterial
                        color={slabColor}
                        roughness={0.7}
                        wireframe={wireframe}
                        transparent={transparent}
                        opacity={opacity}
                      />
                    </mesh>
                  );
                })}
              </group>
            );
          })}

          {/* Central Staircase & Elevator Precast Core Box (Núcleo Rígido) */}
          <mesh position={[0, totalH / 2, 0]} castShadow>
            <boxGeometry args={[3.0, totalH, 3.4]} />
            <meshStandardMaterial
              color="#64748b"
              roughness={0.9}
              wireframe={wireframe}
              transparent={transparent}
              opacity={opacity * 0.8}
            />
          </mesh>
        </group>
      )}

      {/* 4. ROOF TOP & PARAPET WALL (PLATIBANDA E COBERTURA) */}
      {showRoof && (
        <group position={[0, totalH + expY, 0]}>
          {/* Top Floor Slab */}
          <mesh position={[0, 0.1, 0]} castShadow receiveShadow>
            <boxGeometry args={[w + 0.2, 0.2, l + 0.2]} />
            <meshStandardMaterial color="#475569" roughness={0.7} wireframe={wireframe} />
          </mesh>

          {/* Concrete Parapet Wall / Platibanda */}
          {/* Front */}
          <mesh position={[0, 0.6, l / 2]}>
            <boxGeometry args={[w + 0.2, 0.8, 0.2]} />
            <meshStandardMaterial color={concreteColor} wireframe={wireframe} />
          </mesh>
          {/* Back */}
          <mesh position={[0, 0.6, -l / 2]}>
            <boxGeometry args={[w + 0.2, 0.8, 0.2]} />
            <meshStandardMaterial color={concreteColor} wireframe={wireframe} />
          </mesh>
          {/* Left */}
          <mesh position={[-w / 2, 0.6, 0]}>
            <boxGeometry args={[0.2, 0.8, l + 0.2]} />
            <meshStandardMaterial color={concreteColor} wireframe={wireframe} />
          </mesh>
          {/* Right */}
          <mesh position={[w / 2, 0.6, 0]}>
            <boxGeometry args={[0.2, 0.8, l + 0.2]} />
            <meshStandardMaterial color={concreteColor} wireframe={wireframe} />
          </mesh>
        </group>
      )}

      {/* 5. CURTAIN WALL / PELE DE VIDRO FAÇADE */}
      {showWalls && (
        <group position={[0, 0, 0]}>
          {/* Front Curtain Glass Facade */}
          <group position={[0, totalH / 2, l / 2]}>
            <mesh position={[0, 0, 0]}>
              <boxGeometry args={[w - 0.2, totalH, 0.04]} />
              <meshStandardMaterial
                color={glassColor}
                transparent
                opacity={0.3}
                roughness={0.1}
                metalness={0.9}
                wireframe={wireframe}
              />
            </mesh>

            {/* Aluminum Horizontal Transom Bands per floor */}
            {Array.from({ length: numFloors + 1 }).map((_, bIdx) => (
              <mesh key={`band-${bIdx}`} position={[0, -totalH / 2 + bIdx * floorHeight, 0.03]}>
                <boxGeometry args={[w - 0.2, 0.12, 0.08]} />
                <meshStandardMaterial color={steelAccent} metalness={0.7} />
              </mesh>
            ))}
          </group>
        </group>
      )}
    </group>
  );
};
