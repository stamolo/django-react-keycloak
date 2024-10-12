import React from 'react';
import HeaderRow from './HeaderRow';
import DataRow from './DataRow';

const Grid = ({ columns, data }) => {
  return (
    <table className="data-grid">
      <thead>
        <HeaderRow columns={columns} />
      </thead>
      <tbody>
        {data.map((row, index) => (
          <DataRow key={index} row={row} columns={columns} />
        ))}
      </tbody>
    </table>
  );
};

export default Grid;
