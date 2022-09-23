import axios from 'axios';

const url = 'http://localhost:3001/recipe';

export const getAll = (name) =>
	name ? axios.get(`${url}?name=${name}`) : axios.get(url);
export const getById = (id) => axios.get(`${url}/${id}`);
export const create = (newRecipe) => axios.post(url, newRecipe);
