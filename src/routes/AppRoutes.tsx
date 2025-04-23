import { Routes, Route } from "react-router-dom";

import Login from '../pages/AuthPages/LoginPage.tsx';

import Register from '../pages/AuthPages/RegisterPage.tsx';
import ResetPasswordPage from "../pages/AuthPages/ResetPasswordPage.tsx";

const AppRoutes = () => {
  return(
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/reset-password" element={<ResetPasswordPage />} />
    </Routes>
  )
}

export default AppRoutes
