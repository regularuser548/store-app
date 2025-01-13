import {router, useForm, usePage} from "@inertiajs/react";
import CrmMenuLayout from "@/Layouts/CrmMenuLayout.jsx";
import TaxonomyForm from "@/Pages/Crm/Taxonomy/Components/TaxonomyForm.jsx";
import TaxonForm from "@/Pages/Crm/Taxon/Components/TaxonForm.jsx";
import React, {useEffect, useState} from "react";
import {Form} from "antd";

export default function Create({taxon, taxons, taxonomy, props}) {

  const [form] = Form.useForm();

  const initialValues = {
    name: "",
    slug: "",
    parent_id: taxon.parent_id,
    priority: taxon.priority,
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
        route('taxon.store', {taxonomy: taxonomy.id}),
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

    router.post(route('taxon.store', {taxonomy: taxonomy.id}), data);
  }


  return (
    <>
      <h1 className="text-2xl font-bold mb-6">Додати Підкатегорію</h1>
      <TaxonForm form={form} submitHandler={handleSubmit} initialValues={initialValues}
                 errors={precognitiveErrors} validateFieldHandler={validateField} taxons={taxons}>
      </TaxonForm>
    </>
  );

}
