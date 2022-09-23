import { CREATE, GET_ALL, GET_BY_ID } from '../constants/actionTypes';

const recipesReducer = (recipes = [], action) => {
    switch (action.type) {
        case GET_ALL:
            return action.payload;
        case GET_BY_ID:
            return action.payload;
        case CREATE:
            return [...recipes, action.payload];
        default:
            return recipes;
    }
}

export default recipesReducer;