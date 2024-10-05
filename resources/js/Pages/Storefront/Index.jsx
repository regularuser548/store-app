import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
//import Product from './Product';
import Product from '../Crm/Product/Components/Product';

export default function Storefront({ products,images }) {
    const [query, setQuery] = useState('');

    const handleSearch = (e) => {
        e.preventDefault();
        Inertia.visit(`/search`, { method: 'get', data: { query } });
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

            <div className="flex flex-wrap">
                {products.length > 0 ? (
                    products.map((product) => (
                        <Product key={product.id} item={product} image={images[product.id]}></Product>

                        // <Product key={item.id} item={item} image={props.images[item.id]}

                    ))
                ) : (
                    <p>No products found</p>
                )}
            </div>
        </div>
    );
}
