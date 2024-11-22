import React from "react";
import { Head } from "@inertiajs/react";
import CrmMenuLayout from "@/Pages/Crm/CrmMenuLayout.jsx";

export default function ViewUserOrders({ user, orders }) {
  return (
    <CrmMenuLayout>
      <Head title={`Orders of ${user.name}`} />
      <h1>Orders of {user.name}</h1>

      {orders.length > 0 ? (
        <table>
          <thead>
          <tr>
            <th>Order ID</th>
            <th>Order Date</th>
            <th>Product Name</th>
            <th>Quantity</th>
            <th>Price per Unit</th>
            <th>Total Price</th>
          </tr>
          </thead>
          <tbody>
          {orders.map((order, index) => (
            <tr key={index}>
              <td>{order.order_id}</td>
              <td>{new Date(order.order_date).toLocaleDateString()}</td>
              <td>{order.product_name}</td>
              <td>{order.ordered_quantity}</td>
              <td>{order.price_per_unit.toFixed(2)}</td>
              <td>{(order.ordered_quantity * order.price_per_unit).toFixed(2)}</td>
            </tr>
          ))}
          </tbody>
        </table>
      ) : (
        <p>No orders found for this user.</p>
      )}
    </CrmMenuLayout>
  );
}
