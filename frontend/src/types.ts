export interface LinkPropType {
  name: string;
  path: string;
}

export type Theme = {
  name: string;
  wrongType: string;
  correctType: string;
  untyped: string;
  background: string;
  buttonBackground: string;
  buttonText: string;
  cursorColor: string;
  textColor: string;
};

export interface ToolTipStyle {
  backgroundColor: string;
  color: string;
}

export interface TimerType {
  startTime: number;
  onTimeUp: () => void;
}
