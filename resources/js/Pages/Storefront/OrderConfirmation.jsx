import React from "react";
import { Link } from "@inertiajs/react";
import { Button, Card } from "antd";

export default function OrderConfirmation({ orderId }) {
  return (
    <div className="flex justify-center items-center h-screen">
      <Card
        className="text-center"
        style={{
          maxWidth: "500px",
          width: "100%",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h1 className="text-2xl font-bold mb-4 text-green-600">
          Ваше замовлення успішно оформлено!
        </h1>
        <p className="text-lg mb-6">ID замовлення: <strong>{orderId}</strong></p>
        <div className="flex flex-col gap-4">
          <Link href={route("storefront.index")}>
            <Button type="primary" block>
              Продовжити покупки
            </Button>
          </Link>
          <Link href={route("orders.index")}>
            <Button type="default" block>
              Перейти до замовлень
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  );
}



// import React from "react";
// import { Link } from "@inertiajs/react";
//
// export default function OrderConfirmation({ orderId }) {
//     return (
//         <div>
//             <h1>Your order has been successfully placed</h1>
//             <p>Order ID: {orderId}</p>
//             <Link href={route("storefront.index")}>
//                 <button>Continue Shopping</button>
//             </Link>
//             <Link href={route("orders.index")}>
//                 <button>Go to Orders</button>
//             </Link>
//         </div>
//     );
// }
