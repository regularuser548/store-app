import {Head, Link, router, useForm} from "@inertiajs/react";
import {Menu} from "antd";
import {AppstoreOutlined, MailOutlined, SettingOutlined} from "@ant-design/icons";

export default function CrmMenuLayout({props, children}) {

  const items = [
    {
      key: route('storefront.index'),
      label: 'Головна',
    },
    {
      key: 'products',
      label: 'Товари',
      children: [
        {
          key: route('product.index'),
          label: 'Список товарів',
        },
        {
          key: route('product.create'),
          label: 'Додати товар',
        },
      ]
    },
    {
      key: 'categories',
      label: 'Категорії',
      children: [
        {
          key: route('taxonomy.index'),
          label: 'Список категорій',
        },
        {
          key: route('taxonomy.create'),
          label: 'Додати категорію',
        },
      ]
    },
    {
      key: route('user.index'),
      label: 'Користувачі',
    },
    {
      key: route('reports.sales'),
      label: 'Звіти про продаж',
    },
    {
      key: route('reports.activity'),
      label: 'Активність користувачів',
    },
  ];

  const onClick = (e) => {
    router.visit(e.key);
  };
  return (
    <div className='flex'>
      <Head title="CRM"/>

      {/*<div className='bg-gray-800 p-2'>*/}
      {/*  <Link href={route('storefront.index')} className="block border rounded mb-2 hover:bg-gray-900">Головна</Link>*/}
      {/*  <Link href={route('product.index')} className="block border rounded mb-2 hover:bg-gray-900">Список*/}
      {/*    Товарів</Link>*/}
      {/*  <Link href={route('product.create')} className="block border rounded mb-2 hover:bg-gray-900">Додати Товар</Link>*/}
      {/*  <Link href={route('user.index')} className="block border rounded mb-2 hover:bg-gray-900">Користувачі</Link>*/}
      {/*  <Link href={route('taxonomy.index')} className="block border rounded mb-2 hover:bg-gray-900">Список*/}
      {/*    Категорій</Link>*/}
      {/*  <Link href={route('taxonomy.create')} className="block border rounded mb-2 hover:bg-gray-900">Створити*/}
      {/*    Категорію</Link>*/}
      {/*  <Link href={route("reports.sales")} className="block border rounded mb-2 hover:bg-gray-900">Звіти про*/}
      {/*    продажі</Link>*/}
      {/*  <Link href={route("reports.activity")} className="block border rounded mb-2 hover:bg-gray-900">Активність*/}
      {/*    користувачів</Link>*/}
      {/*</div>*/}
      <Menu
        style={{
          width: 256,
          height: '100vh',
        }}
        mode="inline"
        items={items}
        onClick={onClick}
      >
      </Menu>

      <div className='h-screen w-screen overflow-y-scroll p-4'>{children}</div>
    </div>


  );

}
