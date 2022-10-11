import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Card.module.css';

const Card = (props) => {
	return (
		// <div className={styles.card}>
		// 	<Link to={`/detail/${props.id}`}>
		// 		<h2>{props.title}</h2>
		// 		<img src={props.image} alt={props.title} />
		// 		<p>{props.diets}</p>
		// 	</Link>
		// </div>

		<div className={styles.card_item}>
			<div className={styles.card}>
				<img
					className={styles.card__image}
					src={props.image}
					alt={props.title}
				/>
				<div className={styles.card_content}>
					<Link to={`/detail/${props.id}`} className={styles.card__title}>
						{props.title}
					</Link>
					<p className={styles.card__text}>{props.diets}</p>
				</div>
			</div>
		</div>
	);
};

export default Card;
