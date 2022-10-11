import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import * as actionDiet from '../../actions/diet';
import * as actionRecipe from '../../actions/recipe';

import styles from './Form.module.css';

const Form = () => {
	const dispatch = useDispatch();
	const diets = useSelector((state) => state.diet.diets);
	const recipes = useSelector((state) => state.recipe.recipesFiltered);

	const [error, setError] = useState({});
	const [input, setInput] = useState({
		title: '',
		summary: '',
		healthScore: 0,
		image:
			'https://st.depositphotos.com/1987177/3470/v/600/depositphotos_34700099-stock-illustration-no-photo-available-or-missing.jpg',
		steps: '',
		diets: [],
	});

	useEffect(() => {
		dispatch(actionDiet.getDiet());
		console.log('useEffect');
	}, []);

	const handleSubmit = async (e) => {
		e.preventDefault();
		dispatch(actionRecipe.create(input));
		console.log('submitted');
	};

	const handleSelect = (e) => {
		if (!input.diets.includes(e.target.value)) {
			setInput({
				...input,
				diets: [...input.diets, e.target.value],
			});
		}

		console.log(input.diets);
	};

	const validate = (input) => {
		let errors = {};
		if (!input.title) {
			errors.title = 'title is require';
		}
		if (!input.summary) {
			errors.summary = 'Summary is require';
		}
		return errors;
	};

	const handleChange = (e) => {
		setInput({
			...input,
			[e.target.name]: e.target.value,
		});
		setError(
			validate({
				...input,
				[e.target.name]: e.target.value,
			})
		);
		if (
			recipes.find(
				(recipe) => recipe.title.toLowerCase() === e.target.value.toLowerCase()
			)
		) {
			setError({
				...input,
				[e.target.name]: 'Recipe is found',
			});
		}
		console.log(input);
	};

	const handleNumber = (e) => {
		try {
			const parsValue = parseInt(e.target.value);
			setInput({
				...input,
				[e.target.name]: parsValue,
			});
		} catch {
			console.log('error');
		}
		// console.log(input)
	};

	const deleteSelection = (diett) => {
		setInput({
			...input,
			diets: input.diets.filter((diet) => diet !== diett),
		});
	};

	return (
		<>
			<form className={styles.form} onSubmit={handleSubmit}>
				<label>CREAR UNA RECETA</label>
				<input
					className={styles.input}
					type="text"
					name="title"
					placeholder="Title"
					onChange={handleChange}
					value={input.title}
				/>

				<input
					className={styles.input}
					type="textarea"
					name="summary"
					onChange={handleChange}
					placeholder="Summary"
					value={input.summary}
				/>

				<input
					className={styles.input}
					type="number"
					name="healthScore"
					placeholder="Health Score"
					min="0"
					max="99"
					step="5"
					onChange={handleNumber}
					value={input.healthScore}
				/>

				<input
					className={styles.input}
					type="text"
					name="image"
					onChange={handleChange}
					placeholder="Image"
					value={input.image}
				/>

				<input
					className={styles.input}
					type="text"
					name="steps"
					onChange={handleChange}
					placeholder="Steps"
					value={input.steps}
				/>

				<select
					className={styles.input}
					defaultValue="Diets"
					onChange={handleSelect}
				>
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

				<div className={styles.submit}>
					{input.diets.map((diet) => {
						return (
							<p key={diet}>
								{diet}
								<button onClick={() => deleteSelection(diet)}>X</button>
							</p>
						);
					})}
				</div>

				<button type="submit">Create</button>

				{validate(input) ? <p>Falta campos</p> : null}
			</form>
		</>
	);
};

export default Form;
