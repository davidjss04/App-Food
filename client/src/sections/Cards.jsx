import React from "react";

import { useSelector } from "react-redux";
import { Card, Filter, Pagination } from "../components";
import {
  selectAllRecipes,
  getRecipesLoading,
  getRecipesError,
} from "../features/recipes/recipesSlice.js";

const Cards = () => {
  const recipes = useSelector(selectAllRecipes);
  const loading = useSelector(getRecipesLoading);
  const error = useSelector(getRecipesError);

  return (
    <>
      <Filter />
      <Pagination />
      {!loading || error.lenght > 0 ? (
        recipes.map((recipe) => (
          <Card
            key={recipe.id}
            id={recipe.id}
            title={recipe.title}
            summary={recipe.summary}
            healthScore={recipe.healthScore}
            steps={recipe.steps}
            image={recipe.image}
          />
        ))
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
};

export default Cards;
