import React from "react";
import { useSelector } from "react-redux";
import {
  selectAllRecipes,
  getRecipesLoading,
  getRecipesError,
  getRecipesTotal,
  getRecipesPage,
} from "../../features/recipes/recipesSlice";

export const Card = () => {
  const recipes = useSelector(selectAllRecipes);
  const recipesTotal = useSelector(getRecipesTotal);
  const recipesPage = useSelector(getRecipesPage);
  const loading = useSelector(getRecipesLoading);
  const error = useSelector(getRecipesError);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error.length > 0) {
    return <div>{error}</div>;
  }

  return (
    <div>
      {recipes.map((recipe) => () => {
        return (
          <div key={recipe._id}>
            <h1>{recipe.title}</h1>
            <p>{recipe.description}</p>
          </div>
        );
      })}
    </div>
  );
};
