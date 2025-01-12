import React from "react";
import { Table } from "antd";

export default function UserActivityReport({ userActivityData }) {
  const columns = [
    {
      title: "Ім'я",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Електронна пошта",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Кількість замовлень",
      dataIndex: "orders_count",
      key: "orders_count",
    },
  ];

  return (
    <div className="">
      <h1 className="text-2xl font-bold mb-4">Активність користувачів</h1>
      <Table
        columns={columns}
        dataSource={userActivityData}
        rowKey={(record) => record.id}
        bordered
        pagination={false}
      />
    </div>
  );
}



// import React from "react";
// import CrmMenuLayout from "@/Layouts/CrmMenuLayout.jsx";
//
// export default function UserActivityReport({ userActivityData }) {
//   return (
//     <>
//       <div className="p-4">
//         <h1 className="text-2xl font-bold mb-4">Активність користувачів</h1>
//         <table className="w-full border-collapse border border-gray-300">
//           <thead>
//           <tr>
//             <th className="border border-gray-300 px-4 py-2">Ім'я</th>
//             <th className="border border-gray-300 px-4 py-2">Електронна пошта</th>
//             <th className="border border-gray-300 px-4 py-2">Кількість замовлень</th>
//           </tr>
//           </thead>
//           <tbody>
//           {userActivityData.map((user) => (
//             <tr key={user.id}>
//               <td className="border border-gray-300 px-4 py-2">{user.name}</td>
//               <td className="border border-gray-300 px-4 py-2">{user.email}</td>
//               <td className="border border-gray-300 px-4 py-2">{user.orders_count}</td>
//             </tr>
//           ))}
//           </tbody>
//         </table>
//       </div>
//     </>
//   );
// }
