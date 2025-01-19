import React, { useState } from 'react';
import styles from '../styles/MapRadar.module.css';

import radarImage from '../assets/images/mirage/mirage_radar.jpg';

import mirageA from '../assets/images/mirage/mirage_a.jpg';
import mirageB from '../assets/images/mirage/mirage_b.jpg';
import mirageApps from '../assets/images/mirage/mirage_apps.jpg';
import mirageJungle from '../assets/images/mirage/mirage_jungle.jpg';
import miragePalace from '../assets/images/mirage/mirage_palace.jpg';
import mirageMid from '../assets/images/mirage/mirage_mid.jpg';
import mirageLadder from '../assets/images/mirage/mirage_ladder.jpg';
import mirageWindow from '../assets/images/mirage/mirage_window.jpg';
import mirageRamp from '../assets/images/mirage/mirage_ramp.jpg';
import mirageUnder from '../assets/images/mirage/mirage_under.jpg';
import mirageTt from '../assets/images/mirage/mirage_tt.jpg';
import mirageCt from '../assets/images/mirage/mirage_ct.jpg';
import mirageShort from '../assets/images/mirage/mirage_short.jpg';
import mirageCon from '../assets/images/mirage/mirage_con.jpg';
import mirageKitchen from '../assets/images/mirage/mirage_kitchen.jpg';

const locations = [
	{
		name: 'A Site',
		image: mirageA,
		x: '62%',
		y: '80%',
		description: 'Główne miejsce podkładania bomby dla atakujących.',
	},
	{
		name: 'B Site',
		image: mirageB,
		x: '20%',
		y: '20%',
		description:
			'Drugie miejsce podkładania bomby, często bronione przez snajperów.',
	},
	{
		name: 'B Apartments',
		image: mirageApps,
		x: '25%',
		y: '10%',
		description: 'Przejście na bombsite B od strony terrorystów.',
	},
	{
		name: 'Jungle',
		image: mirageJungle,
		x: '50%',
		y: '55%',
		description: 'Połączenie pomiędzy Mid, A i CT spawn.',
	},
	{
		name: 'Palace',
		image: miragePalace,
		x: '75%',
		y: '75%',
		description:
			'Balkon prowadzący na A Site, często wykorzystywany do rzutów granatów.',
	},
	{
		name: 'Mid',
		image: mirageMid,
		x: '50%',
		y: '40%',
		description:
			'Kluczowy obszar mapy, kontrola Mid daje przewagę na każdej rundzie.',
	},
	{
		name: 'Ladder Room',
		image: mirageLadder,
		x: '50%',
		y: '30%',
		description: 'Mały pokój z drabiną, łączący Mid i B Short.',
	},
	{
		name: 'Window',
		image: mirageWindow,
		x: '40%',
		y: '30%',
		description: 'Główna pozycja snajperów CT do kontrolowania Mid.',
	},
	{
		name: 'Ramp',
		image: mirageRamp,
		x: '80%',
		y: '85%',
		description: 'Główne wejście terrorystów na A Site.',
	},
	{
		name: 'Underpass',
		image: mirageUnder,
		x: '55%',
		y: '60%',
		description: 'Przejście podziemne łączące Mid i B Apartments.',
	},
	{
		name: 'T Spawn',
		image: mirageTt,
		x: '90%',
		y: '90%',
		description: 'Początkowa lokalizacja terrorystów.',
	},
	{
		name: 'CT Spawn',
		image: mirageCt,
		x: '10%',
		y: '90%',
		description: 'Początkowa lokalizacja antyterrorystów.',
	},
	{
		name: 'Short',
		image: mirageShort,
		x: '45%',
		y: '50%',
		description: 'Krótkie przejście łączące Mid i B Site.',
	},
	{
		name: 'Connector',
		image: mirageCon,
		x: '55%',
		y: '45%',
		description:
			'Łączy Mid z A Site, bardzo ważne dla rotacji i kontroli mapy.',
	},
	{
		name: 'Kitchen',
		image: mirageKitchen,
		x: '20%',
		y: '30%',
		description: 'Miejsce kontrolowania rotacji z CT na B Site.',
	},
];

const MapRadar = () => {
	const [hoveredLocation, setHoveredLocation] = useState(null);
	const [tooltipPosition, setTooltipPosition] = useState({ x: '0%', y: '0%' });

	const handleMouseEnter = (location, event) => {
		setHoveredLocation(location);
		setTooltipPosition({
			x: event.target.offsetLeft + 40,
			y: event.target.offsetTop - 50,
		});
	};

	return (
		<div className={styles.mapContainer}>
			<img src={radarImage} alt='Radar Mirage' className={styles.mapImage} />

			{locations.map((location, index) => (
				<div
					key={index}
					className={styles.mapLocation}
					style={{ left: location.x, top: location.y }}
					onMouseEnter={(event) => handleMouseEnter(location, event)}
					onMouseLeave={() => setHoveredLocation(null)}
				>
					{location.name}
				</div>
			))}

			{hoveredLocation && (
				<div
					className={styles.locationPreview}
					style={{
						left: `${tooltipPosition.x}px`,
						top: `${tooltipPosition.y}px`,
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
