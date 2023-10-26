import React, { useContext } from 'react';
import { MyContext, MyContextType } from '../Context/MyContext';

const RightPanel = () => {
  const { rightPanelData } = useContext(MyContext) as MyContextType;

  return (
    <div
      style={{
        border: '1px solid #E0E0E0',
        padding: '10px 20px',
        width: '100%',
        overflowY: 'auto',
      }}
    >
      {rightPanelData.map((data) => (
        <div>
          <p
            style={{ fontSize: '23px', fontWeight: '600', lineHeight: '31px' }}
          >
            {data.name}
          </p>
          <p style={{ fontSize: '16px', lineHeight: '22px' }}>{data.content}</p>
        </div>
      ))}
    </div>
  );
};

export default RightPanel;
