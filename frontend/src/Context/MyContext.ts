import { createContext } from 'react';

export type PanelData = {
  name: string;
  content: string;
};

export type MyContextType = {
  rightPanelData: PanelData[];
  setRightPanelData: (data: PanelData[]) => void;
};

export const MyContext = createContext<MyContextType | null>(null);
