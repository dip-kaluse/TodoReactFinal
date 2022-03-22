import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Home.css";

function Home() {
  const [collect, setCollect] = useState(
    JSON.parse(localStorage.getItem("one")) || []
  );
  const navigate = useNavigate();
  useEffect(() => {
    {
      console.log(collect.length);
      collect.length !== 0 ? navigate("/display") : console.log("first");
    }
  });
  return (
    <div className="container3">
      <Link to="/AddNote">
        <button className=" navbar-brand btn btn-primary">AddNote</button>
      </Link>
    </div>
  );
}

export default Home;
