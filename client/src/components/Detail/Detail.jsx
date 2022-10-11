import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../../actions/recipe.js';

import styles from './Detail.module.css';

const Detail = (props) => {
	const dispatch = useDispatch();
	const recipe = useSelector((state) => state.recipe.recipesFiltered);

	useEffect(() => {
		dispatch(actions.getById(props.match.params.id));
	}, [dispatch, props.match.params.id]);

	return (
		<div className={styles.container}>
			{recipe && (
				<div>
					<div className={styles.title}>{recipe.title}</div>
					<div className={styles.card_container}>
						<img
							className={styles.title}
							src={recipe.image}
							alt={recipe.title}
						/>
						<div className={styles.diets}>
							<h3 className={styles.title_info}>Diets:</h3>
							<div>{recipe.diets}</div>
						</div>
					</div>
					<div className={styles.info}>
						<div className={styles.summary_container}>
							<h3 className={styles.title_info}>Summary:</h3>
							<div>{recipe.summary}</div>
						</div>
						<div className={styles.steps_container}>
							<h3 className={styles.title_info}>Steps:</h3>
							<div>{recipe.steps}</div>
						</div>
					</div>
					<div className={styles.score_container}>
						<h3 className={styles.title_info}>Score:</h3>
						<div>{recipe.healthScore}</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default Detail;
