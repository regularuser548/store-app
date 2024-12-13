import React from "react";
import { Head } from "@inertiajs/react";
import { Table, Typography } from "antd";
import CrmMenuLayout from "@/Pages/Crm/CrmMenuLayout.jsx";

const { Title, Paragraph } = Typography;

export default function ViewUserOrders({ user, orders }) {
  const columns = [
    { title: "ID замовлення", dataIndex: "order_id", key: "order_id" },
    {
      title: "Дата замовлення",
      dataIndex: "order_date",
      key: "order_date",
      render: (date) => new Date(date).toLocaleDateString(),
    },
    { title: "Назва продукту", dataIndex: "product_name", key: "product_name" },
    { title: "Кількість", dataIndex: "ordered_quantity", key: "ordered_quantity" },
    {
      title: "Ціна за одиницю",
      dataIndex: "price_per_unit",
      key: "price_per_unit",
      render: (price) => `$${price.toFixed(2)}`,
    },
    {
      title: "Загальна ціна",
      key: "total_price",
      render: (_, record) => `$${(record.ordered_quantity * record.price_per_unit).toFixed(2)}`,
    },
  ];

  return (
    <CrmMenuLayout>
      <Head title={`Orders of ${user.name}`} />
      <Title level={2} className="mb-4">Усі замовлення {user.name}</Title>
      {orders.length > 0 ? (
        <Table
          dataSource={orders}
          columns={columns}
          rowKey="order_id"
          bordered
          pagination={false}
        />
      ) : (
        <Paragraph>Для цього користувача не знайдено замовлень.</Paragraph>
      )}
    </CrmMenuLayout>
  );
}







// import React from "react";
// import { Head } from "@inertiajs/react";
// import CrmMenuLayout from "@/Pages/Crm/CrmMenuLayout.jsx";
//
// export default function ViewUserOrders({ user, orders }) {
//   return (
//     <CrmMenuLayout>
//       <Head title={`Orders of ${user.name}`} />
//       <h1>Orders of {user.name}</h1>
//
//       {orders.length > 0 ? (
//         <table>
//           <thead>
//           <tr>
//             <th>Order ID</th>
//             <th>Order Date</th>
//             <th>Product Name</th>
//             <th>Quantity</th>
//             <th>Price per Unit</th>
//             <th>Total Price</th>
//           </tr>
//           </thead>
//           <tbody>
//           {orders.map((order, index) => (
//             <tr key={index}>
//               <td>{order.order_id}</td>
//               <td>{new Date(order.order_date).toLocaleDateString()}</td>
//               <td>{order.product_name}</td>
//               <td>{order.ordered_quantity}</td>
//               <td>{order.price_per_unit.toFixed(2)}</td>
//               <td>{(order.ordered_quantity * order.price_per_unit).toFixed(2)}</td>
//             </tr>
//           ))}
//           </tbody>
//         </table>
//       ) : (
//         <p>No orders found for this user.</p>
//       )}
//     </CrmMenuLayout>
//   );
// }
