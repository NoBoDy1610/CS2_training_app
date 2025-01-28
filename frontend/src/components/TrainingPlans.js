import React from 'react';
import '../styles/TrainingPlans.css'; // Nowe style

const TrainingPlans = ({ priority }) => {
	const plans = {
		reaction: 'Trening reakcji: 30 minut dziennie ćwiczenia refleksu.',
		aimTraining: 'Trening celności: 20 minut ćwiczeń precyzyjnego celowania.',
		tactics: 'Trening taktyki: Analiza map i ćwiczenie ustawień.',
	};

	return (
		<div className='training-plans'>
			<h2>Twój plan treningowy</h2>
			<p>{plans[priority]}</p>
		</div>
	);
};

export default TrainingPlans;
