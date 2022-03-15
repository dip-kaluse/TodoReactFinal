import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  return (
    <div className="container">
      <Link to="/AddNote">
        <button className=" navbar-brand btn btn-primary">AddNote</button>
      </Link>
    </div>
  );
}

export default Home;
