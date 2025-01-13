import CrmMenuLayout from "@/Layouts/CrmMenuLayout.jsx";
import Taxonomy from "@/Pages/Crm/Taxonomy/Components/Taxonomy.jsx";
import React from "react";
import {Button, Empty, Space, Table, Tag} from "antd";
import {Link, router} from "@inertiajs/react";

export default function Index({taxonomies, images, props}) {

  const columns = [
    {
      title: 'Назва',
      dataIndex: 'name',
      key: 'name',
      render: (text, taxonomy) => <Link href={route('taxonomy.show', taxonomy.id)}>{taxonomy.name}</Link>,
    },
    {
      title: 'Slug',
      dataIndex: 'slug',
      key: 'slug',
    },
    {
      title: 'Дії',
      key: 'action',
      render: (_, taxonomy) => (
        <Space size="middle">
          <Link href={route('taxonomy.show', taxonomy.id)}>Перегляд</Link>
          <Link href={route('taxonomy.edit', taxonomy.id)}>Редагувати</Link>
        </Space>
      ),
    },
  ];

    return (
      <>
        {/*<div className='flex flex-wrap'>*/}
        {/*    {taxonomies.length > 0 ? (*/}
        {/*        taxonomies.map((item, index) => (*/}
        {/*            <Taxonomy key={item.id} item={item} image={images[item.id]}></Taxonomy>*/}
        {/*        ))*/}
        {/*    ) : (*/}
        {/*      <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={'Немає категорій'}>*/}
        {/*        <Button type="primary" onClick={() => router.visit(route('taxonomy.create'))}>Додати</Button>*/}
        {/*      </Empty>*/}
        {/*    )}*/}
        {/*</div>*/}

        <h1 className="text-2xl font-bold mb-4">Список Категорій</h1>

        <Table columns={columns} dataSource={taxonomies} pagination={{
          position: ['none'],
        }}/>
      </>
    );
}
