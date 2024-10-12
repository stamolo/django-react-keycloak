import React, { useState, useEffect } from "react";
import AuthenticationService from "../AuthenticationService.jsx";
import Grid from './Grid'; // Импортируем Grid

export default function UserProfile() {
  const [profile, setProfile] = useState({});
  const [fields, setFields] = useState([]);
  const [isSaving, setIsSaving] = useState(false);  // Для индикации сохранения
  const BACKEND_API_URL = "http://localhost:8000/user-profile/";
  const FIELDS_API_URL = "http://localhost:8000/user-profile/fields/";

  useEffect(() => {
    // Загружаем метаданные полей профиля
    fetch(FIELDS_API_URL, {
      headers: { Authorization: `Bearer ${AuthenticationService.getToken()}` },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Fields data:", data);  // Отладка полей профиля
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
        console.log("Profile data:", data);  // Отладка данных профиля
        setProfile(data);
      })
      .catch((error) => {
        console.error("Error fetching user profile:", error);
      });
  }, []);

  // Обработчик изменения полей таблицы
  const handleProfileChange = (rowIndex, field, value) => {
    const updatedProfile = { ...profile, [field]: value };
    setProfile(updatedProfile);  // Обновляем локально

    // Отправляем изменения на сервер
    setIsSaving(true);  // Индикация сохранения
    fetch(BACKEND_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${AuthenticationService.getToken()}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedProfile),
    })
      .then((response) => response.json())
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

  // Оборачиваем профиль в массив для таблицы, но убедимся, что это корректный формат
  const data = [profile].filter(row => row && Object.keys(row).length > 0);  // Добавляем проверку на корректность данных

  console.log("Table columns:", columns);  // Отладка колонок
  console.log("Table data:", data);  // Отладка данных для таблицы

  return (
    <div className="container mt-5">
      <h2>User Profile</h2>
      <form>
        {isSaving && <div>Saving...</div>}  {/* Индикация сохранения */}
        <Grid
          columns={columns}
          data={data}  // Убедимся, что данные корректные
          rowsPerPage={5}  // Устанавливаем количество строк на страницу
          onCellChange={handleProfileChange}  // Обработчик изменений в таблице
        />
      </form>
    </div>
  );
}
