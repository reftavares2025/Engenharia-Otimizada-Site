import React, { useMemo } from 'react';
import * as THREE from 'three';
import { Viewer3DControls } from '../types';

interface Props {
  controls: Viewer3DControls;
}

export const ChaletAlpino3D: React.FC<Props> = ({ controls }) => {
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

  const steelDark = '#0f172a';
  const steelGold = '#f59e0b';
  const concreteColor = '#94a3b8';
  const woodColor = '#92400e';
  const glassColor = '#38bdf8';
  const roofColor = '#1e293b';

  const w = 9.0;
  const l = 11.0;
  const h1 = 3.2; // First floor height
  const hTotal = 7.6; // Peak height

  const expY = explodedOffset * 4.0;
  const expZ = explodedOffset * 2.5;

  // Custom Pentagonal Back Wall Shape matching the roof slopes
  const backWallShape = useMemo(() => {
    const shape = new THREE.Shape();
    const inset = 0.18;
    const halfW = w / 2 - inset;

    shape.moveTo(-halfW, 0.05);
    shape.lineTo(halfW, 0.05);
    shape.lineTo(halfW, h1);
    shape.lineTo(0, hTotal - 0.12);
    shape.lineTo(-halfW, h1);
    shape.closePath();
    return shape;
  }, [w, h1, hTotal]);

  // Upper floor triangular/pentagonal glass facade
  const upperFrontGlassShape = useMemo(() => {
    const shape = new THREE.Shape();
    const inset = 0.22;
    const halfW = w / 2 - inset;

    shape.moveTo(-halfW, h1 + 0.05);
    shape.lineTo(halfW, h1 + 0.05);
    shape.lineTo(0, hTotal - 0.15);
    shape.closePath();
    return shape;
  }, [w, h1, hTotal]);

  return (
    <group position={[0, 0, 0]}>
      {/* 1. FOUNDATION & PILOTIS / DECK BASE (Under Ground Level Y <= 0) */}
      {showFoundation && (
        <group position={[0, 0, 0]}>
          {/* Concrete Footing Grid under soil */}
          {[-w / 2 + 0.5, 0, w / 2 - 0.5].map((x, xi) =>
            [-l / 2 + 0.5, 0, l / 2 - 0.5, l / 2 + 2.0].map((z, zi) => (
              <group key={`fnd-${xi}-${zi}`} position={[x, 0, z]}>
                <mesh position={[0, -0.3, 0]} castShadow>
                  <boxGeometry args={[0.8, 0.5, 0.8]} />
                  <meshStandardMaterial color={concreteColor} roughness={0.9} wireframe={wireframe} />
                </mesh>
                <mesh position={[0, 0.02, 0]}>
                  <boxGeometry args={[0.35, 0.04, 0.35]} />
                  <meshStandardMaterial color={steelGold} wireframe={wireframe} />
                </mesh>
              </group>
            ))
          )}

          {/* Front Elevated Outdoor Pool & Deck Structure */}
          <group position={[0, 0, l / 2 + 1.2]}>
            {/* Swimming Pool Basin under ground */}
            <mesh position={[w * 0.22, -0.15, 0.2]} castShadow receiveShadow>
              <boxGeometry args={[2.6, 0.5, 2.2]} />
              <meshStandardMaterial color="#0284c7" roughness={0.3} metalness={0.5} />
            </mesh>
            {/* Pool Water at Ground Level Y=0.08 */}
            <mesh position={[w * 0.22, 0.08, 0.2]}>
              <boxGeometry args={[2.4, 0.04, 2.0]} />
              <meshStandardMaterial color="#38bdf8" transparent opacity={0.7} roughness={0.1} />
            </mesh>
          </group>
        </group>
      )}

      {/* 2. STEEL SKELETON (COLUMNS & PERIMETER BEAMS from Y=0 to Y=hTotal) */}
      {showColumns && (
        <group position={[0, 0, 0]}>
          {/* Vertical Steel W-Columns (Ground floor: Y=0 to Y=h1) */}
          {[-w / 2 + 0.5, 0, w / 2 - 0.5].map((x, xi) =>
            [-l / 2 + 0.5, 0, l / 2 - 0.5].map((z, zi) => (
              <mesh key={`col-${xi}-${zi}`} position={[x, h1 / 2, z]} castShadow>
                <boxGeometry args={[0.22, h1, 0.22]} />
                <meshStandardMaterial
                  color={steelDark}
                  metalness={0.8}
                  roughness={0.2}
                  wireframe={wireframe}
                  transparent={transparent}
                  opacity={opacity}
                />
              </mesh>
            ))
          )}

          {/* Upper Mezzanine Columns */}
          {[-w / 2 + 0.5, w / 2 - 0.5].map((x, xi) =>
            [-l / 2 + 0.5, 0, l / 2 - 0.5].map((z, zi) => (
              <mesh key={`col-up-${xi}-${zi}`} position={[x, h1 + (hTotal - h1) * 0.35, z]} castShadow>
                <boxGeometry args={[0.18, (hTotal - h1) * 0.7, 0.18]} />
                <meshStandardMaterial
                  color={steelDark}
                  metalness={0.8}
                  roughness={0.2}
                  wireframe={wireframe}
                  transparent={transparent}
                  opacity={opacity}
                />
              </mesh>
            ))
          )}

          {/* First Floor Perimeter Steel Beams (Vigamento W at Y=h1) */}
          <group position={[0, h1, 0]}>
            {/* Front Cantilever / Balanço da Varanda */}
            <mesh position={[0, 0, l / 2 + 0.8]} castShadow>
              <boxGeometry args={[w, 0.25, 0.2]} />
              <meshStandardMaterial color={steelGold} metalness={0.7} wireframe={wireframe} />
            </mesh>
            {/* Longitudinal Edge Beams */}
            <mesh position={[-w / 2 + 0.5, 0, 0.4]} castShadow>
              <boxGeometry args={[0.2, 0.25, l + 1.6]} />
              <meshStandardMaterial color={steelDark} metalness={0.8} wireframe={wireframe} />
            </mesh>
            <mesh position={[w / 2 - 0.5, 0, 0.4]} castShadow>
              <boxGeometry args={[0.2, 0.25, l + 1.6]} />
              <meshStandardMaterial color={steelDark} metalness={0.8} wireframe={wireframe} />
            </mesh>
            {/* Cross Joists / Vigotas de Piso */}
            {[-l / 2 + 1, -l * 0.2, 0, l * 0.2, l / 2 - 1].map((z, jIdx) => (
              <mesh key={`joist-${jIdx}`} position={[0, 0, z]}>
                <boxGeometry args={[w - 1, 0.18, 0.12]} />
                <meshStandardMaterial color="#475569" metalness={0.6} wireframe={wireframe} />
              </mesh>
            ))}
          </group>

          {/* Roof Rafters & Alpine Trusses (Y=h1 to Y=hTotal) */}
          <group position={[0, h1, 0]}>
            {[-l / 2 + 0.5, 0, l / 2 - 0.5].map((z, tIdx) => {
              const roofLen = Math.sqrt((w / 2) ** 2 + (hTotal - h1) ** 2);
              const angle = Math.atan2(hTotal - h1, w / 2);
              return (
                <group key={`truss-${tIdx}`} position={[0, 0, z]}>
                  {/* Left Rafter */}
                  <mesh
                    position={[-w / 4, (hTotal - h1) / 2, 0]}
                    rotation={[0, 0, angle]}
                    castShadow
                  >
                    <boxGeometry args={[roofLen, 0.22, 0.18]} />
                    <meshStandardMaterial color={steelDark} metalness={0.7} wireframe={wireframe} />
                  </mesh>
                  {/* Right Rafter */}
                  <mesh
                    position={[w / 4, (hTotal - h1) / 2, 0]}
                    rotation={[0, 0, -angle]}
                    castShadow
                  >
                    <boxGeometry args={[roofLen, 0.22, 0.18]} />
                    <meshStandardMaterial color={steelDark} metalness={0.7} wireframe={wireframe} />
                  </mesh>
                </group>
              );
            })}
          </group>
        </group>
      )}

      {/* 3. SLABS & FLOORS (DECK TÉRREO + PISO SUPERIOR + MEZANINO) */}
      {showSlabs && (
        <group position={[0, expY * 0.25, 0]}>
          {/* Ground Floor Exterior Deck + Interior Floor at Y=0.06 */}
          <mesh position={[0, 0.06, 0.8]} receiveShadow>
            <boxGeometry args={[w + 0.6, 0.12, l + 3.2]} />
            <meshStandardMaterial
              color={woodColor}
              roughness={0.6}
              wireframe={wireframe}
              transparent={transparent}
              opacity={opacity}
            />
          </mesh>

          {/* Upper Mezzanine Floor Slab (Steel Deck at Y=h1 + 0.06) */}
          <mesh position={[0, h1 + 0.06, -l * 0.1]} castShadow receiveShadow>
            <boxGeometry args={[w - 0.8, 0.12, l * 0.75]} />
            <meshStandardMaterial
              color="#d97706"
              roughness={0.5}
              wireframe={wireframe}
              transparent={transparent}
              opacity={opacity}
            />
          </mesh>

          {/* Upper Cantilever Balcony / Varanda Panorâmica */}
          <mesh position={[0, h1 + 0.06, l / 2 + 0.6]} castShadow receiveShadow>
            <boxGeometry args={[w - 1.2, 0.1, 1.6]} />
            <meshStandardMaterial color={woodColor} roughness={0.6} />
          </mesh>

          {/* Glass Railing on Balcony */}
          <mesh position={[0, h1 + 0.55, l / 2 + 1.35]}>
            <boxGeometry args={[w - 1.2, 0.9, 0.03]} />
            <meshStandardMaterial color={glassColor} transparent opacity={0.35} metalness={0.9} />
          </mesh>
          <mesh position={[0, h1 + 1.02, l / 2 + 1.35]}>
            <boxGeometry args={[w - 1.2, 0.04, 0.06]} />
            <meshStandardMaterial color={steelGold} metalness={0.7} />
          </mesh>
        </group>
      )}

      {/* 4. ROOF STRUCTURE & THERMOACOUSTIC PANELS */}
      {showRoof && (
        <group position={[0, expY, 0]}>
          {/* Left Sloped Roof */}
          <mesh
            position={[-w / 4 - 0.08, h1 + (hTotal - h1) / 2 + 0.05, 0.2]}
            rotation={[0, 0, Math.atan2(hTotal - h1, w / 2)]}
            castShadow
          >
            <boxGeometry args={[Math.sqrt((w / 2) ** 2 + (hTotal - h1) ** 2) + 0.4, 0.08, l + 1.8]} />
            <meshStandardMaterial
              color={roofColor}
              roughness={0.4}
              metalness={0.4}
              wireframe={wireframe}
              transparent={transparent}
              opacity={opacity * 0.95}
            />
          </mesh>

          {/* Right Sloped Roof */}
          <mesh
            position={[w / 4 + 0.08, h1 + (hTotal - h1) / 2 + 0.05, 0.2]}
            rotation={[0, 0, -Math.atan2(hTotal - h1, w / 2)]}
            castShadow
          >
            <boxGeometry args={[Math.sqrt((w / 2) ** 2 + (hTotal - h1) ** 2) + 0.4, 0.08, l + 1.8]} />
            <meshStandardMaterial
              color={roofColor}
              roughness={0.4}
              metalness={0.4}
              wireframe={wireframe}
              transparent={transparent}
              opacity={opacity * 0.95}
            />
          </mesh>
        </group>
      )}

      {/* 5. WALLS, FIREPLACE CHIMNEY & GLASS FACADE */}
      {showWalls && (
        <group position={[0, 0, 0]}>
          {/* Back Wall - Precise Pentagonal Profile Closing strictly under the Alpine Roof */}
          <mesh position={[0, 0, -l / 2 + 0.4]} castShadow receiveShadow>
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
              roughness={0.8}
              transparent={transparent}
              opacity={opacity}
              wireframe={wireframe}
            />
          </mesh>

          {/* Ground Floor Front Glass Wall & Sliding Doors */}
          <mesh position={[0, h1 * 0.5, l / 2 - 0.4]}>
            <boxGeometry args={[w - 1.2, h1 * 0.9, 0.03]} />
            <meshStandardMaterial
              color={glassColor}
              transparent
              opacity={0.3}
              roughness={0.1}
              metalness={0.9}
            />
          </mesh>

          {/* Upper Mezzanine Triangular Front Glass Wall */}
          <mesh position={[0, 0, l / 2 - 0.4]}>
            <extrudeGeometry
              args={[
                upperFrontGlassShape,
                {
                  depth: 0.03,
                  bevelEnabled: false
                }
              ]}
            />
            <meshStandardMaterial
              color={glassColor}
              transparent
              opacity={0.3}
              roughness={0.1}
              metalness={0.9}
            />
          </mesh>

          {/* Fireplace & Stone Chimney Column passing through roof */}
          <group position={[-w / 2 + 1.4, 0, 0]}>
            <mesh position={[0, (h1 + 1.2) / 2, 0]} castShadow>
              <boxGeometry args={[0.9, h1 + 1.2, 1.1]} />
              <meshStandardMaterial color="#57534e" roughness={0.9} wireframe={wireframe} />
            </mesh>
            {/* Chimney Pipe top */}
            <mesh position={[0, h1 + 1.8, 0]}>
              <cylinderGeometry args={[0.15, 0.15, 1.2, 16]} />
              <meshStandardMaterial color="#1e293b" metalness={0.8} />
            </mesh>
          </group>
        </group>
      )}
    </group>
  );
};
