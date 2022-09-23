const axios = require('axios');
const { Recipe, Diet } = require('../db.js');
const recipe = require('./recipe.js');
const { API_KEY } = process.env;

module.exports = {
	async getAll() {
		try {
			// let recipes = (
			// 	await axios.get(
			// 		`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=1`
			// 	)
			// ).data.results.map((recipe) => ({
			// 	title: recipe.title,
			// 	summary: recipe.summary.replace(/<[^>]*>?/g, ''),
			// 	healthScore: recipe.healthScore,
			// 	image: recipe.image,
			// 	diets: recipe.diets,
			// }));

			// const result = await Recipe.findAll({
			// 	where: { title: recipe.title },
			// 	include: Diet,
			// });

			// console.log(result);

			// await Recipe.bulkCreate(recipes);
			let recipes = [
				{
					title: 'Pizza',
					summary: 'Pizza',
					healthScore: 100,
					image: 'https://spoonacular.com/recipeImages/716429-556x370.jpg',
					diets: ['vegetarian', 'vegan', 'gluten free'],
				},
				{
					title: 'Pizzas',
					summary: 'Pizzafsa',
					healthScore: 10,
					image: 'https://spoonacular.com/recipeImages/716429-556x370.jpg',
					diets: ['vegetarian', 'gluten free'],
				},
			];

			recipes.forEach(async (recipe) => {
				const recipeCreate = await Recipe.create(recipe);
				recipe.diets.forEach(async (diet) => {
					const [diett, created] = await Diet.findOrCreate({
						where: { name: diet },
					});

					await recipeCreate.addDiet(diett);

					console.log(created);

					// dietCreate = await Diet.create({name: diet});
					// await recipeCreate.addDiet(dietCreate);
				});
			});

			// const recipeCreate = await Recipe.create(recipe);
			// const dietCreate = await Diet.create({ name: recipe.diets[0] });
			// await recipeCreate.addDiet(dietCreate);

			return console.log('Recipes add to DB');
		} catch (error) {
			console.log(error);
		}
	},
};