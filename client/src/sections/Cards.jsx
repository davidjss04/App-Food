import React from "react";

import { useSelector } from "react-redux";
import { Card } from "../components";
import {
  selectAllRecipes,
  getRecipesLoading,
  getRecipesError,
} from "../features/recipes/recipesSlice.js";

const Cards = () => {
  const recipes = useSelector(selectAllRecipes);
  const loading = useSelector(getRecipesLoading);
  const error = useSelector(getRecipesError);

  if (loading || error.lenght > 0) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {recipes.map((recipe) => (
        <Card
          key={recipe.id}
          title={recipe.title}
          summary={recipe.summary}
          healthScore={recipe.healthScore}
          steps={recipe.steps}
          image={recipe.image}
        />
      ))}
    </>
  );
};

export default Cards;
