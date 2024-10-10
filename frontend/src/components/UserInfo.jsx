import React from "react";
import AuthenticationService from "../AuthenticationService.jsx";

export default function UserInfo() {
  const token = AuthenticationService.getToken();
  if (!token) {
    return <p>User is not authenticated.</p>;
  }

  // Декодирование токена и получение данных о пользователе
  const tokenData = JSON.parse(atob(token.split('.')[1]));

  return (
    <div className="container mt-5">
      <h2>User Information</h2>
      <table className="table table-bordered">
        <tbody>
          <tr>
            <th scope="row">Username</th>
            <td>{tokenData.preferred_username}</td>
          </tr>
          <tr>
            <th scope="row">Email</th>
            <td>{tokenData.email}</td>
          </tr>
          <tr>
            <th scope="row">Full Name</th>
            <td>{tokenData.name}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
