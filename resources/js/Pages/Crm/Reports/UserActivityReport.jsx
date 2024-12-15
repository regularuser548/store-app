import React from "react";
import CrmMenuLayout from "@/Layouts/CrmMenuLayout.jsx";

export default function UserActivityReport({ userActivityData }) {
  return (
    <>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Активність користувачів</h1>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">Ім'я</th>
            <th className="border border-gray-300 px-4 py-2">Електронна пошта</th>
            <th className="border border-gray-300 px-4 py-2">Кількість замовлень</th>
          </tr>
          </thead>
          <tbody>
          {userActivityData.map((user) => (
            <tr key={user.id}>
              <td className="border border-gray-300 px-4 py-2">{user.name}</td>
              <td className="border border-gray-300 px-4 py-2">{user.email}</td>
              <td className="border border-gray-300 px-4 py-2">{user.orders_count}</td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>
    </>
  );
}


// Прошлый код если фронтендер захочет другой дизайн

// import React from "react";
//
// export default function UserActivityReport({ userActivityData }) {
//   return (
//     <div>
//       <h1>Активність користувачів</h1>
//       <table>
//         <thead>
//         <tr>
//           <th>Ім'я</th>
//           <th>Email</th>
//           <th>Кількість замовлень</th>
//         </tr>
//         </thead>
//         <tbody>
//         {userActivityData.map((user) => (
//           <tr key={user.id}>
//             <td>{user.name}</td>
//             <td>{user.email}</td>
//             <td>{user.orders_count}</td>
//           </tr>
//         ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

