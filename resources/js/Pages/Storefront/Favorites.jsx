import React, { useState } from "react";
import { Head, usePage } from "@inertiajs/react";
import {Button, List, Empty, Select, message, Flex} from "antd";
import ProfileLayout from "@/Layouts/ProfileLayout.jsx";
import Product from "../../Components/ShopHub/Product.jsx";

const { Option } = Select;

export default function Favorites() {
  const { props } = usePage();
  const favorites = props.favorites || [];
  const images = props.images || {};
  const [filter, setFilter] = useState("date_added");

  // const removeFromFavorites = async (productId) => {
  //   try {
  //     const response = await axios.delete(`/favorites/${productId}`);
  //     message.success(response.data.message);
  //     location.reload();
  //   } catch (error) {
  //     console.error("Failed to remove product from favorites:", error);
  //     message.error("Failed to remove from favorites.");
  //   }
  // };
  const toggleFavorite = async (productId) => {
    try {
      const response = await axios.post(`/favorites/toggle/${productId}`);
      message.success(response.data.message);
      location.reload();
    } catch (error) {
      console.error("Failed to toggle favorite status:", error);
      message.error("Не удалось изменить статус избранного.");
    }
  };


  const handleBuyAll = () => {
    message.success("Всі товари додані в корзину!");
    // Логика добавления всех товаров в корзину
  };

  const handleFilterChange = (value) => {
    setFilter(value);
    // Реализация фильтрации товаров (пока просто обновляем состояние)
  };

  return (
    <ProfileLayout>
      <div className="favorites-page">
        <Head title="Список вподобань" />

        <div className="header">
          <h1 className="text-2xl font-bold">Список вподобань</h1>
          <div className="actions flex justify-between items-center mt-4">
            <span className="text-lg">
              Кількість товарів довподоби: {favorites.length || 0}
            </span>
            <div className="flex items-center space-x-4">
              <Button type="primary" onClick={handleBuyAll}>
                Купити все
              </Button>
              <Select
                value={filter}
                onChange={handleFilterChange}
                style={{ width: 200 }}
              >
                <Option value="date_added">За датою додавання</Option>
                <Option value="price_low_to_high">Ціна: від низької до високої</Option>
                <Option value="price_high_to_low">Ціна: від високої до низької</Option>
              </Select>
            </div>
          </div>
        </div>

        {/*{favorites.length > 0 ? (*/}
        {/*  <div className="product-list grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 lg:grid-cols-2 gap-8 mt-6">*/}
        {/*    {favorites.map((product) => (*/}
        {/*      <Product*/}
        {/*        key={product.id}*/}
        {/*        item={product}*/}
        {/*        image={images[product.id]}*/}
        {/*        isCrm={false}*/}
        {/*      />*/}
        {/*    ))}*/}
        {/*  </div>*/}
        {/*) : (*/}
        {/*  <div className="empty-state flex justify-center items-center mt-10">*/}
        {/*    <Empty*/}
        {/*      image={Empty.PRESENTED_IMAGE_SIMPLE}*/}
        {/*      description="Немає товарів"*/}
        {/*    />*/}
        {/*  </div>*/}
        {/*)}*/}
        {favorites.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 lg:grid-cols-2 gap-20">
            {favorites.map((product) => (
              <Product key={product.id} item={product} image={product.thumbnail_url} isLiked={product.is_liked} isCrm={false}></Product>
            ))}
          </div>
        ) : (
          <Flex justify='center' align='center'>
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={'Немає товарів'}></Empty>
          </Flex>

        )}
      </div>
    </ProfileLayout>
  );
}





// import React from "react";
// import { Head, usePage } from "@inertiajs/react";
// import { Button, List, message } from "antd";
// import ProfileLayout from "@/Layouts/ProfileLayout.jsx";
//
// export default function Favorites() {
//   const { props } = usePage();
//   const favorites = props.favorites;
//
//   const removeFromFavorites = async (productId) => {
//     try {
//       const response = await axios.delete(`/favorites/${productId}`);
//       message.success(response.data.message);
//       location.reload(); // Перезагружаем страницу для обновления данных
//     } catch (error) {
//       console.error("Failed to remove product from favorites:", error);
//       message.error("Failed to remove from favorites.");
//     }
//   };
//
//   return (
//     <ProfileLayout>
//     <div>
//       <Head title="Your Favorites" />
//       <h1>Your Favorites</h1>
//       <List
//         dataSource={favorites}
//         renderItem={(item) => (
//           <List.Item
//             actions={[
//               <Button
//                 type="danger"
//                 onClick={() => removeFromFavorites(item.product_id)}
//               >
//                 Remove
//               </Button>,
//             ]}
//           >
//             {item.product.name} - ${item.product.price}
//           </List.Item>
//         )}
//       />
//     </div>
//       </ProfileLayout>
//   );
// }
