import {usePage} from "@inertiajs/react";
import FormField from "@/Components/FormField.jsx";
import {Select, TreeSelect} from "antd";

export default function TaxonForm({fields, taxons, changeHandler, submit, props}) {

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

      {/*<Select id='parent'*/}
      {/*        defaultValue={fields.parent === null ? 'Немає батька' : fields.parent}*/}
      {/*        style={{*/}
      {/*          width: 150,*/}
      {/*        }}*/}
      {/*        onChange={(value) => changeHandler(values => ({*/}
      {/*          ...values,*/}
      {/*          ['parent']: value,*/}
      {/*        }))}*/}
      {/*        options={[*/}
      {/*          {label: 'Немає батька', value: null},*/}
      {/*          ...taxons*/}
      {/*        ]}*/}
      {/*/>*/}


      <TreeSelect
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
        treeData={[{title: 'Немає батька', value: ''}, ...taxons]}
        //onPopupScroll={onPopupScroll}
      />

      <FormField id='priority' data={fields} placeholder='Пріорітет' required className='block'
                 changeHandler={handleChange}></FormField>

      <input id="image" onChange={e => changeHandler('image', e.target.files[0])} type='file'
             accept="image/*" className=''/>
      {errors.image && <div className="text-red-500">{errors.image}</div>}

      <input type='submit' className='block' value='Відправити'></input>

    </form>

  );
}
