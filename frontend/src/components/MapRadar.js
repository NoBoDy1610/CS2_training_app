import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from '../styles/MapRadar.module.css';
import mapData from '../data/mapData';

const MapRadar = () => {
	const { mapName } = useParams();
	const map = mapData[mapName];

	const [hoveredLocation, setHoveredLocation] = useState(null);

	if (!map) return <div>Mapa nie została znaleziona</div>;

	const handleMouseEnter = (event, location) => {
		const windowWidth = window.innerWidth;
		const windowHeight = window.innerHeight;
		const tooltipWidth = 350; // Szerokość tooltipa
		const tooltipHeight = 250; // Wysokość tooltipa

		let tooltipX = event.clientX + 30; // Odległość od kursora
		let tooltipY = event.clientY - 30;

		// Sprawdzenie, czy tooltip wyjdzie poza prawą krawędź
		if (tooltipX + tooltipWidth > windowWidth) {
			tooltipX = event.clientX - tooltipWidth - 30; // Przesunięcie w lewo
		}

		// Sprawdzenie, czy tooltip wyjdzie poza dolną krawędź
		if (tooltipY + tooltipHeight > windowHeight) {
			tooltipY = event.clientY - tooltipHeight + 60; // Przesunięcie w górę
		}

		// Sprawdzenie, czy tooltip wyjdzie poza górną krawędź
		if (tooltipY < 0) {
			tooltipY = 10; // Minimalna odległość od góry
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
			<img
				src={map.radar}
				alt={`Radar ${map.name}`}
				className={styles.mapImage}
			/>

			{map.locations.map((location, index) => (
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
