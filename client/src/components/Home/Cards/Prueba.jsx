import React from 'react';

const Prueba = (props) => {
	return (
		<div>
			<h2>{props.title}</h2>
			<img src={props.image} alt={props.title} />
			<p>{props.diets}</p>
		</div>
	);
};

export default Prueba;
