import React from "react";

export default function CartItem({ item, onQuantityChange, onRemove }) {
    const handleIncrease = () => onQuantityChange(item.id, item.quantity + 1);
    const handleDecrease = () => onQuantityChange(item.id, Math.max(item.quantity - 1, 1));

    return (
        <li style={{ marginBottom: "20px", display: 'flex', alignItems: 'center', gap: '20px' }}>
            <img
                src={item.image}
                alt={item.name}
                style={{ width: "100px", height: "100px", objectFit: "cover" }}
            />
            <div>
                <h3>{item.name || "Unnamed Product"}</h3>
                <p>Price: ${item.price || 0}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <button onClick={handleDecrease} disabled={item.quantity <= 1}>-</button>
                    <span>{item.quantity || 0}</span>
                    <button onClick={handleIncrease}>+</button>
                </div>
                <button onClick={() => onRemove(item.id)}>Remove</button>
            </div>
        </li>
    );
}
