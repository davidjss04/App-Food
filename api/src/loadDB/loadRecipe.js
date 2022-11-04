const { Router } = require('express');
const axios = require('axios');
const { Diet, Recipe } = require('../db');
const json = require('../hardcode.json');
const router = Router();

const getRecipe = async () => {
	json.forEach(async (e) => {
		let recipe = await Recipe.findOne({
			where: {
				title: e.title,
			},
		});

		if (!recipe) {
			recipe = await Recipe.create({
				title: e.title,
				summary: e.summary,
				healthScore: e.healthScore,
				steps:
					e.analyzedInstructions[0] && e.analyzedInstructions[0].steps
						? e.analyzedInstructions[0].steps
								.map((item) => item.step)
								.join(' \n')
						: '',
				image: e.image,
			});

			e.diets.forEach(async (diet) => {
				const dietCreate = await Diet.findOrCreate({
					where: { name: diet },
				});

				await recipe.addDiet(dietCreate[0]);
			});
		}
	});

	return console.log('Recipes add to DB');
};

module.exports = {
	getRecipe,
};
