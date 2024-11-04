import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';

export default function CompanyList() {
  const [companies, setCompanies] = useState([]);
  const [nextId, setNextId] = useState(0);

  useEffect(() => {
    // GET запрос для получения списка компаний
    fetch('http://localhost:8000/api/companies/', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setCompanies(data);
        setNextId(data.length ? Math.max(...data.map(item => item.id)) + 1 : 1);
      })
      .catch((error) => {
        console.error('Error fetching companies:', error);
      });
  }, []);

  const handleAddNewRow = () => {
    const newCompany = {
      id: nextId,
      name: 'New Company',
      description: 'Default description',
      address: 'Default address',
      phone: '123-456-7890',
      website: 'https://www.example.com',
      isNew: true,
    };
    setCompanies((prev) => [...prev, newCompany]);
    setNextId((prevId) => prevId + 1);
  };

  const handleProcessRowUpdate = (newRow) => {
    if (newRow.isNew) {
      fetch('http://localhost:8000/api/companies/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(newRow),
      })
        .then((response) => response.json())
        .then((createdRow) => {
          setCompanies((prev) =>
            prev.map((company) => (company.id === newRow.id ? createdRow : company))
          );
        })
        .catch((error) => {
          console.error('Error adding company:', error);
        });
    } else {
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
          setCompanies((prev) =>
            prev.map((company) => (company.id === updatedRow.id ? updatedRow : company))
          );
        })
        .catch((error) => {
          console.error('Error updating company:', error);
        });
    }
    return newRow;
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 70, editable: true },
    { field: 'name', headerName: 'Name', width: 200, editable: true },
    { field: 'description', headerName: 'Description', width: 300, editable: true },
    { field: 'address', headerName: 'Address', width: 200, editable: true },
    { field: 'phone', headerName: 'Phone', width: 150, editable: true },
    { field: 'website', headerName: 'Website', width: 200, editable: true },
  ];

  return (
    <div style={{ height: 500, width: '100%' }}>
      <h2>Company List</h2>
      <button onClick={handleAddNewRow}>Add New Company</button>
      <DataGrid
        rows={companies}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5, 10, 20]}
        checkboxSelection
        processRowUpdate={handleProcessRowUpdate}
        experimentalFeatures={{ newEditingApi: true }}
        initialState={{
          sorting: {
            sortModel: [{ field: 'id', sort: 'asc' }],
          },
        }}
      />
    </div>
  );
}
