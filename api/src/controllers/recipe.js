const { Recipe, Diet } = require('../db');
const axios = require('axios');
const { API_KEY } = process.env;

module.exports = {
	async getById(req, res, next) {
		try {
			const { idRecipe } = req.params;
			const recipe = await Recipe.findAll({
				include: [
					{
						model: Diet,
						attributes: ['name', 'id'],
						through: {
							attributes: [],
						},
					},
				],
				where: {
					id: idRecipe,
				},
			});

			if (recipe.length > 0) {
				return res.status(200).send(recipe);
			}

			return res.status(200).send('No recipe found');
		} catch (error) {
			next(error);
		}
	},

	async postRecipe(req, res, next) {
		try {
			const { title, summary, healthScore, steps, image, diets } = req.body;

			const recipeCreated = await Recipe.create({
				title,
				summary,
				healthScore,
				image,
				steps,
			});

			diets.forEach(async (diet) => {
				const dietCreate = await Diet.findOrCreate({
					where: { name: diet },
				});

				await recipeCreated.addDiet(dietCreate[0]);
			});

			return res
				.status(200)
				.send({ title, summary, healthScore, image, diets, steps });
		} catch (error) {
			next(error);
		}
	},

	async getAll(req, res, next) {
		try {
			const recipes = await Recipe.findAll({
				include: [
					{
						model: Diet,
						attributes: ['name', 'id'],
						through: {
							attributes: [],
						},
					},
				],
			});

			if (recipes.length > 0) {
				return res.status(200).send(recipes);
			}

			return res.status(200).send('Empty recipe database');
		} catch (error) {
			next(error);
		}
	},
};
