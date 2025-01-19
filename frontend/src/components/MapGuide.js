import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/MapGuide.module.css';

const maps = [
  { name: 'Mirage', image: '/images/mirage/mirage_background.jpg', logo: '/images/mirage/mirage_logo.webp' },
  { name: 'Inferno', image: '/images/inferno/inferno_background.jpeg', logo: '/images/inferno/inferno_logo.webp' },
  { name: 'Nuke', image: '/images/nuke/nuke_background.jpg', logo: '/images/nuke/nuke_logo.webp' },
  { name: 'Anubis', image: '/images/anubis/anubis_background.jpg', logo: '/images/anubis/anubis_logo.webp' },
  { name: 'Ancient', image: '/images/ancient/ancient_background.jpg', logo: '/images/ancient/ancient_logo.webp' },
  { name: 'Dust II', image: '/images/dust2/dust2_background.jpg', logo: '/images/dust2/dust2_logo.webp' },
  { name: 'Train', image: '/images/train/train_background.jpg', logo: '/images/train/train_logo.webp' },
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
            style={{
              backgroundImage: `url(${map.image})`,
            }}
          >
            <img src={map.logo} alt={`${map.name} logo`} className={styles.mapLogo} />
          </div>
          <div className={styles.mapName}>{map.name}</div>
        </div>
      ))}
    </div>
  );
};

export default MapGuide;
