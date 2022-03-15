import logo from "./logo.svg";
import "./App.css";
import AddNote from "./Components/AddNote";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from "./Components/Home";
import Display from "./Components/Display";
function App() {
  return (
    <div className="App">
      <>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/AddNote" element={<AddNote />} />
            <Route path="/display" element={<Display />} />
          </Routes>
        </Router>
      </>

      {/* <AddNote /> */}
    </div>
  );
}

export default App;
