import React, { useState, useEffect } from 'react';
import HeaderRow from './HeaderRow';
import VirtualizedRows from './VirtualizedRows';
import PaginationControls from './PaginationControls';

const Grid = ({ columns, data, rowsPerPage }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [filterConfig, setFilterConfig] = useState({});
  const [filteredData, setFilteredData] = useState(data);

  // Фильтрация данных
  useEffect(() => {
    let filtered = data;

    // Применяем фильтрацию по всем колонкам
    Object.keys(filterConfig).forEach((column) => {
      if (filterConfig[column]) {
        filtered = filtered.filter((row) =>
          row[column].toString().toLowerCase().includes(filterConfig[column])
        );
      }
    });

    setFilteredData(filtered);
  }, [filterConfig, data]);

  // Сортировка данных
  const sortedData = [...filteredData].sort((a, b) => {
    if (!sortConfig.key) return 0;
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });

  // Общее количество страниц
  const totalPages = Math.ceil(sortedData.length / rowsPerPage);

  // Рассчитываем индексы начала и конца для текущей страницы
  const startRow = (currentPage - 1) * rowsPerPage;
  const endRow = Math.min(startRow + rowsPerPage, sortedData.length);

  // Данные для отображения на текущей странице
  const currentData = sortedData.slice(startRow, endRow);

  return (
    <div className="grid-container" style={{ height: '400px', overflowY: 'auto' }}>
      <table className="data-grid">
        <thead>
          <HeaderRow columns={columns} onSort={setSortConfig} />
        </thead>
        <VirtualizedRows columns={columns} data={currentData} rowHeight={50} containerHeight={400} />
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
