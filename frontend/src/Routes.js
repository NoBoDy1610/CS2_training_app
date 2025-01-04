import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import ForgotPassword from './components/ForgotPassword';
import ReactionTime from './components/ReactionTime';
import AimTraining from './components/AimTraining';
import MapGuide from './components/MapGuide';
import Tactics from './components/Tactics';
import PlayerSettings from './components/PlayerSettings';

function AppRoutes() {
	return (
		<Routes>
			<Route path='/' element={<Dashboard />} />
			<Route path='/login' element={<Login />} />
			<Route path='/register' element={<Register />} />
			<Route path='/forgot-password' element={<ForgotPassword />} />
			<Route path='/reaction-time' element={<ReactionTime />} />
			<Route path='/aim-training' element={<AimTraining />} />
			<Route path='/map-guide' element={<MapGuide />} />
			<Route path='/tactics' element={<Tactics />} />
			<Route path='/player-settings' element={<PlayerSettings />} />
		</Routes>
	);
}

export default AppRoutes;
