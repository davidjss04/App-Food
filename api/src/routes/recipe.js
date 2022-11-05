const { Router } = require('express');
const { getAll, getById, postRecipe } = require('../controllers/recipe');
const router = Router();

//GET /recipes?name="..."
router.get('/', getAll);

//GET /recipes/{idReceta}:
router.get('/:idRecipe', getById);

//POST /recipe:
router.post('/', postRecipe);

/*Extra*/

module.exports = router;
