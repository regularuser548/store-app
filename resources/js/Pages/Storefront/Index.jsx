import React, { useState } from 'react';
import Product from '../../Components/Product.jsx';
import {router} from "@inertiajs/react";
import {Button, Card, Col, DatePicker, Row, Space, version} from "antd";

export default function Index({ products,images }) {
    const [query, setQuery] = useState('');

    const handleSearch = (e) => {
        e.preventDefault();
        router.visit(route('storefront.search'), { method: 'get', data: { query } });
    };

    return (
        <div>
            <form onSubmit={handleSearch} className="mb-4">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search for a product"
                    className="border-2 p-2"
                />

                <button type="submit" className="ml-2 p-2 bg-blue-500 text-white font-bold">
                    Search
                </button>
            </form>

            <div className="TestDiv">
                <h1>antd version: {version}</h1>
                <Space>
                    <DatePicker/>
                    <Button type="primary">Primary Button</Button>
                </Space>
            </div>

            {/*test*/}
            {/*<Row gutter={16}> */}
            {/*    {products.map(product => (*/}
            {/*        <Col span={8} key={product.id}>*/}
            {/*            <Card*/}
            {/*                hoverable*/}
            {/*                cover={<img alt={product.name} src={images[product.id]} />}*/}
            {/*            >*/}
            {/*                <Card.Meta title={product.name} description={product.description} />*/}
            {/*                <p>{product.price}</p>*/}
            {/*            </Card>*/}
            {/*        </Col>*/}
            {/*    ))}*/}
            {/*</Row>*/}

            <div className="flex flex-wrap">
                {products.length > 0 ? (
                    products.map((product) => (
                        <Product key={product.id} item={product} image={images[product.id]} isCrm={false}></Product>
                    ))
                ) : (
                    <p>No products found</p>
                )}
            </div>
        </div>
    );
}
