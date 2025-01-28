import React, { useState } from 'react';
import playersData from '../data/playersData';
import styles from '../styles/PlayerSettings.module.css';

const ProSettingsTable = () => {
	const [sortedColumn, setSortedColumn] = useState(null);
	const [sortDirection, setSortDirection] = useState('asc');

	// Sortowanie danych
	const sortedData = [...playersData].sort((a, b) => {
		if (!sortedColumn) return 0;

		const valueA = a[sortedColumn] ?? ''; // Zapobiega błędom na undefined
		const valueB = b[sortedColumn] ?? '';

		if (typeof valueA === 'number' && typeof valueB === 'number') {
			return sortDirection === 'asc' ? valueA - valueB : valueB - valueA;
		} else {
			return sortDirection === 'asc'
				? valueA.toString().localeCompare(valueB.toString())
				: valueB.toString().localeCompare(valueA.toString());
		}
	});

	// Funkcja do zmiany sortowania
	const handleSort = (column) => {
		if (sortedColumn === column) {
			setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
		} else {
			setSortedColumn(column);
			setSortDirection('asc');
		}
	};

	// Funkcja zwracająca ikonę sortowania
	const getSortIcon = (column) => {
		if (sortedColumn !== column) return '⬍'; // Brak sortowania
		return sortDirection === 'asc' ? '⬆' : '⬇';
	};

	return (
		<div className={styles.container}>
			<h2>Pro Players Settings</h2>

			<table className={styles.table}>
				<thead>
					<tr>
						<th onClick={() => handleSort('team')}>
							Team {getSortIcon('team')}
						</th>
						<th onClick={() => handleSort('player')}>
							Player {getSortIcon('player')}
						</th>
						<th onClick={() => handleSort('role')}>
							Role {getSortIcon('role')}
						</th>
						<th onClick={() => handleSort('mouse')}>
							Mouse {getSortIcon('mouse')}
						</th>
						<th onClick={() => handleSort('hz')}>Hz {getSortIcon('hz')}</th>
						<th onClick={() => handleSort('dpi')}>DPI {getSortIcon('dpi')}</th>
						<th onClick={() => handleSort('sens')}>
							Sens {getSortIcon('sens')}
						</th>
						<th onClick={() => handleSort('edpi')}>
							eDPI {getSortIcon('edpi')}
						</th>
						<th onClick={() => handleSort('zoomSens')}>
							Zoom Sens {getSortIcon('zoomSens')}
						</th>
						<th onClick={() => handleSort('monitor')}>
							Monitor {getSortIcon('monitor')}
						</th>
						<th onClick={() => handleSort('resolution')}>
							Resolution {getSortIcon('resolution')}
						</th>
						<th onClick={() => handleSort('aspectRatio')}>
							Aspect Ratio {getSortIcon('aspectRatio')}
						</th>
						<th onClick={() => handleSort('scalingMode')}>
							Scaling Mode {getSortIcon('scalingMode')}
						</th>
						<th onClick={() => handleSort('mousepad')}>
							Mousepad {getSortIcon('mousepad')}
						</th>
						<th onClick={() => handleSort('keyboard')}>
							Keyboard {getSortIcon('keyboard')}
						</th>
						<th onClick={() => handleSort('headset')}>
							Headset {getSortIcon('headset')}
						</th>
						<th onClick={() => handleSort('chair')}>
							Chair {getSortIcon('chair')}
						</th>
					</tr>
				</thead>
				<tbody>
					{sortedData.map((player, index) => (
						<tr key={index}>
							<td>{player.team ?? 'N/A'}</td>
							<td>{player.player ?? 'N/A'}</td>
							<td>{player.role ?? 'N/A'}</td>
							<td>{player.mouse ?? 'N/A'}</td>
							<td>{player.hz ?? 'N/A'}</td>
							<td>{player.dpi ?? 'N/A'}</td>
							<td>{player.sens ?? 'N/A'}</td>
							<td>{player.edpi ?? 'N/A'}</td>
							<td>{player.zoomSens ?? 'N/A'}</td>
							<td>{player.monitor ?? 'N/A'}</td>
							<td>{player.resolution ?? 'N/A'}</td>
							<td>{player.aspectRatio ?? 'N/A'}</td>
							<td>{player.scalingMode ?? 'N/A'}</td>
							<td>{player.mousepad ?? 'N/A'}</td>
							<td>{player.keyboard ?? 'N/A'}</td>
							<td>{player.headset ?? 'N/A'}</td>
							<td>{player.chair ?? 'N/A'}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default ProSettingsTable;
