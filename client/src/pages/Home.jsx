import React from "react";
import { Link } from "react-router-dom";
import { Cards } from "../sections";

const Home = () => {
  return (
    <div>
      <Link to={"/form"}>Form Link</Link>
      <Cards />
    </div>
  );
};

export default Home;
