const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());               // allow your React app to call this API
app.use(express.json());       // parse JSON request bodies

// In-memory orders array (reset when server restarts)
let orders = [];

// POST /orders – save a new order
app.post("/orders", (req, res) => {
  const order = req.body;

  if (!order || !order.student || !order.items) {
    return res.status(400).json({ message: "Invalid order data" });
  }

  const orderWithId = {
    ...order,
    id: Date.now(),
    status: "pending",
  };

  orders.unshift(orderWithId);
  res.status(201).json(orderWithId);
});

// GET /orders – list all orders
app.get("/orders", (req, res) => {
  res.json(orders);
});

// PATCH /orders/:id – update order status
app.patch("/orders/:id", (req, res) => {
  const id = Number(req.params.id);
  const { status } = req.body;

  const index = orders.findIndex((o) => o.id === id);
  if (index === -1) {
    return res.status(404).json({ message: "Order not found" });
  }

  orders[index] = { ...orders[index], status: status || "completed" };
  res.json(orders[index]);
});

// very simple hard-coded admin credentials
const ADMIN_USER = "LORD MUKEN";
const ADMIN_PASS = "password123";
const FAKE_TOKEN = "evangel-admin-token";

// POST /login – authenticate admin
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (username === ADMIN_USER && password === ADMIN_PASS) {
    return res.json({ token: FAKE_TOKEN });
  }

  return res.status(401).json({ message: "Your not an admin get the heck out" });
});

app.listen(PORT, () => {
  console.log(`API server running on http://localhost:${PORT}`);
});

