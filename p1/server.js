const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

const PORT = 3001;

const myName = "Tin";
const myStudentId = "S3988418";

const customers = [
  { id: 1, name: "Alice", address: "101 Main Street" },
  { id: 2, name: "Bob", address: "303 Sub Street" },
  { id: 3, name: myName, address: myStudentId + " RMIT" },
];

const orders = [
  { customer_id: 1, product_id: 1, quantity: 2 },
  { customer_id: 1, product_id: 2, quantity: 3 },
  { customer_id: 3, product_id: 1, quantity: 5 },
  { customer_id: 3, product_id: 3, quantity: 2 },
];

const products = [
  { id: 1, name: "Laptop", price: 500.0, sell_off: true, percent: 10.0 },
  { id: 2, name: "Phone", price: 350.0, sell_off: false },
  { id: 3, name: "Keyboard", price: 130.0, sell_off: true, percent: 40.0 },
  { id: 4, name: "Tablet", price: 680.0, sell_off: false },
];

// GET all customers
app.get("/customers", (req, res) => {
  res.json(customers);
});

// GET customer by ID with their orders
app.get("/customers/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const customer = customers.find((c) => c.id === id);
  const customerOrders = orders
    .filter((order) => order.customer_id === id)
    .map((order) => ({
      product_id: order.product_id,
      quantity: order.quantity,
    }));
  customer.orders = customerOrders;
  res.json(customer);
});

// GET total price for customer
app.get("/customers/:id/total", (req, res) => {
  const id = parseInt(req.params.id);
  const customerOrders = orders.filter((order) => order.customer_id === id);

  let total = 0;
  customerOrders.forEach((order) => {
    const product = products.find((p) => p.id === order.product_id);
    let finalPrice = product.price;
    if (product.sell_off) {
      finalPrice = finalPrice * (1 - product.percent / 100);
    }
    total += finalPrice * order.quantity;
  });

  res.json({ total_price: total });
});

// Catch-all 404
app.use((req, res) => {
  res.status(404).json({ msg: "not found" });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
