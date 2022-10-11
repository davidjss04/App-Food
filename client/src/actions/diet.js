import { GET_DIETS } from '../constants/actionTypes';

import * as api from '../api/diet';

export const getDiet = () => async (dispatch) => {
	try {
		const { data } = await api.getDiets();
		dispatch({ type: GET_DIETS, payload: data });
	} catch (error) {
		console.log(error);
	}
};
