export interface CylinderCalculationInput {
  cylinderDiameter: number;
  speed: number;
  pressure: number;
}

export interface CylinderCalculationResult {
  description: string;
  cylinderSize: number;
  area: number;
  speed: number;
  inletFlow: number;
  outletFlow: number;
  pressure: string | number;
  force: string | number;
}

export interface MainCylinderResult {
  description: string;
  cylinderSize: number;
  area: number;
  speed: number;
  inletFlow: number;
  outletFlow: number;
  pressure: number | string;
  force: string;
}

export interface MainCylinderResults {
  fastApproach: MainCylinderResult;
  pressing: MainCylinderResult;
  reverse: MainCylinderResult;
  prefillValveSize: string;
  cylinderPortSize: string;
  pipeBlockSize: string;
}

export interface MainCylinderCalculatorProps {
  onCalculate?: (results: MainCylinderResults) => void;
  initialValues?: Partial<MainCylinderResults>;
} 