import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import * as actions from '../../../actions/recipe.js';

const Navbar = (props) => {
	const dispatch = useDispatch();
	const valueSearch = useSelector((state) => state.recipe.valueSearch);
	// const [search, setSearch] = React.useState('');

	const handleChange = (e) => {
		e.preventDefault();
		dispatch(actions.setValueSearch(e.target.value));
		console.log(valueSearch);
	};

	// const handleSubmit = (e) => {
	// 	e.preventDefault();
	// };

	return (
		<div>
			<input
				type="search"
				placeholder="Serach.."
				onChange={handleChange}
				value={props.Search}
			/>
			<input type="submit" value="Search" />
		</div>
	);
};

export default Navbar;
