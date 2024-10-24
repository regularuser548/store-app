import React from "react";
import CartItem from "./CartItem";

export default function CartList({ cart, onIncrease, onDecrease, onRemove }) {
    if (cart.length === 0) {
        return <p>Your cart is empty</p>;
    }

    return (
        <ul>
            {cart.map((item) => (
                <CartItem
                    key={item.id}
                    item={item}
                    onIncrease={onIncrease}
                    onDecrease={onDecrease}
                    onRemove={onRemove}
                />
            ))}
        </ul>
    );
}
