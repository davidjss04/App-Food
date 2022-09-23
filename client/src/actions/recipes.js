import { GET_ALL, GET_BY_ID, CREATE } from '../constants/actionTypes';

import * as api from '../api/recipes';

export const getAll = (name) => async (dispatch) => {
	try {
		const { data } = await api.getAll(name);
		dispatch({ type: GET_ALL, payload: data });
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
