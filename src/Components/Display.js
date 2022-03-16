import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { v4 } from "uuid";
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
  let [showCompleted, setShowCompleted] = useState(false);
  const [completed, setCompleted] = useState(
    JSON.parse(localStorage.getItem("two")) || []
  );
  const [count, setCount] = useState(0);

  const handleCompletedDelete = (id) => {
    let newCompleted = completed.filter((obj, index) => obj.id !== id);
    setCompleted(newCompleted);
    console.log(newCompleted);
    localStorage.setItem("two", JSON.stringify(newCompleted));
    setCount((prev) => prev + 1);
  };
  const handleedit = (e) => {
    // console.log("first");
  };
  const handledelete = (e) => {
    let ca2 = collect.filter((objtask, j) => e !== j);
    setCollect(ca2);
    localStorage.setItem("one", JSON.stringify(ca2));
  };
  const sComplete = (sts, i) => {
    let ca = "";
    for (let j = 0; j < collect.length; j++) {
      if (i === j) {
        ca = collect[j];
      }
    }
    console.log(ca);
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
    console.log(completed);
    showCompleted ? setShowCompleted(false) : setShowCompleted(true);
  }, [count]);
  return (
    <div className="mainbody">
      <div className={showCompleted ? "dbody" : "nothing"}>
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
                  <li
                    onClick={() => {
                      handledelete(index);
                    }}
                  >
                    &times;
                  </li>
                  <li>date:-{item.date}</li>
                  <li>title:-{item.titles.substring(0, 5)}...</li>
                  <li>note:-{item.note.substring(0, 10)}...</li>
                  <ul className="handle">
                    <li
                      onClick={() => {
                        handleedit(index);
                      }}
                    ></li>
                  </ul>
                </ul>
              );
            })}
          </ul>
        </div>
      </div>
      <div
        className="completed"
        onClick={() => {
          setCount((prev) => prev + 1);
        }}
      >
        Completed({completed.length})
      </div>
      <div className="addno1">
        <Link to="/AddNote">
          <button className="btn addno">AddNote</button>
        </Link>
      </div>
      <div>
        {showCompleted ? (
          <div className="history">
            <tr>
              <td>titles</td> <td>date</td> <td> note</td>
              <td>X</td>
            </tr>
            {completed.map((item, index) => {
              return (
                <tr>
                  <td>{item.titles}</td>
                  <td> {item.date}</td>
                  <td>{item.note}</td>
                  <td>
                    {
                      <button
                        className="btn"
                        onClick={() => {
                          handleCompletedDelete(item.id);
                        }}
                      >
                        X
                      </button>
                    }
                  </td>
                </tr>
              );
            })}{" "}
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
}

export default Display;
