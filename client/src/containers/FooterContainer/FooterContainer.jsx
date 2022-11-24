import React from "react";
import styles from "./FooterContainer.module.css";

const FooterContainer = ({children}) => {
  return <div className={styles.footerContainer}>{children}</div>;
};

export default FooterContainer;
