import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import AddNote from "./Components/AddNote";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useParams,
} from "react-router-dom";
import Home from "./Components/Home";
import Display from "./Components/Display";
import Edit from "./Components/Edit";
function App() {
  const { id } = useParams();
  const [collect, setCollect] = useState(
    JSON.parse(localStorage.getItem("one")) || []
  );
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/AddNote" element={<AddNote />} />
          <Route path={`/Edit/:id`} element={<Edit />} />
          <Route path="/display" element={<Display />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
