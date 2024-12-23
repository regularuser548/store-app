import React, {useState} from "react";
import { useForm } from "@inertiajs/react";
import {Form, Input, Button, Typography, List, message, Checkbox} from "antd";

const { Title, Paragraph } = Typography;

export default function Checkout({ cartItems, userData, total: initialTotal}) {
  const [total, setTotal] = useState(initialTotal);
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


    <div className="min-h-screen bg-[#0F0F0F] text-white p-6">
      <p className="container mx-auto flex flex-wrap lg:flex-nowrap gap-28 text-2xl font-bold mb-4">Оформлення
        замовлення</p>
      <div className="container mx-auto flex flex-wrap lg:flex-nowrap gap-28 justify-between ">
        {/* Левая колонка */}
        <div className="w-full lg:w-1/4 space-y-6 ">
          {/* Оформлення замовлення */}
          <div className="">
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
              <Form.Item label="Номер телефону" validateStatus={errors.phone_number && "error"}
                         help={errors.phone_number}>
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
        <div className="w-full lg:w-1/3 space-y-6 ">
          {/* Разом */}
          <div className="bg-[#272525]  p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-4 text-center">Разом</h2>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span>1 товар на суму</span>
                <span className="font-bold">{total.toFixed(2)} ₴</span>
              </div>
              <div className="flex justify-between">
                <span>Вартість доставки</span>
                <span className="font-bold">119 ₴</span>
              </div>
              <hr className="border-gray-700"/>
              <div className="flex justify-between text-lg font-bold">
                <span>До сплати:</span>
                <span>${119 + parseFloat(total.toFixed(2))} ₴</span>
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
            <div className="bg-[#0F0F0F] p-6 rounded-lg">
              <h2 className="text-lg font-bold ">Замовлення</h2>
              <h2 className="text-lg  mb-4 inline">Продавець: <h1
                className="inline  text-lg m-0">ShopHub</h1></h2>

              <div className="flex items-center space-x-4">
                {cartItems.length > 0 ? (
                  <List
                    className="w-full"
                    dataSource={cartItems}
                    renderItem={(item) => (
                      <List.Item className="">
                        <div
                          className="flex flex-col sm:flex-row items-center justify-between bg-[#0F0F0F] text-white p-4 rounded-lg w-full border">
                          <div className="flex-shrink-0 mb-2 sm:mb-0">
                            <svg width="118" height="112" viewBox="0 0 118 112" fill="none"
                                 xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                              <rect width="118" height="112" fill="url(#pattern0_528_410)"/>
                              <rect x="0.5" y="0.5" width="117" height="111" stroke="white" strokeOpacity="0.28"/>
                              <defs>
                                <pattern id="pattern0_528_410" patternContentUnits="objectBoundingBox" width="1"
                                         height="1">
                                  <use xlinkHref="#image0_528_410"
                                       transform="matrix(0.00469982 0 0 0.00490196 -0.163736 0)"/>
                                </pattern>
                                <image id="image0_528_410" width="300" height="204"
                                       xlinkHref="data:image/jpeg;base64,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"/>
                              </defs>
                            </svg>
                          </div>
                          <div className="flex-grow text-center sm:text-left sm:ml-4">
                            <h3 className="text-lg font-medium">{item.name}</h3>
                          </div>
                          <div className="text-right flex  sm:text-left w-full sm:w-auto">ё
                            <p className="text-lg pr-20 font-medium">{item.quantity}</p>
                            <p className="text-lg font-bold text-white">{item.price} ₴</p>
                          </div>
                        </div>
                      </List.Item>
                    )}
                  />
                ) : (
                  <Paragraph>Ваш кошик порожній</Paragraph>
                )}
              </div>
            </div>


            {/* Доставка */}
            <div className="bg-[#0F0F0F] border p-4 md:p-6 mr-3 ms-3 md:mr-6 md:ms-5 rounded-lg">
              <h2 className="text-lg font-bold mb-4">Доставка</h2>
              <div className="flex flex-col md:flex-row md:justify-between items-start md:items-center gap-4">
                <span className="text-sm md:text-base">Самовивіз з Нової Пошти</span>
                <Button className="bg-gray-800 text-white hover:bg-gray-700 w-full md:w-auto text-sm md:text-base">
                  Вибрати відділення
                </Button>
                <span className="font-bold text-sm md:text-base">119 ₴</span>
              </div>
            </div>
          </div>

          {/* Правая колонка */}
          <div className="w-full lg:w-1/3 flex items-end  space-y-6 ">
            {/* Нотатки */}
            <div className="bg-[#0F0F0F]    p-6 rounded-lg">
              <h2 className="text-lg font-bold mb-4">Нотатки</h2>
              <div className="w-96 h-52">
                <Input.TextArea size="large"
                                style={{width: 200, height: 205}}
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
