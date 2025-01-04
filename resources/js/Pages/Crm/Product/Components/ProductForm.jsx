import {Button, Cascader, Form, Input, Select} from "antd";
import React, {useState} from "react";

const {TextArea} = Input;

export default function ProductForm({initialValues, submit, submitUrl, taxonomyTree}) {

  const [form] = Form.useForm();
  const [errors, setErrors] = useState({});


  const validateField = async (fieldName, fieldValue) => {
    try {
      // Make a Precognition validation request
      await axios.put(
        submitUrl,
        //{ [fieldName]: fieldValue },
        form.getFieldsValue(),
        { headers: { Precognition: true } }
      );
      // Clear the error for the field if validation passes
      setErrors((prevErrors) => ({ ...prevErrors, [fieldName]: undefined }));
    } catch (error) {
      if (error.response && error.response.data.errors) {
        // Set the validation error for the field
        setErrors((prevErrors) => ({
          ...prevErrors,
          [fieldName]: error.response.data.errors[fieldName]?.[0],
        }));
      }
    }

  };

    console.log(errors);

  const handleBlur = (fieldName) => {
    const fieldValue = form.getFieldValue(fieldName);
    if (fieldValue !== undefined) {
      validateField(fieldName, fieldValue);
    }
  };

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

    <Form
      form={form}
      {...formItemLayout}
      style={{
        maxWidth: 600,
      }}
      onSubmit={submit}
      autoComplete="off"
      initialValues={initialValues}
    >
      <Form.Item
        label="Ім'я"
        name="name"
        validateStatus={errors.name ? "error" : ""}
        help={errors.name || ""}
        required
      >
        <Input onBlur={() => handleBlur("name")}/>
      </Form.Item>

      <Form.Item
        label="SKU"
        name="sku"
        validateStatus={errors.sku ? "error" : ""}
        help={errors.sku || ""}
        required
      >
        <Input onBlur={() => handleBlur("sku")}/>
      </Form.Item>

      <Form.Item
        label="Кількість"
        name="stock"
        validateStatus={errors.stock ? "error" : ""}
        help={errors.stock || ""}
        required
      >
        <Input onBlur={() => handleBlur("stock")}/>
      </Form.Item>

      <Form.Item
        label="Ціна"
        name="price"
        validateStatus={errors.price ? "error" : ""}
        help={errors.price || ""}
        required
      >
        <Input onBlur={() => handleBlur("price")}/>
      </Form.Item>

      <Form.Item
        label="Вага"
        name="weight"
        validateStatus={errors.weight ? "error" : ""}
        help={errors.weight || ""}
        required
      >
        <Input onBlur={() => handleBlur("weight")}/>
      </Form.Item>

      <Form.Item
        label="Ширина"
        name="width"
        validateStatus={errors.width ? "error" : ""}
        help={errors.width || ""}
        required
      >
        <Input onBlur={() => handleBlur("width")}/>
      </Form.Item>

      <Form.Item
        label="Висота"
        name="height"
        validateStatus={errors.height ? "error" : ""}
        help={errors.height || ""}
        required
      >
        <Input onBlur={() => handleBlur("height")}/>
      </Form.Item>

      <Form.Item
        label="Довжина"
        name="length"
        validateStatus={errors.length ? "error" : ""}
        help={errors.length || ""}
        required
      >
        <Input onBlur={() => handleBlur("length")}/>
      </Form.Item>

      <Form.Item
        label="Опис"
        name="description"
        validateStatus={errors.description ? "error" : ""}
        help={errors.description || ""}
        required
      >
        <TextArea onBlur={() => handleBlur("description")}/>
      </Form.Item>

      <Form.Item
        label="Відео"
        name="video_id"
        validateStatus={errors.video_id ? "error" : ""}
        help={errors.video_id || ""}
        required
      >
        <Input onBlur={() => handleBlur("video_id")}/>
      </Form.Item>

      <Form.Item
        label="Статус"
        name="state"
        validateStatus={errors.state ? "error" : ""}
        help={errors.state || ""}
        required
      >
        <Select
          //value={form.data.state}
          // style={{
          //   width: 120,
          // }}
          className={'m-2'}
          //onChange={(value) => form.setData('state', value)}
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
      </Form.Item>

      <Form.Item
        label="Категорія"
        name="category_slugs"
        validateStatus={errors.category_slugs ? "error" : ""}
        help={errors.category_slugs || ""}
        required
      >
          <Cascader placement={'topLeft'} //value={form.data.category_slugs}
                    fieldNames={{label: 'name', value: 'id'}}
                    options={taxonomyTree} //onChange={(value) => form.setData('category_slugs', value?.at(-1))}
                    changeOnSelect className={'m-2'}/>
      </Form.Item>

      <Form.Item label={null}>
        <Button type="primary" htmlType="submit">
          Відправити
        </Button>
      </Form.Item>

      {/*<FormField id="sku" form={form} label="SKU"*/}
      {/*           required/>*/}

      {/*<FormField id="stock" form={form} label='Кількість' type='number'*/}
      {/*           required min="0"/>*/}
      {/*<FormField id="price" form={form} label="Ціна" type='number'*/}
      {/*           required min="0" addonAfter={'₴'}/>*/}
      {/*<FormField id="weight" form={form} label="Вага" type='number'*/}
      {/*           min="0"/>*/}
      {/*<FormField id="width" form={form} label="Ширина" type='number'*/}
      {/*           min="0"/>*/}
      {/*<FormField id="height" form={form} label="Висота" type='number'*/}
      {/*           min="0"/>*/}
      {/*<FormField id="length" form={form} label="Довжина" type='number'*/}
      {/*           min="0"/>*/}

      {/*<FormField id="description" form={form} label="Опис" required>*/}
      {/*  <TextArea id="description" onChange={handleChange}*/}
      {/*            placeholder="Опис" className={'m-2'}/>*/}
      {/*</FormField>*/}

      {/*<FormField addonBefore="youtube.com/watch?v=" id="video_id" form={form}*/}
      {/*           label="Id Відео"*/}
      {/*/>*/}

      {/*<Form.Item*/}
      {/*  label='Статус'*/}
      {/*  name='state'*/}
      {/*  hasFeedback={form.invalid('state')}*/}
      {/*  validateStatus={form.invalid('state') ? 'error' : 'success'}*/}
      {/*  help={form.invalid('state') ? form.errors['state'] : ''}*/}
      {/*  rules={[*/}
      {/*    {*/}
      {/*      required: true,*/}
      {/*    },*/}
      {/*  ]}>*/}
      {/*  <Select*/}
      {/*    value={form.data.state}*/}
      {/*    style={{*/}
      {/*      width: 120,*/}
      {/*    }}*/}
      {/*    className={'m-2'}*/}
      {/*    onChange={(value) => form.setData('state', value)}*/}
      {/*    options={[*/}
      {/*      {*/}
      {/*        value: 'draft',*/}
      {/*        label: 'Чорновий',*/}
      {/*      },*/}
      {/*      {*/}
      {/*        value: 'inactive',*/}
      {/*        label: 'Неактивний',*/}
      {/*      },*/}
      {/*      {*/}
      {/*        value: 'active',*/}
      {/*        label: 'Активний',*/}
      {/*      },*/}
      {/*      {*/}
      {/*        value: 'unavailable',*/}
      {/*        label: 'Недоступний',*/}
      {/*      },*/}
      {/*      {*/}
      {/*        value: 'retired',*/}
      {/*        label: 'У відставці',*/}
      {/*      },*/}

      {/*    ]}*/}
      {/*  ></Select>*/}
      {/*  {form.invalid('state') && <div>{form.errors.state}</div>}*/}
      {/*</Form.Item>*/}

      {/*<Form.Item*/}
      {/*  label='Категорія'*/}
      {/*  name='category_slugs'*/}
      {/*  hasFeedback={form.invalid('category_slugs')}*/}
      {/*  validateStatus={form.invalid('category_slugs') ? 'error' : 'success'}*/}
      {/*  help={form.invalid('category_slugs') ? form.errors['category_slugs'] : ''}*/}
      {/*  rules={[*/}
      {/*    {*/}
      {/*      required: true,*/}
      {/*    },*/}
      {/*  ]}>*/}
      {/*  <Cascader placement={'topLeft'} value={form.data.category_slugs}*/}
      {/*            fieldNames={{label: 'name', value: 'id'}}*/}
      {/*            options={taxonomyTree} onChange={(value) => form.setData('category_slugs', value?.at(-1))}*/}
      {/*            changeOnSelect className={'m-2'}/>*/}
      {/*</Form.Item>*/}

      {/*<Form.Item label={null}>*/}
      {/*  <Button type="primary" htmlType="submit">*/}
      {/*    Відправити*/}
      {/*  </Button>*/}
      {/*</Form.Item>*/}

    </Form>


  );
}
