import {usePage} from "@inertiajs/react";
import FormField from "@/Components/FormField.jsx";
import {Button, Cascader, Input, Select} from "antd";

const {TextArea} = Input;

export default function ProductForm({fields, changeHandler, submit, taxonomyTree}) {

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
    <form onSubmit={submit} className='w-72'>

      <FormField id='name' data={fields} changeHandler={handleChange}
                 placeholder='Назва' className='block' required/>

      <FormField id="sku" data={fields} onChange={handleChange} placeholder="SKU" className='block'
                 required/>

      <FormField id="stock" data={fields} onChange={handleChange} placeholder="Кількість" type='number'
                 className='block' required min="0"/>

      <FormField id="price" data={fields} onChange={handleChange} placeholder="Ціна" type='number'
                 className='block' required min="0"/>

      <FormField id="weight" data={fields} onChange={handleChange} placeholder="Вага" type='number'
                 className='block' min="0"/>

      <FormField id="width" data={fields} onChange={handleChange} placeholder="Ширина" type='number'
                 className='block' min="0"/>

      <FormField id="height" data={fields} onChange={handleChange} placeholder="Висота" type='number'
                 className='block' min="0"/>

      <FormField id="length" data={fields} onChange={handleChange} placeholder="Довжина" type='number'
                 className='block' min="0"/>

      <TextArea id="description" value={fields.description} onChange={handleChange}
                placeholder="Опис" className='block' required/>
      {errors.description && <div className="text-red-500">{errors.description}</div>}

      <FormField id="meta_keywords" data={fields} onChange={handleChange} placeholder="Ключові слова (розділяти ,)"
                 className='block'/>

      <FormField addonBefore="youtube.com/watch?v=" id="video_id" data={fields} onChange={handleChange}
                 placeholder="Id Відео"
                 className='block'/>

      {/*<select id="state" value={fields.state} onChange={handleChange}>*/}
      {/*  <option value="draft">Draft</option>*/}
      {/*  <option value="inactive">Inactive</option>*/}
      {/*  <option value="active">Active</option>*/}
      {/*  <option value="unavailable">Unavailable</option>*/}
      {/*  <option value="retired">Retired</option>*/}
      {/*</select>*/}

      <Select
        defaultValue={fields.state}
        style={{
          width: 120,
        }}
        onChange={(value) => changeHandler(values => ({
          ...values,
          ['state']: value,
        }))}
        options={[
          {
            value: 'draft',
            label: 'Чорновий',
          },
          {
            value: 'inactive',
            label: 'Неактивний',
          },
          {
            value: 'active',
            label: 'Активний',
          },
          {
            value: 'unavailable',
            label: 'Недоступний',
          },
          {
            value: 'retired',
            label: 'У відставці',
          },

        ]}
      ></Select>
      {errors.state && <div className="text-red-500">{errors.state}</div>}

      <Cascader fieldNames={{label: 'name', value: 'id'}} options={taxonomyTree} onChange={(value) => changeHandler(values => ({
        ...values,
        ['taxon_id']: value?.at(-1),
      }))} changeOnSelect/>

      <Button type="primary" onClick={submit}>Відправити</Button>
    </form>

  );
}
