import React from 'react';
import trainingData from '../data/trainingData';
import '../styles/TrainingPlans.css';

const TrainingPlans = ({ priority }) => {
	const plan = trainingData[priority];

	if (!plan) {
		return <p>Nie znaleziono planu treningowego.</p>;
	}

	return (
		<div className='training-plans'>
			<h2>{plan.title}</h2>
			<p>{plan.description}</p>
			<ul>
				{plan.steps.map((step, index) => (
					<li key={index}>{step}</li>
				))}
			</ul>
		</div>
	);
};

export default TrainingPlans;
