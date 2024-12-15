import React from "react";
import { Head, usePage } from "@inertiajs/react";
import { Button, List, message } from "antd";

export default function Favorites() {
  const { props } = usePage();
  const favorites = props.favorites;

  const removeFromFavorites = async (productId) => {
    try {
      const response = await axios.delete(`/favorites/${productId}`);
      message.success(response.data.message);
      location.reload(); // Перезагружаем страницу для обновления данных
    } catch (error) {
      console.error("Failed to remove product from favorites:", error);
      message.error("Failed to remove from favorites.");
    }
  };

  return (
    <div>
      <Head title="Your Favorites" />
      <h1>Your Favorites</h1>
      <List
        dataSource={favorites}
        renderItem={(item) => (
          <List.Item
            actions={[
              <Button
                type="danger"
                onClick={() => removeFromFavorites(item.product_id)}
              >
                Remove
              </Button>,
            ]}
          >
            {item.product.name} - ${item.product.price}
          </List.Item>
        )}
      />
    </div>
  );
}
