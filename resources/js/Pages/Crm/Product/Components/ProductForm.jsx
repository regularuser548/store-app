import {usePage} from "@inertiajs/react";
import FormField from "@/Components/ShopHub/FormField.jsx";
import {Button, Cascader, Form, Input, Select} from "antd";
import React from "react";

const {TextArea} = Input;

export default function ProductForm({form, submit, taxonomyTree}) {

  const {errors} = usePage().props;

  function handleChange(e) {
    const key = e.target.id;
    const value = e.target.value
    // changeHandler(values => ({
    //   ...values,
    //   [key]: value,
    // }))
    form.setData(key, value);
  }

  const formItemLayout = {
    labelCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 6,
      },
    },
    wrapperCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 14,
      },
    },
  };
  //console.log(form.data)

  return (
    // <form onSubmit={submit} className='w-72 p-2'>
    //
    //   <FormField id='name' data={fields} changeHandler={handleChange}
    //              placeholder='Назва' required/>
    //
    //   <FormField id="sku" data={fields} onChange={handleChange} placeholder="SKU"
    //              required/>
    //
    //   <FormField id="stock" data={fields} onChange={handleChange} placeholder="Кількість" type='number'
    //              required min="0"/>
    //
    //   <FormField id="price" data={fields} onChange={handleChange} placeholder="Ціна" type='number'
    //              required min="0" addonAfter={'₴'}/>
    //
    //   <FormField id="weight" data={fields} onChange={handleChange} placeholder="Вага" type='number'
    //              min="0"/>
    //
    //   <FormField id="width" data={fields} onChange={handleChange} placeholder="Ширина" type='number'
    //              min="0"/>
    //
    //   <FormField id="height" data={fields} onChange={handleChange} placeholder="Висота" type='number'
    //              min="0"/>
    //
    //   <FormField id="length" data={fields} onChange={handleChange} placeholder="Довжина" type='number'
    //              min="0"/>
    //
    //   <TextArea id="description" value={fields.description} onChange={handleChange}
    //             placeholder="Опис" className={'m-2'} required/>
    //   {errors.description && <div className="text-red-500">{errors.description}</div>}
    //
    //   <FormField id="meta_keywords" data={fields} onChange={handleChange} placeholder="Ключові слова (розділяти ,)"
    //   />
    //
    //   <FormField addonBefore="youtube.com/watch?v=" id="video_id" data={fields} onChange={handleChange}
    //              placeholder="Id Відео"
    //   />
    //
    //   <Select
    //     defaultValue={fields.state}
    //     style={{
    //       width: 120,
    //     }}
    //     className={'m-2'}
    //     onChange={(value) => changeHandler(values => ({
    //       ...values,
    //       ['state']: value,
    //     }))}
    //     options={[
    //       {
    //         value: 'draft',
    //         label: 'Чорновий',
    //       },
    //       {
    //         value: 'inactive',
    //         label: 'Неактивний',
    //       },
    //       {
    //         value: 'active',
    //         label: 'Активний',
    //       },
    //       {
    //         value: 'unavailable',
    //         label: 'Недоступний',
    //       },
    //       {
    //         value: 'retired',
    //         label: 'У відставці',
    //       },
    //
    //     ]}
    //   ></Select>
    //   {errors.state && <div className="text-red-500">{errors.state}</div>}
    //
    //   <Cascader placement={'topLeft'} defaultValue={currentCategory} fieldNames={{label: 'name', value: 'id'}}
    //             options={taxonomyTree} onChange={(value) => changeHandler(values => ({
    //     ...values,
    //     ['taxon_id']: value?.at(-1),
    //   }))} changeOnSelect className={'m-2'}/>
    //
    //   <Button type="primary" onClick={submit} className={'m-2'}>Відправити</Button>
    // </form>

    // <form onSubmit={submit} className='w-72 p-2'>
    //
    //   <FormField id='name' form={form} label='Назва' placeholder='Назва' required/>
    //
    //   <FormField id="sku" form={form} placeholder="SKU"
    //              required/>
    //
    //   <FormField id="stock" form={form} placeholder="Кількість" type='number'
    //              required min="0"/>
    //
    //   <FormField id="price" form={form} placeholder="Ціна" type='number'
    //              required min="0" addonAfter={'₴'}/>
    //
    //   <FormField id="weight" form={form} placeholder="Вага" type='number'
    //              min="0"/>
    //
    //   <FormField id="width" form={form} placeholder="Ширина" type='number'
    //              min="0"/>
    //
    //   <FormField id="height" form={form} placeholder="Висота" type='number'
    //              min="0"/>
    //
    //   <FormField id="length" form={form} placeholder="Довжина" type='number'
    //              min="0"/>
    //
    //   <TextArea id="description" value={form.data.description} onChange={handleChange}
    //             placeholder="Опис" className={'m-2'} required/>
    //   {/*{errors.description && <div className="text-red-500">{errors.description}</div>}*/}
    //   {form.invalid('description') && <div>{form.errors.description}</div>}
    //
    //   {/*<FormField id="meta_keywords" data={fields} onChange={handleChange} placeholder="Ключові слова (розділяти ,)"*/}
    //   {/*/>*/}
    //
    //   <FormField addonBefore="youtube.com/watch?v=" id="video_id" form={form}
    //              placeholder="Id Відео"
    //   />
    //
    //   <Select
    //     defaultValue={form.data.state}
    //     style={{
    //       width: 120,
    //     }}
    //     className={'m-2'}
    //     onChange={(value) => form.setData('state', value)}
    //     options={[
    //       {
    //         value: 'draft',
    //         label: 'Чорновий',
    //       },
    //       {
    //         value: 'inactive',
    //         label: 'Неактивний',
    //       },
    //       {
    //         value: 'active',
    //         label: 'Активний',
    //       },
    //       {
    //         value: 'unavailable',
    //         label: 'Недоступний',
    //       },
    //       {
    //         value: 'retired',
    //         label: 'У відставці',
    //       },
    //
    //     ]}
    //   ></Select>
    //   {form.invalid('state') && <div>{form.errors.state}</div>}
    //
    //   <Cascader placement={'topLeft'} defaultValue={form.data.category_slugs}
    //             fieldNames={{label: 'name', value: 'id'}}
    //             options={taxonomyTree} onChange={(value) => form.setData('category_slugs', value?.at(-1))}
    //             changeOnSelect className={'m-2'}/>
    //
    //   <Button type="primary" onClick={submit} className={'m-2'}>Відправити</Button>
    // </form>

    <Form
      {...formItemLayout}
      style={{
        maxWidth: 600,
      }}
      onSubmit={submit}
      autoComplete="off"
      initialValues={form.data}
    >
      <FormField id='name' form={form} label='Назва' required/>

      <FormField id="sku" form={form} label="SKU"
                 required/>

      <FormField id="stock" form={form} label='Кількість' type='number'
                 required min="0"/>
      <FormField id="price" form={form} label="Ціна" type='number'
                 required min="0" addonAfter={'₴'}/>
      <FormField id="weight" form={form} label="Вага" type='number'
                 min="0"/>
      <FormField id="width" form={form} label="Ширина" type='number'
                 min="0"/>
      <FormField id="height" form={form} label="Висота" type='number'
                 min="0"/>
      <FormField id="length" form={form} label="Довжина" type='number'
                 min="0"/>

      <FormField id="description" form={form} label="Опис" required>
        <TextArea id="description" onChange={handleChange}
                  placeholder="Опис" className={'m-2'}/>
      </FormField>

      <FormField addonBefore="youtube.com/watch?v=" id="video_id" form={form}
                 label="Id Відео"
      />

      <Form.Item
        label='Статус'
        name='state'
        hasFeedback={form.invalid('state')}
        validateStatus={form.invalid('state') ? 'error' : 'success'}
        help={form.invalid('state') ? form.errors['state'] : ''}
        rules={[
          {
            required: true,
          },
        ]}>
        <Select
          value={form.data.state}
          style={{
            width: 120,
          }}
          className={'m-2'}
          onChange={(value) => form.setData('state', value)}
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
        {form.invalid('state') && <div>{form.errors.state}</div>}
      </Form.Item>

      <Form.Item
        label='Категорія'
        name='category_slugs'
        hasFeedback={form.invalid('category_slugs')}
        validateStatus={form.invalid('category_slugs') ? 'error' : 'success'}
        help={form.invalid('category_slugs') ? form.errors['category_slugs'] : ''}
        rules={[
          {
            required: true,
          },
        ]}>
        <Cascader placement={'topLeft'} value={form.data.category_slugs}
                  fieldNames={{label: 'name', value: 'id'}}
                  options={taxonomyTree} onChange={(value) => form.setData('category_slugs', value?.at(-1))}
                  changeOnSelect className={'m-2'}/>
      </Form.Item>

      <Form.Item label={null}>
        <Button type="primary" htmlType="submit">
          Відправити
        </Button>
      </Form.Item>

    </Form>


  );
}
