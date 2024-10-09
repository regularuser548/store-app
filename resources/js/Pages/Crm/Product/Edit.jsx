import {Head, router, useForm} from "@inertiajs/react";
import CrmMenuLayout from "@/Pages/Crm/CrmMenuLayout.jsx";
import ProductForm from "@/Pages/Crm/Product/Components/ProductForm.jsx";

export default function Edit(props) {

    //https://vanilo.io/docs/4.x/products#all-product-fields
    const {data, setData, post, progress} = useForm({
        name: props.name,
        sku: props.sku,
        stock: props.stock,
        price: props.price,
        weight: props.weight,
        width: props.width,
        height: props.height,
        length: props.length,
        description: props.description,
        meta_keywords: props.meta_keywords,

        images: '',
        videos: '',

        //workaround
        _method: 'put'
    })

    function handleSubmit(e) {
        e.preventDefault();
        router.post(route('product.update', {product:props.product.id }), data);
    }

    return (
        <CrmMenuLayout>
                <ProductForm fields={data} changeHandler={setData} submit={handleSubmit}></ProductForm>

                <button className='border m-2 p-1' onClick={e => router.visit(route('product.index'))}>Cancel</button>

                <div id='ImageContainer'>
                    {props.images.map((item, index) => (
                        <img key={index} src={props.images[index]} alt='' className='w-1/6 inline'/>
                    ))}
                </div>

                <button className='border m-2 p-1 bg-red-500'
                        onClick={e => router.delete(route('product.destroy', {product:props.product.id }))}>Delete
                </button>

        </CrmMenuLayout>
    );

}
