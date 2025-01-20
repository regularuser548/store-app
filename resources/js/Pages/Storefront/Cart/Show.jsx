import React, {useState, useRef, useCallback} from "react";
import {Button, Empty, message, Space} from 'antd';
import {Head, Link, router} from "@inertiajs/react";
import CartList from "./CartList";
import axios from "axios";
import StoreFrontLayout from "@/Layouts/StoreFrontLayout.jsx";
import ProfileLayout from "@/Layouts/ProfileLayout.jsx";
import Checkout from "@/Pages/Storefront/Checkout.jsx";


export default function Show({cart: initialCart, total: initialTotal}) {
  const [cart, setCart] = useState(initialCart);
  const [messageApi, contextHolder] = message.useMessage();
  const [total, setTotal] = useState(initialTotal);
  const [selectedItems, setSelectedItems] = useState([]);
  const debounceTimer = useRef({});

  const updateTotal = (cartItems) => {
    const newTotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    setTotal(newTotal);
  };

  const sendUpdateRequest = useCallback((id, quantity, oldCart) => {
    axios
      .post(route("cart.update.quantity"), {product_id: id, quantity})
      .then((response) => console.log("Updated:", response.data))
      .catch((error) => {
        setCart(oldCart)

        messageApi.open({
          type: 'error',
          content: `${error.response?.data.error}`,
        });
      });
  }, []);

  // const handleQuantityChange = (id, quantity) => {
  //   const updatedCart = cart.map((item) =>
  //     item.id === id ? { ...item, quantity } : item
  //   );
  //
  //   setCart(updatedCart);
  //   updateTotal(updatedCart);
  //
  //   clearTimeout(debounceTimer.current[id]);
  //   debounceTimer.current[id] = setTimeout(() => {
  //     sendUpdateRequest(id, quantity);
  //   }, 300);
  // };


  const handleQuantityChange = (id, newQuantity) => {
    const product = cart.find((item) => item.id === id);
    const oldCart = cart;
    if (!product) {
      console.error(`Product with ID ${id} not found in the cart.`);
      return; // Если товар не найден, ничего не делаем
    }
    const updatedCart = cart.map((item) =>
      item.id === id ? {...item, quantity: newQuantity} : item
    );

    setCart(updatedCart);
    updateTotal(updatedCart);

    clearTimeout(debounceTimer.current[id]);
    debounceTimer.current[id] = setTimeout(() => {
      sendUpdateRequest(id, newQuantity, oldCart);
    }, 300);
  };


  const handleRemoveItem = async (id) => {
    try {
      // Обновляем состояние на клиенте до выполнения запроса
      const updatedCart = cart.filter((item) => item.id !== id);
      setCart(updatedCart);
      updateTotal(updatedCart);

      // Отправляем запрос на удаление
      await axios.post(route("cart.remove", {id}));

      console.log(`Item with ID ${id} removed successfully`);
    } catch (error) {
      console.error("Remove Error:", error.response?.data || error);

      // Если запрос не прошел, возвращаем элемент обратно в корзину
      setCart((prevCart) => [...prevCart, cart.find((item) => item.id === id)]);
      updateTotal(cart); // Пересчитать общую сумму
    }
  };

  const toggleSelectItem = (id) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
    );
  };

  const handleRemoveSelected = async () => {
    try {
      // Удаляем выбранные элементы по одному
      const itemsToRemove = [...selectedItems];
      const updatedCart = cart.filter((item) => !itemsToRemove.includes(item.id));

      // Обновляем локальное состояние до запроса
      setCart(updatedCart);
      updateTotal(updatedCart);
      setSelectedItems([]); // Сбрасываем выбранные элементы

      // Отправляем запросы на удаление
      await Promise.all(
        itemsToRemove.map((id) =>
          axios.post(route("cart.remove", {id}))
        )
      );

      console.log("Selected items removed successfully");
    } catch (error) {
      console.error("Remove Selected Error:", error.response?.data || error);

      // Если запросы не прошли, возвращаем корзину к исходному состоянию
      setCart(initialCart);
      updateTotal(initialCart);
    }
  };

  return (
    <ProfileLayout>


      <main className="bg-[#0f0f0f] min-h-screen">
        <div className="text-white">
          {contextHolder}
          <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-8">
            <div className="flex flex-wrap items-center justify-between mb-8">
              <h1 className="text-3xl font-bold">Кошик</h1>
              <div className="flex items-center space-x-4 mt-4 sm:mt-0">
                {/*<button*/}
                {/*  onClick={handleRemoveSelected}*/}
                {/*  className="flex items-center text-red-500 hover:text-red-700"*/}
                {/*>*/}
                {/*  <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">*/}
                {/*    <path fill-rule="evenodd" clip-rule="evenodd"*/}
                {/*          d="M24.1061 15.8062C24.9899 14.9085 25.4809 13.6964 25.4711 12.4366C25.4612 11.1768 24.9514 9.97258 24.0536 9.08875C23.6091 8.65112 23.0827 8.30533 22.5046 8.07112C21.9264 7.83692 21.3078 7.71888 20.684 7.72376C19.4242 7.7336 18.2199 8.24349 17.3361 9.14125C17.0961 9.38125 16.7911 9.67583 16.4211 10.025L15.3924 10.9937L14.3636 10.025C13.9928 9.675 13.6874 9.38041 13.4474 9.14125C12.5566 8.25045 11.3484 7.75001 10.0886 7.75001C8.82883 7.75001 7.62065 8.25045 6.72986 9.14125C4.89486 10.9775 4.87361 13.9462 6.66236 15.7912L15.3924 24.5212L24.1061 15.8062ZM5.66861 8.08125C6.24899 7.50071 6.93806 7.04019 7.69645 6.72599C8.45485 6.4118 9.26771 6.25008 10.0886 6.25008C10.9095 6.25008 11.7224 6.4118 12.4808 6.72599C13.2392 7.04019 13.9282 7.50071 14.5086 8.08125C14.7361 8.30958 15.0307 8.59375 15.3924 8.93375C15.7524 8.59375 16.0469 8.30916 16.2761 8.08C17.4392 6.89896 19.0239 6.22834 20.6815 6.21568C22.3391 6.20302 23.9338 6.84936 25.1149 8.0125C26.2959 9.17564 26.9665 10.7603 26.9792 12.4179C26.9918 14.0755 26.3455 15.6702 25.1824 16.8512L16.2761 25.7587C16.0417 25.9931 15.7238 26.1247 15.3924 26.1247C15.0609 26.1247 14.743 25.9931 14.5086 25.7587L5.59986 16.85C4.45741 15.6717 3.82424 14.0914 3.83711 12.4503C3.84997 10.8092 4.50783 9.23894 5.66861 8.07875V8.08125Z"*/}
                {/*          fill="#FF8000"/>*/}
                {/*  </svg>*/}
                {/*</button>*/}
                <button
                  onClick={handleRemoveSelected}
                  className="flex items-center text-red-500 hover:text-red-700"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_251_505)">
                      <path
                        d="M3 7.5V22.5C3 23.325 3.675 24 4.5 24H18C18.825 24 19.5 23.325 19.5 22.5V7.5H3ZM7.5 21H6V10.5H7.5V21ZM10.5 21H9V10.5H10.5V21ZM13.5 21H12V10.5H13.5V21ZM16.5 21H15V10.5H16.5V21ZM19.875 3H15V1.125C14.9988 0.826996 14.8799 0.541536 14.6692 0.330814C14.4585 0.120092 14.173 0.00118492 13.875 0L8.625 0C8.327 0.00118492 8.04154 0.120092 7.83081 0.330814C7.62009 0.541536 7.50118 0.826996 7.5 1.125V3H2.625C2.32663 3 2.04048 3.11853 1.8295 3.3295C1.61853 3.54048 1.5 3.82663 1.5 4.125V6H21V4.125C21 3.82663 20.8815 3.54048 20.6705 3.3295C20.4595 3.11853 20.1734 3 19.875 3ZM13.5 3H9V1.5195H13.5V3Z"
                        fill="white"
                      />
                    </g>
                  </svg>
                </button>
              </div>
            </div>

            {cart.length > 0 ? (
              <>
                <div className="space-y-4 ">
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className="flex flex-col md:flex-row sm:flex-row items-center justify-between bg-[background: #0F0F0F;
                          ] p-4 rounded-lg shadow-md space-y-4 md:space-y-0 border-[border: 1.5px solid #FFFFFF] border"
                    >
                      <div
                        className="flex lg:items-center md:items-center sm:items-center min-[320px]:items-center  gap-1 flex-1   sm:flex-row   sm:flex-wrap ">
                        <input
                          type="checkbox"
                          className="w-5 h-5 text-orange-500 rounded "
                          checked={selectedItems.includes(item.id)}
                          onChange={() => toggleSelectItem(item.id)}
                        />
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-24 h-24 object-contain rounded-lg"
                        />
                        <div className="text-center md:text-left ">
                          <h2 className="text-lg font-semibold truncate max-w-xs" title={item.name}>
                            {item.name}
                          </h2>
                          <p className="text-sm  text-gray-400 ">
                            Продавець: {item?.seller}
                          </p>
                          <div className="mt-2 flex items-center justify-center md:justify-start gap-2">
                      <span className="text-orange-400 font-semibold ">
                        {parseFloat(item.price)?.toFixed(2)} ₴
                      </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-1  ">
                        <div className="flex items-center space-x-2 ">
                          <button
                            onClick={() =>
                              handleQuantityChange(item.id, Math.max(1, item.quantity - 1))
                            }
                            className="px-2 py-1 bg-gray-700 text-white rounded hover:bg-gray-600"
                          >
                            -
                          </button>
                          <span className="px-4 py-1 bg-gray-900 rounded">
                      {item.quantity}
                    </span>
                          <button
                            onClick={() =>
                              handleQuantityChange(item.id, item.quantity + 1)
                            }
                            className="px-2 py-1 bg-gray-700 text-white rounded hover:bg-gray-600"
                          >
                            +
                          </button>
                        </div>
                        <button
                          onClick={() => handleRemoveItem(item.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g clipPath="url(#clip0_251_505)">
                              <path
                                d="M3 7.5V22.5C3 23.325 3.675 24 4.5 24H18C18.825 24 19.5 23.325 19.5 22.5V7.5H3ZM7.5 21H6V10.5H7.5V21ZM10.5 21H9V10.5H10.5V21ZM13.5 21H12V10.5H13.5V21ZM16.5 21H15V10.5H16.5V21ZM19.875 3H15V1.125C14.9988 0.826996 14.8799 0.541536 14.6692 0.330814C14.4585 0.120092 14.173 0.00118492 13.875 0L8.625 0C8.327 0.00118492 8.04154 0.120092 7.83081 0.330814C7.62009 0.541536 7.50118 0.826996 7.5 1.125V3H2.625C2.32663 3 2.04048 3.11853 1.8295 3.3295C1.61853 3.54048 1.5 3.82663 1.5 4.125V6H21V4.125C21 3.82663 20.8815 3.54048 20.6705 3.3295C20.4595 3.11853 20.1734 3 19.875 3ZM13.5 3H9V1.5195H13.5V3Z"
                                fill="white"
                              />
                            </g>
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-8 flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
                  <button
                    onClick={() => router.visit(route('storefront.index'))}
                    className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600"
                  >
                    Продовжити покупки
                  </button>

                  <div className="flex flex-col md:flex-row items-center gap-4">
                    <h2 className="text-2xl font-bold text-center md:text-left">
                      Всього: <span className="text-orange-400">{total?.toFixed(2)} ₴</span>
                    </h2>
                    <button
                      className="px-6 py-2 border border-[#FF8000] text-[#FF8000] font-bold rounded-lg hover:text-orange-600"
                      onClick={() => router.visit(route("checkout.index"))}
                    >
                      Оформити замовлення
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={'Ваш кошик порожній'}></Empty>
              // <p className="text-center">Ваш кошик порожній</p>
            )}
          </div>
        </div>
      </main>


    </ProfileLayout>
  );
}


