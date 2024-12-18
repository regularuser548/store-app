import React, {useState} from "react";
import { useForm } from "@inertiajs/react";
import {Form, Input, Button, Typography, List, message, Checkbox} from "antd";

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
    if (!isConfirmed) {
      message.error("Підтвердіть умови перед оформленням замовлення!");
      return;
    }
    post(route("checkout.store"));

  };
  const [isConfirmed, setIsConfirmed] = useState(false);


  return (
    // <div style={{maxWidth: "600px", margin: "0 auto"}}>
    //   <Title level={2}>Оформлення замовлення</Title>
    //   <Form layout="vertical" onFinish={handleSubmit}>
    //     <Form.Item label="Ім'я" validateStatus={errors.name && "error"} help={errors.name}>
    //       <Input
    //         type="text"
    //         name="name"
    //         value={data.name}
    //         onChange={handleChange}
    //         placeholder="Введіть своє ім'я"
    //       />
    //     </Form.Item>
    //     <Form.Item label="Прізвище" validateStatus={errors.surname && "error"} help={errors.surname}>
    //       <Input
    //         type="text"
    //         name="surname"
    //         value={data.surname}
    //         onChange={handleChange}
    //         placeholder="Введіть своє прізвище"
    //       />
    //     </Form.Item>
    //     <Form.Item label="Електронна пошта" validateStatus={errors.email && "error"} help={errors.email}>
    //       <Input
    //         type="email"
    //         name="email"
    //         value={data.email}
    //         onChange={handleChange}
    //         placeholder="Введіть адресу електронної пошти"
    //       />
    //     </Form.Item>
    //     <Form.Item label="Номер телефону" validateStatus={errors.phone_number && "error"} help={errors.phone_number}>
    //       <Input
    //         type="tel"
    //         name="phone_number"
    //         value={data.phone_number}
    //         onChange={handleChange}
    //         placeholder="Введіть свій номер телефону"
    //       />
    //     </Form.Item>
    //     <Form.Item label="Примітки">
    //       <Input.TextArea
    //         name="notes"
    //         value={data.notes}
    //         onChange={handleChange}
    //         placeholder="Додаткові примітки до вашого замовлення"
    //       />
    //     </Form.Item>
    //     <Title level={4}>Товари в кошику</Title>
    //     {cartItems.length > 0 ? (
    //       <List
    //         dataSource={cartItems}
    //         renderItem={(item) => (
    //           <List.Item>
    //             {item.name} - {item.quantity} x ${item.price}
    //           </List.Item>
    //         )}
    //       />
    //     ) : (
    //       <Paragraph>Ваш кошик порожній</Paragraph>
    //     )}
    //     <Form.Item>
    //       <Button type="primary" htmlType="submit" loading={processing}>
    //         Зробити замовлення
    //       </Button>
    //     </Form.Item>
    //   </Form>
    // </div>


  <div className="min-h-screen bg-black text-white p-6">
    <div className="container mx-auto flex flex-wrap lg:flex-nowrap gap-28 justify-around ">
      {/* Левая колонка */}
      <div className="w-full lg:w-1/4 space-y-6 ">
        {/* Оформлення замовлення */}
        <h1 className="text-2xl font-bold mb-4">Оформлення замовлення</h1>
        <div className=" flex flex-wrap lg:flex-nowrap justify-around">
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
          </Form>
        </div>
      </div>

      {/* Правая колонка */}
      <div className="w-full lg:w-1/3 space-y-6">
        {/* Разом */}
        <div className="bg-gray-900 p-6 rounded-lg">
          <h2 className="text-xl font-bold mb-4 text-center">Разом</h2>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span>1 товар на суму</span>
              <span className="font-bold">2 000 ₴</span>
            </div>
            <div className="flex justify-between">
              <span>Вартість доставки</span>
              <span className="font-bold">119 ₴</span>
            </div>
            <hr className="border-gray-700"/>
            <div className="flex justify-between text-lg font-bold">
              <span>До сплати:</span>
              <span>2 199 ₴</span>
            </div>
          </div>

          <Checkbox
            className="text-gray-300 mt-6"
            onChange={(e) => setIsConfirmed(e.target.checked)}
          >
            Підтверджую{" "}
            <a href="#" className="text-blue-400 underline">
              умови користувача
            </a>{" "}
            та{" "}
            <a href="#" className="text-blue-400 underline">
              захист персональних даних
            </a>
          </Checkbox>

          <Button
            type="primary"
            block
            className="bg-orange-500 text-black font-semibold mt-6 hover:bg-orange-600"
            onClick={handleSubmit}
          >
            Замовлення підтверджую
          </Button>
        </div>
      </div>
    </div>
    <div className="container mx-auto space-y-8">
      {/* H1 заголовок */}
      <h1 className="text-2xl font-bold">Оплата під час отримання товару</h1>

      <div className="flex flex-wrap lg:flex-nowrap gap-8">
        {/* Левая колонка */}
        <div className="w-full lg:w-2/3 space-y-6">
          {/* Замовлення */}
          <div className="bg-gray-900 p-6 rounded-lg">
            <h2 className="text-lg font-bold mb-4">Замовлення</h2>
            <div className="flex items-center space-x-4">
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
            </div>
          </div>

          {/* Доставка */}
          <div className="bg-gray-900 p-6 rounded-lg">
            <h2 className="text-lg font-bold mb-4">Доставка</h2>
            <div className="flex justify-between items-center">
              <span>Самовивіз з Нової Пошти</span>
              <Button className="bg-gray-800 text-white hover:bg-gray-700">
                Вибрати відділення
              </Button>
              <span className="font-bold">119 ₴</span>
            </div>
          </div>
        </div>

        {/* Правая колонка */}
        <div className="w-full lg:w-1/3 space-y-6">
          {/* Нотатки */}
          <div className="bg-gray-900 p-6 rounded-lg">
            <h2 className="text-lg font-bold mb-4">Нотатки</h2>
            <Input.TextArea
              name="notes"
              value={data.notes}
              onChange={handleChange}
              placeholder="Додаткові примітки до вашого замовлення"
            />
          </div>
        </div>
      </div>
    </div>
  </div>


)
  ;
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
