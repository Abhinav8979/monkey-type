import React, { ReactNode } from "react";
import { Provider } from "react-redux";
import { practiceStore } from "./store";

interface PracticeProviderProps {
  children: ReactNode;
}

const PracticeProvider: React.FC<PracticeProviderProps> = ({ children }) => {
  return <Provider store={practiceStore}>{children}</Provider>;
};

export default PracticeProvider;
