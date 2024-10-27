import React, { useState, useEffect } from "react";
import AuthenticationService from "../AuthenticationService.jsx";

export default function UserProfile() {
  const [profile, setProfile] = useState({});
  const [fields, setFields] = useState([]);
  const BACKEND_API_URL = "http://localhost:8000/user-profile/";
  const FIELDS_API_URL = "http://localhost:8000/user-profile/fields/";

  // Получение метаданных о полях
  useEffect(() => {
    console.log("Fetching profile fields from:", FIELDS_API_URL);
    fetch(FIELDS_API_URL, {
      headers: { Authorization: `Bearer ${AuthenticationService.getToken()}` },
    })
      .then((response) => {
        console.log("Response status for fields:", response.status);
        if (!response.ok) {
          throw new Error(`Error fetching fields: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Profile fields data received:", data);
        setFields(data);
      })
      .catch((error) => {
        console.error("Error fetching profile fields:", error.message);
      });
  }, []);

  // Получение данных о профиле
  useEffect(() => {
    console.log("Fetching user profile from:", BACKEND_API_URL);
    fetch(BACKEND_API_URL, {
      headers: { Authorization: `Bearer ${AuthenticationService.getToken()}` },
    })
      .then((response) => {
        console.log("Response status for profile:", response.status);
        if (!response.ok) {
          throw new Error(`Error fetching user profile: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        // Если данные профиля пришли как массив, извлекаем первый элемент
        if (Array.isArray(data) && data.length > 0) {
          console.log("User profile data received (as array):", data);
          setProfile(data[0]);
        } else {
          console.log("User profile data received:", data);
          setProfile(data);
        }
      })
      .catch((error) => {
        console.error("Error fetching user profile:", error.message);
      });
  }, []);

  // Обработчик изменения полей формы
  const handleChange = (e) => {
    console.log(`Field changed: ${e.target.name}, New Value: ${e.target.value}`);
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  // Обработчик отправки данных на сервер
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting profile data:", profile);

    // Формируем URL для обновления с использованием keycloak_id
    const updateUrl = `http://localhost:8000/user-profile/${profile.keycloak_id}/`;

    fetch(updateUrl, {
      method: "PATCH",  // Используем PUT для обновления данных
      headers: {
        Authorization: `Bearer ${AuthenticationService.getToken()}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(profile),
    })
      .then((response) => {
        console.log("Response status for submit:", response.status);
        if (!response.ok) {
          throw new Error(`Error updating profile: ${response.statusText}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Response data after submit:", data);
        alert("Profile updated successfully!");
      })
      .catch((error) => {
        console.error("Error updating profile:", error.message);
      });
  };

  return (
    <div className="container mt-5">
      <h2>User Profile</h2>
      <form onSubmit={handleSubmit}>
        {fields.map((field) => (
          <div key={field.name} className="form-group">
            <label>{field.name}</label>
            <input
              type={field.type === "CharField" ? "text" : "text"} // Простая проверка типа
              name={field.name}
              className="form-control"
              value={profile[field.name] || ""}
              onChange={handleChange}
            />
          </div>
        ))}
        <button type="submit" className="btn btn-primary mt-3">
          Save Changes
        </button>
      </form>
    </div>
  );
}
