import {Button, Cascader, Col, Form, Input, InputNumber, Row, Select} from "antd";
import React, {useState} from "react";
import MediaUploadForm from "@/Pages/Crm/Product/Components/MediaUploadForm.jsx";
import {router} from "@inertiajs/react";
import {PlusCircleOutlined, PlusOutlined} from "@ant-design/icons";

const {TextArea} = Input;

export default function ProductForm({
                                      form, initialValues, submitHandler, validateFieldHandler, taxonomyTree, errors,
                                      uploadingImages, setUploadingImages
                                    }) {

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
            <Input addonAfter="₴" onBlur={() => handleBlur("price")}/>
          </Form.Item>

          <Form.Item
            label="Вага"
            name="weight"
            validateStatus={errors.weight ? "error" : ""}
            help={errors.weight || ""}
          >
            <Input onBlur={() => handleBlur("weight")}/>
          </Form.Item>

          <Form.Item
            label="Ширина"
            name="width"
            validateStatus={errors.width ? "error" : ""}
            help={errors.width || ""}
          >
            <Input onBlur={() => handleBlur("width")}/>
          </Form.Item>


        </Col>


        <Col span={12} xs={24} md={12}>
          <Form.Item
            label="Висота"
            name="height"
            validateStatus={errors.height ? "error" : ""}
            help={errors.height || ""}
          >
            <Input onBlur={() => handleBlur("height")}/>
          </Form.Item>

          <Form.Item
            label="Довжина"
            name="length"
            validateStatus={errors.length ? "error" : ""}
            help={errors.length || ""}
          >
            <Input onBlur={() => handleBlur("length")}/>
          </Form.Item>


          <Form.Item
            label="Статус"
            name="state"
            validateStatus={errors.state ? "error" : ""}
            help={errors.state || ""}
            required
          >
            <Select
              // style={{
              //   width: 120,
              // }}
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
            name="full_category_ids"
            validateStatus={errors.full_category_ids ? "error" : ""}
            help={errors.full_category_ids || ""}
            required
          >
            <Cascader //placement={'topLeft'}
              fieldNames={{label: 'name', value: 'id'}}
              options={taxonomyTree}
              changeOnSelect/>
          </Form.Item>

          <Form.Item
            label="Відео"
            name="video_id"
            validateStatus={errors.video_id ? "error" : ""}
            help={errors.video_id || ""}
          >
            <Input addonBefore="youtube.com/watch?v=" onBlur={() => handleBlur("video_id")}/>
          </Form.Item>

          <Form.Item
            label="Опис"
            name="description"
            validateStatus={errors.description ? "error" : ""}
            help={errors.description || ""}
            required
          >
            <TextArea rows={4} onBlur={() => handleBlur("description")}/>
          </Form.Item>
        </Col>
      </Row>

      <Row>
        <Col span={24}>
          <Form.Item
            name="images"
            validateStatus={errors.images ? "error" : ""}
            help={errors.images || ""}
            required
          >
            <MediaUploadForm fileList={uploadingImages} changeHandler={setUploadingImages} max={10} text='Додати Фото'
                             accept='image/jpg, image/jpeg, image/png, image/bmp, image/gif, image/svg, image/webp, image/avif'
                             listType='picture-card'>

            </MediaUploadForm>
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
}
