import React, {useEffect, useState} from "react";
import { useForm } from "@inertiajs/react";
import { Form, Input, Button, Typography, List, message, Checkbox, Select } from "antd";

const { Paragraph } = Typography;
const { Option } = Select;

export default function Checkout({ cartItems, userData, total: initialTotal, cities }) {
  const [total, setTotal] = useState(initialTotal);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [cityList, setCityList] = useState(cities || []);
  const { data, setData, post } = useForm({
    name: userData.name || "",
    surname: userData.surname || "",
    email: userData.email || "",
    phone_number: userData.phone_number || "",
    city: userData.city || "",
    street: userData.street || "",
    house: userData.house || "",
    apartment: userData.apartment || "",
    address: `${userData.street || ""}, ${userData.house || ""}, ${userData.apartment || ""}`,
    notes: "",
    items: cartItems,
  });


  const handleChange = (e) => {
    setData(e.target.name, e.target.value);
    console.log(data);
    setFormErrors({ ...formErrors, [e.target.name]: null });
  };

  const handleCityChange = (value) => {
    setData("city", value);
    setFormErrors({ ...formErrors, city: null });
  };

  const handleChangePhone = (e) => {
    const { name, value } = e.target;
    setData(name, value);

    const phoneRegex = /^\+380\d{9}$/;
    if (!phoneRegex.test(value)) {
      setFormErrors((prev) => ({
        ...prev,
        phone_number: "Введіть коректний номер у форматі +380XXXXXXXXX",
      }));
    } else {
      setFormErrors((prev) => ({ ...prev, phone_number: null }));
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!data.name.trim()) errors.name = "Поле ім'я є обов'язковим";
    if (!data.surname.trim()) errors.surname = "Поле прізвище є обов'язковим";
    if (!data.email.trim()) errors.email = "Поле електронна пошта є обов'язковим";
    if (!data.phone_number.trim()) {
      errors.phone_number = "Поле номер телефону є обов'язковим";
    } else {
      const phoneRegex = /^\+380\d{9}$/;
      if (!phoneRegex.test(data.phone_number)) {
        errors.phone_number = "Введіть коректний номер у форматі +380XXXXXXXXX";
      }
    }
    if (!data.city.trim()) errors.city = "Поле місто є обов'язковим";
    if (!data.street.trim() || !data.house.trim() || !data.apartment.trim()) {
      errors.address = "Адреса повинна бути заповнена (вулиця, будинок, квартира)";
    }
    if (cartItems.length === 0) errors.items = "Ваш кошик порожній";
    return errors;
  };



  const handleSubmit = () => {
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    if (!isConfirmed) {
      message.error("Підтвердіть умови перед оформленням замовлення!");
      return;
    }
    post(route("checkout.store"), {
      onError: (errors) => {
        console.error("Ошибка отправки:", errors);
        setFormErrors(errors);
      },
      onSuccess: () => {
        message.success("Замовлення успішно оформлено!");
      },
    });
  };


  const handleSaveAddress = () => {
    const addressErrors = {};

    if (!data.street.trim()) {
      addressErrors.street = "Це поле обов'язкове";
    }
    if (!data.house.trim() || isNaN(Number(data.house))) {
      addressErrors.house = "Будинок повинен бути числом і це поле обов'язкове";
    }
    if (!data.apartment.trim() || isNaN(Number(data.apartment))) {
      addressErrors.apartment = "Квартира повинна бути числом і це поле обов'язкове";
    }

    if (Object.keys(addressErrors).length > 0) {
      setFormErrors(addressErrors);
      return;
    }

    setData((prevData) => ({
      ...prevData,
      address: `${data.street}, ${data.house}, ${data.apartment}`,
    }));

    message.success("Адреса успішно оновлена!");
  };

  const validateInitialAddress = () => {
    if (!userData.street || !userData.house || !userData.apartment) {
      return "Немає адреси";
    }
    return `${userData.street || ""}, ${userData.house || ""}, ${userData.apartment || ""}`;
  };

  useEffect(() => {
    setData((prevData) => ({
      ...prevData,
      address: validateInitialAddress(),
    }));
  }, []);



  return (
    <div className="min-h-screen bg-[#0F0F0F] text-white p-6">
      <p className="container mx-auto flex flex-wrap lg:flex-nowrap gap-28 text-2xl font-bold mb-4">
        Оформлення замовлення
      </p>
      <div className="container mx-auto flex flex-wrap lg:flex-nowrap gap-28 justify-between">
        {/* Левая колонка */}
        <div className="w-full lg:w-1/4 space-y-6">
          <Form layout="vertical">
            <Form.Item
              label="Ім'я"
              validateStatus={formErrors.name && "error"}
              help={formErrors.name}
            >
              <Input
                type="text"
                name="name"
                value={data.name}
                onChange={handleChange}
                placeholder="Введіть своє ім'я"
              />
            </Form.Item>
            <Form.Item
              label="Прізвище"
              validateStatus={formErrors.surname && "error"}
              help={formErrors.surname}
            >
              <Input
                type="text"
                name="surname"
                value={data.surname}
                onChange={handleChange}
                placeholder="Введіть своє прізвище"
              />
            </Form.Item>
            <Form.Item
              label="Електронна пошта"
              validateStatus={formErrors.email && "error"}
              help={formErrors.email}
            >
              <Input
                type="email"
                name="email"
                value={data.email}
                onChange={handleChange}
                placeholder="Введіть адресу електронної пошти"
              />
            </Form.Item>
            <Form.Item
              label="Номер телефону"
              validateStatus={formErrors.phone_number && "error"}
              help={formErrors.phone_number}
            >
              <Input
                type="tel"
                name="phone_number"
                value={data.phone_number}
                onChange={handleChangePhone}
                placeholder="Введіть свій номер телефону"
              />
            </Form.Item>
          </Form>
        </div>

        {/* Правая колонка */}
        <div className="w-full lg:w-1/3 space-y-6">
          <div className="bg-[#272525] p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-4 text-center">Разом</h2>
            <div className="space-y-4">
              <div className="flex justify-between">

                <span>{cartItems.reduce((total, item) => total + item.quantity, 0)} товара на суму</span>
                <span className="font-bold">{total?.toFixed(2)} ₴</span>

              </div>
              <div className="flex justify-between">
                <span>Вартість доставки</span>
                <span className="font-bold">119 ₴</span>
              </div>
              <hr className="border-gray-700"/>
              <div className="flex justify-between text-lg font-bold">
                <span>До сплати:</span>
                <span>{119 + parseFloat(total?.toFixed(2))} ₴</span>
              </div>
            </div>
            {formErrors.items && (
              <div className="text-red-500 text-center mb-4">
                {formErrors.items}
              </div>
            )}
            <Checkbox
              className="text-gray-300 mt-6"
              onChange={(e) => setIsConfirmed(e.target.checked)}
            >
              Підтверджую{" "}
              <a href="#" className="text-blue-400 underline">
                умови користувача
              </a>{" "}
              та{" "}
              <a href="#" className="text-blue-400 underline">
                захист персональних даних
              </a>
            </Checkbox>
            <Button
              type="primary"
              block
              className="bg-orange-500 text-black font-semibold mt-6 hover:bg-orange-600"
              onClick={handleSubmit}
            >
              Замовлення підтверджую
            </Button>
          </div>
        </div>
      </div>
      <div className="container mx-auto space-y-8">
        {/* H1 заголовок */}
        <h1 className="text-2xl font-bold">Оплата під час отримання товару</h1>

        <div className="flex flex-wrap lg:flex-nowrap gap-8">
          {/* Левая колонка */}
          <div className="w-full lg:w-2/3 space-y-6">
            {/* Замовлення */}
            <div className="bg-[#0F0F0F] p-6 rounded-lg">
              <h2 className="text-lg font-bold ">Замовлення</h2>

              <div className="flex items-center space-x-4">
                {cartItems.length > 0 ? (
                  <List
                    className="w-full"
                    dataSource={cartItems}
                    renderItem={(item,index) => (
                      <List.Item className="">
                        <div
                          className="flex flex-col sm:flex-row items-center justify-between bg-[#0F0F0F] text-white p-4 rounded-lg w-full border">
                          <div className="flex-shrink-0 mb-2 sm:mb-0">
                            <img className={"w-20 h-20 object-contain"} src={cartItems[index].image} alt=''/>
                          </div>
                          {/*<p className="text-sm  text-gray-400 ">*/}
                          {/*  Продавець: {item.s}*/}
                          {/*</p>*/}
                          <div className="flex-grow text-center sm:text-left sm:ml-4">
                            <h3 className="text-lg font-medium">{item.name}</h3>
                          </div>
                          <div className="text-right flex  sm:text-left w-full sm:w-auto">
                            <p className="text-lg pr-20 font-medium">{item.quantity}x</p>
                            <p className="text-lg font-bold text-white">{parseFloat(item.price)?.toFixed(2)} ₴</p>
                          </div>
                        </div>
                      </List.Item>
                    )}
                  />
                ) : (
                  <Paragraph>Ваш кошик порожній</Paragraph>
                )}
              </div>
            </div>


                   {/* Доставка */}
                   <div className="bg-[#0F0F0F] border p-4 md:p-6 mr-3 ms-3 md:mr-6 md:ms-5 rounded-lg">
                     <h2 className="text-lg font-bold mb-4">Доставка</h2>
                     <Form layout="vertical">

                       <Form.Item
                         label="Адреса"
                         validateStatus={formErrors.address && "error"}
                         help={formErrors.address}
                       >
                         <Input
                           type="text"
                           name="address"
                           value={data.address}
                           readOnly
                         />
                       </Form.Item>


                       {/*<Form.Item*/}
                       {/*  label="Місто"*/}
                       {/*  validateStatus={formErrors.city && "error"}*/}
                       {/*  help={formErrors.city}*/}
                       {/*>*/}
                       {/*  <Input*/}
                       {/*    type="text"*/}
                       {/*    name="city"*/}
                       {/*    value={data.city || ""}*/}
                       {/*    onChange={handleChange}*/}
                       {/*    placeholder="Введіть місто"*/}
                       {/*  />*/}
                       {/*</Form.Item>*/}
                       <Form.Item
                         label="Місто"
                         validateStatus={formErrors.city && "error"}
                         help={formErrors.city}
                       >
                         <Select
                           value={data.city}
                           onChange={handleCityChange}
                           placeholder="Оберіть місто"
                         >
                           {cityList.map((city) => (
                             <Option key={city.id} value={city.name}>
                               {city.name}
                             </Option>
                           ))}
                         </Select>
                       </Form.Item>

                       <Form.Item
                         label="Вулиця"
                         validateStatus={formErrors.street && "error"}
                         help={formErrors.street}
                       >
                         <Input
                           type="text"
                           name="street"
                           value={data.street || ""}
                           onChange={handleChange}
                           placeholder="Введіть вулицю"
                         />
                       </Form.Item>
                       <Form.Item
                         label="Будинок"
                         validateStatus={formErrors.house && "error"}
                         help={formErrors.house}
                       >
                         <Input
                           type="text"
                           name="house"
                           value={data.house || ""}
                           onChange={handleChange}
                           placeholder="Введіть номер будинку"
                         />
                       </Form.Item>
                       <Form.Item
                         label="Квартира"
                         validateStatus={formErrors.apartment && "error"}
                         help={formErrors.apartment}
                       >
                         <Input
                           type="text"
                           name="apartment"
                           value={data.apartment || ""}
                           onChange={handleChange}
                           placeholder="Введіть номер квартири"
                         />
                       </Form.Item>
                       <Button
                         type="dashed"
                         onClick={handleSaveAddress}
                         className="mt-4"
                       >
                         Зберегти адресу
                       </Button>


                     </Form>
                   </div>

          </div>

          {/* Правая колонка */}
          <div className="w-full lg:w-1/3 flex items-end  space-y-6 ">
            {/* Нотатки */}
            <div className="bg-[#0F0F0F]    p-6 rounded-lg">
              <h2 className="text-lg font-bold mb-4">Нотатки</h2>
              <div className="w-96 h-52">
                <Input.TextArea size="large"
                                style={{width: 200, height: 205}}
                                name="notes"
                                value={data.notes}
                                onChange={handleChange}
                                placeholder="Додаткові примітки до вашого замовлення"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
    ;
}
