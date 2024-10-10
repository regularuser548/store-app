import {Head, router, useForm} from "@inertiajs/react";
import CrmMenuLayout from "@/Pages/Crm/CrmMenuLayout.jsx";
import ProductForm from "@/Pages/Crm/Product/Components/ProductForm.jsx";

export default function Edit({product, images, props}) {

    //https://vanilo.io/docs/4.x/products#all-product-fields
    const {data, setData, post, progress} = useForm({
        name: product.name,
        sku: product.sku,
        stock: product.stock,
        price: product.price,
        weight: product.weight,
        width: product.width,
        height: product.height,
        length: product.length,
        description:product.description,
        meta_keywords: product.meta_keywords,

        images: '',
        videos: '',

        //workaround
        _method: 'put'
    })

    function handleSubmit(e) {
        e.preventDefault();
        router.post(route('product.update', {product:product.id }), data);
    }

    return (
        <CrmMenuLayout>
                <ProductForm fields={data} changeHandler={setData} submit={handleSubmit}></ProductForm>

                <button className='border m-2 p-1' onClick={e => router.visit(route('product.index'))}>Cancel</button>

                <div id='ImageContainer'>
                    {images.map((item, index) => (
                        <img key={index} src={images[index]} alt='' className='w-1/6 inline'/>
                    ))}
                </div>

                <button className='border m-2 p-1 bg-red-500'
                        onClick={e => router.delete(route('product.destroy', {product:product.id }))}>Delete
                </button>

        </CrmMenuLayout>
    );

}
