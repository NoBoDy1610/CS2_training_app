import React from 'react';
import { MdTimer } from 'react-icons/md';
import { BiTargetLock } from 'react-icons/bi';
import { FaMapMarkedAlt, FaLightbulb, FaUsers } from 'react-icons/fa';
import '../styles/MainSection.css';

const MainSection = () => {
	const handleNavigation = (section) => {
		window.location.href = `/${section}`;
	};

	return (
		<div className='main-section'>

			<div className='tiles-grid'>
				<div className='tile' onClick={() => handleNavigation('reaction-time')}>
					<MdTimer size={50} />
					<p>Ćwiczenie czasu reakcji</p>
				</div>
				<div className='tile' onClick={() => handleNavigation('aim-training')}>
					<BiTargetLock size={50} />
					<p>Ćwiczenie wspomagające celowanie</p>
				</div>
				<div className='tile' onClick={() => handleNavigation('map-guide')}>
					<FaMapMarkedAlt size={50} />
					<p>Przewodnik po mapach</p>
				</div>
				<div className='tile' onClick={() => handleNavigation('tactics')}>
					<FaLightbulb size={50} />
					<p>Nauka taktyk</p>
				</div>
				<div className='tile' onClick={() => handleNavigation('player-settings')}>
					<FaUsers size={50} />
					<p>Ustawienia innych graczy</p>
				</div>
			</div>
		</div>
	);
};

export default MainSection;
