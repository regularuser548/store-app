import React from "react";
import { Link } from "@inertiajs/react";

export default function OrderConfirmation({ orderId }) {
    return (
        <div>
            <h1>Your order has been successfully placed</h1>
            <p>Order ID: {orderId}</p>
            <Link href={route("storefront.index")}>
                <button>Continue Shopping</button>
            </Link>
            <Link href={route("orders.index")}>
                <button>Go to Orders</button>
            </Link>
        </div>
    );
}
