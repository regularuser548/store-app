import {router, useForm, usePage} from "@inertiajs/react";
import React, {useEffect, useState} from "react";
import CrmMenuLayout from "@/Layouts/CrmMenuLayout.jsx";
import ProductForm from "@/Pages/Crm/Product/Components/ProductForm.jsx";
import MediaUploadForm from "@/Pages/Crm/Product/Components/MediaUploadForm.jsx";
import {Form} from "antd";

export default function Create({taxonomyTree}) {

  //https://vanilo.io/docs/4.x/products#all-product-fields
  const initialValues = {
    name: "",
    sku: "",
    stock: "",
    price: "",
    weight: "",
    width: "",
    height: "",
    length: "",
    description: "",
    state: "draft",
    video_id: "",
    taxon_id: "",

    images: ""
  };

  const [form] = Form.useForm();

  const [uploadingImages, setUploadingImages] = useState([]);


  const {errors} = usePage().props;
  const [precognitiveErrors, setPrecognitiveErrors] = useState({});

  useEffect(() => {
    setPrecognitiveErrors((prevErrors) => ({...prevErrors, ...errors}));
  }, [errors]);

  const validateField = async (fieldName, fieldValue) => {
    try {
      // Make a Precognition validation request
      await axios.post(
        route('product.store'),
        form.getFieldsValue(),
        {headers: {Precognition: true}}
      );
      // Clear the error for the field if validation passes
      setPrecognitiveErrors((prevErrors) => ({...prevErrors, [fieldName]: undefined}));
    } catch (error) {
      if (error.response && error.response.data.errors) {
        // Set the validation error for the field
        setPrecognitiveErrors((prevErrors) => ({
          ...prevErrors,
          [fieldName]: error.response.data.errors[fieldName]?.[0],
        }));
      }
    }

  };

  function handleSubmit(e) {
    let data = form.getFieldsValue();

    data.images = uploadingImages.map(obj => obj.originFileObj);
    data.taxon_id = data.full_category_ids?.at(-1);

    //console.log(data);
    router.post(route('product.store'), data);
  }

  //console.log(usePage().props.errors);

  return (
    <>
      <h1 className="text-2xl font-bold mb-6">Додати Товар</h1>

      <ProductForm form={form} initialValues={initialValues} taxonomyTree={taxonomyTree} errors={precognitiveErrors}
                   submitHandler={handleSubmit}
                   uploadingImages={uploadingImages}
                   setUploadingImages={setUploadingImages}
                   validateFieldHandler={validateField}>
      </ProductForm>
    </>
  );

}
