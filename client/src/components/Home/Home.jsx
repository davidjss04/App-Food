import React, { useEffect, useState } from 'react';
import Navbar from './Navbar/Navbar';
import Cards from './Cards/Cards';

const Home = () => {
	const [search, setSearch] = useState('');

	useEffect(() => {
		setSearch('berry');
	}, []);

	return (
		<div>
			<h1>Home</h1>
			<Navbar />
			<Cards search={search} />
		</div>
	);
};

export default Home;
