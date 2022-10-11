import { GET_DIETS } from '../constants/actionTypes';

const initialState = {
	diets: [],
};

const dietsReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_DIETS:
			return { ...state, diets: action.payload };
		default:
			return state;
	}
};

export default dietsReducer;
