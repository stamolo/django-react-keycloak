import React from 'react';
import HeaderRow from './HeaderRow';
import VirtualizedRows from './VirtualizedRows'; // Импортируем компонент виртуализированных строк

const Grid = ({ columns, data }) => {
  return (
    <div className="grid-container" style={{ height: '400px', overflowY: 'auto' }}>
      <table className="data-grid">
        <thead>
          <HeaderRow columns={columns} />
        </thead>
        <VirtualizedRows columns={columns} data={data} rowHeight={50} containerHeight={400} />
      </table>
    </div>
  );
};

export default Grid;
