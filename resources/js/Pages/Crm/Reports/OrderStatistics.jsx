import React, { useState } from "react";
import { Table, Button, Modal, Form, Input, Select, message } from "antd";

const { Option } = Select;

export default function OrderStatistics({ productStatistics, userRole }) {
  const [editData, setEditData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const handleEdit = (userData) => {
    setEditData(userData);
    form.setFieldsValue(userData);
  };

  const handleSave = async () => {
    try {
      const updatedData = form.getFieldsValue();
      setLoading(true);
      await axios.put(`/crm/reports/statistics/update`, { ...editData, ...updatedData });
      message.success("Data updated successfully!");
      setEditData(null);
    } catch (error) {
      console.error("Failed to save data:", error);
      message.error("Failed to update data.");
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    { title: "ID користувача", dataIndex: "user_id", key: "user_id" },
    { title: "Ім'я", dataIndex: "user_name", key: "user_name" },
    { title: "Прізвище", dataIndex: "surname", key: "surname" },
    { title: "Електронна пошта", dataIndex: "user_email", key: "user_email" },
    { title: "Номер телефону", dataIndex: "phone_number", key: "phone_number" },
    { title: "Статус", dataIndex: "status", key: "status" },
    { title: "Назва продукту", dataIndex: "product_name", key: "product_name" },
    { title: "Ціна", dataIndex: "price", key: "price", render: (price) => `$${price}` },
    { title: "Загальна кількість замовлень", dataIndex: "total_quantity_by_user", key: "total_quantity_by_user" },
    { title: "Всього замовлень", dataIndex: "total_orders_by_user", key: "total_orders_by_user" },
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
      <h1 className="text-2xl font-bold mb-4">Статистика замовлень</h1>
      <Table
        dataSource={productStatistics}
        columns={columns}
        rowKey="user_id"
        bordered
        pagination={false}
      />

      <Modal
        title="Редагувати дані користувача"
        open={!!editData}
        onCancel={() => setEditData(null)}
        footer={[
          <Button key="cancel" onClick={() => setEditData(null)}>
            Скасувати
          </Button>,
          <Button key="save" type="primary" onClick={handleSave} loading={loading}>
            {loading ? "Збереження..." : "Зберегти"}
          </Button>,
        ]}
      >
        <Form form={form} layout="vertical">
          <Form.Item label="Статус" name="status" rules={[{ required: true, message: "Status is required" }]}>
            <Select>
              <Option value="pending">Pending</Option>
              <Option value="processing">Processing</Option>
              <Option value="completed">Completed</Option>
              <Option value="canceled">Canceled</Option>
            </Select>
          </Form.Item>

          {(userRole === "moderator" || userRole === "admin") && (
            <>
              <Form.Item label="Номер телефону" name="phone_number">
                <Input />
              </Form.Item>
              <Form.Item label="Електронна пошта" name="user_email" rules={[{ type: "email", message: "Invalid email" }]}>
                <Input />
              </Form.Item>
            </>
          )}
        </Form>
      </Modal>
    </div>
  );
}
