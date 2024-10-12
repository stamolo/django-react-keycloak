import React from 'react';

const HeaderRow = ({ columns, onSort }) => {
  return (
    <tr>
      {columns.map((column, index) => (
        <th key={index} onClick={() => onSort(column)}>
          {column} <span>{/* Можно добавить индикатор направления сортировки */}</span>
        </th>
      ))}
    </tr>
  );
};

export default HeaderRow;
