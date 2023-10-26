import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import NavItem from './NavItem';
import { MyContext, MyContextType } from '../Context/MyContext';

export type TableData = {
  id: string;
  name: string;
  level: number;
  parent_id: string;
  content?: string;
  options?: TableData[];
};

const LeftPanel = () => {
  const [tableOfContent, setTableOfContent] = useState<TableData[]>([]);
  const [selectedItem, setSelectedItem] = useState('');

  const { setRightPanelData } = useContext(MyContext) as MyContextType;

  const getTableData = (data: TableData[]) => {
    const tableData = data;

    tableData.sort((x, y) => y.level - x.level);

    data.forEach((chapter, i) => {
      if (chapter.parent_id) {
        const parentIndex = tableData.findIndex(
          (tableContent) => tableContent.id === chapter.parent_id
        );

        const parentOptions = tableData[parentIndex]?.options || [];

        tableData[parentIndex] = {
          ...tableData[parentIndex],
          options: [...parentOptions, tableData[i]],
        };
      }
    });

    return tableData.filter((data) => data.parent_id === '');
  };

  const getDataFromApi = async () => {
    const url = 'http://localhost:3004/data';
    const response = await axios.get(url);
    const data = getTableData(response.data.content.document);
    setSelectedItem(data[0].id);
    if (data[0].options) {
      setRightPanelData(
        data[0]?.options.map((option) => ({
          name: option.name,
          content: option?.content || '',
        }))
      );
    }

    setTableOfContent(data);
  };

  useEffect(() => {
    getDataFromApi();
  }, []);

  return (
    <div
      style={{
        border: '1px solid #E0E0E0',
        padding: '10px 20px',
        width: '20%',
        overflowY: 'auto',
      }}
    >
      {tableOfContent.map((data) => (
        <NavItem
          data={data}
          selectedValue={selectedItem}
          setSelectedValue={setSelectedItem}
        />
      ))}
    </div>
  );
};

export default LeftPanel;
