import React, { useEffect, useState } from 'react';
import Navbar from './Navbar/Navbar';
import Cards from './Cards/Cards';
import Pagination from './Pagination/Pagination';
import { useSelector } from 'react-redux';

const Home = () => {
	const [currentPage, setCurrentPage] = useState(1);
	const [recipesPerPage] = useState(9);
	const recipes = useSelector((state) => state.recipe.recipes);

	const indexOfLastRecord = currentPage * recipesPerPage;
	const indexOfFirstRecord = indexOfLastRecord - recipesPerPage;
	const currentRecipes = recipes.slice(indexOfFirstRecord, indexOfLastRecord);
	const nPages = Math.ceil(recipes.length / recipesPerPage);

	return (
		<div>
			<h1>Home</h1>
			<Navbar />
			<Cards
				indexOfFirstRecord={indexOfFirstRecord}
				indexOfLastRecord={indexOfLastRecord}
			/>
			<Pagination
				nPages={nPages}
				currentPage={currentPage}
				setCurrentPage={setCurrentPage}
			/>
		</div>
	);
};

export default Home;
