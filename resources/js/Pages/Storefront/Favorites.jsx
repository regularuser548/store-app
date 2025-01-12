import React, { useState } from "react";
import { Head, usePage } from "@inertiajs/react";
import { Button, List, Empty, Select, message, Space } from "antd";
import ProfileLayout from "@/Layouts/ProfileLayout.jsx";
import Product from "../../Components/ShopHub/Product.jsx";
import axios from "axios";

const { Option } = Select;

export default function Favorites() {
  const { props } = usePage();
  const favorites = props.favorites || [];
  const images = props.images || {};
  const [filter, setFilter] = useState("date_added");
  const [filteredFavorites, setFilteredFavorites] = useState([...favorites]);

  // Добавить все товары в корзину
  const handleBuyAll = async () => {
    try {
      const productIds = favorites.map((product) => product.id); // Получаем все id избранных товаров
      const response = await axios.post("/cart/add-multiple", { productIds });
      if (response.data.success) {
        message.success(response.data.message || "Всі товари додані в корзину!");
      } else {
        message.error(response.data.message || "Не вдалося додати товари в корзину.");
      }
    } catch (error) {
      console.error("Failed to add all products to cart:", error);
      message.error("Не вдалося додати товари в корзину.");
    }
  };


  // Сортировка товаров
  const handleFilterChange = (value) => {
    setFilter(value);

    let sortedFavorites = [...favorites];
    switch (value) {
      case "price_low_to_high":
        sortedFavorites.sort((a, b) => a.price - b.price);
        break;
      case "price_high_to_low":
        sortedFavorites.sort((a, b) => b.price - a.price);
        break;
      case "date_added":
      default:
        // Assuming `date_added` is a valid property
        sortedFavorites.sort((a, b) => new Date(b.date_added) - new Date(a.date_added));
        break;
    }

    setFilteredFavorites(sortedFavorites);
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
            <Space>
              <Button type="primary" onClick={handleBuyAll}>
                Купити все
              </Button>
              <Select
                value={filter}
                onChange={handleFilterChange}
                style={{ width: 200 }}
              >
                <Option value="date_added">За датою додавання</Option>
                <Option value="price_low_to_high">
                  Ціна: від низької до високої
                </Option>
                <Option value="price_high_to_low">
                  Ціна: від високої до низької
                </Option>
              </Select>
            </Space>
          </div>
        </div>

        {filteredFavorites.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 lg:grid-cols-2 gap-20">
            {filteredFavorites.map((product) => (
              <Product
                key={product.id}
                item={product}
                image={product.thumbnail_url}
                isLiked={product.is_liked}
                isInCart={product.is_in_cart}
                isCrm={false}
              />
            ))}
          </div>
        ) : (
          <div className="flex justify-center items-center mt-10">
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description={"Немає товарів"}
            />
          </div>
        )}
      </div>
    </ProfileLayout>
  );
}
