const { Recipe, Diet } = require('../db');
const axios = require('axios');
const { API_KEY } = process.env;

module.exports = {
	async getAllByName(req, res, next) {
		try {
			const { name } = req.query;
			const recipesAPi = await this.getAllApi();
			const recipesDb = await this.getAllDb();
			const recipes = recipesAPi.concat(recipesDb);
			const recipesFiltered = recipes.filter((recipe) =>
				recipe.title.toLowerCase().includes(name.toLowerCase())
			);

			if (recipesFiltered.length) {
				return res.status(200).send(recipesFiltered);
			}

			return res.status(404).send('No recipes found');
		} catch (error) {
			next(error);
		}
	},

	async getById(req, res, next) {
		try {
			const { idRecipe } = req.params;
			const recipesAPi = await this.getByIdApi(idRecipe);
			const recipesDb = await this.getAllDb();
			const recipeDbFound = recipesDb.find((recipe) => recipe.id === idRecipe);

			if (recipesAPi) {
				return res.status(200).send(recipesAPi);
			}

			if (recipeDbFound) {
				return res.status(200).send(recipeDbFound);
			}

			return res.status(404).send('No recipes found');
		} catch (error) {
			next(error);
		}
	},

	//Se puede mejorar usando el findOrCreate de sequelize para evitar el anviguedad y la duplicacion de datos
	async create(req, res, next) {
		try {
			const { title, summary, healthScore, image, diets } = req.body;

			const recipeCreated = await Recipe.create({
				title,
				summary,
				healthScore,
				image,
			});

			diets.forEach(async (diet) => {
				const [diett, created] = await Diet.findOrCreate({
					where: { name: diet },
				});

				await recipeCreated.addDiet(diett);
			});

			// const dietsDb = await Diet.findAll({
			// 	where: {
			// 		name: diets,
			// 	},
			// });

			// await recipeCreated.addDiets(dietsDb);

			return res
				.status(200)
				.send({ title, summary, healthScore, image, diets });
		} catch (error) {
			next(error);
		}
	},

	async getByIdApi(idRecipe) {
		try {
			const { data } = await axios.get(
				`https://api.spoonacular.com/recipes/${idRecipe}/information?apiKey=${API_KEY}`
			);

			const recipe = {
				id: data.id,
				title: data.title,
				summary: data.summary.replace(/<[^>]*>?/g, ''),
				healthScore: data.healthScore,
				image: data.image,
				diets: data.diets,
			};

			if (recipe) {
				return recipe;
			}

			return {};
		} catch (error) {
			console.log(error);
		}
	},

	async getAllApi() {
		try {
			const recipes = (
				await axios.get(
					`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`
				)
			).data.results.map((recipe) => {
				return {
					id: recipe.id,
					title: recipe.title,
					summary: recipe.summary.replace(/<[^>]*>?/g, ''),
					healthScore: recipe.healthScore,
					image: recipe.image,
					diets: recipe.diets,
				};
			});

			if (recipes.length > 0) {
				return recipes;
			}

			return [];
		} catch (error) {
			return [];
		}
	},

	async getAllDb() {
		try {
			const recipes = await Recipe.findAll({ include: Diet });
			const recipesFiltered = recipes.map((recipe) => {
				return {
					id: recipe.id,
					title: recipe.title,
					summary: recipe.summary,
					healthScore: recipe.healthScore,
					image: recipe.image,
					diets: recipe.diets.map((diet) => diet.name),
				};
			});

			if (recipesFiltered.length > 0) {
				return recipesFiltered;
			}

			return [];
		} catch (error) {
			return [];
		}
	},

};
