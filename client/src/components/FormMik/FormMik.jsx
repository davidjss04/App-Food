import React, { useEffect, useState } from "react";
import { validate } from "./validate";
import { useFormik } from "formik";
import Select from "react-select";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { selectAllDiets } from "../../features/diets/dietsSlice";
import { addNewRecipe } from "../../features/recipes/recipesSlice";
import convertBase64 from "./tools";

const FormMik = () => {
  const dietsOptions = useSelector(selectAllDiets, shallowEqual);
  const dispatch = useDispatch();
  const [selectedDiets, setSelectedDiets] = useState(null);

  React.useEffect(() => {
    setSelectedDiets(
      dietsOptions.map((diet) => ({
        value: diet.name,
        label: diet.name,
      }))
    );
  }, [dietsOptions]);

  const formik = useFormik({
    initialValues: {
      title: "",
      summary: "",
      healthScore: "",
      file: null,
      steps: "",
      diets: [],
    },
    validate,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
      dispatch(addNewRecipe({ ...values, image: values.file }));
    },
  });

  const handleImage = (e) => {
    const file = e.target.files[0];
    convertBase64(file)
      .then((base64) => {
        formik.setFieldValue("file", base64);
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
  };

  useEffect(() => {
    console.log(formik.values);
  }, [formik.values]);

  return (
    <form onSubmit={formik.handleSubmit}>
      <label htmlFor="title">Title</label>
      <input
        id="title"
        name="title"
        type="text"
        onChange={formik.handleChange}
        value={formik.values.title}
      />
      {formik.errors.title ? <div>{formik.errors.title}</div> : null}

      <label htmlFor="summary">Summary</label>
      <textarea
        id="summary"
        name="summary"
        type="text"
        onChange={formik.handleChange}
        value={formik.values.summary}
      />
      {formik.errors.summary ? <div>{formik.errors.summary}</div> : null}

      <label htmlFor="steps">Steps</label>
      <textarea
        id="steps"
        name="steps"
        type="text"
        onChange={formik.handleChange}
        value={formik.values.steps}
      />
      {formik.errors.steps ? <div>{formik.errors.steps}</div> : null}

      <label htmlFor="healthScore">Health Score</label>
      <input
        id="healthScore"
        name="healthScore"
        type="number"
        min={0}
        step={10}
        max={100}
        onChange={formik.handleChange}
        value={formik.values.healthScore}
      />
      {formik.errors.healthScore ? (
        <div>{formik.errors.healthScore}</div>
      ) : null}

      <label htmlFor="image">Image</label>
      <input
        id="file"
        name="file"
        type="file"
        onChange={handleImage}
        value={formik.values.image}
      />
      {formik.errors.image ? <div>{formik.errors.image}</div> : null}
      <label htmlFor="diets">Diets</label>

      <Select
        id="diets"
        name="diets"
        options={selectedDiets}
        isMulti={true}
        onChange={(selectedOption) =>
          formik.setFieldValue(
            "diets",
            selectedOption.map((option) => option.value)
          )
        }
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default FormMik;
