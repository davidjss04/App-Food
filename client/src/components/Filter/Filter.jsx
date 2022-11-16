import React, { useState } from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { selectAllDiets } from "../../features/diets/dietsSlice.js";
import {
  filterRecipeByDiets,
  sortRecipe,
  getRecipesFilter,
  fetchRecipes,
} from "../../features/recipes/recipesSlice.js";

import Select from "react-select";

const Filter = () => {
  const dispatch = useDispatch();
  const diets = useSelector(selectAllDiets);
  const filter = useSelector(getRecipesFilter, shallowEqual);
  const [selectedDiets, setSelectedDiets] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState([
    { value: "asc", label: "asc" },
    { value: "desc", label: "desc" },
  ]);

  React.useEffect(() => {
    setSelectedDiets(
      diets.map((diet) => ({
        value: diet.name,
        label: diet.name,
      }))
    );
  }, [diets]);

  React.useEffect(() => {
    dispatch(fetchRecipes(filter));
  }, [filter, dispatch]);

  const handleChanges = (selectedOption, event) => {
    if (selectedOption === null) {
      return dispatch(filterRecipeByDiets(""));
    }

    if (selectAllDiets !== null) {
      if (event.name === "diets") {
        dispatch(filterRecipeByDiets(selectedOption.value));
      }

      if (event.name === "order") {
        dispatch(sortRecipe(selectedOption.value));
      }
    }
  };

  return (
    <>
      <Select
        className="basic-single"
        classNamePrefix="select"
        name="diets"
        placeholder="Select diet"
        isClearable={true}
        options={selectedDiets}
        onChange={handleChanges}
        onValueClick={true}
      />
      <Select
        className="basic-single"
        classNamePrefix="select"
        name="order"
        placeholder="Select order"
        isClearable={true}
        options={selectedOrder}
        onChange={handleChanges}
      />
    </>
  );
};

export default Filter;
