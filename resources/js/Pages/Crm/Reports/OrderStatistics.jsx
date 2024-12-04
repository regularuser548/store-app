import React, { useState } from "react";
import axios from "axios";

export default function OrderStatistics({ productStatistics, userRole }) {
  const [editData, setEditData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleEdit = (userData) => {
    setEditData(userData);
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      await axios.put(`/crm/reports/statistics/update`, editData);
      alert("Data updated successfully!");
      setEditData(null);
    } catch (error) {
      console.error("Failed to save data:", error);
      alert("Failed to update data.");
    } finally {
      setLoading(false);
    }
  };

  const statuses = ["pending", "processing", "completed", "canceled"];

  return (
    <div>
      <h1>Order Statistics</h1>
      <table>
        <thead>
        <tr>
          <th>User ID</th>
          <th>Name</th>
          <th>Surname</th>
          <th>Email</th>
          <th>Phone Number</th>
          <th>Status</th>
          <th>Product Name</th>
          <th>Price</th>
          <th>Total Quantity Ordered</th>
          <th>Total Orders</th>
          <th>Actions</th>
        </tr>
        </thead>
        <tbody>
        {productStatistics.map((stat) => (
          <tr key={stat.user_id}>
            <td>{stat.user_id}</td>
            <td>{stat.user_name}</td>
            <td>{stat.surname}</td>
            <td>{stat.user_email}</td>
            <td>{stat.phone_number}</td>
            <td>{stat.status}</td>
            <td>{stat.product_name}</td>
            <td>${stat.price}</td>
            <td>{stat.total_quantity_by_user}</td>
            <td>{stat.total_orders_by_user}</td>
            <td>
              <button onClick={() => handleEdit(stat)}>Edit</button>
            </td>
          </tr>
        ))}
        </tbody>
      </table>

      {editData && (
        <div className="modal">
          <h2>Edit User Data</h2>
          <form>
            <label>
              Status:
              <select
                value={editData.status}
                onChange={(e) =>
                  setEditData({ ...editData, status: e.target.value })
                }
              >
                {statuses.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </label>
            {(userRole === "moderator" || userRole === "admin") && (
              <>
                <label>
                  Phone Number:
                  <input
                    type="text"
                    value={editData.phone_number}
                    onChange={(e) =>
                      setEditData({ ...editData, phone_number: e.target.value })
                    }
                  />
                </label>
                <label>
                  Email:
                  <input
                    type="email"
                    value={editData.user_email}
                    onChange={(e) =>
                      setEditData({ ...editData, user_email: e.target.value })
                    }
                  />
                </label>
              </>
            )}
            <button type="button" onClick={handleSave} disabled={loading}>
              {loading ? "Saving..." : "Save"}
            </button>
            <button type="button" onClick={() => setEditData(null)}>
              Cancel
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
