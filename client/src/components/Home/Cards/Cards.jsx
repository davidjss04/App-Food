import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Card from './Card/Card';
import * as actions from '../../../actions/recipes.js';

const Cards = (props) => {
	const dispatch = useDispatch();
	const recipes = useSelector((state) => state.recipes);
	useEffect(() => {
		dispatch(actions.getAll());
	}, [dispatch]);

	return (
		<div>
			<h1>Recipes</h1>
			{/* {Array.isArray(recipes)
				? recipes.map((recipe) => {
						return (
							<Card
								key={recipe.id}
								id={recipe.id}
								title={recipe.title}
								image={recipe.image}
								diets={recipe.diets}
							/>
						);
				  })
				: null} */}

			{Array.isArray(recipes)
				? recipes
						.filter((recipe) => {
							if (props.search === '') {
								return recipe;
							} else if (
								recipe.title.toLowerCase().includes(props.search.toLowerCase())
							) {
								return recipe;
							}
						})
						.map((recipe) => {
							return (
								<Card
									key={recipe.id}
									id={recipe.id}
									title={recipe.title}
									image={recipe.image}
									diets={recipe.diets}
								/>
							);
						})
				: null}
		</div>
	);
};

export default Cards;
