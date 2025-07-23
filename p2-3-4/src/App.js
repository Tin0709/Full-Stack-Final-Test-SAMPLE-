import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
} from "react-router-dom";
import Home from "./pages/Home";
import Customers from "./pages/Customers";

function App() {
  const navStyle = ({ isActive }) => ({
    margin: "10px",
    padding: "10px",
    textDecoration: "none",
    backgroundColor: isActive ? "lightblue" : "lightgray",
  });

  return (
    <Router>
      <nav>
        <NavLink to="/" style={navStyle}>
          Home
        </NavLink>
        <NavLink to="/customers" style={navStyle}>
          Customers
        </NavLink>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/customers/*" element={<Customers />} />
      </Routes>
    </Router>
  );
}

export default App;
