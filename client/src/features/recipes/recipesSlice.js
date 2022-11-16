import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL } from "../api/apiUrl";

const initialState = {
  loading: false,
  recipes: [],
  page: 1,
  total: 0,
  error: "",
  count: 0,
  filter: {
    filters: {
      title: "",
      diets: "",
      healthScore: "",
    },
    options: {
      sort: "",
      page: 1,
    },
  },
};

export const fetchRecipes = createAsyncThunk(
  "recipes/fetchRecipes",
  async (filter = initialState.filter) => {
    let { title, diets, healthScore } = filter.filters;
    let { sort, page } = filter.options;
    let urlFilter = `filter[healthScore]=${healthScore}&filter[title]=${title}&filter[diet]=${diets}&options[sort]=${sort}&options[page]=${page}`;
    const response = await axios.get(`${API_URL}/recipe/?${urlFilter}`);
    return response.data;
  }
);

export const addNewRecipe = createAsyncThunk(
  "recipes/addNewRecipe",
  async (initialRecipe) => {
    const response = await axios.post(`${API_URL}/recipes`, initialRecipe);
    return response.data;
  }
);

const recipesSlice = createSlice({
  name: "recipes",
  initialState,
  reducers: {
    createRecipe(state, action) {
      state.recipes.push(action.payload);
      fetchRecipes();
    },
    searchRecipe(state, action) {
      state.filter.filters.title = action.payload;
    },
    filterRecipeByDiets(state, action) {
      state.filter.filters.diets = action.payload;
    },
    filterRecipeByHealthScore(state, action) {
      state.filter.filters.healthScore = action.payload;
    },
    sortRecipe(state, action) {
      state.filter.options.sort = action.payload;
    },
    changePage(state, action) {
      state.filter.options.page = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchRecipes.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchRecipes.fulfilled, (state, action) => {
        state.loading = false;
        state.recipes = action.payload.recipes;
        state.page = action.payload.page;
        state.total = action.payload.total;
        state.count = action.payload.count;
        state.error = "";
      })
      .addCase(fetchRecipes.rejected, (state, action) => {
        state.loading = false;
        state.recipes = [];
        state.error = action.error.message;
      })
      .addCase(addNewRecipe.fulfilled, (state, action) => {
        state.recipes.push(action.payload);
      })
      .addCase(addNewRecipe.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(addNewRecipe.pending, (state) => {
        state.loading = true;
      });
  },
});

export const selectAllRecipes = (state) => state.recipes.recipes;
export const getRecipesLoading = (state) => state.recipes.loading;
export const getRecipesError = (state) => state.recipes.error;
export const getRecipesPage = (state) => state.recipes.page;
export const getRecipesTotal = (state) => state.recipes.total;
export const getRecipesFilter = (state) => state.recipes.filter;
export const getRecipesCount = (state) => state.recipes.count;

export const {
  createRecipe,
  searchRecipe,
  filterRecipeByDiets,
  filterRecipeByHealthScore,
  sortRecipe,
  changePage,
} = recipesSlice.actions;

export default recipesSlice.reducer;
