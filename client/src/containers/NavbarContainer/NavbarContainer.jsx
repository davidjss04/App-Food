import React from "react";
import styles from "./NavbarContainer.module.css";

const NavbarContainer = ({ children }) => {
  return <div className={styles.navbarContainer}>{children}</div>;
};

export default NavbarContainer;
