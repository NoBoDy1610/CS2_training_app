import React from 'react';

const About = () => (
	<div className='border rounded-lg shadow-md p-6 bg-white max-w-3xl mx-auto'>
		<h2 className='text-2xl font-bold mb-4'>O aplikacji</h2>
		<p className='mb-4'>
			Nasza aplikacja to zaawansowane narzędzie stworzone dla graczy, którzy chcą poprawić swoje umiejętności w zakresie czasu reakcji, celności oraz znajomości map i taktyk. Dzięki różnorodnym funkcjom, każdy użytkownik może dostosować trening do swoich potrzeb i śledzić swoje postępy.
		</p>

		<h3 className='text-xl font-semibold mb-2'>🎯 Główne funkcje:</h3>
		<ul className='list-disc list-inside mb-4'>
			<li><strong>Ćwiczenia reakcji i celności</strong> – interaktywne testy pomagające poprawić refleks i precyzję strzałów.</li>
			<li><strong>Analiza wyników</strong> – zapisywanie statystyk, historia wyników oraz możliwość ich porównywania.</li>
			<li><strong>Personalizowane plany treningowe</strong> – dostosowanie treningu do priorytetów użytkownika (reakcja, celność, znajomość map, taktyki).</li>
			<li><strong>Baza taktyk</strong> – strategie, pozycje i porady do gry na najpopularniejszych mapach.</li>
			<li><strong>Interaktywna mapa</strong> – wizualizacja miejscówek, ustawień oraz ról na mapach.</li>
		</ul>

		<h3 className='text-xl font-semibold mb-2'>📈 Jak to działa?</h3>
		<ol className='list-decimal list-inside mb-4'>
			<li>Rejestrujesz się i konfigurujesz swój profil.</li>
			<li>Wybierasz priorytety treningowe (np. szybkość reakcji, celność).</li>
			<li>Rozpoczynasz ćwiczenia i śledzisz swoje wyniki.</li>
			<li>Analizujesz swoje postępy i dostosowujesz plan treningowy.</li>
		</ol>

		<h3 className='text-xl font-semibold mb-2'>🔮 Plany na przyszłość</h3>
		<ul className='list-disc list-inside mb-4'>
			<li>Dodanie trybu rywalizacji – możliwość porównywania wyników ze znajomymi.</li>
			<li>Rozszerzona analiza – AI podpowiadające słabe strony użytkownika.</li>
			<li>Nowe interaktywne ćwiczenia – realistyczne symulacje w środowisku 3D.</li>
		</ul>

		<p className='text-gray-600 italic'>
			Stale rozwijamy naszą aplikację, aby dostarczać najlepsze narzędzia dla graczy. Dziękujemy za korzystanie z niej i czekamy na Twoją opinię! 🚀
		</p>
	</div>
);

export default About;
