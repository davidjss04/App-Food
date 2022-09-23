import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Card from './Card/Card';
import * as actions from '../../../actions/recipe.js';

const Cards = (props) => {
	const dispatch = useDispatch();
	const recipes = useSelector((state) => state.recipe.recipes);
	const valueSearch = useSelector((state) => state.recipe.valueSearch);

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
							if (valueSearch === '') {
								return recipe;
							} else if (
								recipe.title.toLowerCase().includes(valueSearch.toLowerCase())
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
						.slice(props.indexOfFirstRecord, props.indexOfLastRecord)
				: null}
		</div>
	);
};

export default Cards;
