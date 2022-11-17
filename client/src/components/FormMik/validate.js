export const validate = (values) => {
  const errors = {};

  if (!values.title) {
    errors.title = "Required";
  } else if (values.title.length > 25) {
    errors.title = "Must be 15 characters or less";
  }

  if(!values.steps){
    errors.steps = "Required"
  }

  if (!values.summary) {
    errors.summary = "Required";
  } else if (values.summary.length > 200) {
    errors.summary = "Must be 50 characters or less";
  }

  if (!values.healthScore) {
    errors.healthScore = "Required";
  }

  if (!values.file) {
    errors.file = "Required";
  }

  if (!values.diets) {
    errors.diets = "Required";
  }

  return errors;
};
