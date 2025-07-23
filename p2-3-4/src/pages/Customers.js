import React, { useEffect, useState } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import CustomerDetail from "./CustomerDetail";

const Customers = () => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/customers")
      .then((res) => res.json())
      .then((data) => setCustomers(data));
  }, []);

  return (
    <div>
      <h2>Customers</h2>
      <div style={{ display: "flex" }}>
        <ul>
          {customers.map((c) => (
            <li key={c.id}>
              <Link to={`/customers/${c.id}`}>{c.name}</Link>
            </li>
          ))}
        </ul>
        <Routes>
          <Route
            path="/"
            element={
              <div>
                <h3>Customer Home</h3>
              </div>
            }
          />
          <Route path=":id" element={<CustomerDetail />} />
        </Routes>
      </div>
    </div>
  );
};

export default Customers;
