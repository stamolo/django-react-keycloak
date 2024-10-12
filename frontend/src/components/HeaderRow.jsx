import React from 'react';

const HeaderRow = ({ columns }) => {
  return (
    <tr>
      {columns.map((column, index) => (
        <th key={index}>{column}</th>
      ))}
    </tr>
  );
};

export default HeaderRow;
