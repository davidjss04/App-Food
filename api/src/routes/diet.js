const { Router } = require('express');
const { getAll } = require('../controllers/diet');
const router = Router();

router.get('/', getAll);

module.exports = router;
