import {router, useForm, usePage} from "@inertiajs/react";
import CrmMenuLayout from "@/Layouts/CrmMenuLayout.jsx";
import TaxonomyForm from "@/Pages/Crm/Taxonomy/Components/TaxonomyForm.jsx";
import React, {useEffect, useState} from "react";
import {Form} from "antd";

export default function Create(props) {

  const [form] = Form.useForm();

  const initialValues = {
    name: "",
    slug: "",
    image: "",
  };

  const {errors} = usePage().props;
  const [precognitiveErrors, setPrecognitiveErrors] = useState({});

  useEffect(() => {
    setPrecognitiveErrors((prevErrors) => ({...prevErrors, ...errors}));
  }, [errors]);

  const validateField = async (fieldName, fieldValue) => {
    try {
      // Make a Precognition validation request
      await axios.post(
        route('taxonomy.store'),
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

  const [imageList, setImageList] = useState([]);

  function handleSubmit(e) {

    let data = form.getFieldsValue();
    data.image = imageList[0]?.originFileObj;

    router.post(route('taxonomy.store'), data);
  }

  return (
    <>
      <h1 className="text-2xl font-bold mb-6">Додати Категорію</h1>
      <TaxonomyForm form={form} submitHandler={handleSubmit} initialValues={initialValues}
                    errors={precognitiveErrors} validateFieldHandler={validateField}>
      </TaxonomyForm>
    </>
  );

}
