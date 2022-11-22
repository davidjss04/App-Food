import React from "react";
import styles from "./LandingContainer.module.css";
import images from "../../constants/images";

const LandingContainer = ({ children }) => {
  return (
    <div
      className={styles.container}
      style={{
        backgroundImage: `url(${images.background})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      {children}
    </div>
  );
};

export default LandingContainer;
