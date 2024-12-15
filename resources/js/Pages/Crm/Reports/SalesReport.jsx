import React from "react";
import { Link } from "@inertiajs/react";
import CrmMenuLayout from "@/Layouts/CrmMenuLayout.jsx";

export default function SalesReport({ salesData }) {
  return (
    <>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Звіти про продажі</h1>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">ID</th>
            <th className="border border-gray-300 px-4 py-2">Назва продукту</th>
            <th className="border border-gray-300 px-4 py-2">Ціна</th>
            <th className="border border-gray-300 px-4 py-2">Всього продано</th>
            <th className="border border-gray-300 px-4 py-2">Всього замовлень</th>
            <th className="border border-gray-300 px-4 py-2">Дії</th>
          </tr>
          </thead>
          <tbody>
          {salesData.map((product) => (
            <tr key={product.id}>
              <td className="border border-gray-300 px-4 py-2">{product.id}</td>
              <td className="border border-gray-300 px-4 py-2">{product.product_name}</td>
              <td className="border border-gray-300 px-4 py-2">${product.price}</td>
              <td className="border border-gray-300 px-4 py-2">{product.total_quantity}</td>
              <td className="border border-gray-300 px-4 py-2">{product.total_orders}</td>
              <td className="border border-gray-300 px-4 py-2">
                <Link
                  href={route("reports.statistics", { id: product.id })}
                  className="text-blue-500 hover:underline"
                >
                  Переглянути статистику замовлень
                </Link>
              </td>
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
// import { Link } from "@inertiajs/react";
// import CrmMenuLayout from "@/Pages/Crm/CrmMenuLayout.jsx";
//
// export default function SalesReport({ salesData }) {
//   return (
//     <div>
//       <h1>Sales Report</h1>
//       <table>
//         <thead>
//         <tr>
//           <th>ID.</th>
//           <th>Product Name.</th>
//           <th>Price.</th>
//           <th>Total Sold.</th>
//           <th>Total Orders.</th>
//           <th>Action.</th>
//         </tr>
//         </thead>
//         <tbody>
//         {salesData.map((product) => (
//           <tr key={product.id}>
//             <td>{product.id}</td>
//             <td>{product.product_name}</td>
//             <td>${product.price}</td>
//             <td>{product.total_quantity}</td>
//             <td>{product.total_orders}</td>
//             <td>
//               <Link href={route('reports.statistics', { id: product.id })}>
//                 View Order Statistics
//               </Link>
//             </td>
//           </tr>
//         ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }
