import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import {Head} from "@inertiajs/react";
import GuestLayout from "@/Layouts/GuestLayout.jsx";
import {Button, DatePicker, Space, version} from "antd";
import React from 'react';
export default function Index(props) {
    return (
        <GuestLayout
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">ShopHub</h2>}
        >
            <Head title="ShopHub" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">

                        {/*{props.products.map( (item) => (*/}
                        {/*    <div key={item.id} id={item.id}>*/}
                        {/*        {item.name}*/}
                        {/*    </div>*/}
                        {/*)) }*/}

                        <div className="TestDiv">
                            <h1>antd version: {version}</h1>
                            <Space>
                                <DatePicker/>
                                <Button type="primary">Primary Button</Button>
                            </Space>
                        </div>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
