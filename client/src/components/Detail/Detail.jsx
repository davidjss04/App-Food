import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../../actions/recipe.js';

const Detail = (props) => {
	const dispatch = useDispatch();
	const recipe = useSelector((state) => state.recipe.recipes);

	useEffect(() => {
		dispatch(actions.getById(props.match.params.id));
	}, [dispatch, props.match.params.id]);

	return (
		<div>
			<h1>Detail</h1>
			{console.log(recipe)}
			{recipe && (
				<div>
					<h1>{recipe.title}</h1>
					<img src={recipe.image} alt={recipe.title} />
					<h3>Summary: {recipe.summary}</h3>
					<h3>Health Score: {recipe.healthScore}</h3>
					<h3>Summary: {recipe.summary}</h3>
				</div>
			)}
		</div>
	);
};

export default Detail;
