// src/pages/Orders.jsx
import { useState } from "react";

function Orders({ cartItems, onSubmitOrder }) {
  const [student, setStudent] = useState({
    name: "",
    matric: "",
    department: "",
    hostel: "",
    phone: "",
  });

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudent((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    if (!cartItems.length) return;

    const order = {
      student,
      items: cartItems,
      total,
      createdAt: new Date().toISOString(),
    };

    try {
      const res = await fetch("http://localhost:5000/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(order),
      });

      const saved = await res.json();

      if (!res.ok) {
        alert("Failed to submit order");
        return;
      }

      onSubmitOrder(saved); // update App state
      alert("Order submitted!");
    } catch (err) {
      console.error(err);
      alert("Network error submitting order");
    }
  };

  if (cartItems.length === 0) {
    return <p style={{ textAlign: "center" }}>Your cart is empty.</p>;
  }

  return (
    <div>
      <h2 className="section-title">Your Order</h2>

      {/* Student details form */}
      <form onSubmit={handleSubmitOrder} className="orders-form-card">
        <h3 className="orders-form-title">Student details</h3>

        <div className="orders-form-group">
          <label className="orders-form-label">
            Full name:
            <input
              type="text"
              name="name"
              value={student.name}
              onChange={handleChange}
              required
              className="orders-form-input"
            />
          </label>
        </div>

        <div className="orders-form-group">
          <label className="orders-form-label">
            Matric number:
            <input
              type="text"
              name="matric"
              value={student.matric}
              onChange={handleChange}
              required
              className="orders-form-input"
            />
          </label>
        </div>

        <div className="orders-form-group">
          <label className="orders-form-label">
            Department:
            <input
              type="text"
              name="department"
              value={student.department}
              onChange={handleChange}
              required
              className="orders-form-input"
            />
          </label>
        </div>

        <div className="orders-form-group">
          <label className="orders-form-label">
            Hostel / Room:
            <input
              type="text"
              name="hostel"
              value={student.hostel}
              onChange={handleChange}
              required
              className="orders-form-input"
            />
          </label>
        </div>

        <div className="orders-form-group">
          <label className="orders-form-label">
            Phone number:
            <input
              type="tel"
              name="phone"
              value={student.phone}
              onChange={handleChange}
              required
              className="orders-form-input"
            />
          </label>
        </div>

        <div className="orders-submit-row">
          <button type="submit" className="btn-primary">
            Submit order
          </button>
        </div>
      </form>

      {/* Cart items */}
      <div className="region-grid-large">
        {cartItems.map((item) => (
          <article key={item.id} className="region-card">
            <div className="region-card-body">
              <h3 className="region-name">{item.name}</h3>
              <p className="region-desc">
                Qty: {item.quantity} × ₦{item.price.toLocaleString()}
              </p>
              <p className="region-desc">
                Subtotal: ₦{(item.price * item.quantity).toLocaleString()}
              </p>
            </div>
          </article>
        ))}
      </div>

      <h3 style={{ textAlign: "right", marginTop: "16px" }}>
        Total: ₦{total.toLocaleString()}
      </h3>
    </div>
  );
}

export default Orders;



