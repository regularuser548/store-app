import {Head, router} from "@inertiajs/react";
import GuestLayout from "@/Layouts/GuestLayout.jsx";
import {useState} from "react";

export default function Create(props) {


    //https://vanilo.io/docs/4.x/products#all-product-fields
    const [values, setValues] = useState({
        name: "",
        sku: "",
        price: "",
        images: null
    })

    function handleChange(e) {
        const key = e.target.id;
        const value = e.target.value
        setValues(values => ({
            ...values,
            [key]: value,
        }))
    }

    function handleSubmit(e) {
        e.preventDefault()
        router.post('/crm/product', values)
    }

    return (
        <div>
            <Head title="ShopHub CRM" />
            <div className="">
                <form onSubmit={handleSubmit}>

                    <input id="name" value={values.name} onChange={handleChange} placeholder="Name" className='block' />

                    <input id="sku" value={values.sku} onChange={handleChange} placeholder="SKU" className='block'/>

                    <input id="price" value={values.price} onChange={handleChange} placeholder="Price" type='number' className='block'/>
                    <input id="images" value={values.images} onChange={handleChange} type='file' multiple accept="image/*" className='block'/>
                    <button type="submit" >Create</button>
                </form>
            </div>
        </div>
    );
}
