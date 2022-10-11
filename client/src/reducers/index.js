import { combineReducers } from 'redux';

import recipe from './recipe';
import diet from './diet';

export default combineReducers({ recipe, diet });
