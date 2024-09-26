import {Head, router, useForm} from "@inertiajs/react";
import CrmMenuLayout from "@/Pages/Crm/CrmMenuLayout.jsx";

export default function Edit(props) {

    //https://vanilo.io/docs/4.x/products#all-product-fields
    const {data, setData, post, progress} = useForm({
        name: props.product.name,
        sku: props.product.sku,
        price: props.product.price,
        images: props.product.images,
    })

    function handleChange(e) {
        const key = e.target.id;
        const value = e.target.value
        setData(values => ({
            ...values,
            [key]: value,
        }))
    }

    function handleSubmit(e) {
        e.preventDefault()
        //put('/crm/product')

        router.post(`/crm/product/${props.product.id}`, {
            _method: 'put',

            name: data.name,
            sku: data.sku,
            price: data.price,
            images: data.images,
        })
    }

    return (
        <CrmMenuLayout>
            <Head title="ShopHub CRM" />
            <div className="">

                <form onSubmit={handleSubmit}>

                    <input id="name" value={data.name} onChange={handleChange} placeholder="Name" className='block' />

                    <input id="sku" value={data.sku} onChange={handleChange} placeholder="SKU" className='block'/>

                    <input id="price" value={data.price} onChange={handleChange} placeholder="Price" type='number' className='block'/>
                    <input id="images" onChange={e => setData('images', e.target.files)} type='file' multiple accept="image/*" className='block'/>
                    <button type="submit">Save</button>
                    <button onClick={e => router.visit('/product')}>Cancel</button>
                </form>

                <div>
                    {props.images.map( (item, index) => (
                        <img key={index} src={props.images[index]} alt='' className='w-1/6' />
                    )) }
                </div>

            </div>
        </CrmMenuLayout>
    );

}
