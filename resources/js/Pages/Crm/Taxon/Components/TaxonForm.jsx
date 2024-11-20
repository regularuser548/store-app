import {usePage} from "@inertiajs/react";
import FormField from "@/Components/FormField.jsx";
import {Select} from "antd";

export default function TaxonForm({fields, taxons, changeHandler, submit, props}) {

  const {errors} = usePage().props;

  const selectDefaultValue = {
    value: '0',
    label: 'Немає батька',
  }

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
      {console.log(taxons)}

      <FormField id='name' data={fields} placeholder='Ім&apos;я' required className='block'
                 changeHandler={handleChange}></FormField>
      <FormField id='slug' data={fields} placeholder='Slug' className='block' changeHandler={handleChange}></FormField>

      <Select id='parent'
              defaultValue={fields.parent === null ? 'Немає батька' : fields.parent}
              style={{
                width: 150,
              }}
              onChange={(value) => changeHandler(values => ({
                ...values,
                ['parent']: value,
              }))}
              options={[
                ...taxons
              ]}
      />

      <FormField id='priority' data={fields} placeholder='Priority' required className='block'
                 changeHandler={handleChange}></FormField>

      <input id="image" onChange={e => changeHandler('image', e.target.files[0])} type='file'
             accept="image/*" className=''/>
      {errors.image && <div className="text-red-500">{errors.image}</div>}

      <input type='submit' className='block' value='Submit'></input>

    </form>

  );
}
