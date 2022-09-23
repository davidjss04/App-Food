import React from 'react';

import * as actions from '../../../actions/recipes.js';

const Navbar = (props) => {
	// const dispatch = useDispatch();
	const [search, setSearch] = React.useState('');

	const handleChange = (e) => {
		e.preventDefault();
		setSearch(e.target.value);
		// dispatch(actions.getAll(search));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		setSearch('');
	};

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
