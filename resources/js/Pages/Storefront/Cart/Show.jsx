import React from "react";
import { Head, router } from "@inertiajs/react";

export default function Show({ cart }) {
    function handleRemoveItem(id) {
        router.post(route('cart.remove', { id }));
    }

    const total = Object.values(cart).reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
    );

    return (
        <div>
            <Head title="Cart" />
            <h1>Your Cart</h1>
            {Object.keys(cart).length > 0 ? (
                <ul>
                    {Object.entries(cart).map(([id, item]) => (
                        <li key={id}>
                            <h3>{item.name}</h3>
                            <p>Price: ${item.price}</p>
                            <p>Quantity: {item.quantity}</p>
                            <button onClick={() => handleRemoveItem(id)}>Remove</button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Your cart is empty.</p>
            )}
            <h2>Total: ${total.toFixed(2)}</h2>
        </div>
    );
}
