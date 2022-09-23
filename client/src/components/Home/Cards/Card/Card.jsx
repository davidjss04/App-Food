import React from 'react';
import { Link } from 'react-router-dom';

const Card = (props) => {
	return (
		<div>
			<Link to={`/detail/${props.id}`}>
				<h1>{props.title}</h1>
			</Link>
			<img src={props.image} alt={props.title} />
			<p>{props.diets}</p>
		</div>
	);
};

export default Card;
