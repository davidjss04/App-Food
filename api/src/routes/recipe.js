const { Router } = require('express');
const recipeController = require('../controllers/recipe');
const router = Router();

//GET /recipes?name="..."
router.get('/', async (req, res, next) => {
	recipeController.getAllByName(req, res, next);
});

//GET /recipes/{idReceta}:
router.get('/:idRecipe', async (req, res, next) => {
	recipeController.getById(req, res, next);
});

//POST /recipe:
router.post('/', (req, res, next) => {
	recipeController.create(req, res, next);
});

module.exports = router;
