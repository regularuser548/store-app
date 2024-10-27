import React, { useState, useRef, useCallback } from "react";
import { Head } from "@inertiajs/react";
import CartList from "./CartList";
import axios from "axios";

export default function Show({ cart: initialCart, total: initialTotal }) {
    const [cart, setCart] = useState(initialCart);
    const [total, setTotal] = useState(initialTotal);
    const debounceTimer = useRef({});

    const updateTotal = (cartItems) => {
        const newTotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
        setTotal(newTotal);
    };

    const sendUpdateRequest = useCallback((id, quantity) => {
        axios.post(route("cart.update.quantity"), { product_id: id, quantity })
            .then(response => {
                console.log('Updated:', response.data);
            })
            .catch(error => console.error('Update Error:', error.response?.data || error));
    }, []);

    const handleQuantityChange = (id, quantity) => {
        const updatedCart = cart.map(item =>
            item.id === id ? { ...item, quantity } : item
        );

        setCart(updatedCart);
        updateTotal(updatedCart);

        clearTimeout(debounceTimer.current[id]);
        debounceTimer.current[id] = setTimeout(() => {
            sendUpdateRequest(id, quantity);
        }, 300);
    };

    const handleRemoveItem = (id) => {
        axios.post(route("cart.remove", { id }))
            .then(() => {
                const updatedCart = cart.filter(item => item.id !== id);
                setCart(updatedCart);
                updateTotal(updatedCart);
            })
            .catch(error => console.error('Remove Error:', error.response?.data || error));
    };

    return (
        <div>
            <Head title="Cart" />
            <h1>Your Cart</h1>
            <CartList
                cart={cart}
                onQuantityChange={handleQuantityChange}
                onRemove={handleRemoveItem}
            />
            <h2>Total: ${total.toFixed(2)}</h2>
        </div>
    );
}

