import React from "react";
import { Link } from "react-router-dom";
import { LandingContainer } from "../../containers";
import styles from "./Landing.module.css";
import { GiKnifeFork } from "react-icons/gi";

const Landing = () => {
  return (
    <LandingContainer>
      <div className={styles.landing}>
        <div className={styles.cell1}>
          <h1>Recipe App</h1>
        </div>
        <div className={styles.cell2}>
          <Link className={styles.button} to="/home">
            <GiKnifeFork className={styles.icon} />
            <h3>HOME</h3>
            <GiKnifeFork className={styles.icon} />
          </Link>
        </div>
      </div>
    </LandingContainer>
  );
};

export default Landing;
