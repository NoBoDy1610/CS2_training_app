import React, { useState } from 'react';
import Modal from './Modal';
import Login from '../auth/Login';
import Register from '../auth/Register';
import ForgotPassword from '../auth/ForgotPassword';
import '../styles/Navbar.css';

const Navbar = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [modalContent, setModalContent] = useState('login'); // 'login', 'register', 'forgotPassword'

	const openModal = (content) => {
		setModalContent(content);
		setIsModalOpen(true);
	};

	const closeModal = () => {
		setIsModalOpen(false);
	};

	return (
		<>
			<nav className='navbar'>
				<div className='nav-left'>
					<button className='back-btn' onClick={() => window.history.back()}>
						← Back
					</button>
				</div>
				<ul className='nav-list'>
					<li className='nav-item'>
						<a href='/'>Home</a>
					</li>
					<li className='nav-item'>
						<a href='/about'>About</a>
					</li>
					<li className='nav-item'>
						<button className='login-btn' onClick={() => openModal('login')}>
							Logowanie
						</button>
					</li>
				</ul>
			</nav>

			{/* Modal */}
			{isModalOpen && (
				<Modal closeModal={closeModal}>
					{modalContent === 'login' && (
						<Login
							switchToRegister={() => setModalContent('register')}
							switchToForgotPassword={() => setModalContent('forgotPassword')}
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
