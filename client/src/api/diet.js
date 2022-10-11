import axios from 'axios';

const url = 'http://localhost:3001/diet';

export const getDiets = () => axios.get(url);