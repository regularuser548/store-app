import {Head, router, useForm} from "@inertiajs/react";
import GuestLayout from "@/Layouts/GuestLayout.jsx";
import {useState} from "react";
import CrmMenuLayout from "@/Pages/Crm/CrmMenuLayout.jsx";

export default function Create(props) {

    //https://vanilo.io/docs/4.x/products#all-product-fields
    const {data, setData, post, progress} = useForm({
        name: "",
        sku: "",
        price: "",
        images: ""
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
        post(route('product.store'))
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
                    <button type="submit" >Create</button>
                </form>
            </div>
        </CrmMenuLayout>
    );

}
