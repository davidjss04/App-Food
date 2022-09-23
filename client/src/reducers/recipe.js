import {
	CREATE,
	GET_ALL,
	GET_BY_ID,
	SET_VALUE_SEARCH,
} from '../constants/actionTypes';

const initialState = {
	recipes: [],
	valueSearch: '',
};

const recipesReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_ALL:
			return { ...state, recipes: action.payload };
		case GET_BY_ID:
			return { ...state, recipes: action.payload };
		case CREATE:
			return { ...state, recipes: [...state.recipes, action.payload] };
		case SET_VALUE_SEARCH:
			return { ...state, valueSearch: action.payload };
		default:
			return state;
	}
};

export default recipesReducer;
