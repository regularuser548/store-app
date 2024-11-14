import {Head, Link, router, useForm} from "@inertiajs/react";
import React, {useState} from "react";

export default function StoreFrontLayout({props, children}) {
  const handleSearch = (e) => {
    e.preventDefault();
    router.visit(route('storefront.search'), {method: 'get', data: {query}});
  };

  const [query, setQuery] = useState('');

    return (
      <div className='flex-auto'>
        <Head title="ShopHub CRM"/>
        <header className="bg-[#161616]">
          <div className="flex justify-between items-center p-4 bg-[#161616] text-white md:px-[7%]">
            <h1 className="text-2xl font-bold text-[#ffffff]">ShopHub</h1>
            <button className="bg-gray-700 text-white p-2 rounded-full flex items-center space-x-2">
              <span>Nightmode</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                   xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                      d="M12 3v1M12 21v1m-6-6H5m14 0h-1m-9.96-4.84l-.7-.7m11.31.7l-.7-.7M5.34 17.66l-.7.7m11.32-.7l-.7.7M9 12a3 3 0 106 0 3 3 0 00-6 0z"/>
              </svg>
            </button>
          </div>

          {/* Bottom Part */}
          <div className="flex flex-col md:flex-row items-center justify-between bg-[#272525] p-4 md:px-[7%]">
            <button className="bg-[#ff8000] text-black px-4 py-2 rounded-md w-full md:w-auto mb-2 md:mb-0">Категорії
            </button>

            <form onSubmit={handleSearch} className="relative w-full max-w-md mx-auto md:mx-4">
              <div className="flex">
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search for a products"
                  className="w-full p-2 rounded-l-md bg-white text-black border-none focus:outline-none"
                />
                <button type="submit" className="bg-orange-500 p-2 rounded-r-md hover:bg-orange-600 transition-colors">
                  <svg className="w-5 h-5 text-[#ffffff]" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                       xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                          d="M21 21l-4.35-4.35M17 10a7 7 0 10-14 0 7 7 0 0014 0z"></path>
                  </svg>
                </button>
              </div>
            </form>

            <div className="flex space-x-4 mt-4 md:mt-0 text-gray-300">
              <Link href={route('cart.show')} className="flex flex-col items-center text-[#ffffff] hover:text-orange-500">
                <svg className="w-6 h-6 mb-1" viewBox="0 0 24 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M12 22.9115L10.55 21.495C5.4 16.4834 2 13.1674 2 9.12169C2 5.80569 4.42 3.21942 7.5 3.21942C9.24 3.21942 10.91 4.08866 12 5.45155C13.09 4.08866 14.76 3.21942 16.5 3.21942C19.58 3.21942 22 5.80569 22 9.12169C22 13.1674 18.6 16.4834 13.45 21.495L12 22.9115Z"
                    fill="white"/>
                </svg>
                <span >Довподоби</span>
              </Link>
              <Link href={route('cart.show')} className="flex flex-col items-center text-[#ffffff] hover:text-orange-500">
                <svg className="w-6 h-6 mb-1" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M17.7084 18.75C16.5521 18.75 15.625 19.6771 15.625 20.8333C15.625 21.3859 15.8445 21.9158 16.2352 22.3065C16.6259 22.6972 17.1558 22.9167 17.7084 22.9167C18.2609 22.9167 18.7908 22.6972 19.1815 22.3065C19.5722 21.9158 19.7917 21.3859 19.7917 20.8333C19.7917 20.2808 19.5722 19.7509 19.1815 19.3602C18.7908 18.9695 18.2609 18.75 17.7084 18.75ZM1.04169 2.08333V4.16666H3.12502L6.87502 12.0729L5.45835 14.625C5.3021 14.9167 5.20835 15.2604 5.20835 15.625C5.20835 16.1775 5.42785 16.7074 5.81855 17.0981C6.20925 17.4888 6.73915 17.7083 7.29169 17.7083H19.7917V15.625H7.72919C7.66012 15.625 7.59388 15.5976 7.54504 15.5487C7.49621 15.4999 7.46877 15.4336 7.46877 15.3646C7.46877 15.3125 7.47919 15.2708 7.50002 15.2396L8.43752 13.5417H16.1979C16.9792 13.5417 17.6667 13.1042 18.0209 12.4687L21.75 5.72916C21.8229 5.5625 21.875 5.38541 21.875 5.20833C21.875 4.93206 21.7653 4.66711 21.5699 4.47176C21.3746 4.27641 21.1096 4.16666 20.8334 4.16666H5.4271L4.44794 2.08333M7.29169 18.75C6.13544 18.75 5.20835 19.6771 5.20835 20.8333C5.20835 21.3859 5.42785 21.9158 5.81855 22.3065C6.20925 22.6972 6.73915 22.9167 7.29169 22.9167C7.84422 22.9167 8.37413 22.6972 8.76483 22.3065C9.15553 21.9158 9.37502 21.3859 9.37502 20.8333C9.37502 20.2808 9.15553 19.7509 8.76483 19.3602C8.37413 18.9695 7.84422 18.75 7.29169 18.75Z"
                    fill="white"/>
                </svg>
                <span>Кошик</span>
              </Link>
              <Link href={route('login')} className="flex flex-col items-center text-[#ffffff] hover:text-orange-500">
                <svg className="w-6 h-6 mb-1" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M6.09373 17.8125C6.97915 17.1354 7.96873 16.6017 9.06248 16.2115C10.1562 15.8212 11.3021 15.6257 12.5 15.625C13.6979 15.6243 14.8437 15.8198 15.9375 16.2115C17.0312 16.6031 18.0208 17.1368 18.9062 17.8125C19.5139 17.1007 19.9871 16.2934 20.326 15.3906C20.6649 14.4878 20.834 13.5243 20.8333 12.5C20.8333 10.191 20.0219 8.22465 18.3989 6.60104C16.776 4.97743 14.8097 4.16597 12.5 4.16666C10.1903 4.16736 8.22394 4.97916 6.60102 6.60208C4.97811 8.22499 4.16665 10.191 4.16665 12.5C4.16665 13.5243 4.33609 14.4878 4.67498 15.3906C5.01387 16.2934 5.48679 17.1007 6.09373 17.8125ZM12.5 13.5417C11.4757 13.5417 10.6118 13.1903 9.90831 12.4875C9.20484 11.7847 8.85345 10.9208 8.85415 9.89583C8.85484 8.87083 9.20658 8.00694 9.90936 7.30416C10.6121 6.60138 11.4757 6.24999 12.5 6.24999C13.5243 6.24999 14.3882 6.60173 15.0916 7.3052C15.7951 8.00868 16.1465 8.87222 16.1458 9.89583C16.1451 10.9194 15.7937 11.7833 15.0916 12.4875C14.3896 13.1917 13.5257 13.543 12.5 13.5417ZM12.5 22.9167C11.059 22.9167 9.70484 22.643 8.43748 22.0958C7.17012 21.5486 6.06769 20.8066 5.13019 19.8698C4.19269 18.933 3.45068 17.8305 2.90415 16.5625C2.35762 15.2944 2.08401 13.9403 2.08331 12.5C2.08262 11.0597 2.35623 9.70555 2.90415 8.4375C3.45206 7.16944 4.19408 6.06701 5.13019 5.1302C6.0663 4.1934 7.16873 3.45138 8.43748 2.90416C9.70623 2.35694 11.0604 2.08333 12.5 2.08333C13.9396 2.08333 15.2937 2.35694 16.5625 2.90416C17.8312 3.45138 18.9337 4.1934 19.8698 5.1302C20.8059 6.06701 21.5482 7.16944 22.0969 8.4375C22.6455 9.70555 22.9187 11.0597 22.9166 12.5C22.9146 13.9403 22.641 15.2944 22.0958 16.5625C21.5507 17.8305 20.8087 18.933 19.8698 19.8698C18.9309 20.8066 17.8285 21.549 16.5625 22.0969C15.2965 22.6448 13.9423 22.918 12.5 22.9167Z"
                    fill="white"/>
                </svg>
                <span>Вхід</span>
              </Link>
            </div>
          </div>
        </header>


        <div className=''>{children}</div>

        <div className="bg-[#272525] text-center py-4 text-sm">
          <p className="text-[#ff8000]">Оформивши підписку отримуєш <span className="font-bold ">10% знижки</span> на замовлення
          </p>
          <button className="bg-orange-500 text-[#1e1e1e] px-6 py-2 rounded-md mt-2 hover:bg-orange-600">
            Підписатися на розсилку
          </button>
        </div>
        <footer className="bg-[#1e1e1e] text-gray-200 py-10">

          <div
            className="container mx-auto px-6 md:px-10 mt-8 flex flex-col md:flex-row items-start md:items-center justify-between">

            <div className="flex flex-col gap-2 mb-6 md:mb-0">
              <a href="#" className="text-[#ffffff] hover:text-orange-500 flex items-center space-x-2">
                <i className="fab fa-instagram"></i> <span>@shophub</span>
              </a>
              <a href="#" className="text-[#ffffff] hover:text-orange-500 flex items-center space-x-2">
                <i className="fab fa-facebook-f"></i> <span>@shophub</span>
              </a>
              <a href="#" className="text-[#ffffff] hover:text-orange-500 flex items-center space-x-2">
                <i className="fab fa-telegram-plane"></i> <span>@shophub.ua</span>
              </a>
            </div>

            <div className="text-center mb-6 md:mb-0">
              <h2 className="text-[#ffffff] text-2xl font-semibold">ShopHub</h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-10 text-sm">
              <div className="border-r ">
                <h4 className="text-[#ff8000] text-lg font-semibold mb-3">Інформація про компанію</h4>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-300 hover:text-orange-500">Про нас</a></li>
                  <li><Link href={route('storefront.PrivacyPolicy')} className="text-gray-300 hover:text-orange-500">Умови
                    використання сайту</Link></li>
                  <li><a href="#" className="text-[#ffffff] hover:text-orange-500">Вакансії</a></li>
                  <li><a href="#" className="text-[#ffffff] hover:text-orange-500">Контакти</a></li>
                  <li><a href="#" className="text-[#ffffff] hover:text-orange-500">Всі категорії</a></li>
                </ul>
              </div>

              <div className="border-r ">
                <h4 className="text-[#ff8000] text-lg font-semibold mb-3 ">Допомога</h4>
                <ul className="space-y-2">
                  <li><a href="#" className="text-[#ffffff] hover:text-orange-500">Доставка та оплата</a></li>
                  <li><a href="#" className="text-[#ffffff] hover:text-orange-500">Кредит</a></li>
                  <li><a href="#" className="text-[#ffffff] hover:text-orange-500">Повернення товару</a></li>
                  <li><a href="#" className="text-[#ffffff] hover:text-orange-500">Сервісний центр</a></li>
                  <li><a href="#" className="text-[#ffffff] hover:text-orange-500">Політика конфіденційності</a></li>
                </ul>
              </div>

              <div className="border-r ">
                <h4 className="text-[#ff8000] text-lg font-semibold mb-3">Сервіси</h4>
                <ul className="space-y-2">
                  <li><a href="#" className="text-[#ffffff] hover:text-orange-500">Віртуальний рахунок</a></li>
                  <li><a href="#" className="text-[#ffffff] hover:text-orange-500">Підписники</a></li>
                  <li><a href="#" className="text-[#ffffff] hover:text-orange-500">Спільноти</a></li>
                  <li><a href="#" className="text-[#ffffff] hover:text-orange-500">Торговий облік</a></li>
                  <li><a href="#" className="text-[#ffffff] hover:text-orange-500">Корпоративним клієнтам</a></li>
                </ul>
              </div>

              <div>
                <h4 className="text-[#ff8000] text-lg font-semibold mb-3">Партнери</h4>
                <ul className="space-y-2">
                  <li><a href="#" className="text-[#ffffff] hover:text-orange-500">Продавати на ShopHub</a></li>
                  <li><a href="#" className="text-[#ffffff] hover:text-orange-500">Співпраця з нами</a></li>
                </ul>
              </div>
            </div>
          </div>
        </footer>
      </div>
    );

}
