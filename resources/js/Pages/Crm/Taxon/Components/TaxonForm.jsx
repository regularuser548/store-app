import {usePage} from "@inertiajs/react";
import FormField from "@/Components/ShopHub/FormField.jsx";
import {Button, Col, Form, Input, Row, Select, TreeSelect} from "antd";
import MediaUploadForm from "@/Pages/Crm/Product/Components/MediaUploadForm.jsx";
import React from "react";

export default function TaxonForm({
                                    form, submitHandler, initialValues,
                                    errors, validateFieldHandler, taxons
                                  }) {

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

  const handleBlur = (fieldName) => {
    const fieldValue = form.getFieldValue(fieldName);
    if (fieldValue !== undefined) {
      validateFieldHandler(fieldName, fieldValue);
    }
  };

  console.log(errors)

  return (
    // <form onSubmit={submit} className="border m-2 p-1">
    //
    //   <FormField id='name' data={fields} placeholder='Ім&apos;я' required className='block'
    //              changeHandler={handleChange}></FormField>
    //   <FormField id='slug' data={fields} placeholder='Slug' className='block' changeHandler={handleChange}></FormField>
    //
    //   <TreeSelect
    //     fieldNames={{label: 'name', value: 'id'}}
    //     id='parent_id'
    //     //showSearch
    //     style={{
    //       width: '100%',
    //     }}
    //     value={fields.parent_id === null ? 'Немає батька' : fields.parent_id}
    //     dropdownStyle={{
    //       maxHeight: 400,
    //       overflow: 'auto',
    //     }}
    //     placeholder="Оберіть батька"
    //     //allowClear
    //     onChange={handleSelect}
    //     treeDefaultExpandAll
    //     //onChange={onChange}
    //     treeData={[{name: 'Немає батька', id: ''}, ...taxons]}
    //     //onPopupScroll={onPopupScroll}
    //   />
    //
    //   <FormField id='priority' data={fields} placeholder='Пріорітет' required className='block'
    //              changeHandler={handleChange}></FormField>
    //
    //   <MediaUploadForm fileList={imageList} changeHandler={setImageList} max={1} multiple={false} text='Додати Іконку'
    //                    accept='image/jpg, image/png, image/bmp, image/gif, image/svg, image/webp, image/avif'
    //                    listType='picture-card'>
    //   </MediaUploadForm>
    //
    //   <input type='submit' className='block' value='Відправити'></input>
    //
    // </form>

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

          <Form.Item
            label="Батько"
            name="parent_id"
            validateStatus={errors.parent_id ? "error" : ""}
            help={errors.parent_id || ""}
            required
          >
            <TreeSelect
              fieldNames={{label: 'name', value: 'id'}}
              // value={fields.parent_id === null ? 'Немає батька' : fields.parent_id}
              // dropdownStyle={{
              //   maxHeight: 400,
              //   overflow: 'auto',
              // }}
              placeholder="Оберіть батька"
              //allowClear
              // onChange={handleSelect}
              treeDefaultExpandAll
              //onChange={onChange}
              treeData={[{name: 'Немає батька', id: ''}, ...taxons]}
              //onPopupScroll={onPopupScroll}
            />
          </Form.Item>

          <Form.Item
            label="Пріорітет"
            name="priority"
            validateStatus={errors.priority ? "error" : ""}
            help={errors.priority || ""}
            required
          >
            <Input onBlur={() => handleBlur("priority")}/>
          </Form.Item>

        </Col>
      </Row>

      <Row>
        <Col span={12}>
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
