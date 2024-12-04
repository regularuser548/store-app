import React from "react";
import { Link } from "@inertiajs/react";

export default function SalesReport({ salesData }) {
  return (
    <div>
      <h1>Sales Report</h1>
      <table>
        <thead>
        <tr>
          <th>ID.</th>
          <th>Product Name.</th>
          <th>Price.</th>
          <th>Total Sold.</th>
          <th>Total Orders.</th>
          <th>Action.</th>
        </tr>
        </thead>
        <tbody>
        {salesData.map((product) => (
          <tr key={product.id}>
            <td>{product.id}</td>
            <td>{product.product_name}</td>
            <td>${product.price}</td>
            <td>{product.total_quantity}</td>
            <td>{product.total_orders}</td>
            <td>
              <Link href={route('reports.statistics', { id: product.id })}>
                View Order Statistics
              </Link>
            </td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  );
}
