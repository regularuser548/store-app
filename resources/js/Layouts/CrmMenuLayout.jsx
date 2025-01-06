import {Head, Link, router, useForm} from "@inertiajs/react";
import {Menu} from "antd";
import {AppstoreOutlined, MailOutlined, SettingOutlined} from "@ant-design/icons";

export default function CrmMenuLayout({props, children}) {

  const items = [
    {
      key: 'sub1',
      label: 'Navigation One',
      icon: <MailOutlined />,
      children: [
        {
          key: 'g1',
          label: 'Item 1',
          type: 'group',
          children: [
            {
              key: '1',
              label: 'Option 1',
            },
            {
              key: '2',
              label: 'Option 2',
            },
          ],
        },
        {
          key: 'g2',
          label: 'Item 2',
          type: 'group',
          children: [
            {
              key: '3',
              label: 'Option 3',
            },
            {
              key: '4',
              label: 'Option 4',
            },
          ],
        },
      ],
    },
    {
      key: 'sub2',
      label: 'Navigation Two',
      icon: <AppstoreOutlined />,
      children: [
        {
          key: '5',
          label: 'Option 5',
        },
        {
          key: '6',
          label: 'Option 6',
        },
        {
          key: 'sub3',
          label: 'Submenu',
          children: [
            {
              key: '7',
              label: 'Option 7',
            },
            {
              key: '8',
              label: 'Option 8',
            },
          ],
        },
      ],
    },
    {
      type: 'divider',
    },
    {
      key: 'sub4',
      label: 'Navigation Three',
      icon: <SettingOutlined />,
      children: [
        {
          key: '9',
          label: 'Option 9',
        },
        {
          key: '10',
          label: 'Option 10',
        },
        {
          key: '11',
          label: 'Option 11',
        },
        {
          key: '12',
          label: 'Option 12',
        },
      ],
    },
    {
      key: 'grp',
      label: 'Group',
      type: 'group',
      children: [
        {
          key: '13',
          label: 'Option 13',
        },
        {
          key: '14',
          label: 'Option 14',
        },
      ],
    },
  ];
    return (
        <div className='flex'>
            <Head title="CRM"/>

          <div className='bg-gray-800 p-2'>
            <Link href={route('storefront.index')} className="block border rounded mb-2 hover:bg-gray-900">Головна</Link>
            <Link href={route('product.index')} className="block border rounded mb-2 hover:bg-gray-900">Список Товарів</Link>
            <Link href={route('product.create')} className="block border rounded mb-2 hover:bg-gray-900">Додати Товар</Link>
            <Link href={route('user.index')} className="block border rounded mb-2 hover:bg-gray-900">Користувачі</Link>
            <Link href={route('taxonomy.index')} className="block border rounded mb-2 hover:bg-gray-900">Список Категорій</Link>
            <Link href={route('taxonomy.create')} className="block border rounded mb-2 hover:bg-gray-900">Створити Категорію</Link>
            <Link href={route("reports.sales")} className="block border rounded mb-2 hover:bg-gray-900">Звіти про продажі</Link>
            <Link href={route("reports.activity")} className="block border rounded mb-2 hover:bg-gray-900">Активність користувачів</Link>
          </div>
          {/*<Menu*/}
          {/*  style={{*/}
          {/*    width: 256,*/}
          {/*    height: '100vh',*/}
          {/*  }}*/}
          {/*  mode="inline"*/}
          {/*  items={items}*/}
          {/*>*/}
          {/*</Menu>*/}

          <div className='h-screen w-screen overflow-y-scroll p-2'>{children}</div>
        </div>


    );

}
