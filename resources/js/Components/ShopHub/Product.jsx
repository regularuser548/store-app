import React, { useEffect, useState } from "react";
import { Button, message } from "antd";
import axios from "axios";
import { router } from "@inertiajs/react";
import FilledHeart from "@/Icons/FilledHeart.jsx";
import EmptyHeart from "@/Icons/EmptyHeart.jsx";

export default function Product({ item, image, isCrm = false }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleAddToCart = (productId) => {
    axios.post(route('cart.add'), {product: {id: productId}});
  };

  useEffect(() => {
    const checkFavorite = async () => {
      try {
        const response = await axios.get(route('favorites.exists', item.id));
        setIsFavorite(response.data.exists);
      } catch (error) {
        console.error("Failed to check favorite status:", error);
      }
    };

    checkFavorite();
  }, [item.id]);

  const toggleFavorite = async (productId) => {
    const previousState = isFavorite;
    setIsFavorite(!isFavorite);
    try {
      if (isFavorite) {
        await axios.delete(route('favorites.destroy', productId));
        message.success("Removed from favorites");
      } else {
        await axios.post(route('favorites.store'), { product_id: productId });
        message.success("Added to favorites");
      }
    } catch (error) {
      console.error("Failed to toggle favorite:", error);
      message.error("Failed to update favorite status.");
      setIsFavorite(previousState);
    }
  };


  return (
    <article id={item.id} className="rounded-lg shadow-lg overflow-hidden">
      <div className="flex items-center justify-center h-80 bg-gray-400">
        <img
          onClick={() => router.visit(route('storefront.show', { product: item.id }))}
          src={image || "path-to-placeholder-image"}
          alt=""
          className="h-full w-full object-cover"
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
                  onClick={() => router.visit(route('product.edit', { product: item.id }))}
                >
                  Edit
                </button>
              ) : (
                <button
                  className="bg-[#ff8000] text-black rounded-md px-1 py-3 font-bold text-sm lg:text-base flex items-center"
                  onClick={() => handleAddToCart(item.id)}
                >
                  Придбати
                  <span className="ml-1">
                    <svg
                      className="w-6 h-6"
                      viewBox="0 0 20 25"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M7 22C6.45 22 5.97933 21.8043 5.588 21.413C5.19667 21.0217 5.00067 20.5507 5 20C4.99933 19.4493 5.19533 18.9787 5.588 18.588C5.98067 18.1973 6.45133 18.0013 7 18C7.54867 17.9987 8.01967 18.1947 8.413 18.588C8.80633 18.9813 9.002 19.452 9 20C8.998 20.548 8.80233 21.019 8.413 21.413C8.02367 21.807 7.55267 22.0027 7 22ZM17 22C16.45 22 15.9793 21.8043 15.588 21.413C15.1967 21.0217 15.0007 20.5507 15 20C14.9993 19.4493 15.1953 18.9787 15.588 18.588C15.9807 18.1973 16.4513 18.0013 17 18C17.5487 17.9987 18.0197 18.1947 18.413 18.588C18.8063 18.9813 19.002 19.452 19 20C18.998 20.548 18.8023 21.019 18.413 21.413C18.0237 21.807 17.5527 22.0027 17 22ZM6.15 6L8.55 11H15.55L18.3 6H6.15ZM5.2 4H19.95C20.3333 4 20.625 4.171 20.825 4.513C21.025 4.855 21.0333 5.20067 20.85 5.55L17.3 11.95C17.1167 12.2833 16.871 12.5417 16.563 12.725C16.255 12.9083 15.9173 13 15.55 13H8.1L7 15H19V17H7C6.25 17 5.68333 16.671 5.3 16.013C4.91667 15.355 4.9 14.7007 5.25 14.05L6.6 11.6L3 4H1V2H4.25L5.2 4Z"
                        fill="black"
                      />
                    </svg>
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
