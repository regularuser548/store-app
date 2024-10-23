import React, { useState, useEffect } from "react";
import { Head, router } from "@inertiajs/react";
import CartList from "./CartList";
import axios from "axios";

export default function Show({ cart: initialCart, total: initialTotal }) {
    const [cart, setCart] = useState(initialCart);
    const [total, setTotal] = useState(initialTotal);

    const updateTotal = (cartItems) => {
        const newTotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
        setTotal(newTotal);
    };

    const handleIncrease = (id) => {
        axios.post(route("cart.update.quantity.add"), { product_id: id })
            .then(response => {
                console.log('Increased:', response.data);
                const updatedCart = cart.map(item =>
                    item.product.id === id ? { ...item, quantity: item.quantity + 1 } : item
                );
                setCart(updatedCart);
                updateTotal(updatedCart);
            })
            .catch(error => console.error('Increase Error:', error.response?.data || error));
    };

    const handleDecrease = (id) => {
        axios.post(route("cart.update.quantity.remove"), { product_id: id })
            .then(response => {
                console.log('Decreased:', response.data);
                const updatedCart = cart.map(item =>
                    item.product.id === id && item.quantity > 1
                        ? { ...item, quantity: item.quantity - 1 }
                        : item
                ).filter(item => item.quantity > 0);
                setCart(updatedCart);
                updateTotal(updatedCart);
            })
            .catch(error => console.error('Decrease Error:', error.response?.data || error));
    };

    const handleRemoveItem = (id) => {
        console.log("Removing item with ID:", id);
        router.post(route("cart.remove", { id }))
            .then(() => {
                const updatedCart = cart.filter(item => item.product.id !== id);
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
                onIncrease={handleIncrease}
                onDecrease={handleDecrease}
                onRemove={handleRemoveItem}
            />
            <h2>Total: ${total.toFixed(2)}</h2>
        </div>
    );
}


















// import React from "react";
// import { Head, router } from "@inertiajs/react";
// import CartList from "./CartList";
// import axios from "axios";
//
// export default function Show({ cart, total }) {
//
//     const handleIncrease = (id) => {
//         axios.post(route("cart.update.quantity.add"), { product_id: id })
//             .then(response => {
//                 console.log('Increased:', response.data);
//                 // Обновите состояние корзины, если необходимо
//             })
//             .catch(error => console.error('Increase Error:', error.response?.data || error));
//     };
//
//     const handleDecrease = (id) => {
//         axios.post(route("cart.update.quantity.remove"), { product_id: id })
//             .then(response => {
//                 console.log('Decreased:', response.data);
//                 // Обновите состояние корзины, если необходимо
//             })
//             .catch(error => console.error('Decrease Error:', error.response?.data || error));
//     };
//
//
//
//     const handleRemoveItem = (id) => {
//         console.log("Removing item with ID:", id);
//         router.post(route("cart.remove", { id }));
//     };
//
//     return (
//         <div>
//             <Head title="Cart" />
//             <h1>Your Cart</h1>
//             <CartList
//                 cart={cart}
//                 onIncrease={(id) => handleIncrease(id)}
//                 onDecrease={(id) => handleDecrease(id)}
//                 onRemove={handleRemoveItem}
//             />
//             <h2>Total: ${total?.toFixed(2) || "0.00"}</h2>
//         </div>
//     );
// }

// const handleIncrease = (productId) => {
//     axios.post(route("cart.update.quantity.add"), {
//         product_id: productId,
//     })
//         .then(response => console.log('Increased:', response.data))
//         .catch(error => console.error('Increase Error:', error.response?.data || error));
// };
//
// const handleDecrease = (productId) => {
//
//     if (newQuantity > 0) {
//         axios.post(route("cart.update.quantity.remove"), {
//             product_id: productId,
//
//         })
//             .then(response => console.log('Decreased:', response.data))
//             .catch(error => console.error('Decrease Error:', error.response?.data || error));
//     } else {
//         console.warn("Quantity cannot be less than 1. Consider removing the item.");
//     }
// };





























//import React from "react";
// import { Head, router } from "@inertiajs/react";
// import axios from 'axios';
//
// export default function Show({ cart, total }) {
//     const handleRemoveItem = (id) => {
//         console.log("Removing item with ID:", id);
//         router.post(route("cart.remove", { id }));
//     };
//
//     const handleIncrease = (id) => {
//         axios.post(route('cart.update.quantity'), { id, quantity: 1 })
//             .then(response => console.log('Increased:', response))
//             .catch(error => console.error(error));
//     };
//
//     const handleDecrease = (id) => {
//         axios.post(route('cart.update.quantity'), { id, quantity: -1 })
//             .then(response => console.log('Decreased:', response))
//             .catch(error => console.error(error));
//     };
//
//     return (
//         <div>
//             <Head title="Cart" />
//             <h1>Your Cart</h1>
//             {cart.length > 0 ? (
//                 <ul>
//                     {cart.map((item) => (
//                         <li key={item?.product?.id || item.id}>
//                             <img src={item?.product?.image} alt=''/>
//                             <h3>{item?.product?.name || "Unnamed Product"}</h3>
//                             <p>Price: ${item?.price || 0}</p>
//                             <p>Quantity:</p>
//                             <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
//                                 <button onClick={() => handleDecrease(item.id)}>-</button>
//                                 <span>{item?.quantity || 0}</span>
//                                 <button onClick={() => handleIncrease(item.id)}>+</button>
//                             </div>
//                             <button onClick={() => handleRemoveItem(item.product.id)}>
//                                 Remove
//                             </button>
//                         </li>
//                     ))}
//                 </ul>
//             ) : (
//                 <p>Your cart is empty</p>
//             )}
//             <h2>Total: ${total?.toFixed(2) || "0.00"}</h2>
//         </div>
//     );
// }
//
// // const handleIncrease = (id) => {
// //     axios.post(route('cart.update.quantity'), {
// //         firstName: 'Fred',
// //         lastName: 'Flintstone'
// //     })
// //         .then(function (response) {
// //             console.log(response);
// //         })
// //         .catch(function (error) {
// //             console.log(error);
// //         });
// //     console.log(`Увеличить количество товара с ID: ${id}`);
// // };
// //
// // const handleDecrease = (id) => {
// //
// //     console.log(`Уменьшить количество товара с ID: ${id}`);
// // };
