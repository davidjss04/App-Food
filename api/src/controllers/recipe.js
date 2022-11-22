const { Recipe, Diet } = require("../db");
const axios = require("axios");
const { API_KEY } = process.env;
const { Op, Sequelize, DataTypes } = require("sequelize");

module.exports = {
  async getById(req, res, next) {
    try {
      const { idRecipe } = req.params;
      const recipe = await Recipe.findAll({
        include: [
          {
            model: Diet,
            attributes: ["name", "id"],
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
        return res.status(200).send(...recipe);
      }

      return res.status(200).send("No recipe found");
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
    const { filter = "" } = req.query;
    const { title, healthScore, diet } = filter;
    const { options = "" } = req.query;
    let { page } = options;
    const order = options?.sort && [["title", options.sort.toUpperCase()]];

    let limit = 9;
    let offset = (page - 1) * 9;

    if (!page) {
      page = 1;
      limit = 100;
      offset = 0;
    }

    const where = {};
    const dietFilter = {};

    if (title) where.title = { [Op.like]: `%${title}%` };

    if (healthScore)
      where.healthScore = Sequelize.where(
        Sequelize.col("healthScore"),
        ">=",
        healthScore
      );

    if (diet) dietFilter.name = { [Op.like]: diet };

    // if (order) where.order = { [Op.iLike]: `%${order}%` };

    let config = {
      distinct: true,
      include: {
        model: Diet,
        where: dietFilter,
        through: {
          attributes: [],
        },
        attributes: ["name", "id"],
      },
      where,
      order: order,
      offset: offset,
      limit: limit,
    };

    try {
      // let count = await Recipe.count();
      let { count, rows } = await Recipe.findAndCountAll(config);

      if (rows.length > 0) {
        console.log(order);
        return res.status(200).send({
          page: Number(page),
          offSet: (page - 1) * 10,
          total: rows.length,
          count: count,
          options: options,
          recipes: rows,
        });
      } else {
        return res.status(200).send("No recipes found");
      }
    } catch (error) {
      next(error);
    }
  },
};
