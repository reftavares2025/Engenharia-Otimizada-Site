import React, { useMemo } from 'react';
import * as THREE from 'three';
import { Viewer3DControls } from '../types';

interface Props {
  controls: Viewer3DControls;
}

export const GalpaoIndustrial3D: React.FC<Props> = ({ controls }) => {
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
  const steelTruss = '#0284c7';
  const steelPurlin = '#f59e0b';
  const roofColor = '#334155';
  const floorConcrete = '#cbd5e1';

  const w = 15.0; // Width of span (15m)
  const l = 24.0; // Length (24m)
  const hCol = 6.8; // Eave height (Pé-direito)
  const hApex = 8.5; // Apex height at ridge
  const numBays = 5; // 5 frame lines
  const stepZ = l / (numBays - 1);

  const expY = explodedOffset * 4.5;
  const expX = explodedOffset * 2.0;

  // Custom Full Enclosure Back Wall Shape (including precise Gable / Oitão)
  const backWallShape = useMemo(() => {
    const shape = new THREE.Shape();
    const halfW = w / 2;
    shape.moveTo(-halfW, 0.05);
    shape.lineTo(halfW, 0.05);
    shape.lineTo(halfW, hCol);
    shape.lineTo(0, hApex - 0.08);
    shape.lineTo(-halfW, hCol);
    shape.closePath();
    return shape;
  }, [w, hCol, hApex]);

  // Front Triangular Gable Shape (Oitão Frontal)
  const frontGableShape = useMemo(() => {
    const shape = new THREE.Shape();
    const halfW = w / 2;
    shape.moveTo(-halfW, hCol);
    shape.lineTo(halfW, hCol);
    shape.lineTo(0, hApex - 0.08);
    shape.closePath();
    return shape;
  }, [w, hCol, hApex]);

  return (
    <group position={[0, 0, 0]}>
      {/* 1. FOUNDATION / SAPATAS & CÁLICES PRÉ-FABRICADOS (Under Ground Level Y <= 0) */}
      {showFoundation && (
        <group position={[0, 0, 0]}>
          {/* Main Reinforced Concrete Slab / Piso Industrial Armado */}
          <mesh position={[0, -0.15, 0]} receiveShadow>
            <boxGeometry args={[w + 1.2, 0.3, l + 1.2]} />
            <meshStandardMaterial
              color={floorConcrete}
              roughness={0.7}
              wireframe={wireframe}
              transparent={transparent}
              opacity={opacity}
            />
          </mesh>

          {/* Sapatas Cálice sob cada pilar pré-moldado */}
          {Array.from({ length: numBays }).map((_, i) => {
            const z = -l / 2 + i * stepZ;
            return (
              <group key={`calice-${i}`} position={[0, 0, z]}>
                {/* Left Calice Block */}
                <mesh position={[-w / 2, -0.55, 0]} castShadow>
                  <boxGeometry args={[1.2, 0.6, 1.2]} />
                  <meshStandardMaterial color={concreteDark} roughness={0.9} wireframe={wireframe} />
                </mesh>
                {/* Right Calice Block */}
                <mesh position={[w / 2, -0.55, 0]} castShadow>
                  <boxGeometry args={[1.2, 0.6, 1.2]} />
                  <meshStandardMaterial color={concreteDark} roughness={0.9} wireframe={wireframe} />
                </mesh>
              </group>
            );
          })}
        </group>
      )}

      {/* 2. PRECAST CONCRETE COLUMNS WITH CORBELS (PILOS PRÉ-FABRICADOS COM CONSOLOS) */}
      {showColumns && (
        <group position={[0, 0, 0]}>
          {Array.from({ length: numBays }).map((_, i) => {
            const z = -l / 2 + i * stepZ;
            return (
              <group key={`frame-col-${i}`} position={[0, 0, z]}>
                {/* Left Precast Column */}
                <group position={[-w / 2 - expX, 0, 0]}>
                  {/* Vertical Column Shaft (Pilar Seção 45x50cm) starting at Y=0 */}
                  <mesh position={[0, hCol / 2, 0]} castShadow>
                    <boxGeometry args={[0.45, hCol, 0.5]} />
                    <meshStandardMaterial
                      color={concreteColor}
                      roughness={0.8}
                      wireframe={wireframe}
                      transparent={transparent}
                      opacity={opacity}
                    />
                  </mesh>

                  {/* Corbel / Consolo para Vigas de Cobertura */}
                  <mesh position={[0.28, hCol - 0.45, 0]} castShadow>
                    <boxGeometry args={[0.3, 0.4, 0.45]} />
                    <meshStandardMaterial color={concreteDark} roughness={0.8} wireframe={wireframe} />
                  </mesh>
                  {/* Corbel for Crane Runway Beam (Ponte Rolante) at 4.5m */}
                  <mesh position={[0.28, 4.5, 0]} castShadow>
                    <boxGeometry args={[0.3, 0.35, 0.45]} />
                    <meshStandardMaterial color={concreteDark} roughness={0.8} wireframe={wireframe} />
                  </mesh>
                </group>

                {/* Right Precast Column */}
                <group position={[w / 2 + expX, 0, 0]}>
                  <mesh position={[0, hCol / 2, 0]} castShadow>
                    <boxGeometry args={[0.45, hCol, 0.5]} />
                    <meshStandardMaterial
                      color={concreteColor}
                      roughness={0.8}
                      wireframe={wireframe}
                      transparent={transparent}
                      opacity={opacity}
                    />
                  </mesh>

                  <mesh position={[-0.28, hCol - 0.45, 0]} castShadow>
                    <boxGeometry args={[0.3, 0.4, 0.45]} />
                    <meshStandardMaterial color={concreteDark} roughness={0.8} wireframe={wireframe} />
                  </mesh>
                  <mesh position={[-0.28, 4.5, 0]} castShadow>
                    <boxGeometry args={[0.3, 0.35, 0.45]} />
                    <meshStandardMaterial color={concreteDark} roughness={0.8} wireframe={wireframe} />
                  </mesh>
                </group>
              </group>
            );
          })}

          {/* Crane Runway Beams (Vigas de Rolamento da Ponte Rolante) */}
          <mesh position={[-w / 2 + 0.35, 4.75, 0]} castShadow>
            <boxGeometry args={[0.2, 0.3, l + 0.5]} />
            <meshStandardMaterial color={steelTruss} metalness={0.7} wireframe={wireframe} />
          </mesh>
          <mesh position={[w / 2 - 0.35, 4.75, 0]} castShadow>
            <boxGeometry args={[0.2, 0.3, l + 0.5]} />
            <meshStandardMaterial color={steelTruss} metalness={0.7} wireframe={wireframe} />
          </mesh>
        </group>
      )}

      {/* 3. STEEL ROOF TRUSSES & GIRDERS (TESOURAS METÁLICAS DE DUAS ÁGUAS) */}
      {showRoof && (
        <group position={[0, expY, 0]}>
          {Array.from({ length: numBays }).map((_, i) => {
            const z = -l / 2 + i * stepZ;
            const hypotenuse = Math.sqrt((w / 2) ** 2 + (hApex - hCol) ** 2);
            const pitchAngle = Math.atan2(hApex - hCol, w / 2);

            return (
              <group key={`truss-${i}`} position={[0, hCol, z]}>
                {/* Bottom Chord (Banzo Inferior) */}
                <mesh position={[0, 0.1, 0]} castShadow>
                  <boxGeometry args={[w, 0.15, 0.15]} />
                  <meshStandardMaterial color={steelTruss} metalness={0.7} roughness={0.3} wireframe={wireframe} />
                </mesh>

                {/* Left Top Chord (Banzo Superior Esquerdo) */}
                <mesh
                  position={[-w / 4, (hApex - hCol) / 2, 0]}
                  rotation={[0, 0, pitchAngle]}
                  castShadow
                >
                  <boxGeometry args={[hypotenuse, 0.15, 0.15]} />
                  <meshStandardMaterial color={steelTruss} metalness={0.7} roughness={0.3} wireframe={wireframe} />
                </mesh>

                {/* Right Top Chord (Banzo Superior Direito) */}
                <mesh
                  position={[w / 4, (hApex - hCol) / 2, 0]}
                  rotation={[0, 0, -pitchAngle]}
                  castShadow
                >
                  <boxGeometry args={[hypotenuse, 0.15, 0.15]} />
                  <meshStandardMaterial color={steelTruss} metalness={0.7} roughness={0.3} wireframe={wireframe} />
                </mesh>

                {/* Vertical Struts & Diagonals (Montantes e Diagonais da Tesoura) */}
                {[-w * 0.35, -w * 0.18, 0, w * 0.18, w * 0.35].map((strutX, sIdx) => {
                  const strutH = (1 - Math.abs(strutX) / (w / 2)) * (hApex - hCol);
                  return (
                    <mesh key={`strut-${sIdx}`} position={[strutX, strutH / 2, 0]}>
                      <boxGeometry args={[0.08, strutH, 0.08]} />
                      <meshStandardMaterial color={steelPurlin} metalness={0.6} wireframe={wireframe} />
                    </mesh>
                  );
                })}
              </group>
            );
          })}

          {/* Longitudinal Roof Purlins (Terças Metálicas Z) */}
          {[-w * 0.42, -w * 0.28, -w * 0.14, 0, w * 0.14, w * 0.28, w * 0.42].map((pX, pIdx) => {
            const pY = hCol + (1 - Math.abs(pX) / (w / 2)) * (hApex - hCol) + 0.1;
            return (
              <mesh key={`purlin-long-${pIdx}`} position={[pX, pY, 0]}>
                <boxGeometry args={[0.08, 0.14, l + 0.4]} />
                <meshStandardMaterial color={steelPurlin} metalness={0.6} wireframe={wireframe} />
              </mesh>
            );
          })}

          {/* Trapezoidal Thermoacoustic Roof Sheets (Telhas Termoacústicas) */}
          <group position={[0, hCol, 0]}>
            {/* Left Roof Slope */}
            <mesh
              position={[-w / 4, (hApex - hCol) / 2 + 0.12, 0]}
              rotation={[0, 0, Math.atan2(hApex - hCol, w / 2)]}
              castShadow
            >
              <boxGeometry args={[Math.sqrt((w / 2) ** 2 + (hApex - hCol) ** 2) + 0.4, 0.06, l + 0.6]} />
              <meshStandardMaterial
                color={roofColor}
                metalness={0.5}
                roughness={0.4}
                wireframe={wireframe}
                transparent={transparent}
                opacity={opacity * 0.9}
              />
            </mesh>
            {/* Right Roof Slope */}
            <mesh
              position={[w / 4, (hApex - hCol) / 2 + 0.12, 0]}
              rotation={[0, 0, -Math.atan2(hApex - hCol, w / 2)]}
              castShadow
            >
              <boxGeometry args={[Math.sqrt((w / 2) ** 2 + (hApex - hCol) ** 2) + 0.4, 0.06, l + 0.6]} />
              <meshStandardMaterial
                color={roofColor}
                metalness={0.5}
                roughness={0.4}
                wireframe={wireframe}
                transparent={transparent}
                opacity={opacity * 0.9}
              />
            </mesh>
          </group>
        </group>
      )}

      {/* 4. PRECAST WALL PANELS (PAINÉIS ALVEOLARES DE FECHAMENTO) */}
      {showWalls && (
        <group position={[0, 0, 0]}>
          {/* Back Wall Full Enclosure (Painéis Pré-Moldados de Concreto + Oitão Fechado) */}
          <mesh position={[0, 0, -l / 2]} castShadow receiveShadow>
            <extrudeGeometry
              args={[
                backWallShape,
                {
                  depth: 0.15,
                  bevelEnabled: false
                }
              ]}
            />
            <meshStandardMaterial
              color={concreteColor}
              roughness={0.8}
              wireframe={wireframe}
              transparent={transparent}
              opacity={opacity}
            />
          </mesh>

          {/* Front Gable Closure (Oitão Frontal Triangular) */}
          <mesh position={[0, 0, l / 2 - 0.15]}>
            <extrudeGeometry
              args={[
                frontGableShape,
                {
                  depth: 0.15,
                  bevelEnabled: false
                }
              ]}
            />
            <meshStandardMaterial color={concreteDark} roughness={0.8} wireframe={wireframe} />
          </mesh>

          {/* Side Lateral Precast Panels (Placas Alveolares de 1.40m) */}
          {Array.from({ length: 4 }).map((_, pIdx) => (
            <group key={`side-panel-${pIdx}`} position={[0, (pIdx + 0.5) * 1.5, 0]}>
              {/* Left Wall Panel Strip */}
              <mesh position={[-w / 2, 0, 0]}>
                <boxGeometry args={[0.15, 1.4, l]} />
                <meshStandardMaterial
                  color={pIdx % 2 === 0 ? concreteColor : '#a8b5c4'}
                  roughness={0.8}
                  wireframe={wireframe}
                  transparent={transparent}
                  opacity={opacity}
                />
              </mesh>
              {/* Right Wall Panel Strip */}
              <mesh position={[w / 2, 0, 0]}>
                <boxGeometry args={[0.15, 1.4, l]} />
                <meshStandardMaterial
                  color={pIdx % 2 === 0 ? concreteColor : '#a8b5c4'}
                  roughness={0.8}
                  wireframe={wireframe}
                  transparent={transparent}
                  opacity={opacity}
                />
              </mesh>
            </group>
          ))}

          {/* Front Entrance Docks & Roll-up Industrial Door */}
          <group position={[0, 2.4, l / 2]}>
            {/* Roll-up Steel Shutter Door */}
            <mesh position={[0, 0, 0.05]} castShadow>
              <boxGeometry args={[5.0, 4.8, 0.1]} />
              <meshStandardMaterial color="#1e293b" metalness={0.8} roughness={0.3} wireframe={wireframe} />
            </mesh>
            {/* Door Yellow Safety Guard Posts */}
            <mesh position={[-2.8, -1.8, 0.3]}>
              <cylinderGeometry args={[0.1, 0.1, 1.2, 16]} />
              <meshStandardMaterial color="#eab308" />
            </mesh>
            <mesh position={[2.8, -1.8, 0.3]}>
              <cylinderGeometry args={[0.1, 0.1, 1.2, 16]} />
              <meshStandardMaterial color="#eab308" />
            </mesh>
          </group>
        </group>
      )}
    </group>
  );
};
