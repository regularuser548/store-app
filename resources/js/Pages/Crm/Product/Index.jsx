import {Head, router} from "@inertiajs/react";
import CrmMenuLayout from "@/Layouts/CrmMenuLayout.jsx";
import Product from "@/Components/ShopHub/Product.jsx";
import {Button, Empty, Flex, Pagination} from "antd";
import React from "react";

export default function Index({paginator, images}) {

  const products = paginator.data;

  const onChange = (page) => {
    // let url = new URL(window.location.href);
    // url.searchParams.set('page', page);

    router.visit(paginator.links[page].url);
  };

  return (
    <>
      <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 lg:grid-cols-2 gap-20'>
        {products && products.length > 0 ?
          products.map((item) => (
            <Product key={item.id} item={item} image={images[item.id]} isCrm={true}></Product>
          )) :
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={'Немає товарів'}>
            <Button type="primary" onClick={() => router.visit(route('product.create'))}>Додати</Button>
          </Empty>}
      </div>
      <Flex justify='center'>
        <Pagination current={paginator.current_page} onChange={onChange}
                    total={paginator.total}
                    defaultPageSize={paginator.per_page} />
      </Flex>
    </>
  );
}
