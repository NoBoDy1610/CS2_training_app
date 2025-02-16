import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from './Modal';
import Login from '../auth/Login';
import Register from '../auth/Register';
import ForgotPassword from '../auth/ForgotPassword';
import '../styles/Navbar.css';

const Navbar = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [modalContent, setModalContent] = useState('login');
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	const navigate = useNavigate();

	useEffect(() => {
		const token = sessionStorage.getItem('token');
		setIsLoggedIn(!!token);

		const handleLogin = () => setIsLoggedIn(true);
		const handleLogout = () => setIsLoggedIn(false);

		window.addEventListener('userLoggedIn', handleLogin);
		window.addEventListener('userLoggedOut', handleLogout);

		return () => {
			window.removeEventListener('userLoggedIn', handleLogin);
			window.removeEventListener('userLoggedOut', handleLogout);
		};
	}, []);

	const openModal = (content) => {
		setModalContent(content);
		setIsModalOpen(true);
	};

	const closeModal = () => {
		setIsModalOpen(false);
	};

	const handleLogout = () => {
		sessionStorage.removeItem('token');
		window.dispatchEvent(new Event('userLoggedOut')); // Powiadomienie innych komponentów
		setIsLoggedIn(false); // Zaktualizowanie stanu
		navigate('/');
	};

	const handleLoginSuccess = () => {
		window.dispatchEvent(new Event('userLoggedIn'));
		setIsLoggedIn(true);
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
