import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/MapGuide.module.css';

const maps = [
	{
		name: 'Mirage',
		image: require('../assets/maps/mirage/mirage_background.jpg'),
		logo: require('../assets/maps/mirage/mirage_logo.webp'),
	},
	{
		name: 'Inferno',
		image: require('../assets/maps/inferno/inferno_background.jpeg'),
		logo: require('../assets/maps/inferno/inferno_logo.webp'),
	},
	{
		name: 'Nuke',
		image: require('../assets/maps/nuke/nuke_background.jpg'),
		logo: require('../assets/maps/nuke/nuke_logo.webp'),
	},
	{
		name: 'Anubis',
		image: require('../assets/maps/anubis/anubis_background.jpg'),
		logo: require('../assets/maps/anubis/anubis_logo.webp'),
	},
	{
		name: 'Ancient',
		image: require('../assets/maps/ancient/ancient_background.jpg'),
		logo: require('../assets/maps/ancient/ancient_logo.webp'),
	},
	{
		name: 'Dust II',
		image: require('../assets/maps/dust2/dust2_background.jpg'),
		logo: require('../assets/maps/dust2/dust2_logo.webp'),
	},
	{
		name: 'Train',
		image: require('../assets/maps/train/train_background.jpg'),
		logo: require('../assets/maps/train/train_logo.webp'),
	},
];

const MapGuide = () => {
	const navigate = useNavigate();

	const handleMapClick = (mapName) => {
		navigate(`/map-guide/${mapName.toLowerCase()}`);
	};

	return (
		<div className={styles.mapGuide}>
			{maps.map((map) => (
				<div
					key={map.name}
					className={styles.mapCard}
					onClick={() => handleMapClick(map.name)}
				>
					<div
						className={styles.mapImage}
						style={{ backgroundImage: `url(${map.image})` }}
					>
						<img
							src={map.logo}
							alt={`${map.name} logo`}
							className={styles.mapLogo}
						/>
					</div>
					<div className={styles.mapName}>{map.name}</div>
				</div>
			))}
		</div>
	);
};

export default MapGuide;
