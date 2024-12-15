import {usePage} from "@inertiajs/react";
import FormField from "@/Components/ShopHub/FormField.jsx";
import MediaUploadForm from "@/Pages/Crm/Product/Components/MediaUploadForm.jsx";
import {useState} from "react";

export default function TaxonomyForm({fields, imageList, setImageList, changeHandler, submit, props}) {

  const {errors} = usePage().props;

  function handleChange(e) {
    const key = e.target.id;
    const value = e.target.value
    changeHandler(values => ({
      ...values,
      [key]: value,
    }))

  }

  return (
    <form onSubmit={submit} className="border m-2 p-1">

      <FormField id='name' data={fields} placeholder='Ім&apos;я' required className='block'
                 changeHandler={handleChange}></FormField>
      <FormField id='slug' data={fields} placeholder='Slug' className='block' changeHandler={handleChange}></FormField>

      <MediaUploadForm fileList={imageList} changeHandler={setImageList} max={1} multiple={false} text='Додати Іконку'
                       accept='image/jpg, image/png, image/bmp, image/gif, image/svg, image/webp, image/avif'
                       listType='picture-card'>
      </MediaUploadForm>

      <input type='submit' className='block' value='Відправити'></input>

    </form>

  );
}
