import {Head, router, useForm, usePage} from "@inertiajs/react";
import GuestLayout from "@/Layouts/GuestLayout.jsx";
import {useState} from "react";
import CrmMenuLayout from "@/Pages/Crm/CrmMenuLayout.jsx";
import TextInput from "@/Components/TextInput.jsx";
import SessionError from "@/Components/SessionError.jsx";
import FormField from "@/Components/FormField.jsx";

export default function Create(props) {

    //https://vanilo.io/docs/4.x/products#all-product-fields
    const {data, setData, post, progress} = useForm({
        name: "",
        sku: "",
        stock: "",
        price: "",
        weight: "",
        width: "",
        height: "",
        length: "",
        description: "",
        meta_keywords: "",

        images: "",
        videos: ""
    })

    const {errors} = usePage().props;


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

                    <FormField id='name' data={data} changeHandler={handleChange}
                               placeholder='Name' className='block' required/>

                    <FormField id="sku" data={data} onChange={handleChange} placeholder="SKU" className='block'
                           required/>

                    <FormField id="stock" data={data} onChange={handleChange} placeholder="Stock" type='number'
                           className='block' required min="0"/>

                    <FormField id="price" data={data} onChange={handleChange} placeholder="Price" type='number'
                           className='block' required min="0"/>

                    <FormField id="weight" data={data} onChange={handleChange} placeholder="Weight" type='number'
                           className='block' min="0"/>

                    <FormField id="width" data={data} onChange={handleChange} placeholder="Width" type='number'
                           className='block' min="0"/>

                    <FormField id="height" data={data} onChange={handleChange} placeholder="Height" type='number'
                           className='block' min="0"/>

                    <FormField id="length" data={data} onChange={handleChange} placeholder="Length" type='number'
                           className='block' min="0"/>

                    <textarea id="description" value={data.description} onChange={handleChange}
                              placeholder="Description" className='block' required/>
                    {errors.description && <div className="text-red-500">{errors.description}</div>}

                    <FormField id="meta_keywords" data={data} onChange={handleChange} placeholder="Keywords"
                           className='block'/>

                    <label htmlFor="videos" className='block'>Videos</label>
                    <FormField id="videos"  onChange={e => setData('videos', e.target.files)} type='file' multiple
                           accept="video/*" className=''/>

                    <label htmlFor="images" className='block'>Images</label>
                    <FormField id="images" onChange={e => setData('images', e.target.files)} type='file' multiple
                           accept="image/*" className='' required/>

                    <button type="submit" className='block'>Create</button>
                </form>
            </div>
        </CrmMenuLayout>
    );

}
