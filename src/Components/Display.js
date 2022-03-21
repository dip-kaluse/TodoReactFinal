import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { v4 } from "uuid";
import "./Display.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toBeInTheDocument } from "@testing-library/jest-dom/dist/matchers";
toast.configure();
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
  const notifydelete = () => {
    toast.error("Task Deleted", { autoClose: 3000 });
  };
  let [showCompleted, setShowCompleted] = useState(true);
  const [completed, setCompleted] = useState(
    JSON.parse(localStorage.getItem("two")) || []
  );
  const [count, setCount] = useState(0);
  const [count2, setCount2] = useState(0);

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
    let resultdel = window.confirm("You Want To Delete?");
    if (resultdel) {
      let ca2 = collect.filter((objtask, j) => e !== j);
      setCollect(ca2);
      localStorage.setItem("one", JSON.stringify(ca2));
      notifydelete();
    }
  };
  const sComplete = (sts, i) => {
    let resultdel = window.confirm("This Task Is Completed?");
    if (resultdel) {
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
    }
  };

  const handleOnDragEnd = (result) => {
    const { source, destination } = result;
    if (!result.destination) return;

    // if (
    //   destination.droppableId === source.droppableId &&
    //   destination.index === source.index
    // )
    //   return;
    localList = JSON.parse(localStorage.getItem("one"));
    const itemss = Array.from(localList);
    const [reorderedItem] = itemss.splice(result.source.index, 1);
    itemss.splice(result.destination.index, 0, reorderedItem);
    updatelocalList(itemss);
    for (let i = 0; i < itemss.length; i++) {
      itemss[i].sortpos = i;
    }
    localStorage.setItem("one", JSON.stringify(itemss));
    setCollect(itemss);
  };

  useEffect(() => {
    !showCompleted ? setShowCompleted(true) : setShowCompleted(false);
  }, [count]);
  return (
    <div className="mainbody">
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <div className={showCompleted ? "dbody" : "nothing"}>
          <Droppable droppableId="TodosList">
            {(provided) => (
              <div
                className="container1"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {collect.map((item, index) => {
                  return (
                    <Draggable draggableId={item.id.toString()} index={index}>
                      {(provided) => (
                        <div
                          className="sticky"
                          key={item.id}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          ref={provided.innerRef}
                        >
                          <ul>
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
                                <button
                                  className="btn float-right"
                                  onClick={() => {}}
                                >
                                  edit
                                </button>
                              </li>
                            </Link>
                          </ul>
                          {/* {provided.placeholder} */}
                        </div>
                      )}
                    </Draggable>
                  );
                })}
              </div>
            )}
          </Droppable>
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
      </DragDropContext>
    </div>
  );
}

export default Display;
