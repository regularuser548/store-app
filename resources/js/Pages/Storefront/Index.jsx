import React, { useState } from 'react';
import Product from '../../Components/Product.jsx';
import {Link, router} from "@inertiajs/react";
import {Button, Card, Carousel, Col, DatePicker, Image, Row, Space, version} from "antd";

export default function Index({ products,images }) {
    const [query, setQuery] = useState('');

    const handleSearch = (e) => {
        e.preventDefault();
        router.visit(route('storefront.search'), { method: 'get', data: { query } });
    };

    const contentStyle = {
        width: '100%',        // Ширина изображения занимает всю доступную ширину
        maxHeight: '400px',   // Ограничение высоты (по желанию)
        objectFit: 'contain', // Сохраняем соотношение сторон
    };

    const containerStyle = {
        display: 'flex',
        justifyContent: 'center',  // Центрируем содержимое по горизонтали
        alignItems: 'center',      // Центрируем содержимое по вертикали (если нужно)
        height: '100%',            // Поддерживаем высоту на 100%
    };

    const images2 = [
        "https://prod-api.mediaexpert.pl/api/images/gallery_500_500/thumbnails/images/27/2782915/393720.jpg",
        "https://prod-api.mediaexpert.pl/api/images/gallery_500_500/thumbnails/images/27/2782899/Glosnik-mobilny-JBL-Charge-5-Czerwony-skos1.jpg",
        "https://prod-api.mediaexpert.pl/api/images/gallery_500_500/thumbnails/images/27/2782895/393722.jpg"
    ];

    return (
        <div >
            <div className="bg-black" >
                <header className="flex flex-col items-center p-4 bg-gray-900">


                    <div className="top-part columns-2 ">
                        <div className="justify-items-start">
                            <div className="text-white text-2xl font-bold">ShopHub</div>
                        </div>
                        <div className="justify-between">
                            <button className="bg-gray-700 text-white p-2 rounded-full flex items-center space-x-2">
                                <span>Nightmode</span>
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                          d="M12 3v1M12 21v1m-6-6H5m14 0h-1m-9.96-4.84l-.7-.7m11.31.7l-.7-.7M5.34 17.66l-.7.7m11.32-.7l-.7.7M9 12a3 3 0 106 0 3 3 0 00-6 0z"></path>
                                </svg>
                            </button>
                        </div>
                    </div>

                    <div className="bottom-part flex flex-row">
                        <div>
                            <button className="bg-orange-500 text-white px-4 py-2 rounded-md">Категорії</button>
                        </div>

                        <div>
                            <form onSubmit={handleSearch} className="relative">
                                <input
                                    type="text"
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    placeholder="Search for a product"
                                    className="p-2 rounded bg-gray-800 text-white"
                                />
                                <button type="submit"
                                        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-orange-500">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                              d="M21 21l-4.35-4.35M17 10a7 7 0 10-14 0 7 7 0 0014 0z"></path>
                                    </svg>
                                </button>
                            </form>
                        </div>


                        <div className="flex items-center space-x-4">

                            <div className="flex space-x-2 text-gray-300">
                                <div className="flex items-center">
                                    <span className="text-sm">Довподоби</span>
                                </div>
                                <div className="flex items-center">
                                    <Link href={route('cart.show')}>Кошик</Link>
                                </div>
                                <div className="flex items-center">
                                    <Link href={route('login')}>Вхiд</Link>
                                </div>

                                <div className="flex items-center">
                                    <Link href={route('register')}>Регiстрацiя</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>


            </div>
            <div>
                <div className="bg-black">
                <Carousel arrows autoplay centerMode centerSlidePercentage={100}>
                        {
                            images2.map((src, index) => (
                                <div key={index} style={containerStyle}>
                                    <img src={src} alt={`Slide ${index + 1}`} style={contentStyle}/>
                                </div>
                            ))}

                    </Carousel>
                </div>
            </div>


            {/*<Link href={route('cart.show')} className="ml-2 p-2.5 bg-green-500 text-white font-bold">View*/}
            {/*    Cart</Link>*/}
            <div className="flex flex-wrap">
                {products.length > 0 ? (
                    products.map((product) => (
                        <div key={product.id} className="m-2 p-2 border">
                            <Product item={product} image={images[product.id]} isCrm={false}></Product>
                        </div>
                    ))
                ) : (
                    <p>No products found</p>
                )}
            </div>
        </div>
    );
}
