import {Head, Link, router, useForm, usePage, useRemember} from "@inertiajs/react";
import React, {useEffect, useState} from "react";
import {Button, Cascader, Divider} from "antd";

export default function StoreFrontLayout({children}) {

  const {props} = usePage();
  const {user} = usePage().props.auth;

  const [categoryData, setCategoryData] = useState(null);

  const [query, setQuery] = useState('');
  const [currentCategory, setCurrentCategory] = useState(props.currentCategory);

  const handleSearch = (e) => {
    e.preventDefault();

    // let path = currentCategory.toString().replaceAll(',', '/');
    //
    // let queryString = query === '' ? {} : query
    // router.visit(route('storefront.search') + '/' + path, {data: {query: queryString}});

    router.visit(generateSearchUrl(currentCategory));
  };

  const handleCategorySelect = (e, value) => {
    console.log(value)

    let slugs = value.map(entry => entry.slug);

    setCurrentCategory(slugs);

    // let path = slugs.toString().replaceAll(',', '/');
    //
    // let queryString = query === '' ? {} : query
    // let url = route('storefront.search') + '/' + path + '?query=' + queryString;
    // console.log(url);
    // router.visit(route('storefront.search') + '/' + path, {data: {query: queryString}});

    router.visit(generateSearchUrl(slugs));
  }

  const generateSearchUrl = (currentCategory) => {
    let url = route('storefront.search');

    if (currentCategory !== undefined && currentCategory !== null)
      url += `/${currentCategory.toString().replaceAll(',', '/')}`;

    if (query !== '')
      url += `?query=${query}`;

    console.log(url);
    return url;

  }

  //Fetch category data on layout mount
  useEffect(() => {
    axios(route('storefront.categories'))
      .then((response) => setCategoryData(response.data));
  }, []);

  //Set new state values when page changes
  useEffect(() => {
    setCurrentCategory(props.currentCategory);

    props.query === undefined || props.query === null
      ? setQuery('')
      : setQuery(props.query);

  }, [props]);

  //Go to category url when it is changed
  // useEffect(() => {
  //   let queryString = query === '' ? {} : query
  //   router.visit(route('storefront.search', currentCategory), {data: {query: queryString}});
  // }, [query, currentCategory]);

  return (
    <div className='flex-auto'>
      <header className="bg-[#161616]">
        <div className="flex justify-between items-center p-4 bg-[#161616] text-white md:px-[7%]">
          <Link href={route('storefront.index')} className="text-2xl font-bold text-[#ffffff]">ShopHub</Link>
          {/*<button className="bg-gray-700 text-white p-2 rounded-full flex items-center space-x-2">*/}
          {/*  <span>Nightmode</span>*/}
          {/*  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"*/}
          {/*       xmlns="http://www.w3.org/2000/svg">*/}
          {/*    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"*/}
          {/*          d="M12 3v1M12 21v1m-6-6H5m14 0h-1m-9.96-4.84l-.7-.7m11.31.7l-.7-.7M5.34 17.66l-.7.7m11.32-.7l-.7.7M9 12a3 3 0 106 0 3 3 0 00-6 0z"/>*/}
          {/*  </svg>*/}
          {/*</button>*/}
        </div>

        {/* Bottom Part */}
        <div className="flex flex-col md:flex-row items-center justify-between bg-[#272525] p-4 md:px-[7%]">

          <Cascader fieldNames={{label: 'name', value: 'slug'}} options={categoryData}
                    value={currentCategory} onChange={handleCategorySelect}>
            <button className="bg-[#ff8000] text-black px-4 py-2 rounded-md w-full md:w-auto mb-2 md:mb-0">Категорії
            </button>
          </Cascader>


          <form onSubmit={handleSearch} className="relative w-full max-w-md mx-auto md:mx-4">
            <div className="flex">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Шукати товари"
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

            <Link
              href={route('favorites.index')}
              className="flex flex-col items-center text-[#ffffff] hover:text-orange-500"
            >
              <svg
                className="w-6 h-6 mb-1"
                viewBox="0 0 24 26"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 22.9115L10.55 21.495C5.4 16.4834 2 13.1674 2 9.12169C2 5.80569 4.42 3.21942 7.5 3.21942C9.24 3.21942 10.91 4.08866 12 5.45155C13.09 4.08866 14.76 3.21942 16.5 3.21942C19.58 3.21942 22 5.80569 22 9.12169C22 13.1674 18.6 16.4834 13.45 21.495L12 22.9115Z"
                  fill="white"
                />
              </svg>
              <span>Довподоби</span>
            </Link>
            <Link href={route('cart.show')}
                  className="flex flex-col items-center text-[#ffffff] hover:text-orange-500">
              <svg className="w-6 h-6 mb-1" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M17.7084 18.75C16.5521 18.75 15.625 19.6771 15.625 20.8333C15.625 21.3859 15.8445 21.9158 16.2352 22.3065C16.6259 22.6972 17.1558 22.9167 17.7084 22.9167C18.2609 22.9167 18.7908 22.6972 19.1815 22.3065C19.5722 21.9158 19.7917 21.3859 19.7917 20.8333C19.7917 20.2808 19.5722 19.7509 19.1815 19.3602C18.7908 18.9695 18.2609 18.75 17.7084 18.75ZM1.04169 2.08333V4.16666H3.12502L6.87502 12.0729L5.45835 14.625C5.3021 14.9167 5.20835 15.2604 5.20835 15.625C5.20835 16.1775 5.42785 16.7074 5.81855 17.0981C6.20925 17.4888 6.73915 17.7083 7.29169 17.7083H19.7917V15.625H7.72919C7.66012 15.625 7.59388 15.5976 7.54504 15.5487C7.49621 15.4999 7.46877 15.4336 7.46877 15.3646C7.46877 15.3125 7.47919 15.2708 7.50002 15.2396L8.43752 13.5417H16.1979C16.9792 13.5417 17.6667 13.1042 18.0209 12.4687L21.75 5.72916C21.8229 5.5625 21.875 5.38541 21.875 5.20833C21.875 4.93206 21.7653 4.66711 21.5699 4.47176C21.3746 4.27641 21.1096 4.16666 20.8334 4.16666H5.4271L4.44794 2.08333M7.29169 18.75C6.13544 18.75 5.20835 19.6771 5.20835 20.8333C5.20835 21.3859 5.42785 21.9158 5.81855 22.3065C6.20925 22.6972 6.73915 22.9167 7.29169 22.9167C7.84422 22.9167 8.37413 22.6972 8.76483 22.3065C9.15553 21.9158 9.37502 21.3859 9.37502 20.8333C9.37502 20.2808 9.15553 19.7509 8.76483 19.3602C8.37413 18.9695 7.84422 18.75 7.29169 18.75Z"
                  fill="white"/>
              </svg>
              <span>Кошик</span>
            </Link>


            {user === null ? (
              <Link href={route('login')} className="flex flex-col items-center text-[#ffffff] hover:text-orange-500">
                <svg className="w-6 h-6 mb-1" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M6.09373 17.8125C6.97915 17.1354 7.96873 16.6017 9.06248 16.2115C10.1562 15.8212 11.3021 15.6257 12.5 15.625C13.6979 15.6243 14.8437 15.8198 15.9375 16.2115C17.0312 16.6031 18.0208 17.1368 18.9062 17.8125C19.5139 17.1007 19.9871 16.2934 20.326 15.3906C20.6649 14.4878 20.834 13.5243 20.8333 12.5C20.8333 10.191 20.0219 8.22465 18.3989 6.60104C16.776 4.97743 14.8097 4.16597 12.5 4.16666C10.1903 4.16736 8.22394 4.97916 6.60102 6.60208C4.97811 8.22499 4.16665 10.191 4.16665 12.5C4.16665 13.5243 4.33609 14.4878 4.67498 15.3906C5.01387 16.2934 5.48679 17.1007 6.09373 17.8125ZM12.5 13.5417C11.4757 13.5417 10.6118 13.1903 9.90831 12.4875C9.20484 11.7847 8.85345 10.9208 8.85415 9.89583C8.85484 8.87083 9.20658 8.00694 9.90936 7.30416C10.6121 6.60138 11.4757 6.24999 12.5 6.24999C13.5243 6.24999 14.3882 6.60173 15.0916 7.3052C15.7951 8.00868 16.1465 8.87222 16.1458 9.89583C16.1451 10.9194 15.7937 11.7833 15.0916 12.4875C14.3896 13.1917 13.5257 13.543 12.5 13.5417ZM12.5 22.9167C11.059 22.9167 9.70484 22.643 8.43748 22.0958C7.17012 21.5486 6.06769 20.8066 5.13019 19.8698C4.19269 18.933 3.45068 17.8305 2.90415 16.5625C2.35762 15.2944 2.08401 13.9403 2.08331 12.5C2.08262 11.0597 2.35623 9.70555 2.90415 8.4375C3.45206 7.16944 4.19408 6.06701 5.13019 5.1302C6.0663 4.1934 7.16873 3.45138 8.43748 2.90416C9.70623 2.35694 11.0604 2.08333 12.5 2.08333C13.9396 2.08333 15.2937 2.35694 16.5625 2.90416C17.8312 3.45138 18.9337 4.1934 19.8698 5.1302C20.8059 6.06701 21.5482 7.16944 22.0969 8.4375C22.6455 9.70555 22.9187 11.0597 22.9166 12.5C22.9146 13.9403 22.641 15.2944 22.0958 16.5625C21.5507 17.8305 20.8087 18.933 19.8698 19.8698C18.9309 20.8066 17.8285 21.549 16.5625 22.0969C15.2965 22.6448 13.9423 22.918 12.5 22.9167Z"
                    fill="white"/>
                </svg>
                <span>Вхід</span>
              </Link>) : (
              <Link href={route('login')} className="flex flex-col items-center text-[#ffffff] hover:text-orange-500">
                <svg className="w-6 h-6 mb-1" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M6.09373 17.8125C6.97915 17.1354 7.96873 16.6017 9.06248 16.2115C10.1562 15.8212 11.3021 15.6257 12.5 15.625C13.6979 15.6243 14.8437 15.8198 15.9375 16.2115C17.0312 16.6031 18.0208 17.1368 18.9062 17.8125C19.5139 17.1007 19.9871 16.2934 20.326 15.3906C20.6649 14.4878 20.834 13.5243 20.8333 12.5C20.8333 10.191 20.0219 8.22465 18.3989 6.60104C16.776 4.97743 14.8097 4.16597 12.5 4.16666C10.1903 4.16736 8.22394 4.97916 6.60102 6.60208C4.97811 8.22499 4.16665 10.191 4.16665 12.5C4.16665 13.5243 4.33609 14.4878 4.67498 15.3906C5.01387 16.2934 5.48679 17.1007 6.09373 17.8125ZM12.5 13.5417C11.4757 13.5417 10.6118 13.1903 9.90831 12.4875C9.20484 11.7847 8.85345 10.9208 8.85415 9.89583C8.85484 8.87083 9.20658 8.00694 9.90936 7.30416C10.6121 6.60138 11.4757 6.24999 12.5 6.24999C13.5243 6.24999 14.3882 6.60173 15.0916 7.3052C15.7951 8.00868 16.1465 8.87222 16.1458 9.89583C16.1451 10.9194 15.7937 11.7833 15.0916 12.4875C14.3896 13.1917 13.5257 13.543 12.5 13.5417ZM12.5 22.9167C11.059 22.9167 9.70484 22.643 8.43748 22.0958C7.17012 21.5486 6.06769 20.8066 5.13019 19.8698C4.19269 18.933 3.45068 17.8305 2.90415 16.5625C2.35762 15.2944 2.08401 13.9403 2.08331 12.5C2.08262 11.0597 2.35623 9.70555 2.90415 8.4375C3.45206 7.16944 4.19408 6.06701 5.13019 5.1302C6.0663 4.1934 7.16873 3.45138 8.43748 2.90416C9.70623 2.35694 11.0604 2.08333 12.5 2.08333C13.9396 2.08333 15.2937 2.35694 16.5625 2.90416C17.8312 3.45138 18.9337 4.1934 19.8698 5.1302C20.8059 6.06701 21.5482 7.16944 22.0969 8.4375C22.6455 9.70555 22.9187 11.0597 22.9166 12.5C22.9146 13.9403 22.641 15.2944 22.0958 16.5625C21.5507 17.8305 20.8087 18.933 19.8698 19.8698C18.9309 20.8066 17.8285 21.549 16.5625 22.0969C15.2965 22.6448 13.9423 22.918 12.5 22.9167Z"
                    fill="white"/>
                </svg>
                <span>{user.name}</span>
              </Link>
            )}


          </div>
        </div>
      </header>


      <div className=''>{children}</div>

      {/*<div className="bg-[#272525] text-center py-4  ">*/}
      {/*  <p className="text-[#ff8000] text-4xl pb-5">Оформивши підписку отримуєш <span className="font-bold ">10% знижки</span> на замовлення*/}
      {/*  </p>*/}
      {/*  <button className="bg-orange-500 text-[#1e1e1e] px-6 py-2 rounded-md mt-2 hover:bg-orange-600">*/}
      {/*    Підписатися на розсилку*/}
      {/*  </button>*/}
      {/*</div>*/}
      <footer className="bg-[#1e1e1e] text-gray-200 py-10">

        <div
          className="container mx-auto px-6 md:px-10 mt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-10">

          <div className="flex flex-col gap-2 mb-6 md:mb-0">
            <a href="#" className="text-[#ffffff] hover:text-orange-500 flex items-center space-x-2">
              <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_35_416)">
                  <path
                    d="M19.1406 0H5.85938C2.62333 0 0 2.62333 0 5.85938V19.1406C0 22.3767 2.62333 25 5.85938 25H19.1406C22.3767 25 25 22.3767 25 19.1406V5.85938C25 2.62333 22.3767 0 19.1406 0Z"
                    fill="url(#paint0_radial_35_416)"/>
                  <path
                    d="M19.1406 0H5.85938C2.62333 0 0 2.62333 0 5.85938V19.1406C0 22.3767 2.62333 25 5.85938 25H19.1406C22.3767 25 25 22.3767 25 19.1406V5.85938C25 2.62333 22.3767 0 19.1406 0Z"
                    fill="url(#paint1_radial_35_416)"/>
                  <path
                    d="M12.5009 2.73438C9.84873 2.73438 9.51582 2.746 8.47422 2.79336C7.43457 2.84102 6.7249 3.00557 6.104 3.24707C5.46162 3.49648 4.9168 3.83018 4.37402 4.37314C3.83076 4.91602 3.49707 5.46084 3.24688 6.10293C3.00469 6.72402 2.83994 7.43398 2.79316 8.47314C2.74658 9.51484 2.73438 9.84785 2.73438 12.5001C2.73438 15.1523 2.74609 15.4842 2.79336 16.5258C2.84121 17.5654 3.00576 18.2751 3.24707 18.896C3.49668 19.5384 3.83037 20.0832 4.37334 20.626C4.91602 21.1692 5.46084 21.5037 6.10273 21.7531C6.72412 21.9946 7.43389 22.1592 8.47334 22.2068C9.51504 22.2542 9.84766 22.2658 12.4997 22.2658C15.1521 22.2658 15.484 22.2542 16.5256 22.2068C17.5652 22.1592 18.2757 21.9946 18.8971 21.7531C19.5392 21.5037 20.0832 21.1692 20.6258 20.626C21.169 20.0832 21.5026 19.5384 21.7529 18.8963C21.993 18.2751 22.1578 17.5652 22.2066 16.526C22.2534 15.4844 22.2656 15.1523 22.2656 12.5001C22.2656 9.84785 22.2534 9.51504 22.2066 8.47334C22.1578 7.43369 21.993 6.72412 21.7529 6.10322C21.5026 5.46084 21.169 4.91602 20.6258 4.37314C20.0826 3.82998 19.5394 3.49629 18.8965 3.24717C18.2739 3.00557 17.5639 2.84092 16.5242 2.79336C15.4825 2.746 15.1509 2.73438 12.4979 2.73438H12.5009ZM11.6248 4.49424C11.8849 4.49385 12.175 4.49424 12.5009 4.49424C15.1084 4.49424 15.4174 4.50361 16.4471 4.55039C17.3992 4.59395 17.916 4.75303 18.2603 4.88672C18.716 5.06367 19.0409 5.27529 19.3825 5.61719C19.7243 5.95898 19.9358 6.28447 20.1133 6.74023C20.247 7.08398 20.4062 7.60078 20.4496 8.55293C20.4964 9.58242 20.5065 9.8916 20.5065 12.4979C20.5065 15.1041 20.4964 15.4134 20.4496 16.4428C20.4061 17.3949 20.247 17.9117 20.1133 18.2556C19.9363 18.7113 19.7243 19.0358 19.3825 19.3774C19.0407 19.7192 18.7162 19.9308 18.2603 20.1078C17.9164 20.2421 17.3992 20.4008 16.4471 20.4443C15.4176 20.4911 15.1084 20.5013 12.5009 20.5013C9.89326 20.5013 9.58418 20.4911 8.55478 20.4443C7.60264 20.4004 7.08584 20.2413 6.74131 20.1076C6.28564 19.9306 5.96006 19.719 5.61826 19.3772C5.27646 19.0354 5.06494 18.7107 4.8875 18.2548C4.75381 17.9109 4.59453 17.3941 4.55117 16.442C4.50439 15.4125 4.49502 15.1033 4.49502 12.4954C4.49502 9.8875 4.50439 9.57998 4.55117 8.55049C4.59473 7.59834 4.75381 7.08154 4.8875 6.7373C5.06455 6.28154 5.27646 5.95605 5.61836 5.61426C5.96025 5.27246 6.28564 5.06084 6.74141 4.8835C7.08564 4.74922 7.60264 4.59053 8.55478 4.54678C9.45566 4.50605 9.80479 4.49385 11.6248 4.4918V4.49424ZM17.7138 6.11572C17.0668 6.11572 16.5419 6.64014 16.5419 7.28721C16.5419 7.93418 17.0668 8.45908 17.7138 8.45908C18.3607 8.45908 18.8856 7.93418 18.8856 7.28721C18.8856 6.64023 18.3607 6.11533 17.7138 6.11533V6.11572ZM12.5009 7.48496C9.73135 7.48496 7.48584 9.73047 7.48584 12.5001C7.48584 15.2697 9.73135 17.5142 12.5009 17.5142C15.2705 17.5142 17.5152 15.2697 17.5152 12.5001C17.5152 9.73057 15.2703 7.48496 12.5007 7.48496H12.5009ZM12.5009 9.24482C14.2986 9.24482 15.7562 10.7021 15.7562 12.5001C15.7562 14.2979 14.2986 15.7554 12.5009 15.7554C10.7031 15.7554 9.2457 14.2979 9.2457 12.5001C9.2457 10.7021 10.703 9.24482 12.5009 9.24482Z"
                    fill="white"/>
                </g>
                <defs>
                  <radialGradient id="paint0_radial_35_416" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse"
                                  gradientTransform="translate(6.64062 26.9255) rotate(-90) scale(24.7769 23.0444)">
                    <stop stopColor="#FFDD55"/>
                    <stop offset="0.1" stopColor="#FFDD55"/>
                    <stop offset="0.5" stopColor="#FF543E"/>
                    <stop offset="1" stopColor="#C837AB"/>
                  </radialGradient>
                  <radialGradient id="paint1_radial_35_416" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse"
                                  gradientTransform="translate(-4.1876 1.80088) rotate(78.681) scale(11.0754 45.6531)">
                    <stop stopColor="#3771C8"/>
                    <stop offset="0.128" stopColor="#3771C8"/>
                    <stop offset="1" stopColor="#6600FF" stopOpacity="0"/>
                  </radialGradient>
                  <clipPath id="clip0_35_416">
                    <rect width="25" height="25" fill="white"/>
                  </clipPath>
                </defs>
              </svg>
              <i className="fab fa-instagram"></i> <span>@shophub</span>
            </a>
            <a href="#" className="text-[#ffffff] hover:text-orange-500 flex items-center space-x-2">
              <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M25 12.5C25 5.59648 19.4035 0 12.5 0C5.59648 0 0 5.59648 0 12.5C0 18.7391 4.57109 23.9104 10.5469 24.8481V16.1133H7.37305V12.5H10.5469V9.74609C10.5469 6.61328 12.4131 4.88281 15.2684 4.88281C16.6359 4.88281 18.0664 5.12695 18.0664 5.12695V8.20312H16.4902C14.9374 8.20312 14.4531 9.1667 14.4531 10.1553V12.5H17.9199L17.3657 16.1133H14.4531V24.8481C20.4289 23.9104 25 18.7392 25 12.5Z"
                  fill="#1877F2"/>
                <path
                  d="M17.3657 16.1133L17.9199 12.5H14.4531V10.1553C14.4531 9.1666 14.9374 8.20312 16.4902 8.20312H18.0664V5.12695C18.0664 5.12695 16.6359 4.88281 15.2683 4.88281C12.4131 4.88281 10.5469 6.61328 10.5469 9.74609V12.5H7.37305V16.1133H10.5469V24.8481C11.193 24.9494 11.846 25.0002 12.5 25C13.154 25.0002 13.807 24.9494 14.4531 24.8481V16.1133H17.3657Z"
                  fill="white"/>
              </svg>

              <i className="fab fa-facebook-f"></i> <span>/shophub./</span>
            </a>
            <a href="#" className="text-[#ffffff] hover:text-orange-500 flex items-center space-x-2">
              <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_35_424)">
                  <path
                    d="M12.5 0C9.18555 0 6.00391 1.31777 3.66211 3.66113C1.31791 6.00543 0.000670798 9.18473 0 12.5C0 15.8139 1.31836 18.9955 3.66211 21.3389C6.00391 23.6822 9.18555 25 12.5 25C15.8145 25 18.9961 23.6822 21.3379 21.3389C23.6816 18.9955 25 15.8139 25 12.5C25 9.18613 23.6816 6.00449 21.3379 3.66113C18.9961 1.31777 15.8145 0 12.5 0Z"
                    fill="url(#paint0_linear_35_424)"/>
                  <path
                    d="M5.65813 12.368C9.30266 10.7805 11.7323 9.73393 12.9472 9.2282C16.4198 7.78425 17.1406 7.53347 17.6113 7.52498C17.7148 7.52332 17.9452 7.5489 18.0956 7.67048C18.2206 7.77302 18.2558 7.9117 18.2734 8.00906C18.289 8.10632 18.3105 8.328 18.2929 8.50105C18.1054 10.4776 17.2909 15.2741 16.8769 17.488C16.7031 18.4247 16.3573 18.7387 16.0234 18.7694C15.2968 18.8362 14.746 18.2897 14.0429 17.829C12.9433 17.1077 12.3222 16.6589 11.2538 15.9552C10.0195 15.1419 10.8202 14.6948 11.5234 13.9643C11.707 13.7731 14.9062 10.8639 14.9667 10.6001C14.9745 10.5671 14.9823 10.444 14.9081 10.3792C14.8359 10.3141 14.7284 10.3364 14.6503 10.354C14.539 10.379 12.7831 11.5407 9.37688 13.8389C8.87883 14.1815 8.42766 14.3485 8.02141 14.3397C7.5761 14.3302 6.71672 14.0874 6.07805 13.88C5.2968 13.6255 4.67375 13.4909 4.72844 13.0587C4.75579 12.8337 5.06633 12.6034 5.65813 12.368Z"
                    fill="white"/>
                </g>
                <defs>
                  <linearGradient id="paint0_linear_35_424" x1="1250" y1="0" x2="1250" y2="2500"
                                  gradientUnits="userSpaceOnUse">
                    <stop stopColor="#2AABEE"/>
                    <stop offset="1" stopColor="#229ED9"/>
                  </linearGradient>
                  <clipPath id="clip0_35_424">
                    <rect width="25" height="25" fill="white"/>
                  </clipPath>
                </defs>
              </svg>
              <i className="fab fa-telegram-plane"></i> <span>@shophub</span>
            </a>
          </div>

          <div className="text-center mb-6 md:mb-0">
            <h2 className="text-[#ffffff] text-2xl font-semibold">ShopHub</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-10 text-sm">
            <div className="border-r pr-4">
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

            <div className="border-r pr-4">
              <h4 className="text-[#ff8000] text-lg font-semibold mb-3">Допомога</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-[#ffffff] hover:text-orange-500">Доставка та оплата</a></li>
                <li><a href="#" className="text-[#ffffff] hover:text-orange-500">Кредит</a></li>
                <li><a href="#" className="text-[#ffffff] hover:text-orange-500">Гарантія</a></li>
                <li><a href="#" className="text-[#ffffff] hover:text-orange-500">Повернення товару</a></li>
                <li><a href="#" className="text-[#ffffff] hover:text-orange-500">Сервісні центри</a></li>
                <li><a href="#" className="text-[#ffffff] hover:text-orange-500">Політика приватності</a></li>
              </ul>
            </div>

            <div className="border-r pr-4">
              <h4 className="text-[#ff8000] text-lg font-semibold mb-3">Сервіси</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-[#ffffff] hover:text-orange-500">Бонусний рахунок</a></li>
                <li>
                  <a href="#" className="text-[#ffffff] hover:text-orange-500">Подарункові сертифікати</a>

                </li>
                <li>
                  <a href="#" className="text-[#ffffff] hover:text-orange-500">ShopHub Обмін<br/>Корпоративним
                    клієнтам</a>
                </li>
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
