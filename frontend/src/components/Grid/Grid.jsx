import React, { useState } from 'react';
import HeaderRow from './HeaderRow.jsx';
import PaginationControls from './PaginationControls.jsx';
import EditableCell from './EditableCell.jsx';  // Импортируем компонент редактирования
import './tableStyle.css';  // Подключаем стили для таблицы в Grid

const Grid = ({ columns, data, rowsPerPage, onCellChange }) => {
  const [currentPage, setCurrentPage] = useState(1);

  // Общее количество страниц
  const totalPages = Math.ceil(data.length / rowsPerPage);

  // Рассчитываем индексы начала и конца для текущей страницы
  const startRow = (currentPage - 1) * rowsPerPage;
  const endRow = Math.min(startRow + rowsPerPage, data.length);

  // Данные для отображения на текущей странице
  const currentData = data.slice(startRow, endRow);

  console.log("Current page data in Grid:", currentData);  // Отладка данных текущей страницы

  return (
    <div className="grid-container" style={{ height: '400px', overflowY: 'auto' }}>
      <table className="data-grid">
        <thead>
          <HeaderRow columns={columns} />
        </thead>
        <tbody>
          {currentData.length > 0 ? currentData.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((column) => (
                <EditableCell
                  key={column}
                  field={column}
                  value={row[column] || ''}  // Если значение undefined, отображаем пустую строку
                  onCellChange={(field, value) => onCellChange(rowIndex + startRow, field, value)}
                />
              ))}
            </tr>
          )) : (
            <tr>
              <td colSpan={columns.length}>No data available</td>
            </tr>
          )}
        </tbody>
      </table>
      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default Grid;
