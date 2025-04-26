import { Routes, Route } from "react-router-dom";

import Login from '../pages/AuthPages/LoginPage.tsx';

import Register from '../pages/AuthPages/RegisterPage.tsx';
import ResetPasswordPage from "../pages/AuthPages/ResetPasswordPage.tsx";
import HomePage from "../pages/BodyPages/HomePage.tsx";
import ForgotPasswordPage from "../pages/AuthPages/ForgotPasswordPage.tsx";

const AppRoutes = () => {
  return(
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/reset-password" element={<ResetPasswordPage />} />
      <Route path="/homepage" element={<HomePage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
    </Routes>
  )
}

export default AppRoutes
