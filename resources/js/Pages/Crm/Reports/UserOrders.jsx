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
      const updatedData = form.getFieldsValue();

      if (!editItem.user_id) {
        message.error("Поле 'user_id' відсутнє. Неможливо оновити дані.");
        return;
      }

      await axios.put("/crm/reports/orders/update", {
        ...editItem,
        ...updatedData,
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
    { title: "Ім'я", dataIndex: "name", key: "name" },
    { title: "Прізвище", dataIndex: "surname", key: "surname" },
    { title: "Електронна пошта", dataIndex: "email", key: "email" },
    { title: "Номер телефону", dataIndex: "phone_number", key: "phone_number" },
    { title: "Назва товару", dataIndex: "product_name", key: "product_name" },
    { title: "Кількість", dataIndex: "quantity", key: "quantity" },
    { title: "Дата замовлення", dataIndex: "created_at", key: "created_at" },
    {
      title: "Статус замовлення",
      dataIndex: "status",
      key: "status",
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
        title="Редагувати Замовлення"
        open={!!editItem}
        onCancel={() => setEditItem(null)}
        footer={[
          <Button key="cancel" onClick={() => setEditItem(null)}>
            Відмінити
          </Button>,
          <Button key="save" type="primary" onClick={handleSave}>
            Зберегти
          </Button>,
        ]}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="Статус замовлення"
            name="status"
            rules={[{ required: true, message: "Будь ласка, оберіть статус" }]}
          >
            <Select>
              <Option value="pending">Очікується</Option>
              <Option value="processing">Обробляється</Option>
              <Option value="completed">Завершено</Option>
              <Option value="cancelled">Скасовано</Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Електронна пошта"
            name="email"
            rules={[
              { type: "email", message: "Введіть дійсну адресу електронної пошти" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Номер телефону"
            name="phone_number"
            rules={[
              {
                pattern: /^[0-9+]*$/,
                message: "Введіть дійсний номер телефону",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
