import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import {
  fetchRecipeById,
  getRecipeDetail,
} from "../features/recipes/recipesSlice.js";

const Detail = () => {
  const dispatch = useDispatch();
  const recipeDetail = useSelector(getRecipeDetail, shallowEqual);
  const { id } = useParams();

  useEffect(() => {
    dispatch(fetchRecipeById(id));
  }, [id, dispatch]);

  return (
    <div>
      <h1>{recipeDetail.title}</h1>
      <p>{recipeDetail.summary}</p>
      <p>{recipeDetail.healthScore}</p>
      <p>{recipeDetail.steps}</p>
      <img
        src={recipeDetail.image}
        alt="recipe"
        style={{ width: "100px", height: "100px" }}
      />
      {recipeDetail.diets?.map((diet) => (
        <p key={diet.id}>{diet.name}</p>
      ))}
    </div>
  );
};

export default Detail;
