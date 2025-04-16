import { Routes, Route } from "react-router-dom";

import Login from '../pages/AuthPages/LoginPage.tsx';

import Register from '../pages/AuthPages/RegisterPage.tsx';

const AppRoutes = () => {
  return(
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  )
}

export default AppRoutes
