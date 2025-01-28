import React from 'react';

const Tactics = () => (
	<div className='border rounded-lg shadow-md p-4 bg-white'>
		<h2>Nauka taktyk</h2>
		<p>Wybierz mapę i sytuację finansową, aby zobaczyć odpowiednie taktyki.</p>

		<select>
			<option value='pistol'>Pistoletówka</option>
			<option value='eco'>Runda ekonomiczna</option>
			<option value='force'>Runda force</option>
			<option value='fullbuy'>Runda full buy</option>
		</select>
	</div>
);

export default Tactics;
