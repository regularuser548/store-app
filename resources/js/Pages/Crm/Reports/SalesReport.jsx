import React from "react";
import { Table, Button } from "antd";
import { Link } from "@inertiajs/react";

export default function SalesReport({ salesData }) {
  console.log(salesData);
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Назва продукту",
      dataIndex: "product_name",
      key: "product_name",
    },
    {
      title: "Ціна",
      dataIndex: "price",
      key: "price",
      render: (price) => `$${price?.toFixed(2)}`,
    },
    {
      title: "Всього продано",
      dataIndex: "total_quantity",
      key: "total_quantity",
    },
    {
      title: "Всього замовлень",
      dataIndex: "total_orders",
      key: "total_orders",
    },
    {
      title: "Дії",
      key: "actions",
      render: (_, record) => (
        <Link
          href={route("reports.statistics", { id: record.id })}
        >
          <Button type="link">Переглянути статистику замовлень</Button>
        </Link>
      ),
    },
  ];

  return (
    <div className="">
      <h1 className="text-2xl font-bold mb-4">Звіти про продажі</h1>
      <Table
        columns={columns}
        dataSource={salesData}
        rowKey={(record) => record.id}
        bordered
        pagination={false}
      />
    </div>
  );
}




// import React from "react";
// import { Link } from "@inertiajs/react";
// import CrmMenuLayout from "@/Layouts/CrmMenuLayout.jsx";
//
// export default function SalesReport({ salesData }) {
//   return (
//     <>
//       <div className="p-4">
//         <h1 className="text-2xl font-bold mb-4">Звіти про продажі</h1>
//         <table className="w-full border-collapse border border-gray-300">
//           <thead>
//           <tr>
//             <th className="border border-gray-300 px-4 py-2">ID</th>
//             <th className="border border-gray-300 px-4 py-2">Назва продукту</th>
//             <th className="border border-gray-300 px-4 py-2">Ціна</th>
//             <th className="border border-gray-300 px-4 py-2">Всього продано</th>
//             <th className="border border-gray-300 px-4 py-2">Всього замовлень</th>
//             <th className="border border-gray-300 px-4 py-2">Дії</th>
//           </tr>
//           </thead>
//           <tbody>
//           {salesData.map((product) => (
//             <tr key={product.id}>
//               <td className="border border-gray-300 px-4 py-2">{product.id}</td>
//               <td className="border border-gray-300 px-4 py-2">{product.product_name}</td>
//               <td className="border border-gray-300 px-4 py-2">${product.price}</td>
//               <td className="border border-gray-300 px-4 py-2">{product.total_quantity}</td>
//               <td className="border border-gray-300 px-4 py-2">{product.total_orders}</td>
//               <td className="border border-gray-300 px-4 py-2">
//                 <Link
//                   href={route("reports.statistics", { id: product.id })}
//                   className="text-blue-500 hover:underline"
//                 >
//                   Переглянути статистику замовлень
//                 </Link>
//               </td>
//             </tr>
//           ))}
//           </tbody>
//         </table>
//       </div>
//     </>
//   );
// }
