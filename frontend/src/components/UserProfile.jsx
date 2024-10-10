import React, { useState, useEffect } from "react";
import AuthenticationService from "../AuthenticationService.jsx";

export default function UserProfile() {
  const [profile, setProfile] = useState({});
  const [fields, setFields] = useState([]);
  const BACKEND_API_URL = "http://localhost:8000/user-profile/";
  const FIELDS_API_URL = "http://localhost:8000/user-profile/fields/";


  // Получение метаданных о полях
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

  // Получение данных о профиле
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

  // Обработчик изменения полей формы
  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
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
