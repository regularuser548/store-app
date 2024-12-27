import {Head, Link, router} from "@inertiajs/react";
import CrmMenuLayout from "@/Layouts/CrmMenuLayout.jsx";
import Product from "@/Components/ShopHub/Product.jsx";
import {Avatar, Button, Empty, Flex, Image, List, Pagination, Space, Table, Tag} from "antd";
import React from "react";

export default function Index({paginator}) {

  const products = paginator.data;

  const onPageChange = (page) => {
    // let url = new URL(window.location.href);
    // url.searchParams.set('page', page);

    router.visit(paginator.links[page].url);
  };


  const columns = [
    {
      title: 'Фото',
      dataIndex: 'thumbnail_url',
      key: 'thumbnail_url',
      render: (url) => <img src={url} alt='' className="max-w-24"/>,
    },
    {
      title: 'Назва',
      dataIndex: 'name',
      key: 'name',
      render: (text, product) => <Link href={route('product.edit', product.id)}>{product.name}</Link>,
    },

    {
      title: 'Ціна',
      dataIndex: 'price',
      key: 'price',
      render: (price) => <span>{price.toFixed(2)} ₴</span>,
    },
    {
      title: 'Статус',
      key: 'state',
      dataIndex: 'state',
      render: (_, {state}) => {
        let color = '';

        if (state === 'inactive')
          color = 'gold';

        if (state === 'active')
          color = 'green';

        if (state === 'unavailable')
          color = 'volcano';

        if (state === 'retired')
          color = 'red';

        return (
          <Tag color={color}>
            {state}
          </Tag>
        );
      }

    },
    {
      title: 'Категорія',
      key: 'category_path',
      dataIndex: 'category_path',
    },
    {
      title: 'Дії',
      key: 'action',
      render: (_, product) => (
        <Space size="middle">
          <Link href={route('product.edit', product.id)}>Редагувати</Link>
        </Space>
      ),
    },
  ];

  //console.log(products[0]);

  return (
    <div className='p-4'>
      {/*<div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 lg:grid-cols-2 gap-20'>*/}
      {/*  {products && products.length > 0 ?*/}
      {/*    products.map((item) => (*/}
      {/*      <Product key={item.id} item={item} image={images[item.id]} isCrm={true}></Product>*/}
      {/*    )) :*/}
      {/*    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={'Немає товарів'}>*/}
      {/*      <Button type="primary" onClick={() => router.visit(route('product.create'))}>Додати</Button>*/}
      {/*    </Empty>}*/}
      {/*</div>*/}

      <Table columns={columns} dataSource={products} pagination={{
        position: ['bottomCenter'],
        current: paginator.current_page,
        onChange:onPageChange,
        total: paginator.total,
        defaultPageSize: paginator.per_page,
        hideOnSinglePage: true,
      }}/>
    </div>
  );
}