// import React, { useState, useRef, useCallback } from "react";
// import { Head, Link } from "@inertiajs/react";
// import CartList from "./CartList";
// import axios from "axios";
//
// export default function Show({ cart: initialCart, total: initialTotal }) {
//     const [cart, setCart] = useState(initialCart);
//     const [total, setTotal] = useState(initialTotal);
//     const debounceTimer = useRef({});
//
//     const updateTotal = (cartItems) => {
//         const newTotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
//         setTotal(newTotal);
//     };
//
//     const sendUpdateRequest = useCallback((id, quantity) => {
//         axios.post(route("cart.update.quantity"), { product_id: id, quantity })
//             .then(response => console.log('Updated:', response.data))
//             .catch(error => console.error('Update Error:', error.response?.data || error));
//     }, []);
//
//     const handleQuantityChange = (id, quantity) => {
//         const updatedCart = cart.map(item =>
//             item.id === id ? { ...item, quantity } : item
//         );
//
//         setCart(updatedCart);
//         updateTotal(updatedCart);
//
//         clearTimeout(debounceTimer.current[id]);
//         debounceTimer.current[id] = setTimeout(() => {
//             sendUpdateRequest(id, quantity);
//         }, 300);
//     };
//
//     const handleRemoveItem = (id) => {
//         axios.post(route("cart.remove", { id }))
//             .then(() => {
//                 const updatedCart = cart.filter(item => item.id !== id);
//                 setCart(updatedCart);
//                 updateTotal(updatedCart);
//             })
//             .catch(error => console.error('Remove Error:', error.response?.data || error));
//     };
//
//     return (
//         <div>
//             <Head title="Cart" />
//             <h1>Your Cart</h1>
//             <CartList
//                 cart={cart}
//                 onQuantityChange={handleQuantityChange}
//                 onRemove={handleRemoveItem}
//             />
//             <h2>Total: ${total.toFixed(2)}</h2>
//             <Link href={route("checkout.index")}>
//                 <button>Перейти к оформлению</button>
//             </Link>
//         </div>
//     );
// }
