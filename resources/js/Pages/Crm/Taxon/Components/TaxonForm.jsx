import {usePage} from "@inertiajs/react";
import FormField from "@/Components/FormField.jsx";
import {Select, TreeSelect} from "antd";
import MediaUploadForm from "@/Pages/Crm/Product/Components/MediaUploadForm.jsx";

export default function TaxonForm({fields, imageList, setImageList, taxons, changeHandler, submit, props}) {

  const {errors} = usePage().props;

  function handleChange(e) {
    const key = e.target.id;
    const value = e.target.value
    changeHandler(values => ({
      ...values,
      [key]: value,
    }))

  }

  function handleSelect(value) {
    changeHandler(values => ({
      ...values,
      ['parent_id']: value,
    }))
  }

  return (
    <form onSubmit={submit} className="border m-2 p-1">

      <FormField id='name' data={fields} placeholder='Ім&apos;я' required className='block'
                 changeHandler={handleChange}></FormField>
      <FormField id='slug' data={fields} placeholder='Slug' className='block' changeHandler={handleChange}></FormField>

      <TreeSelect
        fieldNames={{label: 'name', value: 'id'}}
        id='parent_id'
        //showSearch
        style={{
          width: '100%',
        }}
        value={fields.parent_id === null ? 'Немає батька' : fields.parent_id}
        dropdownStyle={{
          maxHeight: 400,
          overflow: 'auto',
        }}
        placeholder="Оберіть батька"
        //allowClear
        onChange={handleSelect}
        treeDefaultExpandAll
        //onChange={onChange}
        treeData={[{name: 'Немає батька', id: ''}, ...taxons]}
        //onPopupScroll={onPopupScroll}
      />

      <FormField id='priority' data={fields} placeholder='Пріорітет' required className='block'
                 changeHandler={handleChange}></FormField>

      <MediaUploadForm fileList={imageList} changeHandler={setImageList} max={1} multiple={false} text='Додати Іконку'
                       accept='image/jpg, image/png, image/bmp, image/gif, image/svg, image/webp, image/avif'
                       listType='picture-card'>
      </MediaUploadForm>

      <input type='submit' className='block' value='Відправити'></input>

    </form>

  );
}
