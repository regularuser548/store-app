import React from 'react';
import Product from '../../Components/ShopHub/Product.jsx';
import {router} from "@inertiajs/react";
import {Empty, Flex, Pagination} from "antd";

export default function Search({paginator, images}) {

  const products = paginator.data;

  const onChange = (page) => {
    // let url = new URL(window.location.href);
    // url.searchParams.set('page', page);

    router.visit(paginator.links[page].url);
  };

  return (
    <div className="bg-[#0f0f0f] min-h-screen">
      {/* Header */}

      <main className="p-4 md:px-[7%]">

        <div className="text-white text-4xl p-20 ps-5">Результати пошуку:</div>

        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 lg:grid-cols-2 gap-20">
            {products.map((product) => (
              <Product key={product.id} item={product} image={images[product.id]} isCrm={false}></Product>
            ))}
          </div>
        ) : (
          <Flex justify='center' align='center'>
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={'Нічого не знайшлось'}></Empty>
          </Flex>
        )}

        <Flex justify='center'>
          <Pagination current={paginator.current_page} onChange={onChange}
                      total={paginator.total}
                      defaultPageSize={paginator.per_page} />
        </Flex>


      </main>

    </div>
  );
}
