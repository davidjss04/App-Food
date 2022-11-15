import React from "react";

const Card = ({ title, summary, healthScore, steps, image }) => {
  return (
    <div>
      <h1>{title}</h1>
      <p>{summary}</p>
      <p>{healthScore}</p>
      <p>{steps}</p>
      <img
        src={image}
        alt="recipe"
        style={{ width: "100px", height: "100px" }}
      />
    </div>
  );
};

export default Card;
