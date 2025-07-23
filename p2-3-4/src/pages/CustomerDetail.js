import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const CustomerDetail = () => {
  const { id } = useParams();
  const [customer, setCustomer] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3001/customers/${id}`)
      .then((res) => res.json())
      .then((data) => setCustomer(data));
  }, [id]);

  if (!customer) return <div>Loading...</div>;

  return (
    <div>
      <h3>Customer Details</h3>
      <p>ID: {customer.id}</p>
      <p>Name: {customer.name}</p>
      <p>Address: {customer.address}</p>
      {customer.orders?.length > 0 && (
        <>
          <h4>Orders:</h4>
          <ul>
            {customer.orders.map((o, i) => (
              <li key={i}>
                Product ID: {o.product_id}, Quantity: {o.quantity}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default CustomerDetail;
