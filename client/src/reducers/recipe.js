import {
	CREATE,
	GET_ALL,
	GET_BY_ID,
	SET_VALUE_SEARCH,
	FILTER_BY_SEARCH,
	FILTER_BY_ORDER,
	FILTER_BY_DIET,
	FILTER_BY_SCORE,
} from '../constants/actionTypes';

const initialState = {
	recipes: [],
	recipesFiltered: [],
	valueSearch: '',
};

const recipesReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_ALL:
			return {
				...state,
				recipes: action.payload,
				recipesFiltered: action.payload,
			};
		case GET_BY_ID:
			return { ...state, recipesFiltered: action.payload };
		case CREATE:
			return {
				...state,
				recipes: [...state.recipes, action.payload],
				recipesFiltered: [...state.recipes, action.payload],
			};
		case SET_VALUE_SEARCH:
			return { ...state, valueSearch: action.payload };
		case FILTER_BY_SEARCH:
			return {
				...state,
				recipesFiltered: action.payload.recipes,
				valueSearch: action.payload.valueSearch,
			};
		case FILTER_BY_ORDER:
			return {
				...state,
				recipesFiltered: action.payload.recipes,
				order: action.payload.order,
			};
		case FILTER_BY_DIET:
			return {
				...state,
				recipesFiltered: action.payload.recipes,
				diet: action.payload.diet,
			};
		case FILTER_BY_SCORE:
			return {
				...state,
				recipesFiltered: action.payload.recipes,
				score: action.payload.score,
			};
		default:
			return state;
	}
};

export default recipesReducer;
