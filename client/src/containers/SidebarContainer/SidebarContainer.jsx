import React from "react";
import styles from "./FilterContainer.module.css";

const SidebarContainer = ({ children }) => {
  return <div className={styles.sidebarContainer}>{children}</div>;
};

export default SidebarContainer;
