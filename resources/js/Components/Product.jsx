import {Link, router} from "@inertiajs/react";
import {Button} from "antd";
import React from "react";

export default function Product({item, image, isCrm = false}) {

  const handleAddToCart = (productId) => {
    axios.post(route('cart.add'), {product: {id: productId}});
  };

  return (
    // <div id={item.id} className="border-2 m-2 w-72 ">
    //     <div>
    //         <img src={image} alt='' className='w-60'/>
    //     </div>
    //
    //     <div className="bg-[#161616]" >
    //         <h3 className='font-bold '>Name: {item.name}</h3>
    //         <p>ID: {item.id}</p>
    //         <p>SKU: {item.sku}</p>
    //         <p>Price: {item.price}</p>
    //     </div>
    //
    //     {/*/!*<button className='font-bold' onClick={e => router.visit(`product/${item.id}/edit`)}>Edit</button>*!/*/}
    //     {/*{if(isCrm == true)*/}
    //     {/*    <button className='font-bold' onClick={e => router.visit(route('product.edit', {product: item.id}))}>Edit</button>*/}
    //
    //     {/*}*/}
    //
    //     {isCrm ? (
    //         <button className='font-bold' onClick={e => router.visit(route('product.edit', {product: item.id}))}>Edit</button>
    //     ) :
    //         <div>
    //             <button className="font-bold" onClick={() => router.visit(route('storefront.show', {product: item.id}))}>Details</button>
    //             <Button className="mt-2" onClick={() => handleAddToCart(item.id)} type="primary">Add to Cart</Button>
    //         </div>
    //     }
    //
    //
    //     {/*<button className="font-bold" onClick={() => router.visit(`product/${item.id}/show`)}>Details</button>*/}
    //
    //
    //
    //
    // </div>

    <div id={item.id}
         className="
         rounded-lg shadow-lg overflow-hidden">
      <div className="flex items-center justify-center h-96  bg-gray-200">
        <img onClick={() => router.visit(route('storefront.show', {product: item.id}))}
             src={image || 'path-to-placeholder-image'} alt=''
             className="h-full w-full object-cover"/>
      </div>

      <div className="bg-[#1e1e1e] text-white p-4">
        <h3 onClick={() => router.visit(route('storefront.show', {product: item.id}))}
            className="font-semibold text-center text-sm sm:text-base lg:text-lg mb-1 text-[#ffffff] hover:text-orange-500">{item.name || 'назва товару'}</h3>

        <div className="flex flex-row justify-between items-start w-full mt-4 space-x-4">
          {/* Первый столбец с цdенами */}

          <div className="w-1/3 grid grid-rows-2 text-left my-2 justify-start">
            <div></div>
            <span
              className="text-[#ff8000] opacity-75 line-through text-sm lg:text-base">{item.originalPrice || '999 грн'}
            </span>
            <span
              className="text-lg font-bold text-[#FF6A00]">{item.price + " грн" || '666 грн'}
            </span>
          </div>

          {/* Второй столбец для кнопок и элементов */}
          <div className="w-1/2 flex flex-col items-end space-y-2">
            {/* Первый блок выровнен по правому краю */}
            <div className="w-full md:w-auto flex justify-end">
              <Link href={route('login')} className="flex flex-col items-center hover:text-white">
                <svg className="w-6 h-6 mb-1" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M12.1 18.55L12 18.65L11.89 18.55C7.14 14.24 4 11.39 4 8.5C4 6.5 5.5 5 7.5 5C9.04 5 10.54 6 11.07 7.36H12.93C13.46 6 14.96 5 16.5 5C18.5 5 20 6.5 20 8.5C20 11.39 16.86 14.24 12.1 18.55ZM16.5 3C14.76 3 13.09 3.81 12 5.08C10.91 3.81 9.24 3 7.5 3C4.42 3 2 5.41 2 8.5C2 12.27 5.4 15.36 10.55 20.03L12 21.35L13.45 20.03C18.6 15.36 22 12.27 22 8.5C22 5.41 19.58 3 16.5 3Z"
                    fill="#FF8000"/>
                </svg>
              </Link>
            </div>

            {/* Второй блок выровнен по правому краю */}
            <div className="w-full md:w-auto flex justify-end">
              <div className="flex flex-col items-center hover:text-white">

                {isCrm ? (
                    <button className='font-bold'
                            onClick={e => router.visit(route('product.edit', {product: item.id}))}>Edit</button>
                  ) :
                  <div>
                    <button
                      className="bg-[#ff8000] text-black rounded-md px-4 py-3 font-bold text-sm lg:text-base flex items-center"
                      onClick={() => handleAddToCart(item.id)} type="primary">
                      Придбати
                      <span className="ml-1">
                            <svg className="w-6 h-6" viewBox="0 0 20 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path
                                d="M7 22C6.45 22 5.97933 21.8043 5.588 21.413C5.19667 21.0217 5.00067 20.5507 5 20C4.99933 19.4493 5.19533 18.9787 5.588 18.588C5.98067 18.1973 6.45133 18.0013 7 18C7.54867 17.9987 8.01967 18.1947 8.413 18.588C8.80633 18.9813 9.002 19.452 9 20C8.998 20.548 8.80233 21.019 8.413 21.413C8.02367 21.807 7.55267 22.0027 7 22ZM17 22C16.45 22 15.9793 21.8043 15.588 21.413C15.1967 21.0217 15.0007 20.5507 15 20C14.9993 19.4493 15.1953 18.9787 15.588 18.588C15.9807 18.1973 16.4513 18.0013 17 18C17.5487 17.9987 18.0197 18.1947 18.413 18.588C18.8063 18.9813 19.002 19.452 19 20C18.998 20.548 18.8023 21.019 18.413 21.413C18.0237 21.807 17.5527 22.0027 17 22ZM6.15 6L8.55 11H15.55L18.3 6H6.15ZM5.2 4H19.95C20.3333 4 20.625 4.171 20.825 4.513C21.025 4.855 21.0333 5.20067 20.85 5.55L17.3 11.95C17.1167 12.2833 16.871 12.5417 16.563 12.725C16.255 12.9083 15.9173 13 15.55 13H8.1L7 15H19V17H7C6.25 17 5.68333 16.671 5.3 16.013C4.91667 15.355 4.9 14.7007 5.25 14.05L6.6 11.6L3 4H1V2H4.25L5.2 4Z"
                                fill="black"/>
                             </svg>
                          </span>
                    </button>
                  </div>
                }

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
}
