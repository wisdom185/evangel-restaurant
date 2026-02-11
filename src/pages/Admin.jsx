// src/pages/Admin.jsx

function Admin({ orders, onMarkCompleted }) {
  return (
    <div>
      <h1
        className="page-title"
        style={{ textAlign: "center", marginBottom: "24px" }}
      >
        Admin Dashboard
      </h1>

      <p
        style={{
          textAlign: "center",
          maxWidth: "600px",
          margin: "0 auto 24px",
        }}
      >
        View student orders and manage the restaurant menu.
      </p>

      <section
        style={{
          maxWidth: "900px",
          margin: "0 auto",
          background: "white",
          padding: "16px",
          borderRadius: "8px",
        }}
      >
        <h2 className="section-title" style={{ marginBottom: "12px" }}>
          Submitted Orders
        </h2>

        {orders.length === 0 ? (
          <p>No orders yet.</p>
        ) : (
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              fontSize: "0.9rem",
            }}
          >
            <thead>
              <tr>
                <th style={{ textAlign: "left", padding: "8px" }}>ID</th>
                <th style={{ textAlign: "left", padding: "8px" }}>Student</th>
                <th style={{ textAlign: "left", padding: "8px" }}>Matric</th>
                <th style={{ textAlign: "left", padding: "8px" }}>Items</th>
                <th style={{ textAlign: "left", padding: "8px" }}>Total (₦)</th>
                <th style={{ textAlign: "left", padding: "8px" }}>Status</th>
                <th style={{ padding: "8px" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td style={{ padding: "8px", borderTop: "1px solid #ddd" }}>
                    {order.id}
                  </td>
                  <td style={{ padding: "8px", borderTop: "1px solid #ddd" }}>
                    {order.student.name}
                  </td>
                  <td style={{ padding: "8px", borderTop: "1px solid #ddd" }}>
                    {order.student.matric}
                  </td>
                  <td style={{ padding: "8px", borderTop: "1px solid #ddd" }}>
                    {order.items.length}
                  </td>
                  <td style={{ padding: "8px", borderTop: "1px solid #ddd" }}>
                    {order.total.toLocaleString()}
                  </td>
                  <td style={{ padding: "8px", borderTop: "1px solid #ddd" }}>
                    {order.status}
                  </td>
                  <td style={{ padding: "8px", borderTop: "1px solid #ddd" }}>
                    {order.status === "pending" ? (
                      <button
                        type="button"
                        className="btn-primary"
                        onClick={() => onMarkCompleted(order.id)}
                      >
                        Mark completed
                      </button>
                    ) : (
                      <span style={{ color: "green" }}>Done</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </div>
  );
}

export default Admin;




