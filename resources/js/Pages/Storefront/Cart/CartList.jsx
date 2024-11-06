import React from "react";
import CartItem from "./CartItem";

export default function CartList({ cart, onQuantityChange, onRemove }) {
    return (
        <ul>
            {cart.map((item) => (
                <CartItem
                    key={item.id}
                    item={item}
                    onQuantityChange={onQuantityChange} // Передаем функцию
                    onRemove={onRemove}
                />
            ))}
        </ul>
    );
}
