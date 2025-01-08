import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import Login from '../auth/Login';
import Register from '../auth/Register';
import ForgotPassword from '../auth/ForgotPassword';
import '../styles/Navbar.css';

const Navbar = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [modalContent, setModalContent] = useState('login');
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	useEffect(() => {
		const token = localStorage.getItem('token');
		setIsLoggedIn(!!token);
	}, []);

	const openModal = (content) => {
		setModalContent(content);
		setIsModalOpen(true);
	};

	const closeModal = () => {
		setIsModalOpen(false);
	};

	const handleLogout = () => {
		localStorage.removeItem('token');
		setIsLoggedIn(false);
		window.dispatchEvent(new Event('userLoggedOut')); // Powiadom inne komponenty o wylogowaniu
	};

	const handleLoginSuccess = () => {
		setIsLoggedIn(true);
		window.dispatchEvent(new Event('userLoggedIn')); // Powiadom inne komponenty o zalogowaniu
		closeModal();
	};

	return (
		<>
			<nav className='navbar'>
				<div className='nav-left'>
					<button className='back-btn' onClick={() => window.history.back()}>
						← Wróć
					</button>
				</div>
				<ul className='nav-list'>
					<li className='nav-item'>
						<a href='/'>Strona główna</a>
					</li>
					<li className='nav-item'>
						<a href='/about'>O aplikacji</a>
					</li>
				</ul>
				<div className='nav-right'>
					{!isLoggedIn ? (
						<button className='login-btn' onClick={() => openModal('login')}>
							🔑 Logowanie
						</button>
					) : (
						<>
							<a href='/profile' className='profile-link'>
								👤 Profil
							</a>
							<button className='logout-btn' onClick={handleLogout}>
								🚪 Wyloguj
							</button>
						</>
					)}
				</div>
			</nav>

			{isModalOpen && (
				<Modal closeModal={closeModal}>
					{modalContent === 'login' && (
						<Login
							switchToRegister={() => setModalContent('register')}
							switchToForgotPassword={() => setModalContent('forgotPassword')}
							onLoginSuccess={handleLoginSuccess}
						/>
					)}
					{modalContent === 'register' && (
						<Register switchToLogin={() => setModalContent('login')} />
					)}
					{modalContent === 'forgotPassword' && (
						<ForgotPassword switchToLogin={() => setModalContent('login')} />
					)}
				</Modal>
			)}
		</>
	);
};

export default Navbar;
