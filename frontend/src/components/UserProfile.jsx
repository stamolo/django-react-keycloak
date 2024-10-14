import React, { useState, useEffect } from "react";
import AuthenticationService from "../AuthenticationService.jsx";
import Grid from './Grid/Grid'; // Импортируем Grid

export default function UserProfile() {
  const [profile, setProfile] = useState({});
  const [fields, setFields] = useState([]);
  const [isSaving, setIsSaving] = useState(false);  // Для индикации сохранения
  const BACKEND_API_URL = "http://localhost:8000/user-profile/profiles/";  // URL изменён для работы с роутером
  const FIELDS_API_URL = "http://localhost:8000/user-profile/fields/";

  useEffect(() => {
    // Загружаем метаданные полей профиля
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
    // Загружаем данные профиля
    fetch(BACKEND_API_URL, {
      headers: { Authorization: `Bearer ${AuthenticationService.getToken()}` },
    })
      .then((response) => response.json())
      .then((data) => {
        setProfile(data[0]);  // Работа с первой записью профиля
      })
      .catch((error) => {
        console.error("Error fetching user profile:", error);
      });
  }, []);

  const handleProfileChange = (rowIndex, field, value) => {
    const updatedProfile = { ...profile, [field]: value };
    setProfile(updatedProfile);  // Обновляем локально

    // Отправляем изменения на сервер
    setIsSaving(true);
    fetch(`${BACKEND_API_URL}${profile.keycloak_id}/`, {  // Добавляем ID в URL для корректного обновления
      method: "PUT",  // Меняем метод на PUT для обновления
      headers: {
        Authorization: `Bearer ${AuthenticationService.getToken()}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedProfile),
    })
      .then(() => {
        setIsSaving(false);  // Убираем индикацию после успешного сохранения
        alert("Profile updated successfully!");
      })
      .catch((error) => {
        setIsSaving(false);
        console.error("Error updating profile:", error);
      });
  };

  const columns = fields.map(field => field.name);  // Создание колонок на основе полей
  const data = [profile].filter(row => row && Object.keys(row).length > 0);  // Добавляем проверку на корректность данных

  return (
    <div className="container mt-5">
      <h2>User Profile</h2>
      <Grid
        columns={columns}
        data={data}
        rowsPerPage={5}
        onCellChange={handleProfileChange}
      />
    </div>
  );
}
