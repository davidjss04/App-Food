const { Recipe, Diet } = require('../db');
const axios = require('axios');
const { API_KEY } = process.env;

module.exports = {
    async getAll(req, res, next) {
        try {
            const diets = await Diet.findAll();
            res.status(200).send(diets);
        } catch (error) {
            next(error);
        }
    }
};
