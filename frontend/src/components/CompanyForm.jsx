import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';

export default function CompanyList() {
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    // GET запрос для получения списка компаний
    fetch('http://localhost:8000/api/companies/', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setCompanies(data))
      .catch((error) => {
        console.error('Error fetching companies:', error);
      });
  }, []);

  const handleProcessRowUpdate = (newRow) => {
    // Отправка обновлений на сервер
    fetch(`http://localhost:8000/api/companies/${newRow.id}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(newRow),
    })
      .then((response) => response.json())
      .then((updatedRow) => {
        // Обновление состояния с новым значением
        setCompanies((prev) =>
          prev.map((company) => (company.id === updatedRow.id ? updatedRow : company))
        );
      })
      .catch((error) => {
        console.error('Error updating company:', error);
      });
    return newRow;
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Name', width: 200, editable: true },
    { field: 'description', headerName: 'Description', width: 300, editable: true },
    { field: 'address', headerName: 'Address', width: 200, editable: true },
    { field: 'phone', headerName: 'Phone', width: 150, editable: true },
    { field: 'website', headerName: 'Website', width: 200, editable: true },
  ];

  return (
    <div style={{ height: 400, width: '100%' }}>
      <h2>Company List</h2>
      <DataGrid
        rows={companies}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5, 10, 20]}
        checkboxSelection
        processRowUpdate={handleProcessRowUpdate}
        experimentalFeatures={{ newEditingApi: true }}
      />
    </div>
  );
}
