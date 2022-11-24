import React from "react";
import { Link } from "react-router-dom";
import styles from "./Card.module.css";

const Card = ({ title, summary, healthScore, steps, image, id }) => {
  return (
    <div className={styles.card}>
      <img src={image} alt="recipe" className={styles.image} />
      <div className={styles.info}>
        <Link className={styles.title} to={`/detail/${id}`}>
          {title}
        </Link>
      </div>
    </div>
  );
};

export default Card;
