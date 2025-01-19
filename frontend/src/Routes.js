import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './auth/Login';
import Register from './auth/Register';
import Dashboard from './components/Dashboard';
import ForgotPassword from './auth/ForgotPassword';
import ReactionTime from './components/ReactionTimeGame';
import AimTrainingGame from './components/AimTrainingGame';
import MapRadar from './components/MapRadar';
import MapGuide from './components/MapGuide';
import Tactics from './components/Tactics';
import PlayerSettings from './components/PlayerSettings';

const Layout = ({ children }) => (
	<>
		<Navbar />
		<main>{children}</main>
	</>
);

function AppRoutes() {
	return (
		<Routes>
			{/* Strony bez Navbar */}
			<Route path='/login' element={<Login />} />
			<Route path='/register' element={<Register />} />
			<Route path='/forgot-password' element={<ForgotPassword />} />

			{/* Strony z Navbar */}
			<Route
				path='/'
				element={
					<Layout>
						<Dashboard />
					</Layout>
				}
			/>
			<Route
				path='/reaction-time'
				element={
					<Layout>
						<ReactionTime />
					</Layout>
				}
			/>
			<Route
				path='/aim-training'
				element={
					<Layout>
						<AimTrainingGame />
					</Layout>
				}
			/>
			<Route
				path='/map-guide'
				element={
					<Layout>
						<MapGuide />
					</Layout>
				}
			/>
			<Route
				path='/tactics'
				element={
					<Layout>
						<Tactics />
					</Layout>
				}
			/>
			<Route
				path='/player-settings'
				element={
					<Layout>
						<PlayerSettings />
					</Layout>
				}
			/>
			<Route
				path='/map-guide'
				element={
					<Layout>
						<MapGuide />
					</Layout>
				}
			/>
			<Route
				path='/map-guide/:mapName'
				element={
					<Layout>
						<MapRadar />
					</Layout>
				}
			/>
		</Routes>
	);
}

export default AppRoutes;
