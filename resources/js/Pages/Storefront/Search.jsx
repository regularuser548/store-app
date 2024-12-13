import React, {useState} from 'react';
import Product from '../../Components/Product.jsx';
import {Link, router} from "@inertiajs/react";
import {Button, Card, Carousel, Col, DatePicker, Empty, Flex, Image, Row, Space, version} from "antd";
import StoreFrontLayout from "./StoreFrontLayout.jsx"

export default function Search({products, images}) {


  return (
    <StoreFrontLayout>
      <div className="bg-[#0f0f0f] min-h-screen">
        {/* Header */}

        <main className="p-4 md:px-[7%]">

          <div className="text-white text-4xl p-20 ps-5">Результати пошуку:</div>

          {products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 lg:grid-cols-2 gap-40 ">
              products.map((product) => (
              <Product item={product} image={images[product.id]} isCrm={false}></Product>
              ))
            </div>
          ) : (
            <Flex justify='center' align='center'>
              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={'Нічого не знайшлось'}></Empty>
            </Flex>
          )}

        </main>

      </div>
    </StoreFrontLayout>
  );
}
