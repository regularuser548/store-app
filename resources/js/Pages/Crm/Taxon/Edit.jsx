import {router, useForm, usePage} from "@inertiajs/react";
import CrmMenuLayout from "@/Layouts/CrmMenuLayout.jsx";
import TaxonomyForm from "@/Pages/Crm/Taxonomy/Components/TaxonomyForm.jsx";
import TaxonForm from "@/Pages/Crm/Taxon/Components/TaxonForm.jsx";
import {Button, Empty, Form} from "antd";
import React, {useEffect, useState} from "react";

export default function Edit({taxon, taxonomy, taxons, image = null, props}) {

  const initialValues = {
    name: taxon.name,
    slug: taxon.slug,
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
      await axios.put(
        route('taxon.update', {taxonomy: taxonomy.id}),
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

  const [form] = Form.useForm();

  const [imageList, setImageList] = useState([]);

  function handleSubmit(e) {
    let data = form.getFieldsValue();

    data.image = imageList[0]?.originFileObj;
    data._method = 'put';

    router.post(route('taxon.update', {taxonomy: taxonomy.id, taxon: taxon.id}), data);
  }

  return (
    <>
      <h1 className="text-2xl font-bold mb-6">Редагувати Підкатегорію</h1>
      <TaxonForm form={form} submitHandler={handleSubmit} initialValues={initialValues}
                 errors={precognitiveErrors} validateFieldHandler={validateField} taxons={taxons}>
      </TaxonForm>

      <Button className=''
              onClick={e => router.visit(route('taxon.create', {taxonomy: taxonomy.id, parent: taxon.id}))}>Додати
        Підкатегорію
      </Button>

      <Button className='m-2 p-1'
              onClick={e => router.delete(route('taxon.destroy', {taxonomy: taxonomy.id, taxon: taxon.id}))}>Видалити
      </Button>
    </>
  );

}
