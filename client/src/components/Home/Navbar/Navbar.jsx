import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import * as actionsRecipe from '../../../actions/recipe.js';
import * as actionsDiet from '../../../actions/diet.js';

import styles from './Navbar.module.css';

const Navbar = (props) => {
	const dispatch = useDispatch();
	const recipes = useSelector((state) => state.recipe.recipes);
	const diets = useSelector((state) => state.diet.diets);
	const [search, setSearch] = useState('');

	useEffect(() => {
		dispatch(actionsDiet.getDiet());
		console.log('useEffect para diets');
	}, [dispatch]);

	const handleChange = (e) => {
		e.preventDefault();
		setSearch(e.target.value);
		// dispatch(actionsRecipe.getAll(e.target.value));
		dispatch(actionsRecipe.filterBySearch(recipes,e.target.value));
		console.log('handleChange', e.target.value);
	};

	const handleClick = (e) => {
		e.preventDefault();
		// dispatch(actionsRecipe.getAll(e.target.value));
		// setSearch('');
		console.log('handleClick', e.target.value);
	};

	const handleFilterByDiets = (e) => {
		e.preventDefault();
		dispatch(actionsRecipe.filterByDiet(recipes, e.target.value));
		props.setCurrentPage(1);
		console.log('handleFilterByDiets', e.target.value);
	};

	const handleFilterByOrder = (e) => {
		e.preventDefault();
		dispatch(actionsRecipe.filterByOrder(recipes, e.target.value));
		console.log('handleFilterByOrder', e.target.value);
	};

	const handleFilterByScore = (e) => {
		e.preventDefault();
		dispatch(actionsRecipe.filterByScore(recipes, e.target.value));
		console.log('handleFilterByScore', e.target.value);
	};

	return (
		<div className={styles.topnav}>
			<h3>
				<Link className={styles.link} to="/home">
					HOME
				</Link>
			</h3>
			<form className={styles.search} onSubmit={(e) => handleClick(e)}>
				<input
					type="text"
					placeholder="Serach.."
					onChange={handleChange}
					value={search}
				/>
				<input type="submit" value="Search" />
			</form>
			<div className={styles.select}>
				<select onChange={handleFilterByDiets}>
					<option>ALL</option>
					{Array.isArray(diets)
						? diets.map((diet) => {
								return (
									<option key={diet.id} value={diet.name}>
										{diet.name}
									</option>
								);
						  })
						: null}
				</select>
			</div>
			<div className={styles.select}>
				<select onChange={handleFilterByScore}>
					<option value="NONE">NONE</option>
					<option value="HIGHEST SCORE">HIGHEST SCORE</option>
					<option value="LOWEST SCORE">LOWEST SCORE</option>
				</select>
			</div>

			<div className={styles.select}>
				<select onChange={handleFilterByOrder}>
					<option value="NONE">NONE</option>
					<option value="ASC">ASC</option>
					<option value="DESC">DESC</option>
				</select>
			</div>
			<h3>
				<Link className={styles.link} to="/form">
					CREATE RECIPE
				</Link>
			</h3>
		</div>
	);
};

export default Navbar;
