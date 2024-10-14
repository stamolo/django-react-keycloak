import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';  // Импортируем DataGrid из MUI

export default function CompanyForm() {
  const [companies, setCompanies] = useState([]);
  const [newCompany, setNewCompany] = useState({ name: '', description: '', address: '', phone: '', website: '' });
  const [isSaving, setIsSaving] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  const fields = ['name', 'description', 'address', 'phone', 'website'];

  useEffect(() => {
    fetch('http://localhost:8000/api/companies/', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    })
      .then((response) => response.json())
      .then((data) => {
        const companiesWithIds = data.map((company, index) => ({
          ...company,
          id: company.id || index,
        }));
        setCompanies(companiesWithIds);
      })
      .catch((error) => console.error('Error fetching companies:', error));
  }, []);

  const handleCompanyChange = (id, field, value) => {
    const updatedCompanies = companies.map((company) =>
      company.id === id ? { ...company, [field]: value } : company
    );
    setCompanies(updatedCompanies);
    setHasChanges(true);
  };

  const handleNewCompanyChange = (field, value) => {
    setNewCompany({ ...newCompany, [field]: value });
    setHasChanges(true);
  };

  const handleSaveAll = () => {
    setIsSaving(true);

    // Сохраняем существующие компании
    const saveExistingCompanies = companies.map((company) => {
      const url = `http://localhost:8000/api/companies/${company.id}/`;
      return fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(company),
      });
    });

    // Сохраняем новую компанию
    const saveNewCompany = newCompany.name && newCompany.description && newCompany.address && newCompany.phone && newCompany.website
      ? fetch('http://localhost:8000/api/companies/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
          body: JSON.stringify(newCompany),
        }).then(response => response.json())
         .then(savedCompany => {
           setCompanies([...companies, { ...savedCompany, id: savedCompany.id }]);
           setNewCompany({ name: '', description: '', address: '', phone: '', website: '' });
         })
      : Promise.resolve();

    Promise.all([...saveExistingCompanies, saveNewCompany])
      .then(() => {
        setIsSaving(false);
        setHasChanges(false);
        alert('All changes saved successfully!');
      })
      .catch((error) => {
        setIsSaving(false);
        console.error('Error saving companies:', error);
      });
  };

  // Определяем колонки для DataGrid
  const columns = [
    { field: 'name', headerName: 'Name', width: 150, editable: true },
    { field: 'description', headerName: 'Description', width: 200, editable: true },
    { field: 'address', headerName: 'Address', width: 200, editable: true },
    { field: 'phone', headerName: 'Phone', width: 150, editable: true },
    { field: 'website', headerName: 'Website', width: 200, editable: true },
  ];

  return (
    <div className="container mt-5">
      {/* Существующие компании */}
      <div className="row">
        <div className="col">
          <h2>Edit Companies</h2>
          <DataGrid
            rows={companies}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            checkboxSelection
            disableSelectionOnClick
            onCellEditCommit={(params) =>
              handleCompanyChange(params.id, params.field, params.value)
            }
            autoHeight
            getRowId={(row) => row.id}
          />
        </div>
      </div>

      {/* Строка добавления новой компании */}
      <div className="row mt-5">
        <div className="col">
          <h3>Add New Company</h3>
          <DataGrid
            rows={[newCompany]}
            columns={columns}
            pageSize={1}
            rowsPerPageOptions={[1]}
            disableSelectionOnClick
            autoHeight
            getRowId={() => 'new-company'}  // Временно задаем id для новой компании
            onCellEditCommit={(params) =>
              handleNewCompanyChange(params.field, params.value)
            }
          />
        </div>
      </div>

      {/* Кнопка сохранения */}
      <div className="row mt-4">
        <div className="col text-center">
          <button className="btn btn-primary" onClick={handleSaveAll} disabled={isSaving || !hasChanges}>
            {isSaving ? 'Saving...' : 'Save All Changes'}
          </button>
        </div>
      </div>
    </div>
  );
}
