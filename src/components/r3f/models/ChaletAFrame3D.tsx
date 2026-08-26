import React, { useMemo } from 'react';
import * as THREE from 'three';
import { Viewer3DControls } from '../types';

interface Props {
  controls: Viewer3DControls;
}

export const ChaletAFrame3D: React.FC<Props> = ({ controls }) => {
  const {
    wireframe,
    xray,
    explodedOffset,
    showFoundation,
    showColumns,
    showSlabs,
    showRoof,
    showWalls,
    hasSubsolo
  } = controls;

  // Material helpers
  const opacity = xray ? 0.35 : 1.0;
  const transparent = xray;

  // Colors
  const steelDark = '#1e293b';
  const steelAccent = '#f59e0b';
  const woodDeck = '#b45309';
  const concreteColor = '#94a3b8';
  const glassColor = '#38bdf8';
  const roofColor = '#334155';

  const w = 7.0;
  const l = 8.5;
  const h = 6.8;
  const numFrames = 5;
  const stepZ = l / (numFrames - 1);

  // Altura dos pilotis estruturais elevados (acima do solo). Quando o terreno
  // exige pilotis/elevação, a casa sobe acima do nível do solo sobre pilotis metálicos
  // com sapatas no chão e escada de acesso. Sem pilotis, fica assentada ao nível do solo.
  const PILOTIS_HEIGHT = 2.4;
  const raise = hasSubsolo ? PILOTIS_HEIGHT : 0;

  // Exploded offsets
  const expY = explodedOffset * 3.5;
  const expZ = explodedOffset * 2.0;

  // Calculate precise triangular shape for back wall (fits strictly inside structural A-Frame profile)
  const backWallShape = useMemo(() => {
    const shape = new THREE.Shape();
    // Inset to seat precisely inside the steel A-frame outer flange
    const inset = 0.12;
    const halfWidth = w / 2 - inset;
    const peakHeight = h - inset * (h / (w / 2));

    shape.moveTo(-halfWidth, 0.05);
    shape.lineTo(halfWidth, 0.05);
    shape.lineTo(0, peakHeight);
    shape.closePath();
    return shape;
  }, [w, h]);

  // Front glass triangular shape
  const frontGlassShape = useMemo(() => {
    const shape = new THREE.Shape();
    const inset = 0.15;
    const halfWidth = w / 2 - inset;
    const peakHeight = h - inset * (h / (w / 2));

    shape.moveTo(-halfWidth, 0.05);
    shape.lineTo(halfWidth, 0.05);
    shape.lineTo(0, peakHeight);
    shape.closePath();
    return shape;
  }, [w, h]);

  return (
    <group position={[0, 0, 0]}>
      {/* 0. ESTRUTURA DE PILOTIS ELEVADOS ACIMA DO SOLO (Quando hasSubsolo = true) */}
      {hasSubsolo && (
        <group position={[0, 0, 0]}>
          {/* Sapatas e Blocos de Fundação no Solo (Y = 0) */}
          {Array.from({ length: numFrames }).map((_, i) => {
            const zPos = -l / 2 + i * stepZ;
            return (
              <group key={`pilotis-fnd-${i}`}>
                {/* Sapatas esquerda e direita no chão */}
                <mesh position={[-w / 2, -0.25, zPos]} castShadow>
                  <boxGeometry args={[0.8, 0.5, 0.8]} />
                  <meshStandardMaterial color="#64748b" roughness={0.9} wireframe={wireframe} />
                </mesh>
                <mesh position={[w / 2, -0.25, zPos]} castShadow>
                  <boxGeometry args={[0.8, 0.5, 0.8]} />
                  <meshStandardMaterial color="#64748b" roughness={0.9} wireframe={wireframe} />
                </mesh>
                {/* Placas base de ancoragem metálica */}
                <mesh position={[-w / 2, 0.02, zPos]}>
                  <boxGeometry args={[0.35, 0.04, 0.35]} />
                  <meshStandardMaterial color={steelAccent} metalness={0.8} />
                </mesh>
                <mesh position={[w / 2, 0.02, zPos]}>
                  <boxGeometry args={[0.35, 0.04, 0.35]} />
                  <meshStandardMaterial color={steelAccent} metalness={0.8} />
                </mesh>
                {/* Pilares / Pilotis verticais de aço subindo do solo (Y=0) até o deck elevado (Y=PILOTIS_HEIGHT) */}
                <mesh position={[-w / 2, PILOTIS_HEIGHT / 2, zPos]} castShadow>
                  <boxGeometry args={[0.22, PILOTIS_HEIGHT, 0.22]} />
                  <meshStandardMaterial color={steelDark} metalness={0.7} roughness={0.3} wireframe={wireframe} />
                </mesh>
                <mesh position={[w / 2, PILOTIS_HEIGHT / 2, zPos]} castShadow>
                  <boxGeometry args={[0.22, PILOTIS_HEIGHT, 0.22]} />
                  <meshStandardMaterial color={steelDark} metalness={0.7} roughness={0.3} wireframe={wireframe} />
                </mesh>
              </group>
            );
          })}

          {/* Vigas Longitudinais e Transversais de Travamento do Deck Elevado (no topo dos pilotis) */}
          <mesh position={[-w / 2, PILOTIS_HEIGHT - 0.1, 0]} castShadow>
            <boxGeometry args={[0.2, 0.25, l + 0.4]} />
            <meshStandardMaterial color={steelDark} metalness={0.7} wireframe={wireframe} />
          </mesh>
          <mesh position={[w / 2, PILOTIS_HEIGHT - 0.1, 0]} castShadow>
            <boxGeometry args={[0.2, 0.25, l + 0.4]} />
            <meshStandardMaterial color={steelDark} metalness={0.7} wireframe={wireframe} />
          </mesh>
          <mesh position={[0, PILOTIS_HEIGHT - 0.1, -l / 2]} castShadow>
            <boxGeometry args={[w + 0.2, 0.25, 0.2]} />
            <meshStandardMaterial color={steelDark} metalness={0.7} wireframe={wireframe} />
          </mesh>
          <mesh position={[0, PILOTIS_HEIGHT - 0.1, l / 2]} castShadow>
            <boxGeometry args={[w + 0.2, 0.25, 0.2]} />
            <meshStandardMaterial color={steelDark} metalness={0.7} wireframe={wireframe} />
          </mesh>

          {/* Contraventamento Metálico em X nas laterais para estabilidade estrutural NBR 8800 */}
          {Array.from({ length: numFrames - 1 }).map((_, i) => {
            const zStart = -l / 2 + i * stepZ;
            const zMid = zStart + stepZ / 2;
            const diagLen = Math.sqrt(stepZ ** 2 + PILOTIS_HEIGHT ** 2);
            const diagAngle = Math.atan2(stepZ, PILOTIS_HEIGHT);

            return (
              <group key={`bracing-${i}`}>
                {/* Lado Esquerdo */}
                <mesh position={[-w / 2, PILOTIS_HEIGHT / 2, zMid]} rotation={[diagAngle, 0, 0]}>
                  <cylinderGeometry args={[0.03, 0.03, diagLen, 8]} />
                  <meshStandardMaterial color={steelAccent} metalness={0.8} />
                </mesh>
                <mesh position={[-w / 2, PILOTIS_HEIGHT / 2, zMid]} rotation={[-diagAngle, 0, 0]}>
                  <cylinderGeometry args={[0.03, 0.03, diagLen, 8]} />
                  <meshStandardMaterial color={steelAccent} metalness={0.8} />
                </mesh>
                {/* Lado Direito */}
                <mesh position={[w / 2, PILOTIS_HEIGHT / 2, zMid]} rotation={[diagAngle, 0, 0]}>
                  <cylinderGeometry args={[0.03, 0.03, diagLen, 8]} />
                  <meshStandardMaterial color={steelAccent} metalness={0.8} />
                </mesh>
                <mesh position={[w / 2, PILOTIS_HEIGHT / 2, zMid]} rotation={[-diagAngle, 0, 0]}>
                  <cylinderGeometry args={[0.03, 0.03, diagLen, 8]} />
                  <meshStandardMaterial color={steelAccent} metalness={0.8} />
                </mesh>
              </group>
            );
          })}

          {/* Escada Metálica de Acesso Frontal subindo do Solo até o Deck Elevado */}
          <group position={[w * 0.3, 0, l / 2 + 0.6]}>
            {Array.from({ length: 8 }).map((_, stepIdx) => {
              const stepY = (stepIdx / 8) * PILOTIS_HEIGHT;
              const stepZ = (stepIdx / 8) * 1.6;
              return (
                <mesh key={`stair-${stepIdx}`} position={[0, stepY, 1.6 - stepZ]}>
                  <boxGeometry args={[1.0, 0.06, 0.28]} />
                  <meshStandardMaterial color={steelDark} metalness={0.8} />
                </mesh>
              );
            })}
            {/* Longarinas da escada */}
            <mesh position={[-0.52, PILOTIS_HEIGHT / 2, 0.8]} rotation={[-Math.atan2(1.6, PILOTIS_HEIGHT), 0, 0]}>
              <boxGeometry args={[0.05, Math.sqrt(PILOTIS_HEIGHT ** 2 + 1.6 ** 2), 0.15]} />
              <meshStandardMaterial color={steelAccent} metalness={0.8} />
            </mesh>
            <mesh position={[0.52, PILOTIS_HEIGHT / 2, 0.8]} rotation={[-Math.atan2(1.6, PILOTIS_HEIGHT), 0, 0]}>
              <boxGeometry args={[0.05, Math.sqrt(PILOTIS_HEIGHT ** 2 + 1.6 ** 2), 0.15]} />
              <meshStandardMaterial color={steelAccent} metalness={0.8} />
            </mesh>
          </group>
        </group>
      )}

      <group position={[0, raise, 0]}>
      {/* 1. FOUNDATION / SAPATAS AO NÍVEL DO SOLO (Renderizada quando não há pilotis ou laje de piso) */}
      {showFoundation && (
        <group position={[0, 0, 0]}>
          {/* Laje de Piso / Deck Estrutural */}
          <mesh position={[0, -0.1, 0]} receiveShadow>
            <boxGeometry args={[w + (hasSubsolo ? 0.4 : 1.2), 0.2, l + (hasSubsolo ? 0.4 : 1.2)]} />
            <meshStandardMaterial
              color={concreteColor}
              roughness={0.8}
              wireframe={wireframe}
              transparent={transparent}
              opacity={opacity}
            />
          </mesh>

          {/* Sapatas no Solo (renderizadas apenas quando no nível do solo sem pilotis) */}
          {!hasSubsolo &&
            Array.from({ length: numFrames }).map((_, i) => {
              const zPos = -l / 2 + i * stepZ;
              return (
                <group key={`sapata-${i}`} position={[0, 0, zPos]}>
                  {/* Left Footing */}
                  <mesh position={[-w / 2, -0.45, 0]} castShadow>
                    <boxGeometry args={[0.7, 0.45, 0.7]} />
                    <meshStandardMaterial color="#64748b" wireframe={wireframe} />
                  </mesh>
                  {/* Right Footing */}
                  <mesh position={[w / 2, -0.45, 0]} castShadow>
                    <boxGeometry args={[0.7, 0.45, 0.7]} />
                    <meshStandardMaterial color="#64748b" wireframe={wireframe} />
                  </mesh>
                  {/* Steel Baseplates & Anchors on top of footing at ground level Y=0 */}
                  <mesh position={[-w / 2, 0.02, 0]}>
                    <boxGeometry args={[0.3, 0.04, 0.3]} />
                    <meshStandardMaterial color={steelAccent} wireframe={wireframe} />
                  </mesh>
                  <mesh position={[w / 2, 0.02, 0]}>
                    <boxGeometry args={[0.3, 0.04, 0.3]} />
                    <meshStandardMaterial color={steelAccent} wireframe={wireframe} />
                  </mesh>
                </group>
              );
            })}
        </group>
      )}

      {/* 2. MAIN A-FRAME STEEL TRUSSES / COLUMNS (From Y=0 to Y=H) */}
      {showColumns && (
        <group position={[0, 0, 0]}>
          {Array.from({ length: numFrames }).map((_, i) => {
            const zPos = -l / 2 + i * stepZ + (i - (numFrames - 1) / 2) * expZ * 0.4;
            const hypotenuse = Math.sqrt((w / 2) ** 2 + h ** 2);
            const angle = Math.atan2(w / 2, h);

            return (
              <group key={`frame-${i}`} position={[0, 0, zPos]}>
                {/* Left Incline Leg */}
                <mesh
                  position={[-w / 4, h / 2, 0]}
                  rotation={[0, 0, -angle]}
                  castShadow
                >
                  <boxGeometry args={[0.2, hypotenuse, 0.2]} />
                  <meshStandardMaterial
                    color={steelDark}
                    metalness={0.7}
                    roughness={0.3}
                    wireframe={wireframe}
                    transparent={transparent}
                    opacity={opacity}
                  />
                </mesh>

                {/* Right Incline Leg */}
                <mesh
                  position={[w / 4, h / 2, 0]}
                  rotation={[0, 0, angle]}
                  castShadow
                >
                  <boxGeometry args={[0.2, hypotenuse, 0.2]} />
                  <meshStandardMaterial
                    color={steelDark}
                    metalness={0.7}
                    roughness={0.3}
                    wireframe={wireframe}
                    transparent={transparent}
                    opacity={opacity}
                  />
                </mesh>

                {/* Ground Tie Beam at Ground Level Y=0.08 */}
                <mesh position={[0, 0.08, 0]} castShadow>
                  <boxGeometry args={[w, 0.16, 0.16]} />
                  <meshStandardMaterial
                    color={steelDark}
                    metalness={0.7}
                    roughness={0.3}
                    wireframe={wireframe}
                  />
                </mesh>

                {/* Mezzanine Cross Collar Tie Beam (Floor level Y=2.6) */}
                <mesh position={[0, 2.6, 0]} castShadow>
                  <boxGeometry args={[w * 0.62, 0.16, 0.16]} />
                  <meshStandardMaterial
                    color={steelAccent}
                    metalness={0.6}
                    roughness={0.3}
                    wireframe={wireframe}
                  />
                </mesh>

                {/* Top Ridge Joint Gusset */}
                <mesh position={[0, h - 0.05, 0]}>
                  <boxGeometry args={[0.35, 0.25, 0.25]} />
                  <meshStandardMaterial color={steelAccent} wireframe={wireframe} />
                </mesh>
              </group>
            );
          })}

          {/* Ridge Beam at top */}
          <mesh position={[0, h, 0]} castShadow>
            <boxGeometry args={[0.22, 0.22, l + 0.4]} />
            <meshStandardMaterial color={steelDark} metalness={0.8} roughness={0.2} wireframe={wireframe} />
          </mesh>

          {/* Longitudinal Purlins / Terças */}
          {[-w * 0.35, w * 0.35, -w * 0.18, w * 0.18].map((xPos, pIdx) => (
            <mesh key={`purlin-${pIdx}`} position={[xPos, (1 - Math.abs(xPos) / (w / 2)) * h, 0]}>
              <boxGeometry args={[0.08, 0.08, l + 0.3]} />
              <meshStandardMaterial color="#475569" metalness={0.6} wireframe={wireframe} />
            </mesh>
          ))}
        </group>
      )}

      {/* 3. SLABS & MEZZANINE (Piso Térreo + Mezanino) */}
      {showSlabs && (
        <group position={[0, expY * 0.3, 0]}>
          {/* Ground Wooden Deck & Porch (resting directly on ground level Y=0) */}
          <mesh position={[0, 0.06, 0.4]} receiveShadow>
            <boxGeometry args={[w - 0.2, 0.12, l + 1.2]} />
            <meshStandardMaterial
              color={woodDeck}
              roughness={0.6}
              wireframe={wireframe}
              transparent={transparent}
              opacity={opacity}
            />
          </mesh>

          {/* Mezanino Floor Deck (Y=2.68) */}
          <mesh position={[0, 2.68, -l * 0.15]} castShadow receiveShadow>
            <boxGeometry args={[w * 0.6, 0.08, l * 0.65]} />
            <meshStandardMaterial
              color="#d97706"
              roughness={0.5}
              wireframe={wireframe}
              transparent={transparent}
              opacity={opacity}
            />
          </mesh>

          {/* Mezzanine Safety Glass Railing / Guarda-corpo */}
          <mesh position={[0, 3.2, l * 0.18]}>
            <boxGeometry args={[w * 0.58, 0.9, 0.04]} />
            <meshStandardMaterial
              color={glassColor}
              transparent
              opacity={0.4}
              roughness={0.1}
              metalness={0.9}
            />
          </mesh>
          {/* Railing Top Handrail */}
          <mesh position={[0, 3.65, l * 0.18]}>
            <boxGeometry args={[w * 0.58, 0.04, 0.06]} />
            <meshStandardMaterial color={steelAccent} metalness={0.7} />
          </mesh>

          {/* Staircase to Mezzanine */}
          <group position={[w * 0.18, 1.3, 0.2]}>
            <mesh rotation={[0.45, 0, 0]} castShadow>
              <boxGeometry args={[0.8, 3.1, 0.06]} />
              <meshStandardMaterial color="#92400e" wireframe={wireframe} />
            </mesh>
          </group>
        </group>
      )}

      {/* 4. ROOF CLADDING & INSULATION / TELHADO ISOTÉRMICO */}
      {showRoof && (
        <group position={[0, expY, 0]}>
          {/* Left Roof Plane */}
          <mesh
            position={[-w / 4 - 0.06, h / 2, 0]}
            rotation={[0, 0, -Math.atan2(w / 2, h)]}
            castShadow
            receiveShadow
          >
            <boxGeometry args={[0.08, Math.sqrt((w / 2) ** 2 + h ** 2) + 0.2, l + 0.6]} />
            <meshStandardMaterial
              color={roofColor}
              roughness={0.4}
              metalness={0.3}
              wireframe={wireframe}
              transparent={transparent}
              opacity={opacity * 0.95}
            />
          </mesh>

          {/* Right Roof Plane */}
          <mesh
            position={[w / 4 + 0.06, h / 2, 0]}
            rotation={[0, 0, Math.atan2(w / 2, h)]}
            castShadow
            receiveShadow
          >
            <boxGeometry args={[0.08, Math.sqrt((w / 2) ** 2 + h ** 2) + 0.2, l + 0.6]} />
            <meshStandardMaterial
              color={roofColor}
              roughness={0.4}
              metalness={0.3}
              wireframe={wireframe}
              transparent={transparent}
              opacity={opacity * 0.95}
            />
          </mesh>
        </group>
      )}

      {/* 5. WALLS, TRIANGULAR BACK CLOSURE & GLASS CURTAIN FAÇADE */}
      {showWalls && (
        <group position={[0, 0, 0]}>
          {/* Back Wall - Precise Triangular Thermal Wood/Panel Siding */}
          <mesh position={[0, 0, -l / 2 - 0.02]} castShadow receiveShadow>
            <extrudeGeometry
              args={[
                backWallShape,
                {
                  depth: 0.08,
                  bevelEnabled: false
                }
              ]}
            />
            <meshStandardMaterial
              color="#3b1f13"
              roughness={0.7}
              wireframe={wireframe}
              transparent={transparent}
              opacity={opacity}
            />
          </mesh>

          {/* Front Glass Wall Facade with Black Aluminum Framing */}
          <group position={[0, 0, l / 2]}>
            {/* Triangular Glass Curtain Panel */}
            <mesh position={[0, 0, 0]}>
              <extrudeGeometry
                args={[
                  frontGlassShape,
                  {
                    depth: 0.03,
                    bevelEnabled: false
                  }
                ]}
              />
              <meshStandardMaterial
                color={glassColor}
                transparent
                opacity={0.35}
                roughness={0.1}
                metalness={0.9}
                wireframe={wireframe}
              />
            </mesh>

            {/* Vertical Mullion Profiles fitted inside the triangle */}
            <mesh position={[-0.85, 2.5, 0.04]}>
              <boxGeometry args={[0.06, 5.0, 0.06]} />
              <meshStandardMaterial color={steelDark} />
            </mesh>
            <mesh position={[0.85, 2.5, 0.04]}>
              <boxGeometry args={[0.06, 5.0, 0.06]} />
              <meshStandardMaterial color={steelDark} />
            </mesh>

            {/* Transom Mullion Profile at Mezzanine Line */}
            <mesh position={[0, 2.6, 0.04]}>
              <boxGeometry args={[w * 0.62, 0.06, 0.06]} />
              <meshStandardMaterial color={steelDark} />
            </mesh>
          </group>
        </group>
      )}
      </group>
    </group>
  );
};
