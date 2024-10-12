import React, { useState, useEffect } from "react";
import AuthenticationService from "../AuthenticationService.jsx";
import Grid from './Grid'; // Импортируем Grid

export default function UserProfile() {
  const [profile, setProfile] = useState({});
  const [fields, setFields] = useState([]);
  const BACKEND_API_URL = "http://localhost:8000/user-profile/";
  const FIELDS_API_URL = "http://localhost:8000/user-profile/fields/";

  useEffect(() => {
    fetch(FIELDS_API_URL, {
      headers: { Authorization: `Bearer ${AuthenticationService.getToken()}` },
    })
      .then((response) => response.json())
      .then((data) => {
        setFields(data);
      })
      .catch((error) => {
        console.error("Error fetching profile fields:", error);
      });
  }, []);

  useEffect(() => {
    fetch(BACKEND_API_URL, {
      headers: { Authorization: `Bearer ${AuthenticationService.getToken()}` },
    })
      .then((response) => response.json())
      .then((data) => {
        setProfile(data);
      })
      .catch((error) => {
        console.error("Error fetching user profile:", error);
      });
  }, []);

  // Обработчик изменения полей таблицы
  const handleProfileChange = (field, value) => {
    setProfile({ ...profile, [field]: value });
  };

  // Обработчик отправки данных на сервер
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(BACKEND_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${AuthenticationService.getToken()}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(profile),
    })
      .then((response) => response.json())
      .then(() => {
        alert("Profile updated successfully!");
      })
      .catch((error) => {
        console.error("Error updating profile:", error);
      });
  };

  const columns = fields.map(field => field.name);  // Создание колонок на основе полей
  const data = [profile];  // Оборачиваем профиль в массив для таблицы

  return (
    <div className="container mt-5">
      <h2>User Profile</h2>
      <form onSubmit={handleSubmit}>
        <Grid
          columns={columns}
          data={data}
          onCellChange={handleProfileChange} // Обработчик изменений в таблице
        />
        <button type="submit" className="btn btn-primary mt-3">
          Save Changes
        </button>
      </form>
    </div>
  );
}
