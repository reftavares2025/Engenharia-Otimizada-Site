import React, { Suspense, useRef, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Grid, Center, GizmoHelper, GizmoViewport } from '@react-three/drei';
import type { OrbitControls as OrbitControlsType } from 'three-stdlib';
import { Model3DType, Viewer3DControls } from './types';
import { MODEL_3D_PRESETS } from './modelPresets';
import { ChaletAFrame3D } from './models/ChaletAFrame3D';
import { ChaletAlpino3D } from './models/ChaletAlpino3D';
import { GalpaoIndustrial3D } from './models/GalpaoIndustrial3D';
import { EdificioComercial3D } from './models/EdificioComercial3D';
import { ModuloPreFabricado3D } from './models/ModuloPreFabricado3D';

interface Props {
  modelType: Model3DType;
  controls: Viewer3DControls;
  cameraPreset?: 'iso' | 'front' | 'top' | 'side';
}

function SceneRenderer({ modelType, controls, cameraPreset }: Props) {
  const controlsRef = useRef<OrbitControlsType>(null);
  const currentConfig = MODEL_3D_PRESETS.find((m) => m.id === modelType) || MODEL_3D_PRESETS[0];

  // Camera presets adjustment
  useEffect(() => {
    if (!controlsRef.current) return;
    const [cx, cy, cz] = currentConfig.cameraInitPos;
    const [tx, ty, tz] = currentConfig.cameraTarget;

    controlsRef.current.target.set(tx, ty, tz);

    if (cameraPreset === 'front') {
      controlsRef.current.object.position.set(0, cy * 0.9, cz * 1.3);
    } else if (cameraPreset === 'top') {
      controlsRef.current.object.position.set(0.01, cy * 2.2, 0.01);
    } else if (cameraPreset === 'side') {
      controlsRef.current.object.position.set(cx * 1.4, cy * 0.9, 0);
    } else {
      // Default Isometric
      controlsRef.current.object.position.set(cx, cy, cz);
    }
    controlsRef.current.update();
  }, [modelType, cameraPreset, currentConfig]);

  return (
    <>
      {/* Dynamic Lighting Setup for High Fidelity Structural Renders */}
      <ambientLight intensity={0.85} />
      <directionalLight
        position={[20, 35, 20]}
        intensity={1.5}
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-camera-near={0.5}
        shadow-camera-far={100}
        shadow-camera-left={-25}
        shadow-camera-right={25}
        shadow-camera-top={25}
        shadow-camera-bottom={-25}
      />
      <directionalLight position={[-20, 15, -20]} intensity={0.7} />
      <pointLight position={[0, 15, 0]} intensity={0.6} color="#38bdf8" />

      {/* Orbit Controls with Smooth Damping & Auto-Rotation */}
      <OrbitControls
        ref={controlsRef}
        makeDefault
        enableDamping
        dampingFactor={0.05}
        autoRotate={controls.autoRotate}
        autoRotateSpeed={1.2}
        minDistance={3}
        maxDistance={60}
        maxPolarAngle={Math.PI / 2 + 0.05} // Don't flip below ground
      />

      {/* Architectural Ground Grid Floor at Ground Level Y = 0 */}
      <Grid
        position={[0, 0, 0]}
        args={[50, 50]}
        cellSize={1.0}
        cellThickness={1.0}
        cellColor="#334155"
        sectionSize={5.0}
        sectionThickness={1.5}
        sectionColor="#38bdf8"
        fadeDistance={45}
        fadeStrength={1.2}
      />

      {/* Active 3D Model Geometry (Assented exactly at Ground Level Y = 0) */}
      <group position={[0, 0, 0]}>
        {modelType === 'chale-aframe' && <ChaletAFrame3D controls={controls} />}
        {modelType === 'chale-alpino' && <ChaletAlpino3D controls={controls} />}
        {modelType === 'galpao-industrial' && <GalpaoIndustrial3D controls={controls} />}
        {modelType === 'edificio-comercial' && <EdificioComercial3D controls={controls} />}
        {modelType === 'modulo-pre-moldado' && <ModuloPreFabricado3D controls={controls} />}
      </group>

      {/* Coordinate Axes Gizmo (Top Right) */}
      <GizmoHelper alignment="bottom-right" margin={[60, 60]}>
        <GizmoViewport axisColors={['#ef4444', '#22c55e', '#3b82f6']} labelColor="#ffffff" />
      </GizmoHelper>
    </>
  );
}

export const Model3DCanvas: React.FC<Props> = ({ modelType, controls, cameraPreset }) => {
  const currentConfig = MODEL_3D_PRESETS.find((m) => m.id === modelType) || MODEL_3D_PRESETS[0];

  return (
    <div className="w-full h-full relative select-none touch-none">
      <Canvas
        shadows
        camera={{
          position: currentConfig.cameraInitPos,
          fov: 45,
          near: 0.1,
          far: 1000
        }}
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: 'high-performance'
        }}
        className="w-full h-full bg-slate-950"
      >
        <color attach="background" args={['#090d16']} />
        <Suspense fallback={null}>
          <SceneRenderer
            modelType={modelType}
            controls={controls}
            cameraPreset={cameraPreset}
          />
        </Suspense>
      </Canvas>
    </div>
  );
};
