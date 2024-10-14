import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Home from "./components/Home";
import Resources from "./components/Resources";
import UserInfo from "./components/UserInfo";
import UserProfile from "./components/UserProfile";
import CompanyForm from "./components/CompanyForm";  // Импортируем компонент для компании

// Подключаем стили
import './styles/global.css';   // Глобальные стили для всего приложения
import './styles/navbar.css';   // Стили для навигационного меню
import './styles/table.css';    // Стили для таблиц
import './styles/forms.css';    // Стили для форм

export default function App() {
  return (
    <div className="container-fluid vh-100"> {/* Используем Bootstrap контейнер */}
      <BrowserRouter>
        <Navbar />
        <div className="container mt-5"> {/* Внутренний контейнер для страниц */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/resource" element={<Resources />} />
            <Route path="/user-info" element={<UserInfo />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/companies" element={<CompanyForm />} />  {/* Добавляем маршрут для компаний */}
            <Route path="/companies/create" element={<CompanyForm />} />  {/* Маршрут для создания компании */}
            <Route path="/companies/edit/:id" element={<CompanyForm />} />  {/* Маршрут для редактирования компании */}
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}
