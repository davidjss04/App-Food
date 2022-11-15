import { configureStore } from "@reduxjs/toolkit";
import recipesSlice from "../features/recipes/recipesSlice";
import dietsSlice from "../features/diets/dietsSlice";

export const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
    recipes: recipesSlice,
    diets: dietsSlice,
  },
  devTools: true,
});
