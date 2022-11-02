import {
	GET_ALL,
	GET_BY_ID,
	CREATE,
	SET_VALUE_SEARCH,
	FILTER_BY_SEARCH,
	FILTER_BY_ORDER,
	FILTER_BY_DIET,
	FILTER_BY_SCORE,
} from '../constants/actionTypes';

import * as api from '../api/recipes';

export const getAll = (name) => async (dispatch) => {
	try {
		const { data } = await api.getAll(name);
		{}({ type: GET_ALL, payload: data });
	} catch (error) {
		console.log(error);
	}
};

export const getById = (id) => async (dispatch) => {
	try {
		const { data } = await api.getById(id);
		dispatch({ type: GET_BY_ID, payload: data });
	} catch (error) {
		console.log(error);
	}
};

export const create = (newRecipe) => async (dispatch) => {
	try {
		const { data } = await api.create(newRecipe);
		dispatch({ type: CREATE, payload: data });
	} catch (error) {
		console.log(error);
	}
};

export const setValueSearch = (value) => (dispatch) => {
	dispatch({ type: SET_VALUE_SEARCH, payload: value });
};

//Esta función no la estamos usando por que tenemos una directa de la API
export const filterBySearch = (recipes, valueSearch) => (dispatch) => {
	dispatch({
		type: FILTER_BY_SEARCH,
		payload: {
			valueSearch: valueSearch,
			recipes:
				recipes === ''
					? recipes
					: recipes.filter((recipe) => {
							return recipe.title
								.toLowerCase()
								.includes(valueSearch.toLowerCase());
					  }),
		},
	});
};

export const filterByOrder = (recipes, order) => (dispatch) => {

	const temporalRecipes = [...recipes];

	dispatch({
		type: FILTER_BY_ORDER,
		payload: {
			order: order,
			recipes:
				order === 'NONE'
					? recipes
					: temporalRecipes.sort((a, b) => {
							if (order === 'ASC') {
								return a.title.localeCompare(b.title);
							} else {
								return b.title.localeCompare(a.title);
							}
					  }),
		},
	});
};

export const filterByDiet = (recipes, diet) => (dispatch) => {
	dispatch({
		type: FILTER_BY_DIET,
		payload: {
			diet: diet,
			recipes:
				diet === 'ALL'
					? recipes
					: recipes.filter((recipe) => recipe.diets.includes(diet)),
		},
	});
};

export const filterByScore = (recipes, score) => (dispatch) => {
	const temporalRecipes = [...recipes];

	dispatch({
		type: FILTER_BY_SCORE,
		payload: {
			score: score,
			recipes:
				score === 'NONE'
					? recipes
					: score === 'HIGHEST SCORE'
					? temporalRecipes.sort((a, b) => b.healthScore - a.healthScore)
					: temporalRecipes.sort((a, b) => a.healthScore - b.healthScore),
		},
	});
};
