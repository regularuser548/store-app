import React, { useState } from 'react';
import Product from '../../Components/Product.jsx';
import {router} from "@inertiajs/react";
import {Button, Card, Carousel, Col, DatePicker, Row, Space, version} from "antd";

export default function Index({ products,images }) {
    const [query, setQuery] = useState('');

    const handleSearch = (e) => {
        e.preventDefault();
        router.visit(route('storefront.search'), { method: 'get', data: { query } });
    };

    return (
        <div className="bg-black text-white">
            <header className="flex justify-between items-center px-6 py-4 bg-gray-900">
                <div className="text-white text-2xl font-bold">ShopHub</div>
                <button className="bg-orange-500 text-white px-4 py-2 rounded-md">Категорії</button>
                <div className="relative">
                    <input type="text" placeholder="Search..." className="p-2 rounded bg-gray-800 text-white"/>
                    <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-orange-500">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                             xmlns="http://www.w3.org/2000/svg">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                  d="M21 21l-4.35-4.35M17 10a7 7 0 10-14 0 7 7 0 0014 0z"></path>
                        </svg>
                    </button>
                </div>
                <div className="flex items-center space-x-4">
                    <button className="bg-gray-700 text-white p-2 rounded-full flex items-center space-x-2">
                        <span>Nightmode</span>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                             xmlns="http://www.w3.org/2000/svg">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                  d="M12 3v1M12 21v1m-6-6H5m14 0h-1m-9.96-4.84l-.7-.7m11.31.7l-.7-.7M5.34 17.66l-.7.7m11.32-.7l-.7.7M9 12a3 3 0 106 0 3 3 0 00-6 0z"></path>
                        </svg>
                    </button>
                    <div className="flex space-x-2 text-gray-300">
                        <div className="flex items-center">
                            <span className="text-sm">Довподоби</span>
                        </div>
                        <div className="flex items-center">
                            <span className="text-sm">Кошик</span>
                        </div>
                        <div className="flex items-center">
                            <span className="text-sm">Вхід</span>
                        </div>
                    </div>
                </div>
            </header>
            <div className="max-w-4xl mx-auto my-8">
                <Carousel autoplay>
                    {products.map((image, index) => (
                        <div key={index}>
                            <img
                                src={image}
                                alt={`Slide ${index + 1}`}
                                className="w-full h-auto object-cover"
                            />
                        </div>
                    ))}
                </Carousel>
            </div>
        </div>
        // <div>
        //     <form onSubmit={handleSearch} className="mb-4">
        //         <input
        //             type="text"
        //             value={query}
        //             onChange={(e) => setQuery(e.target.value)}
        //             placeholder="Search for a product"
        //             className="border-2 p-2"
        //         />
        //
        //         <button type="submit" className="ml-2 p-2 bg-blue-500 text-white font-bold">
        //             Search
        //         </button>
        //     </form>
        //
        //     <div className="TestDiv">
        //         <h1>antd version: {version}</h1>
        //         <Space>
        //             <DatePicker/>
        //             <Button type="primary">Primary Button</Button>
        //         </Space>
        //     </div>
        //
        //     {/*test*/}
        //     {/*<Row gutter={16}> */}
        //     {/*    {products.map(product => (*/}
        //     {/*        <Col span={8} key={product.id}>*/}
        //     {/*            <Card*/}
        //     {/*                hoverable*/}
        //     {/*                cover={<img alt={product.name} src={images[product.id]} />}*/}
        //     {/*            >*/}
        //     {/*                <Card.Meta title={product.name} description={product.description} />*/}
        //     {/*                <p>{product.price}</p>*/}
        //     {/*            </Card>*/}
        //     {/*        </Col>*/}
        //     {/*    ))}*/}
        //     {/*</Row>*/}
        //
        //     <div className="flex flex-wrap">
        //         {products.length > 0 ? (
        //             products.map((product) => (
        //                 <Product key={product.id} item={product} image={images[product.id]} isCrm={false}></Product>
        //             ))
        //         ) : (
        //             <p>No products found</p>
        //         )}
        //     </div>
        // </div>
    );

}
