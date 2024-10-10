import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';  // Чтобы получить ID компании

export default function CompanyForm() {
  const { id } = useParams();  // Получение ID компании для редактирования
  const [company, setCompany] = useState({ name: '', description: '', address: '', phone: '', website: '' });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (id) {
      // Если id есть, значит это редактирование, делаем GET запрос
      fetch(`http://localhost:8000/api/companies/${id}/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setCompany(data);
          setIsEditing(true);
        })
        .catch((error) => {
          console.error('Error fetching company:', error);
        });
    }
  }, [id]);

  const handleChange = (e) => {
    setCompany({ ...company, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const method = isEditing ? 'PUT' : 'POST';
    const url = isEditing
      ? `http://localhost:8000/api/companies/${id}/`
      : 'http://localhost:8000/api/companies/';

    fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(company),
    })
      .then((response) => response.json())
      .then(() => {
        alert(`Company ${isEditing ? 'updated' : 'created'} successfully!`);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <div>
      <h2>{isEditing ? 'Edit' : 'Create'} Company</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={company.name}
          onChange={handleChange}
          placeholder="Company Name"
        />
        <textarea
          name="description"
          value={company.description}
          onChange={handleChange}
          placeholder="Description"
        />
        <input
          type="text"
          name="address"
          value={company.address}
          onChange={handleChange}
          placeholder="Address"
        />
        <input
          type="text"
          name="phone"
          value={company.phone}
          onChange={handleChange}
          placeholder="Phone"
        />
        <input
          type="url"
          name="website"
          value={company.website}
          onChange={handleChange}
          placeholder="Website"
        />
        <button type="submit">Save</button>
      </form>
    </div>
  );
}
