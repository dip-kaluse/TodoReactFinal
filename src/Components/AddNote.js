import React, { useEffect, useState, useReducer } from "react";
import DatePicker from "react-datepicker";
import "./AddNote.css";
import { v4 } from "uuid";
import { Link } from "react-router-dom";
function AddNote() {
  const [collect, setCollect] = useState(
    JSON.parse(localStorage.getItem("one")) || []
  );
  const [count, setCount] = useState(0);
  const [note, setNote] = useState("");
  const [titles, setTitles] = useState("");
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("pending ");

  const Cancel = () => {
    setDate("");
    setTitles("");
    setNote("");
    // console.log("first");
  };

  const Submitt = (e) => {
    // e.preventDefault();
    console.log("first");
    if (titles === "" || !date) return alert("please fill all field");
    collect.push({ titles, date, note, status, id: v4() });
    localStorage.setItem("one", JSON.stringify(collect));
    console.log(date);
    setDate("");
    setTitles("");
    setNote("");
  };
  function addDays(theDate, days) {
    return new Date(theDate.getTime() + days * 24 * 60 * 60 * 1000);
  }

  const optDate = (e) => {
    const current = new Date();
    const Today = addDays(new Date(), 0);
    const Tomorrow = addDays(new Date(), 1);
    const Week = addDays(new Date(), 7);
    switch (e) {
      case "1":
        if (Today.getMonth() < 11) {
          if (Today.getDate() < 10) {
            setDate(
              `${Today.getFullYear()}-${0}${
                Today.getMonth() + 1
              }-${0}${Today.getDate()}`
            );
          } else {
            setDate(
              `${Today.getFullYear()}-${0}${
                Today.getMonth() + 1
              }-${Today.getDate()}`
            );
          }
        } else {
          if (Today.getDate() < 10) {
            setDate(
              `${Today.getFullYear()}-${
                Today.getMonth() + 1
              }-${0}${Today.getDate()}`
            );
          }
        }
        break;
      case "2":
        if (Tomorrow.getMonth() < 11) {
          if (Tomorrow.getDate() < 10) {
            setDate(
              `${Tomorrow.getFullYear()}-${0}${
                Tomorrow.getMonth() + 1
              }-${0}${Tomorrow.getDate()}`
            );
          } else {
            setDate(
              `${Tomorrow.getFullYear()}-${0}${
                Tomorrow.getMonth() + 1
              }-${Tomorrow.getDate()}`
            );
          }
        } else {
          if (Tomorrow.getDate() < 10) {
            setDate(
              `${Tomorrow.getFullYear()}-${
                Tomorrow.getMonth() + 1
              }-${0}${Tomorrow.getDate()}`
            );
          }
        }
        break;
      case "7":
        if (Week.getMonth() < 11) {
          if (Week.getDate() < 10) {
            setDate(
              `${Week.getFullYear()}-${0}${Week.getMonth()}-${0}${Week.getDate()}`
            );
          } else {
            setDate(
              `${Week.getFullYear()}-${0}${Week.getMonth()}-${Week.getDate()}`
            );
          }
        } else {
          if (Week.getDate() < 10) {
            setDate(
              `${Week.getFullYear()}-${Week.getMonth()}-${0}${Week.getDate()}`
            );
          }
        }
        break;
      case "30":
        console.log("first");
        if (current.getMonth() < 11) {
          if (current.getDate() < 10) {
            setDate(
              `${current.getFullYear()}-${0}${
                current.getMonth() + 2
              }-${0}${current.getDate()}`
            );
          } else {
            setDate(
              `${current.getFullYear()}-${0}${
                current.getMonth() + 2
              }-${current.getDate()}`
            );
          }
        } else {
          if (current.getDate() < 10) {
            setDate(
              `${current.getFullYear()}-${
                current.getMonth() + 2
              }-${0}${current.getDate()}`
            );
          }
        }
        break;
      default:
        break;
    }
  };
  useEffect(() => {
    <Link to="/display"></Link>;
  }, [count]);
  return (
    <div className="Background">
      <div className="Cener" autoComplete="off">
        <div className="wrapper">
          <div className="title">Lineup (To_Do List)</div>
          <div className="form">
            <div className="inputfield">
              <input
                className="input"
                type="text"
                placeholder="Title"
                name="TaskTaker"
                value={titles}
                onChange={(e) => setTitles(e.target.value)}
              />
            </div>
            <div className="inputfield">
              <textarea
                className="textarea"
                placeholder="Note"
                value={note}
                onChange={(e) => setNote(e.target.value)}
              ></textarea>
            </div>
            <div className="inputfield">
              <label>Date</label>
              <input
                type="date"
                className="input"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
              <select
                name="Day"
                id="Days"
                className="custom_select"
                onChange={(e) => {
                  optDate(e.target.value);
                }}
              >
                {" "}
                <option></option>
                <option value="1">Today</option>
                <option value="2">Tomorrow</option>
                <option value="7">Next Week</option>
                <option value="30">Next Month</option>
              </select>
            </div>
            <Link to="/display">
              <div className="inputfield">
                <button
                  // type="submit"
                  onClick={() => {
                    Submitt();
                  }}
                  className="btn"
                >
                  Add
                </button>
              </div>
            </Link>
            <div className="inputfield">
              <button
                type="reset"
                onClick={() => {
                  Cancel();
                }}
                className="btn"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddNote;
