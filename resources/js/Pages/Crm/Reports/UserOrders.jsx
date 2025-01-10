import React, { useState } from "react";
import { Table, Button, Modal, Form, Select, message, Input } from "antd";
import axios from "axios";

const { Option } = Select;

export default function UserOrders({ orders, orderItems }) {
  const [editItem, setEditItem] = useState(null);
  const [form] = Form.useForm();

  const handleEdit = (item) => {
    setEditItem(item);
    form.setFieldsValue(item);
  };

  const handleSave = async () => {
    try {
      console.log(editItem);
      const updatedData = form.getFieldsValue();
      await axios.put('/crm/reports/orders/update', {
        ...editItem, // данные редактируемого элемента
        ...updatedData, // обновленные значения из формы
      });
      message.success("Дані оновлено успішно!");
      setEditItem(null);
    } catch (error) {
      if (error.response) {
        console.error("Ошибка на сервере:", error.response.data);
        message.error("Не вдалося оновити дані: " + error.response.data.message);
      } else {
        console.error("Неизвестная ошибка:", error);
        message.error("Сталася невідома помилка.");
      }
    }
  };


  const columns = [
    { title: "№ Замовлення", dataIndex: "order_id", key: "order_id" },
    { title: "Ім'я", dataIndex: "first_name", key: "first_name" },
    { title: "Прізвище", dataIndex: "surname", key: "surname" },
    { title: "Електронна пошта", dataIndex: "email", key: "email" },
    { title: "Номер телефону", dataIndex: "phone", key: "phone" },
    { title: "Назва товару", dataIndex: "product_name", key: "product_name" },
    { title: "Кількість", dataIndex: "quantity", key: "quantity" },
    { title: "Дата замовлення", dataIndex: "created_at", key: "created_at" },
    {
      title: "Ціна",
      dataIndex: "price",
      key: "price",
      render: (price) => `$${price}`,
    },
    {
      title: "Статус замовлення",
      dataIndex: "fulfillment_status",
      key: "fulfillment_status",
    },
    {
      title: "Дії",
      key: "actions",
      render: (_, record) => (
        <Button type="link" onClick={() => handleEdit(record)}>
          Редагувати
        </Button>
      ),
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Замовлення користувача</h1>
      <Table
        dataSource={orderItems.map((item) => ({
          ...item,
          ...orders.find((order) => order.id === item.order_id),
        }))}
        columns={columns}
        rowKey="order_id"
        bordered
        pagination={false}
      />

      <Modal
        title="Edit Order Item"
        open={!!editItem}
        onCancel={() => setEditItem(null)}
        footer={[
          <Button key="cancel" onClick={() => setEditItem(null)}>
            Cancel
          </Button>,
          <Button key="save" type="primary" onClick={handleSave}>
            Save
          </Button>,
        ]}
      >
        <Form form={form} layout="vertical">
          <Form.Item label="Fulfillment Status" name="fulfillment_status">
            <Select>
              <Option value="pending">Pending</Option>
              <Option value="processing">Processing</Option>
              <Option value="completed">Completed</Option>
              <Option value="canceled">Canceled</Option>
            </Select>
          </Form.Item>
          <Form.Item label="Електронна пошта" name="email" rules={[{ type: "email", message: "Введіть дійсну адресу електронної пошти" }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Номер телефону" name="phone" rules={[{ pattern: /^[0-9+]*$/, message: "Введіть дійсний номер телефону" }]}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
