import React from "react";
import { Link } from "react-router-dom";

const Card = ({ title, summary, healthScore, steps, image, id }) => {
  return (
    <div>
      <Link to={`/detail/${id}`}>{title}</Link>
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
