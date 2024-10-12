import React, { useState, useEffect } from 'react';
import HeaderRow from './HeaderRow';
import VirtualizedRows from './VirtualizedRows';

const Grid = ({ columns, data }) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [filterConfig, setFilterConfig] = useState({});
  const [filteredData, setFilteredData] = useState(data);

  // Фильтрация данных
  const handleFilter = (column, value) => {
    setFilterConfig({
      ...filterConfig,
      [column]: value.toLowerCase(),
    });
  };

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

  // Функция для сортировки данных
  const handleSort = (column) => {
    let direction = 'asc';
    if (sortConfig.key === column && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key: column, direction });
  };

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

  return (
    <div className="grid-container" style={{ height: '400px', overflowY: 'auto' }}>
      <table className="data-grid">
        <thead>
          <HeaderRow columns={columns} onSort={handleSort} />
        </thead>
        <VirtualizedRows columns={columns} data={sortedData} rowHeight={50} containerHeight={400} />
      </table>
      {/* Фильтрация */}
      {columns.map((column) => (
        <div key={column}>
          <input
            type="text"
            placeholder={`Filter by ${column}`}
            onChange={(e) => handleFilter(column, e.target.value)}
          />
        </div>
      ))}
    </div>
  );
};

export default Grid;
