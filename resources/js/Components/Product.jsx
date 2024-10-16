import {router} from "@inertiajs/react";

export default function Product({item, image,isCrm = false}) {

    return (
        <div id={item.id} className="border-2 m-2 w-72">
            <div>
                <img src={image} alt='' className='w-60'/>
            </div>

            <div>
                <h3 className='font-bold'>Name: {item.name}</h3>
                <p>ID: {item.id}</p>
                <p>SKU: {item.sku}</p>
                <p>Price: {item.price}</p>
            </div>

            {/*/!*<button className='font-bold' onClick={e => router.visit(`product/${item.id}/edit`)}>Edit</button>*!/*/}
            {/*{if(isCrm == true)*/}
            {/*    <button className='font-bold' onClick={e => router.visit(route('product.edit', {product: item.id}))}>Edit</button>*/}

            {/*}*/}

        {isCrm ? (
         <button className='font-bold' onClick={e => router.visit(route('product.edit', {product: item.id}))}>Edit</button>
          ) : null}


            {/*<button className="font-bold" onClick={() => router.visit(`product/${item.id}/show`)}>Details</button>*/}

            <button className="font-bold" onClick={() => router.visit(route('storefront.show', {product: item.id}))}>Details</button>

        </div>
    );
}
