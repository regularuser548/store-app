import React from "react";

export default function UserActivityReport({ userActivityData }) {
  return (
    <div>
      <h1>Активність користувачів</h1>
      <table>
        <thead>
        <tr>
          <th>Ім'я</th>
          <th>Email</th>
          <th>Кількість замовлень</th>
        </tr>
        </thead>
        <tbody>
        {userActivityData.map((user) => (
          <tr key={user.id}>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.orders_count}</td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  );
}

