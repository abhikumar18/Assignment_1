import React, { useContext, useState } from 'react';
import { TableData } from '.';
import { IoIosArrowDown, IoIosArrowForward } from 'react-icons/io';
import { MyContext, MyContextType } from '../Context/MyContext';

type NavItemProps = {
  data: TableData;
  selectedValue: string;
  setSelectedValue: (id: string) => void;
};

const NavItem: React.FC<NavItemProps> = ({
  data,
  selectedValue,
  setSelectedValue,
}) => {
  const { name, options } = data;
  const [open, setOpen] = useState(data.id === selectedValue);

  const { setRightPanelData } = useContext(MyContext) as MyContextType;

  const handleOptionClick = () => {
    setSelectedValue(data.id);

    if (!!options?.length) {
      setOpen(!open);
      setRightPanelData(
        options.map((option) => ({
          name: option.name,
          content: option?.content || '',
        }))
      );
    } else {
      setRightPanelData([{ name: data.name, content: data?.content || '' }]);
    }
  };

  return (
    <div>
      <div
        style={{
          cursor: 'pointer',
          padding: '5px 10px',
          display: 'flex',
          gap: '10px',
          fontSize: '14px',
          ...(selectedValue === data.id
            ? {
                backgroundColor: '#3F3D6B',
                color: 'white',
              }
            : {}),
        }}
        onClick={() => handleOptionClick()}
      >
        {!!options?.length && (
          <div>{open ? <IoIosArrowDown /> : <IoIosArrowForward />}</div>
        )}
        <div style={{ marginLeft: !options?.length ? '23px' : '' }}>{name}</div>
      </div>
      {open && !!options?.length && (
        <div style={{ marginLeft: '30px' }}>
          {options.map((option) => (
            <NavItem
              data={option}
              selectedValue={selectedValue}
              setSelectedValue={setSelectedValue}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default NavItem;
