import React, {useState} from 'react';
import Product from '../../Components/ShopHub/Product.jsx';
import {Link, router} from "@inertiajs/react";
import {Button, Card, Carousel, Col, DatePicker, Empty, Flex, Image, Row, Space, version} from "antd";
import StoreFrontLayout from "../../Layouts/StoreFrontLayout.jsx"

export default function Index({products, images}) {
  const contentStyle = {
    width: '100%',        // Ширина изображения занимает всю доступную ширину
    maxHeight: '70vh',   // Ограничение высоты (по желанию)
    objectFit: 'cover ', // Сохраняем соотношение сторон
  };

  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',  // Центрируем содержимое по горизонтали
    alignItems: 'center',      // Центрируем содержимое по вертикали (если нужно)
    height: '20vh',            // Поддерживаем высоту на 100%
  };

  const CustomPrevArrow = ({onClick}) => (
    <div
      onClick={onClick}
      className="absolute left-0 top-1/2 transform -translate-y-1/2 text-3xl cursor-pointer text-white z-10"
    >
      <svg width="60" height="70" viewBox="0 0 60 70" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g opacity="0.5">
          <path
            d="M23.875 35L42.25 56.4375C42.875 57.1667 43.1775 58.0174 43.1575 58.9896C43.1375 59.9618 42.8142 60.8125 42.1875 61.5417C41.5608 62.2708 40.8317 62.6354 40 62.6354C39.1683 62.6354 38.4392 62.2708 37.8125 61.5417L18.5625 39.1563C18.0625 38.5729 17.6875 37.9167 17.4375 37.1875C17.1875 36.4583 17.0625 35.7292 17.0625 35C17.0625 34.2708 17.1875 33.5417 17.4375 32.8125C17.6875 32.0833 18.0625 31.4271 18.5625 30.8438L37.8125 8.38543C38.4375 7.65626 39.1775 7.30334 40.0325 7.32668C40.8875 7.35001 41.6267 7.72723 42.25 8.45834C42.8733 9.18946 43.1858 10.0401 43.1875 11.0104C43.1892 11.9807 42.8767 12.8314 42.25 13.5625L23.875 35Z"
            fill="white"/>
        </g>
      </svg>

    </div>
  );

  const CustomNextArrow = ({onClick}) => (
    <div
      onClick={onClick}
      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white text-3xl cursor-pointer"
    >
      <svg width="60" height="70" viewBox="0 0 60 70" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g opacity="0.5">
          <path
            d="M36.125 35L17.75 13.5625C17.125 12.8333 16.8225 11.9826 16.8425 11.0104C16.8625 10.0382 17.1858 9.18749 17.8125 8.45832C18.4392 7.72915 19.1683 7.36457 20 7.36457C20.8317 7.36457 21.5608 7.72915 22.1875 8.45832L41.4375 30.8437C41.9375 31.4271 42.3125 32.0833 42.5625 32.8125C42.8125 33.5417 42.9375 34.2708 42.9375 35C42.9375 35.7292 42.8125 36.4583 42.5625 37.1875C42.3125 37.9167 41.9375 38.5729 41.4375 39.1562L22.1875 61.6146C21.5625 62.3437 20.8225 62.6967 19.9675 62.6733C19.1125 62.65 18.3733 62.2728 17.75 61.5417C17.1267 60.8105 16.8142 59.9598 16.8125 58.9896C16.8108 58.0193 17.1233 57.1686 17.75 56.4375L36.125 35Z"
            fill="white"/>
        </g>
      </svg>
    </div>
  );


  const images2 = [
    "https://prod-api.mediaexpert.pl/api/images/gallery_500_500/thumbnails/images/27/2782915/393720.jpg",
    "https://prod-api.mediaexpert.pl/api/images/gallery_500_500/thumbnails/images/27/2782899/Glosnik-mobilny-JBL-Charge-5-Czerwony-skos1.jpg",
    "https://prod-api.mediaexpert.pl/api/images/gallery_500_500/thumbnails/images/27/2782895/393722.jpg"
  ];

console.log(products)
  return (
      <div className="bg-[#0f0f0f] min-h-screen">
        {/* Header */}

        <main className="p-4 md:px-[7%]">
          <div className="relative overflow-hidden rounded-md">
            <Carousel arrows autoplay centerSlidePercentage={100}
                      className="carousel-container"
                      nextArrow={<CustomNextArrow/>}
                      prevArrow={<CustomPrevArrow/>}
                      dots={true}
            >
              {
                images2.map((src, index) => (
                  <div key={index} style={containerStyle}>
                    <img src={src} alt={`Slide ${index + 1}`} style={contentStyle}/>
                  </div>
                ))}
            </Carousel>
          </div>

          <div className="text-white text-4xl p-20 ps-5">Найбільш популярні товари</div>
          {products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 lg:grid-cols-2 gap-20">
              {products.map((product) => (
                <Product key={product.id} item={product} image={images[product.id]} isCrm={false}></Product>
              ))}
            </div>
          ) : (
            <Flex justify='center' align='center'>
              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={'Немає товарів'}></Empty>
            </Flex>

          )}
          <div className="p-20"></div>
          <div className="relative overflow-hidden rounded-md ">
            <Carousel arrows autoplay centerSlidePercentage={100}
                      className="carousel-container"
                      nextArrow={<CustomNextArrow/>}
                      prevArrow={<CustomPrevArrow/>}
                      dots={true}
            >
              {
                images2.map((src, index) => (
                  <div key={index} style={containerStyle}>
                    <img src={src} alt={`Slide ${index + 1}`} style={contentStyle}/>
                  </div>
                ))}
            </Carousel>
          </div>
          <div className="text-white text-4xl p-20 ps-5">Всі акції</div>

          {products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 lg:grid-cols-2 gap-20">
              {products.map((product) => (
                <Product key={product.id} item={product} image={images[product.id]} isCrm={false}></Product>
              ))}
            </div>
          ) : (
            <Flex justify='center' align='center'>
              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={'Немає товарів'}></Empty>
            </Flex>

          )}

        </main>

      </div>
  );
}
