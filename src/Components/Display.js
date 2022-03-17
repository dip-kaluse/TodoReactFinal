import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { v4 } from "uuid";
import "./Display.css";

let initComplete = [];
let compl = JSON.parse(localStorage.getItem("two"));
if (compl) {
  initComplete = compl;
}

function Display() {
  let [localList, updatelocalList] = useState([]);
  const navigate = useNavigate();
  const [homePage, setHomePage] = useState("");
  const [collect, setCollect] = useState(
    JSON.parse(localStorage.getItem("one")) || []
  );
  let [showCompleted, setShowCompleted] = useState(true);
  const [completed, setCompleted] = useState(
    JSON.parse(localStorage.getItem("two")) || []
  );
  const [count, setCount] = useState(0);

  const handleCompletedDelete = (id) => {
    let newCompleted = completed.filter((obj, index) => obj.id !== id);
    setCompleted(newCompleted);

    localStorage.setItem("two", JSON.stringify(newCompleted));
    // setCount((prev) => prev + 1);
  };
  const handleedit = (e) => {
    // console.log("first");
  };
  const handledelete = (e) => {
    let ca2 = collect.filter((objtask, j) => e !== j);

    setCollect(ca2);
    localStorage.setItem("one", JSON.stringify(ca2));
    setCount((prev) => prev + 1);
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
    localStorage.setItem("two", JSON.stringify(completed));
    let ca2 = collect.filter((objtask, j) => i !== j);
    setCollect(ca2);
    localStorage.setItem("one", JSON.stringify(ca2));
    setCount((prev) => prev + 1);
  };
  const handleOnDragEnd = (result) => {
    if (!result.destination) return;
    localList = JSON.parse(localStorage.getItem("one"));
    const items = Array.from(localList);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    updatelocalList(items);
    for (let i = 0; i < items.length; i++) {
      items[i].sortpos = i;
    }
    localStorage.setItem("list", JSON.stringify(items));
  };

  useEffect(() => {
    !showCompleted ? setShowCompleted(true) : setShowCompleted(false);
  }, [count]);
  return (
    <div className="mainbody">
      <div className={showCompleted ? "dbody" : "nothing"}>
        <div className="container1">
          <ul>
            {collect.map((item, index) => {
              return (
                <ul className="sticky" key={index}>
                  <li>
                    <button
                      className="btn"
                      onClick={() => {
                        sComplete(item.status, index);
                      }}
                    >
                      &#8730;
                    </button>
                    <button
                      className="btn"
                      onClick={() => {
                        handledelete(index);
                      }}
                    >
                      &times;
                    </button>
                  </li>
                  <li>date:-{item.date}</li>
                  <li>title:-{item.titles.substring(0, 5)}...</li>
                  <li>note:-{item.note.substring(0, 15)}...</li>
                  <Link to={`/Edit/${item.id}`}>
                    <li className="handle">
                      <button className="btn float-right" onClick={() => {}}>
                        edit
                      </button>
                    </li>
                  </Link>
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
            <table>
              <tbody>
                <tr>
                  <td>titles</td> <td>date</td> <td> note</td>
                  <td>X</td>
                </tr>

                {completed.map((item, index) => {
                  return (
                    <tr key={index}>
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
                })}
              </tbody>
            </table>{" "}
          </div>
        ) : (
          <div></div>
        )}
      </div>
      <div>
        {console.log(collect.length)}
        {collect.length === 0 ? navigate("/") : console.log("first")}
      </div>
    </div>
  );
}

export default Display;
