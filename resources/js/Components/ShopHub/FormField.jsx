import {Form, Input} from "antd";
import React from "react";

export default function FormField({
                                    id, form, label = null, placeholder = null, required = false, children = null,
                                    ...props
                                  }) {

  const rules = required ? [{required: true}] : [];

  return (
    <Form.Item
      label={label}
      name={id}
      hasFeedback={form.invalid(id)}
      validateStatus={form.invalid(id) ? 'error' : 'success'}
      help={form.invalid(id) ? form.errors[id] : ''}
      rules={rules}
    >
      {
        children ? children :

          <Input placeholder={placeholder} id={id}
                 //onChange={(e) => form.setData(id, e.target.value)}
                 onBlur={(e) => {form.setData(id, e.target.value);}} {...props}/>
      }
    </Form.Item>
  )
}
