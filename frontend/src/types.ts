import { Dispatch, SetStateAction } from "react";

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

export interface PracticeGameResult {
  wps: number;
  raw: number;
  accuracy: number;
  time: number;
  incorrect: number;
  correct: number;
  extra: number;
}

export interface Props {
  heading: string;
  setModal: Dispatch<SetStateAction<boolean>>;
}

export interface message {
  text: string;
  senderName: string;
}
