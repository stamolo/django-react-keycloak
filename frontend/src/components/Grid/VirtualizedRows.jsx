import React, { useState, useEffect, useRef } from 'react';
import DataRow from './DataRow.jsx';

const VirtualizedRows = ({ columns, data, rowHeight, containerHeight }) => {
  const [visibleRows, setVisibleRows] = useState({ start: 0, end: 10 });
  const containerRef = useRef(null);

  // Функция для обработки скроллинга и определения видимых строк
  const handleScroll = () => {
    const scrollTop = containerRef.current.scrollTop;
    const startRow = Math.floor(scrollTop / rowHeight);
    const endRow = Math.min(data.length, startRow + Math.ceil(containerHeight / rowHeight));
    setVisibleRows({ start: startRow, end: endRow });
  };

  useEffect(() => {
    const container = containerRef.current;
    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <tbody ref={containerRef}>
      <tr style={{ height: visibleRows.start * rowHeight + 'px' }} />
      {data.slice(visibleRows.start, visibleRows.end).map((row, index) => (
        <DataRow key={index + visibleRows.start} row={row} columns={columns} />
      ))}
      <tr style={{ height: (data.length - visibleRows.end) * rowHeight + 'px' }} />
    </tbody>
  );
};

export default VirtualizedRows;
