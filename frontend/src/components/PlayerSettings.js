import React, { useState, useRef, useEffect } from 'react';
import playersData from '../data/playersData';
import styles from '../styles/PlayerSettings.module.css';

const ProSettingsTable = () => {
    const [sortedColumn, setSortedColumn] = useState(null);
    const [sortDirection, setSortDirection] = useState('asc');
    const tableRef = useRef(null);
    const topScrollRef = useRef(null);
    const bottomScrollRef = useRef(null);

    // Funkcja do synchronizacji przewijania górnego i dolnego paska
    const syncScroll = (source) => {
        if (!tableRef.current) return;
        const scrollLeft = source.scrollLeft;
        topScrollRef.current.scrollLeft = scrollLeft;
        bottomScrollRef.current.scrollLeft = scrollLeft;
    };

    useEffect(() => {
        const topScroll = topScrollRef.current;
        const bottomScroll = bottomScrollRef.current;

        if (topScroll && bottomScroll) {
            topScroll.addEventListener('scroll', () => syncScroll(topScroll));
            bottomScroll.addEventListener('scroll', () => syncScroll(bottomScroll));
        }

        return () => {
            if (topScroll && bottomScroll) {
                topScroll.removeEventListener('scroll', () => syncScroll(topScroll));
                bottomScroll.removeEventListener('scroll', () => syncScroll(bottomScroll));
            }
        };
    }, []);

    // Funkcja do przewijania w lewo
    const scrollLeft = () => {
        if (tableRef.current) {
            tableRef.current.scrollLeft -= 200; // Przewija o 200px
            syncScroll(tableRef.current);
        }
    };

    // Funkcja do przewijania w prawo
    const scrollRight = () => {
        if (tableRef.current) {
            tableRef.current.scrollLeft += 200; // Przewija o 200px
            syncScroll(tableRef.current);
        }
    };

    // Sortowanie danych
    const sortedData = [...playersData].sort((a, b) => {
        if (!sortedColumn) return 0;

        const valueA = a[sortedColumn] || '';
        const valueB = b[sortedColumn] || '';

        if (typeof valueA === 'number') {
            return sortDirection === 'asc' ? valueA - valueB : valueB - valueA;
        } else {
            return sortDirection === 'asc'
                ? valueA.localeCompare(valueB)
                : valueB.localeCompare(valueA);
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

    return (
        <div className={styles.container}>
            <h2>Pro Players Settings</h2>

            {/* ✅ Strzałki do przewijania */}
            <div className={styles.controls}>
                <button className={styles.scrollBtn} onClick={scrollLeft}>◄</button>
                <div className={styles.scrollWrapper} ref={topScrollRef}>
                    <div className={styles.scrollBar}></div>
                </div>
                <button className={styles.scrollBtn} onClick={scrollRight}>►</button>
            </div>

            {/* ✅ Wrapper z przewijaniem */}
            <div className={styles.tableWrapper} ref={tableRef}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th onClick={() => handleSort('team')}>Team</th>
                            <th onClick={() => handleSort('player')}>Player</th>
                            <th onClick={() => handleSort('role')}>Role</th>
                            <th onClick={() => handleSort('mouse')}>Mouse</th>
                            <th onClick={() => handleSort('hz')}>Hz</th>
                            <th onClick={() => handleSort('dpi')}>DPI</th>
                            <th onClick={() => handleSort('sens')}>Sens</th>
                            <th onClick={() => handleSort('edpi')}>eDPI</th>
                            <th onClick={() => handleSort('zoomSens')}>Zoom Sens</th>
                            <th onClick={() => handleSort('monitor')}>Monitor</th>
                            <th onClick={() => handleSort('resolution')}>Resolution</th>
                            <th onClick={() => handleSort('aspectRatio')}>Aspect Ratio</th>
                            <th onClick={() => handleSort('scalingMode')}>Scaling Mode</th>
                            <th onClick={() => handleSort('mousepad')}>Mousepad</th>
                            <th onClick={() => handleSort('keyboard')}>Keyboard</th>
                            <th onClick={() => handleSort('headset')}>Headset</th>
                            <th onClick={() => handleSort('chair')}>Chair</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedData.map((player, index) => (
                            <tr key={index}>
                                <td>{player.team}</td>
                                <td>{player.player}</td>
                                <td>{player.role}</td>
                                <td>{player.mouse}</td>
                                <td>{player.hz}</td>
                                <td>{player.dpi}</td>
                                <td>{player.sens}</td>
                                <td>{player.edpi}</td>
                                <td>{player.zoomSens}</td>
                                <td>{player.monitor}</td>
                                <td>{player.resolution}</td>
                                <td>{player.aspectRatio}</td>
                                <td>{player.scalingMode}</td>
                                <td>{player.mousepad}</td>
                                <td>{player.keyboard}</td>
                                <td>{player.headset}</td>
                                <td>{player.chair}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* ✅ Dolny suwak */}
            <div className={styles.scrollWrapper} ref={bottomScrollRef}>
                <div className={styles.scrollBar}></div>
            </div>
        </div>
    );
};

export default ProSettingsTable;
