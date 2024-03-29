import React, { useEffect, useState, useReducer } from "react";
import DatePicker from "react-datepicker";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./AddNote.css";
import { v4 } from "uuid";
import { Link, useLocation, useParams, useNavigate } from "react-router-dom";
toast.configure();
function Edit() {
  const [collect, setCollect] = useState(
    JSON.parse(localStorage.getItem("one")) || ""
  );
  const { id } = useParams();
  const [update, setUpdate] = useState(
    JSON.parse(localStorage.getItem("three")) || ""
  );

  const [edit, setEdit] = useState([]);
  const [count, setCount] = useState(0);
  const [note, setNote] = useState("");
  const [titles, setTitles] = useState("");
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("pending ");
  const navigate = useNavigate();

  let arr = collect;
  console.log(arr);
  const Cancel = () => {
    setDate("");
    setTitles("");
    setNote("");
    notifycancel();
  };

  const updatee = (e) => {
    if (titles === "" || !date) return alert("please fill all field");
    else {
      notifydone();
    }
    let ca = "";
    for (let j = 0; j < collect.length; j++) {
      if (collect[j].id === id) {
        arr[j] = { titles: titles, note: note, date: date, id: v4() };
      }
    }
    console.log(arr);
    localStorage.setItem("one", JSON.stringify(collect));
    setDate("");
    setTitles("");
    setNote("");
    navigate("/display");
  };
  function addDays(theDate, days) {
    return new Date(theDate.getTime() + days * 24 * 60 * 60 * 1000);
  }
  const notifyupdate = () => {
    toast.success("Note Ready For Update", { autoClose: 3000 });
  };
  const notifydone = () => {
    toast.success("Note Updated", { autoClose: 3000 });
  };
  const notifycancel = () => {
    toast.error("Note Updated Cancle", { autoClose: 3000 });
  };
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
              `${Week.getFullYear()}-${0}${
                Week.getMonth() + 1
              }-${0}${Week.getDate()}`
            );
          } else {
            setDate(
              `${Week.getFullYear()}-${0}${
                Week.getMonth() + 1
              }-${Week.getDate()}`
            );
          }
        } else {
          if (Week.getDate() < 10) {
            setDate(
              `${Week.getFullYear()}-${
                Week.getMonth() + 1
              }-${0}${Week.getDate()}`
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
    let ca = "";
    for (let j = 0; j < collect.length; j++) {
      if (collect[j].id === id) {
        setNote(collect[j].note);
        setTitles(collect[j].titles);
        notifyupdate();
      }
    }
    <Link to="/display"></Link>;
  }, [count]);
  console.log(update);
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
                placeholder={titles}
                name="TaskTaker"
                value={titles}
                onChange={(e) => setTitles(e.target.value)}
              />
            </div>

            <div className="inputfield">
              <textarea
                className="textarea"
                placeholder={note}
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

            <div className="inputfield">
              <button
                // type="submit"
                onClick={() => {
                  updatee();
                }}
                className="btn"
              >
                Update
              </button>
            </div>

            <Link to="/display">
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
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Edit;
