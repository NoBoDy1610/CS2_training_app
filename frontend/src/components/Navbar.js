import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import NavbarStyles from '../styles/Navbar.css';

const Navbar = () => {
	const isLoggedIn = !!localStorage.getItem('token');
	const navigate = useNavigate();

	const [menuActive, setMenuActive] = useState(false);

	const burgerMenu = () => {
		setMenuActive(!menuActive);
	};

	const signOut = () => {
		localStorage.removeItem('token');
		navigate('/');
	};

	return (
		<section>
			<nav>
				<ul className={NavbarStyles.account}>
					{isLoggedIn ? (
						<>
							<li>
								<Link to='/account'>Konto</Link>
							</li>
							<li>
								<Link to='/' onClick={signOut}>
									Wyloguj się
								</Link>
							</li>
						</>
					) : (
						<>
							<li>
								<Link to='/login'>Konto</Link>
							</li>
							<li>
								<Link to='/register'>Zarejestruj się</Link>
							</li>
						</>
					)}
				</ul>
			</nav>
		</section>
	);
};

export default Navbar;
