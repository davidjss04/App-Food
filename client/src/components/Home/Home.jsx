import React, { useState } from 'react';
import Navbar from './Navbar/Navbar';
import Cards from './Cards/Cards';
import Pagination from './Pagination/Pagination';
import { useSelector } from 'react-redux';

const Home = () => {
	const recipes = useSelector((state) => state.recipe.recipesFiltered);

	const [currentPage, setCurrentPage] = useState(1);
	const [recipesPerPage] = useState(9);

	const indexOfLastRecipe = currentPage * recipesPerPage;
	const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
	const nPages = Math.ceil(recipes.length / recipesPerPage);

	return (
		<div>
			<Navbar setCurrentPage={setCurrentPage}/>
			{/* <Cards
				indexOfFirstRecipe={indexOfFirstRecipe}
				indexOfLastRecipe={indexOfLastRecipe}
				nPages={nPages}
			/>
			<Pagination
				nPages={nPages}
				currentPage={currentPage}
				setCurrentPage={setCurrentPage}
			/> */}
		</div>
	);
};

export default Home;
