const { Router } = require('express');
const dietController = require('../controllers/diet');
const router = Router();

router.get('/', async (req, res, next) => {
	dietController.getAll(req, res, next);
});

module.exports = router;
