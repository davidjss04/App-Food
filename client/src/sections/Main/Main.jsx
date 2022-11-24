import React from "react";
import { MainContainer } from "../../containers";
import { Pagination, Card } from "../../components";
import { useSelector } from "react-redux";
import {
  selectAllRecipes,
  getRecipesLoading,
  getRecipesError,
} from "../../features/recipes/recipesSlice.js";
import styles from "./Main.module.css";

const Main = () => {
  const recipes = useSelector(selectAllRecipes);
  const loading = useSelector(getRecipesLoading);
  const error = useSelector(getRecipesError);

  return (
    <MainContainer>
      <div className={styles.containerCards}>
        {!loading || error.lenght > 0 ? (
          recipes.map((recipe) => (
            <Card
              key={recipe.id}
              id={recipe.id}
              title={recipe.title}
              image={recipe.image}
            />
          ))
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </MainContainer>
  );
};

export default Main;
