export type Model3DType =
  | 'chale-aframe'
  | 'chale-alpino'
  | 'galpao-industrial'
  | 'edificio-comercial'
  | 'modulo-pre-moldado';

export interface Model3DConfig {
  id: Model3DType;
  title: string;
  category: 'chale' | 'pre-fabricado' | 'metalico' | 'comercial';
  categoryLabel: string;
  shortDesc: string;
  fullDesc: string;
  dimensions: {
    widthM: number;
    lengthM: number;
    heightM: number;
    areaM2: number;
  };
  structuralSystem: string;
  norms: string[];
  estimatedSteelKg?: number;
  estimatedConcreteM3?: number;
  assemblyDays: string;
  cameraInitPos: [number, number, number];
  cameraTarget: [number, number, number];
  highlights: string[];
}

export interface Viewer3DControls {
  wireframe: boolean;
  xray: boolean;
  explodedOffset: number; // 0 to 1
  showFoundation: boolean;
  showColumns: boolean;
  showSlabs: boolean;
  showRoof: boolean;
  showWalls: boolean;
  autoRotate: boolean;
}
