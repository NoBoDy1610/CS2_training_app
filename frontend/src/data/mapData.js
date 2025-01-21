const mapData = {
	mirage: {
		name: 'Mirage',
		radar: require('../assets/maps/mirage/mirage_radar.jpg'),
		locations: [
			{
				name: 'Bombsite A',
				image: require('../assets/maps/mirage/mirage_a.jpg'),
				x: '54%',
				y: '76%',
				description: 'Główne miejsce podkładania bomby dla atakujących.',
			},
			{
				name: 'Bombsite B',
				image: require('../assets/maps/mirage/mirage_b.jpg'),
				x: '23%',
				y: '30%',
				description: 'Drugie miejsce podkładania bomby.',
			},
			{
				name: 'Apartamenty',
				image: require('../assets/maps/mirage/mirage_apps.jpg'),
				x: '30%',
				y: '18%',
				description: 'Przejście na bombsite B od strony terrorystów.',
			},
			{
				name: 'Dżungla',
				image: require('../assets/maps/mirage/mirage_jungle.jpg'),
				x: '41%',
				y: '60%',
				description: 'Połączenie pomiędzy Mid, A i CT spawn.',
			},
			{
				name: 'Pałac',
				image: require('../assets/maps/mirage/mirage_palace.jpg'),
				x: '75%',
				y: '75%',
				description:
					'Balkon prowadzący na A Site, często wykorzystywany do rzutów granatów.',
			},
			{
				name: 'Środek',
				image: require('../assets/maps/mirage/mirage_mid.jpg'),
				x: '60%',
				y: '45%',
				description:
					'Kluczowy obszar mapy, kontrola Mid daje przewagę na każdej rundzie.',
			},
			{
				name: 'Drabinkowy',
				image: require('../assets/maps/mirage/mirage_ladder.jpg'),
				x: '44%',
				y: '36%',
				description: 'Mały pokój z drabiną, łączący Mid i B Short.',
			},
			{
				name: 'Okno',
				image: require('../assets/maps/mirage/mirage_window.jpg'),
				x: '40%',
				y: '45%',
				description: 'Główna pozycja snajperów CT do kontrolowania Mid.',
			},
			{
				name: 'Rampa',
				image: require('../assets/maps/mirage/mirage_ramp.jpg'),
				x: '76%',
				y: '65%',
				description: 'Główne wejście terrorystów na A Site.',
			},
			{
				name: 'Dolny tunel',
				image: require('../assets/maps/mirage/mirage_under.jpg'),
				x: '43%',
				y: '40%',
				description: 'Przejście podziemne łączące Mid i B Apartments.',
			},
			{
				name: 'Punkt startu T',
				image: require('../assets/maps/mirage/mirage_tt.jpg'),
				x: '88%',
				y: '35%',
				description: 'Początkowa lokalizacja terrorystów.',
			},
			{
				name: 'Punkt startu CT',
				image: require('../assets/maps/mirage/mirage_ct.jpg'),
				x: '30%',
				y: '70%',
				description: 'Początkowa lokalizacja antyterrorystów.',
			},
			{
				name: 'Gala',
				image: require('../assets/maps/mirage/mirage_short.jpg'),
				x: '45%',
				y: '29%',
				description: 'Krótkie przejście łączące Mid i B Site.',
			},
			{
				name: 'Łącznik',
				image: require('../assets/maps/mirage/mirage_con.jpg'),
				x: '50%',
				y: '55%',
				description:
					'Łączy Mid z A Site, bardzo ważne dla rotacji i kontroli mapy.',
			},
			{
				name: 'Kuchnia',
				image: require('../assets/maps/mirage/mirage_kitchen.jpg'),
				x: '25%',
				y: '44%',
				description: 'Miejsce kontrolowania rotacji z CT na B Site.',
			},
		],
	},
};

export default mapData;
