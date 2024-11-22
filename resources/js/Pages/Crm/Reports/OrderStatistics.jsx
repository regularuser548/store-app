import React from "react";

export default function OrderStatistics({ productStatistics }) {
  return (
    <div>
      <h1>Order Statistics</h1>
      <table>
        <thead>
        <tr>
          <th>User ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Product Name</th>
          <th>Price</th>
          <th>Total Quantity Ordered</th>
          <th>Total Orders</th>
        </tr>
        </thead>
        <tbody>
        {productStatistics.map((stat) => (
          <tr key={stat.user_id}>
            <td>{stat.user_id}</td>
            <td>{stat.user_name}</td>
            <td>{stat.user_email}</td>
            <td>{stat.product_name}</td>
            <td>${stat.price}</td>
            <td>{stat.total_quantity_by_user}</td>
            <td>{stat.total_orders_by_user}</td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  );
}
