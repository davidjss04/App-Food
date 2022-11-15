import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_URL } from "../api/apiUrl";

const initialState = {
  loading: false,
  diets: [],
  total: 0,
  error: "",
};

export const fetchDiets = createAsyncThunk("diets/fetchDiets", async () => {
  const response = await axios.get(`${API_URL}/diet`);
  return response.data;
});

const dietsSlice = createSlice({
  name: "diets",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchDiets.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchDiets.fulfilled, (state, action) => {
        state.loading = false;
        state.diets = action.payload.diets;
        state.total = action.payload.total;
        state.error = "";
      })
      .addCase(fetchDiets.rejected, (state, action) => {
        state.loading = false;
        state.diets = [];
        state.error = action.error.message;
      });
  },
});

export default dietsSlice.reducer;
