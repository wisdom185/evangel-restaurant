// src/App.jsx
import { useState, useEffect } from "react";
import "./App.css";
import { Link, Routes, Route } from "react-router-dom";
import { API_BASE } from "./api";

import Home from "./pages/Home.jsx";
import Menu from "./pages/Menu.jsx";
import Orders from "./pages/Orders.jsx";
import Admin from "./pages/Admin.jsx";
import RegionMenu from "./pages/RegionMenu.jsx";
import Login from "./pages/Login.jsx";

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [orders, setOrders] = useState([]);
  const [isAdmin, setIsAdmin] = useState(
    !!localStorage.getItem("authToken")
  );

  // load existing orders from backend on first render
  useEffect(() => {
    const loadOrders = async () => {
      try {
        const res = await fetch(`${API_BASE}/orders`);
        const data = await res.json();
        setOrders(data);
      } catch (err) {
        console.error("Failed to load orders", err);
      }
    };
    loadOrders();
  }, []);

  const handleAddToCart = (dish) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === dish.id);
      if (existing) {
        return prev.map((item) =>
          item.id === dish.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...dish, quantity: 1 }];
    });
  };

  const handleSubmitOrder = (orderFromServer) => {
    setOrders((prev) => [orderFromServer, ...prev]);
    setCartItems([]);
  };

  const handleMarkCompletedInApp = async (id) => {
    try {
      const res = await fetch(`${API_BASE}/orders/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "completed" }),
      });
      const updated = await res.json();
      if (!res.ok) return;

      setOrders((prev) =>
        prev.map((o) => (o.id === updated.id ? updated : o))
      );
    } catch (err) {
      console.error("Failed to update order", err);
    }
  };

  const handleLoginSuccess = () => {
    setIsAdmin(true);
  };

  return (
    <div className="app-shell">
      <header className="navbar">
        <div className="navbar-logo">
          <span role="img" aria-label="plate">
            🍽️
          </span>
          <span>Evangel University Restaurant</span>
        </div>

        <nav className="navbar-links">
          <Link to="/" className="navbar-link">
            Home
          </Link>
          <Link to="/menu" className="navbar-link">
            Menu
          </Link>
          <Link to="/orders" className="navbar-link">
            Orders
          </Link>
          <Link to="/admin" className="navbar-link">
            Admin
          </Link>
        </nav>
      </header>

      <main className="page-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route
            path="/menu/:regionId"
            element={<RegionMenu onAddToCart={handleAddToCart} />}
          />
          <Route
            path="/orders"
            element={
              <Orders
                cartItems={cartItems}
                onSubmitOrder={handleSubmitOrder}
              />
            }
          />
          <Route
            path="/login"
            element={<Login onLogin={handleLoginSuccess} />}
          />
          <Route
            path="/admin"
            element={
              isAdmin ? (
                <Admin
                  orders={orders}
                  onMarkCompleted={handleMarkCompletedInApp}
                />
              ) : (
                <Login onLogin={handleLoginSuccess} />
              )
            }
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;






