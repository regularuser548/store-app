import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
//import Product from './Product';
import Product from '../Crm/Product/Components/Product';

export default function Storefront({ products }) {
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
                        <Product key={product.id} item={product} image={product.image} />
                    ))
                ) : (
                    <p>No products found</p>
                )}
            </div>
        </div>
    );
}
