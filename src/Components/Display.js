import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Display.css";
let initComplete = [];
let compl = JSON.parse(localStorage.getItem("two"));
if (compl) {
  initComplete = compl;
}

function Display() {
  const [collect, setCollect] = useState(
    JSON.parse(localStorage.getItem("one")) || []
  );
  const [completed, setCompleted] = useState(
    JSON.parse(localStorage.getItem("two")) || []
  );
  const [count, setCount] = useState(0);

  const handleedit = (e) => {
    console.log("first");
  };
  const handledelete = (e) => {
    let ca2 = collect.filter((objtask, j) => e !== j);
    setCollect(ca2);
    localStorage.setItem("one", JSON.stringify(ca2));
  };
  const sComplete = (sts, i) => {
    let ca = collect.filter((objtask, j) => i === j);
    completed.push(ca);
    console.log(completed);
    setCount((prev) => prev + 1);
    localStorage.setItem("two", JSON.stringify(completed));
    let ca2 = collect.filter((objtask, j) => i !== j);
    setCollect(ca2);
    localStorage.setItem("one", JSON.stringify(ca2));
    setCount((prev) => prev + 1);
  };
  useEffect(() => {
    // setCollect(JSON.parse(localStorage.getItem("one")) || []);
    console.log(completed);
  }, [count]);
  return (
    <div>
      <div className="container1">
        <ul>
          {collect.map((item, index) => {
            return (
              <ul className="sticky" key={index}>
                <li
                  onClick={() => {
                    sComplete(item.status, index);
                  }}
                >
                  &#8730;
                </li>
                <li>date:-{item.date}</li>
                <li>title:-{item.titles}</li>
                <li>note:-{item.note}</li>
                <ul className="handle">
                  <li
                    onClick={() => {
                      handledelete(index);
                    }}
                  >
                    X
                  </li>
                  <li
                    onClick={() => {
                      handleedit(index);
                    }}
                  >
                    edit
                  </li>
                </ul>
              </ul>
            );
          })}
        </ul>
      </div>
      <div className="completed">Completed({completed.length})</div>
      <div className="addno1">
        <Link to="/AddNote">
          <button className="btn addno">AddNote</button>
        </Link>
      </div>
    </div>
  );
}

export default Display;
