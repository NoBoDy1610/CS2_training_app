import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from '../styles/MapRadar.module.css';
import mapData from '../data/mapData';

const MapRadar = () => {
	const { mapName } = useParams();
	const map = mapData[mapName.toLowerCase()]; // Obsługa różnych wielkości liter w nazwie mapy

	const [hoveredLocation, setHoveredLocation] = useState(null);
	const [currentLevel, setCurrentLevel] = useState('upper');

	if (!map) {
		console.error(`Mapa "${mapName}" nie została znaleziona w mapData.`);
		return (
			<div className={styles.errorMessage}>Mapa nie została znaleziona</div>
		);
	}

	// Sprawdzenie, czy mapa ma poziomy
	const hasLevels = map.levels !== undefined;
	const locations = hasLevels ? map.levels[currentLevel] : map.locations;
	const radarImage = hasLevels
		? currentLevel === 'upper'
			? map.radarUpper
			: map.radarLower
		: map.radar;

	const handleMouseEnter = (event, location) => {
		const windowWidth = window.innerWidth;
		const windowHeight = window.innerHeight;
		const tooltipWidth = 380;
		const tooltipHeight = 250;

		let tooltipX = event.clientX + 30;
		let tooltipY = event.clientY - 30;

		// Zapobieganie wychodzeniu poza ekran (prawo)
		if (tooltipX + tooltipWidth > windowWidth) {
			tooltipX = event.clientX - tooltipWidth - 30;
		}

		// Zapobieganie wychodzeniu poza ekran (dół)
		if (tooltipY + tooltipHeight > windowHeight) {
			tooltipY = event.clientY - tooltipHeight + 60;
		}

		// Zapobieganie wychodzeniu poza ekran (góra)
		if (tooltipY < 10) {
			tooltipY = 10;
		}

		setHoveredLocation({
			...location,
			x: tooltipX,
			y: tooltipY,
		});
	};

	const handleMouseLeave = () => {
		setHoveredLocation(null);
	};

	return (
		<div className={styles.mapContainer}>
			{/* Przełącznik poziomów (jeśli są) */}
			{hasLevels && (
				<div className={styles.levelSwitch}>
					<button
						onClick={() => setCurrentLevel('upper')}
						className={currentLevel === 'upper' ? styles.active : ''}
					>
						Górny poziom
					</button>
					<button
						onClick={() => setCurrentLevel('lower')}
						className={currentLevel === 'lower' ? styles.active : ''}
					>
						Dolny poziom
					</button>
				</div>
			)}

			{/* Obraz mapy */}
			<img
				src={radarImage}
				alt={`Radar ${map.name}`}
				className={styles.mapImage}
			/>

			{/* Miejscówki */}
			{locations.map((location, index) => (
				<div
					key={index}
					className={styles.mapLocation}
					style={{ left: location.x, top: location.y }}
					onMouseEnter={(event) => handleMouseEnter(event, location)}
					onMouseLeave={handleMouseLeave}
				>
					{location.name}
				</div>
			))}

			{/* Podgląd miejscówki */}
			{hoveredLocation && (
				<div
					className={styles.locationPreview}
					style={{
						left: `${hoveredLocation.x}px`,
						top: `${hoveredLocation.y}px`,
					}}
				>
					<img src={hoveredLocation.image} alt={hoveredLocation.name} />
					<div className={styles.locationDescription}>
						<h3>{hoveredLocation.name}</h3>
						<p>{hoveredLocation.description}</p>
					</div>
				</div>
			)}
		</div>
	);
};

export default MapRadar;
