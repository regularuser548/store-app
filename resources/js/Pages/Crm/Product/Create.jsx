import {Head, router, useForm, usePage} from "@inertiajs/react";
import GuestLayout from "@/Layouts/GuestLayout.jsx";
import {useState} from "react";
import CrmMenuLayout from "@/Pages/Crm/CrmMenuLayout.jsx";
import TextInput from "@/Components/TextInput.jsx";
import SessionError from "@/Components/SessionError.jsx";
import FormField from "@/Components/FormField.jsx";
import ProductForm from "@/Pages/Crm/Product/Components/ProductForm.jsx";

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
        state: "",

        images: "",
        videos: ""
    });

    function handleSubmit(e) {
        e.preventDefault();
        post(route('product.store'));
    }

    return (
        <CrmMenuLayout>
            <ProductForm fields={data} changeHandler={setData} submit={handleSubmit}></ProductForm>
        </CrmMenuLayout>
    );

}
