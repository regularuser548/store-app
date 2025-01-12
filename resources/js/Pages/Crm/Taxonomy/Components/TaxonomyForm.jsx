import {usePage} from "@inertiajs/react";
import FormField from "@/Components/ShopHub/FormField.jsx";
import MediaUploadForm from "@/Pages/Crm/Product/Components/MediaUploadForm.jsx";
import React, {useState} from "react";
import {Button, Cascader, Col, Form, Input, Row, Select} from "antd";

export default function TaxonomyForm({form, submitHandler, initialValues, errors, validateFieldHandler}) {


  const handleBlur = (fieldName) => {
    const fieldValue = form.getFieldValue(fieldName);
    if (fieldValue !== undefined) {
      validateFieldHandler(fieldName, fieldValue);
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

  return (

    <Form
      form={form}
      {...formItemLayout}

      onFinish={submitHandler}
      autoComplete="off"
      initialValues={initialValues}
    >
      <Row gutter={16}>
        <Col span={12} xs={24} md={12}>
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
            label="Slug"
            name="slug"
            validateStatus={errors.slug ? "error" : ""}
            help={errors.slug || ""}
          >
            <Input onBlur={() => handleBlur("slug")}/>
          </Form.Item>
        </Col>
      </Row>

      <Row>
        <Col span={1}>
          <Form.Item label={null}>
            <Button type="primary" htmlType="submit">
              Відправити
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );


// return (
//
//   <form onSubmit={submit} className="border m-2 p-1">
  //
  // <FormField id='name' data={fields} placeholder='Ім&apos;я' required className='block'
  //                changeHandler={handleChange}></FormField>
  //     <FormField id='slug' data={fields} placeholder='Slug' className='block' changeHandler={handleChange}></FormField>
  //
  //     <MediaUploadForm fileList={imageList} changeHandler={setImageList} max={1} multiple={false} text='Додати Іконку'
  //                      accept='image/jpg, image/png, image/bmp, image/gif, image/svg, image/webp, image/avif'
  //                      listType='picture-card'>
  //     </MediaUploadForm>
  //
  //     <input type='submit' className='block' value='Відправити'></input>
  //
  //   </form>
  //
  // );
}
