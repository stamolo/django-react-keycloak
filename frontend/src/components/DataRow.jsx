import React from 'react';

const DataRow = ({ row, columns }) => {
  return (
    <tr>
      {columns.map((column, index) => (
        <td key={index}>{row[column]}</td>
      ))}
    </tr>
  );
};

export default DataRow;
