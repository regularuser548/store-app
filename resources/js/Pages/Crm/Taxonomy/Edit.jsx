import {router, useForm, usePage} from "@inertiajs/react";
import CrmMenuLayout from "@/Layouts/CrmMenuLayout.jsx";
import TaxonomyForm from "@/Pages/Crm/Taxonomy/Components/TaxonomyForm.jsx";
import {Button, Empty, Form} from "antd";
import React, {useEffect, useState} from "react";

export default function Edit({taxonomy, image = null, props}) {

  const [form] = Form.useForm();

  const initialValues = {
    name: taxonomy.name,
    slug: taxonomy.slug,
    image: taxonomy.image,
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
        route('taxonomy.update', {taxonomy: taxonomy.id}),
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
    data._method = 'put';

    router.post(route('taxonomy.update', {taxonomy: taxonomy.id}), data);
  }

  return (
    <>
      <h1 className="text-2xl font-bold mb-6">Редагувати Категорію</h1>
      <TaxonomyForm form={form} submitHandler={handleSubmit} initialValues={initialValues}
                    errors={precognitiveErrors} validateFieldHandler={validateField}>
      </TaxonomyForm>

      {/*{image ?*/}
      {/*  <img src={image} className='w-1/4' alt='image'/>*/}
      {/*  :*/}
      {/*  <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={'Немає іконки'}></Empty>}*/}

      <Button className=''
              onClick={e => router.delete(route('taxonomy.destroy', {taxonomy: taxonomy.id}))}>
        Видалити
      </Button>
    </>
  );

}
