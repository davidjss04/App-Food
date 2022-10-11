import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Card from './Card/Card';
import * as actions from '../../../actions/recipe.js';
import styles from './Cards.module.css';

import loader from '../../../images/loader.gif';

const Cards = (props) => {
	const dispatch = useDispatch();
	const recipes = useSelector((state) => state.recipe.recipesFiltered);

	useEffect(() => {
		dispatch(actions.getAll());
		console.log('Traigo las recetas');
	}, [dispatch]);

	useEffect(() => {}, [props.nPages]);

	return (
		<div className={styles.cards}>
			{Array.isArray(recipes) ? (
				recipes
					.map((recipe) => (
						<Card
							key={recipe.id}
							id={recipe.id}
							title={recipe.title}
							image={recipe.image}
							diets={recipe.diets}
						/>
					))
					.slice(props.indexOfFirstRecipe, props.indexOfLastRecipe)
			) : (
				<img src={loader} alt="loader" />
			)}
		</div>
	);
};

export default Cards;
