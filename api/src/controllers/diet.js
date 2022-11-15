const { Recipe, Diet } = require("../db");
const axios = require("axios");
const { API_KEY } = process.env;

module.exports = {
  async getAll(req, res, next) {
    try {
      const { count, rows } = await Diet.findAndCountAll();

      if (rows.length > 0) {
        return res.status(200).send({
          total: count,
          diets: rows,
        });
      }

      res.status(200).send(diets);
    } catch (error) {
      next(error);
    }
  },
};
