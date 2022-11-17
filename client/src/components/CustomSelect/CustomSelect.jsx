import React from "react";
import Select from "react-select";

const CustonSelect = ({ onChange, options, value }) => {
  const defaultValues = (options, values) => {
    return options ? options.find((option) => option.value === values) : "";
  };

  return (
    <div>
      <Select>
        value={defaultValues(options, value)}
        onChange={(value) => onChange(value)}
        options={options}
      </Select>
    </div>
  );
};

export default CustonSelect;
