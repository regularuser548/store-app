import React, { useState } from 'react';
import ProfileLayout from "@/Layouts/ProfileLayout.jsx";

export default function MyOrders({ orders }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Захардкоженные статусы
  const statuses = ['all', 'pending', 'processing', 'completed', 'canceled'];

  // Фильтрация заказов
  const filteredOrders = orders.filter((order) => {
    const matchesSearch = order.items.some((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <ProfileLayout>
      <div className="p-4 text-white"> {/* Добавлен класс для белого текста */}
        <div className="flex justify-between items-center mb-6">
          <input
            type="text"
            placeholder="Пошук за усіма замовленнями..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-gray-600 bg-transparent text-white rounded px-4 py-2 w-full sm:w-1/2"
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border border-gray-600 bg-gray-800 text-white rounded px-4 py-2 ml-4"
          >
            {statuses.map((status, index) => (
              <option key={index} value={status}>
                {status === 'all' ? 'Статуси' : status}
              </option>
            ))}
          </select>
        </div>

        <h1 className="text-2xl font-bold mb-4">Мої замовлення</h1>
        {filteredOrders.length > 0 ? (
          filteredOrders.map((order) => (
            <div key={order.id} className="mb-6 p-4 border border-gray-600 rounded relative">
              <div className="flex justify-between items-center mb-4">
                <p className="font-bold text-lg">№ {order.id}</p>
                <p className="text-sm text-gray-400">{order.date}</p>
              </div>
              <p className="text-sm mb-2">
                Статус: <span className="font-medium text-orange-400">{order.status}</span>
              </p>
              <p className="text-gray-400">Отримувач: {order.name} {order.surname}</p>
              <p className="text-gray-400">Телефон: {order.phone_number}</p>
              <p className="text-gray-400">Пошта: {order.email}</p>
              <div className="mt-4 grid gap-4 grid-cols-1 sm:grid-cols-2">
                {order.items.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center p-3 border border-gray-700 rounded shadow-sm"
                  >
                    <img
                      src={item.thumbUrl}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded mr-4"
                    />
                    <div className="flex-grow">
                      <p className="text-gray-200 font-medium">{item.name}</p>
                      <p className="text-gray-400 text-sm">Кількість: {item.quantity}</p>
                    </div>
                    <p className="text-gray-100 font-bold">{item.price} грн</p>
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-400">Замовлень не знайдено.</p>
        )}
      </div>
    </ProfileLayout>
  );
}
