import React from "react";
import { Link } from "react-router-dom";
import { Cards } from "../../sections";
import {Footer, Navbar, Sidebar, Main} from "../../sections";

const Home = () => {
  return (
    <>
      <Navbar />
      <Sidebar />
      <Main />
      <Footer />
      {/* <Link to={"/form"}>Form Link</Link>
      <Cards /> */}
    </>
  );
};

export default Home;
