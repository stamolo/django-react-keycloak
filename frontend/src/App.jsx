import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Home from "./components/Home";
import Resources from "./components/Resources";
import UserInfo from "./components/UserInfo"; // Импортируем компонент для информации о пользователе
import UserProfile from "./components/UserProfile"; // Импортируем новый компонент для профиля пользователя

export default function App() {
  return (
    <div className="container vh-100">
      <BrowserRouter>
        <Navbar />
        <div className="d-flex h-75 align-items-center justify-content-center">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/resource" element={<Resources />} />
            <Route path="/user-info" element={<UserInfo />} /> {/* Информация о пользователе */}
            <Route path="/profile" element={<UserProfile />} /> {/* Личный кабинет */}
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}
