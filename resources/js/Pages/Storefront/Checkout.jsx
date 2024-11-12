import React, { useEffect } from "react";
import { useForm } from "@inertiajs/react";

export default function Checkout({ cartItems, userData }) {
  const { data, setData, post, processing, errors } = useForm({
    name: userData.name || "",
    email: userData.email || "",
    notes: "",
    items: cartItems,
  });

  const handleChange = (e) => setData(e.target.name, e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    post(route("checkout.store"));
  };

  return (
    <div>
      <h1>Placing an order</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={data.name}
            onChange={handleChange}
          />
          {errors.name && <div>{errors.name}</div>}
        </div>

        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={data.email}
            onChange={handleChange}
          />
          {errors.email && <div>{errors.email}</div>}
        </div>

        <div>
          <label>Note:</label>
          <textarea
            name="notes"
            value={data.notes}
            onChange={handleChange}
          />
        </div>

        <h2>Items in cart</h2>
        {cartItems.length > 0 ? (
          <ul>
            {cartItems.map((item) => (
              <li key={item.id}>
                {item.name} - {item.quantity} x ${item.price}
              </li>
            ))}
          </ul>
        ) : (
          <p>Cart is empty</p>
        )}

        <button type="submit" disabled={processing}>
          Make order
        </button>
      </form>
    </div>
  );
}
