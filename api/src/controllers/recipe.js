const { Recipe, Diet } = require('../db');
const axios = require('axios');
const { API_KEY } = process.env;

module.exports = {
	async getAll(req, res, next) {
		try {
			const { name } = req.query;
			const recipesAPi = await this.getAllApi();
			const recipesDb = await this.getAllDb();
			const recipes = recipesAPi.concat(recipesDb);

			if (!name) {
				console.log('No name');
				return res.status(200).json(recipes);
			}

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
			const { title, summary, healthScore, image, diets, steps } = req.body;

			const recipeCreated = await Recipe.create({
				title,
				summary,
				healthScore,
				image,
				steps,
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
				.send({ title, summary, healthScore, image, diets, steps });
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
				steps:
					data.analyzedInstructions[0] && data.analyzedInstructions[0].steps
						? data.analyzedInstructions[0].steps
								.map((item) => item.step)
								.join(' \n')
						: '',
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
		//Se cambio por la API mocky por que la spoonacular no funciona.

		const spoonacular = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`;
		const mocky =
			'https://run.mocky.io/v3/84b3f19c-7642-4552-b69c-c53742badee5';

		try {
			const recipes = (await axios.get(mocky)).data.results.map((recipe) => {
				return {
					id: recipe.id,
					title: recipe.title,
					summary: recipe.summary.replace(/<[^>]*>?/g, ''),
					healthScore: recipe.healthScore,
					image: recipe.image,
					diets: recipe.diets,
					steps:
						recipe.analyzedInstructions[0] &&
						recipe.analyzedInstructions[0].steps
							? recipe.analyzedInstructions[0].steps
									.map((item) => item.step)
									.join(' \n')
							: '',
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
					steps: recipe.steps,
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
