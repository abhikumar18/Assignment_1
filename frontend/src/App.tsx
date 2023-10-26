import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import LeftPanel from './LeftPanel';
import RightPanel from './RightPanel';
import { MyContext } from './Context/MyContext';

function App() {
  const [rightPanelData, setRightPanelData] = useState<
    {
      name: string;
      content: string;
    }[]
  >([]);

  return (
    <div
      style={{ padding: '10px', display: 'flex', gap: '20px', height: '100vh' }}
    >
      <MyContext.Provider value={{ rightPanelData, setRightPanelData }}>
        <LeftPanel />
        <RightPanel />
      </MyContext.Provider>
    </div>
  );
}

export default App;
