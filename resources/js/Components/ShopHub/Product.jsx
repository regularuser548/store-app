import React, { useEffect, useState } from "react";
import { Button, message,ConfigProvider, App } from "antd";
import axios from "axios";
import { router } from "@inertiajs/react";
import FilledHeart from "@/Icons/FilledHeart.jsx";
import EmptyHeart from "@/Icons/EmptyHeart.jsx";
import EmptyCart from "@/Icons/EmptyCart.jsx";
import FilledCart from "@/Icons/FilledCart.jsx";

export default function Product({ item, image, isCrm = false,isLiked,isInCart}) {
  const [isFavorite, setIsFavorite] = useState(isLiked);
  const [loading, setLoading] = useState(false);
  const [checkIsInCart, setCheckIsInCart] = useState(isInCart);


  const handleAddToCart = async (productId) => {
    try {
      const response = await axios.post('/cart/add', { product: { id: productId } });
      if (response.data.success) {
        setCheckIsInCart(true)
      }
    } catch (error) {
      console.error("Failed to add to cart:", error);
    }
  };


  const toggleFavorite = async (productId) => {
    const previousState = isFavorite;
    setIsFavorite(!isFavorite);
    setLoading(true);

    try {
      const response = await axios.post(`/favorites/toggle/${productId}`);
      message.success(response.data.message || (isFavorite ? "Removed from favorites" : "Added to favorites"));
    } catch (error) {
      console.error("Failed to toggle favorite:", error);
      message.error("Failed to update favorite status.");
      setIsFavorite(previousState);
    } finally {
      setLoading(false);
    }
  };



  return (
    <article id={item.id} className="rounded-lg shadow-lg overflow-hidden">
      <div className="flex items-center justify-center h-80 bg-white">
        <img
          onClick={() => router.visit(route('storefront.show', { product: item.id }))}
          src={image || "path-to-placeholder-image"}
          alt=""
          className="h-full w-full object-contain"
        />
      </div>

      <div className="bg-[#1e1e1e] text-white p-2">
        <h3
          onClick={() => router.visit(route('storefront.show', { product: item.id }))}
          className="font-semibold text-center text-sm sm:text-base lg:text-lg mb-1 text-[#ffffff] hover:text-orange-500"
        >
          {item.name || "назва товару"}
        </h3>

        <div className="flex flex-row justify-between items-start w-full mt-4 space-x-4">
          <div className="w-1/3 grid grid-rows-2 text-left my-2 justify-start">
            <span className="text-lg font-bold text-[#FF6A00]">
              {item.price + " грн" || "666 грн"}
            </span>
          </div>

          <div className="w-1/2 flex flex-col items-end space-y-2">
            <div className="w-full md:w-auto flex justify-end">
              <button
                onClick={() => toggleFavorite(item.id)}
                disabled={loading}
                className="flex flex-col items-center hover:text-white"
              >
                {isFavorite ? <FilledHeart/> : <EmptyHeart/>}
              </button>
            </div>

            <div className="w-full md:w-auto flex justify-end">
              {isCrm ? (
                <button
                  className="font-bold"
                  onClick={() =>
                    router.visit(route("product.edit", {product: item.id}))
                  }
                >
                  Edit
                </button>
              ) : (
                <button
                  className="bg-[#ff8000] text-black rounded-md px-1 py-3 font-bold text-sm lg:text-base flex items-center"
                  onClick={
                    checkIsInCart
                      ? () => router.visit(route("cart.show"))
                      : () => handleAddToCart(item.id)
                  }
                >
                  {checkIsInCart ? "В кошику" : "Придбати"}
                  <span className="ml-1">
                    {checkIsInCart ? <FilledCart/> : <EmptyCart/>}
                  </span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
