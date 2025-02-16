import React from 'react';
import { MdTimer } from 'react-icons/md';
import { BiTargetLock } from 'react-icons/bi';
import { FaMapMarkedAlt, FaLightbulb, FaUsers } from 'react-icons/fa';
import '../styles/MainSection.css';

const MainSection = () => {
	const handleNavigation = (section) => {
		switch (section) {
			case 'reaction-time':
				window.location.href = '/reaction-time';
				break;
			case 'aim-training':
				window.location.href = '/aim-training';
				break;
			case 'map-guide':
				window.location.href = '/map-guide';
				break;
			case 'tactics':
				window.location.href = '/tactics';
				break;
			case 'player-settings':
				window.location.href = '/player-settings';
				break;
			default:
				alert('Sekcja nie istnieje!');
		}
	};

	return (
		<div className='main-section'>
			<div className='tiles-container'>
				<div className='tile' onClick={() => handleNavigation('reaction-time')}>
					<MdTimer size={40} />
					<p>Ćwiczenie czasu reakcji</p>
				</div>
				<div className='tile' onClick={() => handleNavigation('aim-training')}>
					<BiTargetLock size={40} />
					<p>Ćwiczenie wspomagające celowanie</p>
				</div>
				<div className='tile' onClick={() => handleNavigation('map-guide')}>
					<FaMapMarkedAlt size={40} />
					<p>Przewodnik po mapach</p>
				</div>
				<div className='tile' onClick={() => handleNavigation('tactics')}>
					<FaLightbulb size={40} />
					<p>Nauka taktyk</p>
				</div>
				<div
					className='tile'
					onClick={() => handleNavigation('player-settings')}
				>
					<FaUsers size={40} />
					<p>Ustawienia innych graczy</p>
				</div>
			</div>
		</div>
	);
};

export default MainSection;
