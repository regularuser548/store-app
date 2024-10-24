import React from "react";

export default function CartItem({ item, onIncrease, onDecrease, onRemove }) {
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
                    <button onClick={() => onDecrease(item.id)}>-</button>
                    <span>{item.quantity || 0}</span>
                    <button onClick={() => onIncrease(item.id)}>+</button>
                </div>
                <button onClick={() => onRemove(item.id)}>Remove</button>
            </div>
        </li>
    );
}
