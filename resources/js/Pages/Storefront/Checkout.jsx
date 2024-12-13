import React from "react";
import { useForm } from "@inertiajs/react";
import { Form, Input, Button, Typography, List } from "antd";

const { Title, Paragraph } = Typography;

export default function Checkout({ cartItems, userData }) {
  const { data, setData, post, processing, errors } = useForm({
    name: userData.name || "",
    surname: userData.surname || "",
    email: userData.email || "",
    phone_number: userData.phone_number || "",
    notes: "",
    items: cartItems,
  });

  const handleChange = (e) => setData(e.target.name, e.target.value);

  const handleSubmit = () => {
    post(route("checkout.store"));
  };

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto" }}>
      <Title level={2}>Оформлення замовлення</Title>
      <Form layout="vertical" onFinish={handleSubmit}>
        <Form.Item label="Ім'я" validateStatus={errors.name && "error"} help={errors.name}>
          <Input
            type="text"
            name="name"
            value={data.name}
            onChange={handleChange}
            placeholder="Введіть своє ім'я"
          />
        </Form.Item>
        <Form.Item label="Прізвище" validateStatus={errors.surname && "error"} help={errors.surname}>
          <Input
            type="text"
            name="surname"
            value={data.surname}
            onChange={handleChange}
            placeholder="Введіть своє прізвище"
          />
        </Form.Item>
        <Form.Item label="Електронна пошта" validateStatus={errors.email && "error"} help={errors.email}>
          <Input
            type="email"
            name="email"
            value={data.email}
            onChange={handleChange}
            placeholder="Введіть адресу електронної пошти"
          />
        </Form.Item>
        <Form.Item label="Номер телефону" validateStatus={errors.phone_number && "error"} help={errors.phone_number}>
          <Input
            type="tel"
            name="phone_number"
            value={data.phone_number}
            onChange={handleChange}
            placeholder="Введіть свій номер телефону"
          />
        </Form.Item>
        <Form.Item label="Примітки">
          <Input.TextArea
            name="notes"
            value={data.notes}
            onChange={handleChange}
            placeholder="Додаткові примітки до вашого замовлення"
          />
        </Form.Item>
        <Title level={4}>Товари в кошику</Title>
        {cartItems.length > 0 ? (
          <List
            dataSource={cartItems}
            renderItem={(item) => (
              <List.Item>
                {item.name} - {item.quantity} x ${item.price}
              </List.Item>
            )}
          />
        ) : (
          <Paragraph>Ваш кошик порожній</Paragraph>
        )}
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={processing}>
            Зробити замовлення
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}







// import React, { useEffect } from "react";
// import { useForm } from "@inertiajs/react";
//
// export default function Checkout({ cartItems, userData }) {
//   const { data, setData, post, processing, errors } = useForm({
//     name: userData.name || "",
//     email: userData.email || "",
//     notes: "",
//     items: cartItems,
//   });
//
//   const handleChange = (e) => setData(e.target.name, e.target.value);
//
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     post(route("checkout.store"));
//   };
//
//   return (
//     <div>
//       <h1>Placing an order</h1>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>Name:</label>
//           <input
//             type="text"
//             name="name"
//             value={data.name}
//             onChange={handleChange}
//           />
//           {errors.name && <div>{errors.name}</div>}
//         </div>
//
//         <div>
//           <label>Email:</label>
//           <input
//             type="email"
//             name="email"
//             value={data.email}
//             onChange={handleChange}
//           />
//           {errors.email && <div>{errors.email}</div>}
//         </div>
//
//         <div>
//           <label>Note:</label>
//           <textarea
//             name="notes"
//             value={data.notes}
//             onChange={handleChange}
//           />
//         </div>
//
//         <h2>Items in cart</h2>
//         {cartItems.length > 0 ? (
//           <ul>
//             {cartItems.map((item) => (
//               <li key={item.id}>
//                 {item.name} - {item.quantity} x ${item.price}
//               </li>
//             ))}
//           </ul>
//         ) : (
//           <p>Cart is empty</p>
//         )}
//
//         <button type="submit" disabled={processing}>
//           Make order
//         </button>
//       </form>
//     </div>
//   );
// }
