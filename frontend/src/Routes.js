import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Account from './components/Account';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import ForgotPassword from './components/ForgotPassword';

function AppRoutes() {
	return (
		<Routes>
		  <Route path="/" element={<Dashboard />} />
		  <Route path="/login" element={<Login />} />
		  <Route path="/register" element={<Register />} />
		  <Route path="/forgot-password" element={<ForgotPassword />} />
		</Routes>
	);
}

export default AppRoutes;
