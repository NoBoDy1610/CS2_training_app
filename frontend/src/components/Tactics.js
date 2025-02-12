import React, { useState } from 'react';
import tacticsData from '../data/tacticsData';
import styles from '../styles/Tactics.module.css';

const Tactics = () => {
	const [selectedMap, setSelectedMap] = useState('mirage');
	const [selectedSituation, setSelectedSituation] = useState('pistoletowka');
	const [side, setSide] = useState('T');

	return (
		<div className={styles.tacticsContainer}>
			<h2>🎯 Nauka Taktyk</h2>
			<p>
				Wybierz mapę i sytuację finansową, aby zobaczyć odpowiednie taktyki.
			</p>
			<div className={styles.tacticsSelect}>
				<label>Mapa:</label>
				<select
					value={selectedMap}
					onChange={(e) => setSelectedMap(e.target.value)}
				>
					<option value='mirage'>Mirage</option>
					<option value='dust2'>Dust 2</option>
					<option value='train'>Train</option>
					<option value='ancient'>Ancient</option>
					<option value='anubis'>Anubis</option>
					<option value='nuke'>Nuke</option>
					<option value='inferno'>Inferno</option>
				</select>
				<label>Sytuacja:</label>
				<select
					value={selectedSituation}
					onChange={(e) => setSelectedSituation(e.target.value)}
				>
					<option value='pistoletowka'>Pistoletówka</option>
					<option value='ekonomiczna'>Runda ekonomiczna</option>
					<option value='antyEkonomiczna'>Runda anty-eko</option>
					<option value='force'>Runda force</option>
					<option value='pelneWyposazenie'>Runda full buy</option>
				</select>
				<label>Strona:</label>
				<select value={side} onChange={(e) => setSide(e.target.value)}>
					<option value='T'>Atak (Terroryści)</option>
					<option value='CT'>Obrona (Antyterroryści)</option>
				</select>
			</div>
			<div className={styles.tacticsDisplay}>
				<h3>Taktyka na {selectedMap.toUpperCase()}</h3>
				<p>
					{tacticsData[selectedMap]?.[selectedSituation]?.[side] ||
						'Brak dostępnej taktyki.'}
				</p>
			</div>
		</div>
	);
};

export default Tactics;
