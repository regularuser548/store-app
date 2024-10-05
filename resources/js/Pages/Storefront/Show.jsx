import React from 'react';
import { router } from '@inertiajs/react';

export default function Show({ product,image }) {
    return (
        <div className="flex flex-col items-center p-4">
            <div className="flex">
                <div className="w-1/3">
                    <img src={image} alt={product.name} className="w-full" />
                </div>

                <div className="w-1/3 ml-8">
                    <h1 className="text-3xl font-bold">{product.name}</h1>
                    <p className="mt-4">SKU: {product.sku}</p>
                    <p className="mt-2">Price: ${product.price}</p>
                    <p className="mt-2">{product.description}</p>
                </div>
            </div>

            <div className="mt-4">
                <button className="font-bold" onClick={() => router.visit(route('storefront.index'))}>
                    Back to Products
                </button>
            </div>
        </div>
    );
}
