import React from "react";
import { useSelector } from "react-redux";
import {
  selectAllRecipes,
  getRecipesLoading,
  getRecipesError,
} from "../features/recipes/recipesSlice";

const Home = () => {
  const recipes = useSelector(selectAllRecipes);
  const loading = useSelector(getRecipesLoading);
  const error = useSelector(getRecipesError);

  let content;

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!loading) {
    return <div>{console.log(recipes)}</div>;
  }

  return <div>{content}</div>;
};

export default Home;
