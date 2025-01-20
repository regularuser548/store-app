import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import { Head } from '@inertiajs/react';
import { useState } from 'react';
import StoreFrontLayout from "@/Layouts/StoreFrontLayout.jsx";
import ProfileLayout from "@/Layouts/ProfileLayout.jsx";
import { usePage } from "@inertiajs/react";
import {message} from "antd";


export default function Edit({ auth, mustVerifyEmail, status, userData, orders }) {
  const [isPersonalInfoOpen, setPersonalInfoOpen] = useState(false);
  const [isOrdersOpen, setOrdersOpen] = useState(false);
  const [isAddressOpen, setAddressOpen] = useState(false);
  const [isPasswordOpen, setPasswordOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingPersonalInfo, setIsEditingPersonalInfo] = useState(false);
  const [isEditingContacts, setIsEditingContacts] = useState(false);
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [formData, setFormData] = useState({
    email: userData.email,
    phone_number: userData.phone_number,
    surname: userData.surname,
    name: userData.name,
    street: userData.street,
    house: userData.house,
    apartment: userData.apartment,
  });
  const [passwordData, setPasswordData] = useState({
    current_password: '',
    password: '',
    password_confirmation: '',
  });


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    axios.patch( route("profile.update") ,formData)
      .then(function (response) {
        setIsEditing(false);
      })
      .catch(function (error) {
        message.info('Помилка збереження данних користувача');
      });
  };




  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordSave = async () => {
    console.log(passwordData);
    axios.put(route("password.update"), passwordData)
      .then(() => {
        message.success('Пароль успешно обновлен');
        setPasswordData({
          current_password: '',
          password: '',
          password_confirmation: '',
        });
      })
      .catch((error) => {
        message.error('Ошибка обновления пароля. Проверьте данные и попробуйте снова.');
        console.error(error.response.data.errors);
      });
  };




  return (
    <ProfileLayout>
      <div className="bg-[#0F0F0F] text-white font-sans pb-80">
        <div className="max-w-2xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6">Мій аккаунт ShopHub</h1>

          {/* Личные данные */}
          <div className="border-b-2 border-[#D9D9D9]">
            <button
              onClick={() => setPersonalInfoOpen((prev) => !prev)}
              className="w-full text-left py-4 flex justify-between items-center"
            >
              <p>Основні дані</p>
              <span className="text-gray-400">{isPersonalInfoOpen ? '\u25B2' : '\u25BC'}</span>
            </button>
            {isPersonalInfoOpen && (
              <div className="pl-4 py-4 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {isEditingPersonalInfo ? (
                    <>
                      <div>
                        <p>Ім’я</p>
                        <input
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Немає"
                          className="w-full px-2 py-1 border rounded bg-gray-700 text-white"
                        />
                      </div>
                      <div>
                        <p>Прізвище</p>
                        <input
                          name="surname"
                          value={formData.surname}
                          onChange={handleChange}
                          placeholder="Немає"
                          className="w-full px-2 py-1 border rounded bg-gray-700 text-white"
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      <div>
                        <p>Ім’я</p>
                        <p className="text-gray-400">{formData.name || 'Немає'}</p>
                      </div>
                      <div>
                        <p>Прізвище</p>
                        <p className="text-gray-400">{formData.surname || 'Немає'}</p>
                      </div>
                    </>
                  )}
                </div>
                <button
                  onClick={isEditingPersonalInfo ?  () => {handleSave();setIsEditingPersonalInfo(false)} : () => setIsEditingPersonalInfo(true)}
                  className="bg-orange-500 text-black px-4 py-2 rounded hover:bg-orange-600 transition"
                >
                  {isEditingPersonalInfo ? 'Зберегти' : 'Редагувати'}
                </button>
              </div>
            )}
          </div>

          {/* Контакты */}
          <div className="border-b-2 border-[#D9D9D9]">
            <button
              onClick={() => setOrdersOpen((prev) => !prev)} // Используем отдельный стейт
              className="w-full text-left py-4 flex justify-between items-center"
            >
              <p>Контакти</p>
              <span className="text-gray-400">{isOrdersOpen ? '\u25B2' : '\u25BC'}</span>
            </button>
            {isOrdersOpen && (
              <div className="pl-4 py-4 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {isEditingContacts ? (
                    <>
                      <div>
                        <p>Логін (телефон)</p>
                        <input
                          name="phone_number"
                          value={formData.phone_number}
                          onChange={handleChange}
                          placeholder="Немає"
                          className="w-full px-2 py-1 border rounded bg-gray-700 text-white"
                        />
                      </div>
                      <div>
                        <p>Email</p>
                        <input
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full px-2 py-1 border rounded bg-gray-700 text-white"
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      <div>
                        <p>Логін (телефон)</p>
                        <p className="text-gray-400">{formData.phone_number || 'Немає'}</p>
                      </div>
                      <div>
                        <p>Email</p>
                        <p className="text-gray-400">{formData.email || 'Немає'}</p>
                      </div>
                    </>
                  )}
                </div>
                <button
                  onClick={isEditingContacts ?  () => {handleSave();setIsEditingContacts(false)} : () => setIsEditingContacts(true)}
                  className="bg-orange-500 text-black px-4 py-2 rounded hover:bg-orange-600 transition"
                >
                  {isEditingContacts ? 'Зберегти' : 'Редагувати'}
                </button>
              </div>
            )}
          </div>


          {/* Адрес */}
          <div className="border-b-2 border-[#D9D9D9]">
            <button
              onClick={() => setAddressOpen((prev) => !prev)}
              className="w-full text-left py-4 flex justify-between items-center"
            >
              <p>Адреса</p>
              <span className="text-gray-400">{isAddressOpen ? '\u25B2' : '\u25BC'}</span>
            </button>
            {isAddressOpen && (
              <div className="pl-4 py-4 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {isEditingAddress ? (
                    <>
                      <div>
                        <p>Вулиця</p>
                        <input
                          name="street"
                          value={formData.street}
                          onChange={handleChange}
                          placeholder="Немає"
                          className="w-full px-2 py-1 border rounded bg-gray-700 text-white"
                        />
                      </div>
                      <div>
                        <p>Будинок</p>
                        <input
                          name="house"
                          value={formData.house}
                          onChange={handleChange}
                          placeholder="Немає"
                          className="w-full px-2 py-1 border rounded bg-gray-700 text-white"
                        />
                      </div>
                      <div>
                        <p>Квартира</p>
                        <input
                          name="apartment"
                          value={formData.apartment}
                          onChange={handleChange}
                          placeholder="Немає"
                          className="w-full px-2 py-1 border rounded bg-gray-700 text-white"
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      <div>
                        <p>Вулиця</p>
                        <p className="text-gray-400">{formData.street || 'Немає'}</p>
                      </div>
                      <div>
                        <p>Будинок</p>
                        <p className="text-gray-400">{formData.house || 'Немає'}</p>
                      </div>
                      <div>
                        <p>Квартира</p>
                        <p className="text-gray-400">{formData.apartment || 'Немає'}</p>
                      </div>
                    </>
                  )}
                </div>
                <button
                  onClick={isEditingAddress ?  () => {handleSave();setIsEditingAddress(false)} : () => setIsEditingAddress(true)}
                  className="bg-orange-500 text-black px-4 py-2 rounded hover:bg-orange-600 transition"
                >
                  {isEditingAddress ? 'Зберегти' : 'Редагувати'}
                </button>
              </div>
            )}
          </div>




          {/* Зміна пароля */}
          <div className="border-b-2 border-[#D9D9D9]">
            <button
              onClick={() => setPasswordOpen((prev) => !prev)}
              className="w-full text-left py-4 flex justify-between items-center"
            >
              <p>Зміна пароля</p>
              <span className="text-gray-400">{isPasswordOpen ? '\u25B2' : '\u25BC'}</span>
            </button>
            {isPasswordOpen && (
              <div className="pl-4 py-4 space-y-4">
                <div className="space-y-4">
                  <div>
                    <p>Поточний пароль</p>
                    <input
                      type="password"
                      name="current_password"
                      value={passwordData.current_password}
                      onChange={handlePasswordChange}
                      className="w-full px-2 py-1 border rounded bg-gray-700 text-white"
                    />
                  </div>
                  <div>
                    <p>Новий пароль</p>
                    <input
                      type="password"
                      name="password"
                      value={passwordData.password}
                      onChange={handlePasswordChange}
                      className="w-full px-2 py-1 border rounded bg-gray-700 text-white"
                    />
                  </div>
                  <div>
                    <p>Підтвердьте новий пароль</p>
                    <input
                      type="password"
                      name="password_confirmation"
                      value={passwordData.password_confirmation}
                      onChange={handlePasswordChange}
                      className="w-full px-2 py-1 border rounded bg-gray-700 text-white"
                    />
                  </div>
                </div>
                <button
                  onClick={handlePasswordSave}
                  className="bg-orange-500 text-black px-4 py-2 rounded hover:bg-orange-600 transition"
                >
                  Зберегти
                </button>
              </div>
            )}
          </div>


        </div>
      </div>
    </ProfileLayout>
  );
}


// export default function Edit({ auth, mustVerifyEmail, status }) {
//
//   const [isPersonalInfoOpen, setPersonalInfoOpen] = useState(false);
//   const [isPersonalInfoOpen2, setPersonalInfoOpen2] = useState(false);
//   const [isOrdersOpen, setOrdersOpen] = useState(false);
//   const [isContactsOpen, setContactsOpen] = useState(false);
//   const [isAddressOpen, setAddressOpen] = useState(false);
//
//   return (
//       <ProfileLayout>
//         <div className="bg-[#0F0F0F] text-white font-sans pb-80">
//           <div className="max-w-2xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
//             <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6">Мій аккаунт ShopHub</h1>
//             {/* Account Overview */}
//             <div className="mb-6"></div>
//
//             <div className="border-b-2 border-[#D9D9D9]">
//               <button
//                 onClick={() => setPersonalInfoOpen2((prev) => !prev)}
//                 className="w-full text-left py-4 flex justify-between items-center"
//               >
//                 <p>
//                   Імя <span className="text-gray-400">{auth?.user?.email || 'sophie23gen@gmail.com'}</span>
//                 </p>
//                 <span className="text-gray-400">{isPersonalInfoOpen2 ? '\u25B2' : '\u25BC'}</span>
//               </button>
//               {isPersonalInfoOpen2 && (
//                 <div className="pl-4 py-4 space-y-4">
//                   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//                     <div>
//                       <p>Логін (телефон)</p>
//                       <p className="text-gray-400">+380 (994) 567 30 45</p>
//                     </div>
//                     <div>
//                       <p>Прізвище</p>
//                       <p className="text-gray-400">Шевченко</p>
//                     </div>
//                     <div>
//                       <p>Імя</p>
//                       <p className="text-gray-400">Тарас</p>
//                     </div>
//                     <div>
//                       <p>По батькові</p>
//                       <p className="text-gray-400">Невказано</p>
//                     </div>
//                   </div>
//                   <button className="bg-orange-500 text-black px-4 py-2 rounded hover:bg-orange-600 transition">
//                     Редагувати
//                   </button>
//                 </div>
//               )}
//             </div>
//             {/* Особисті дані */}
//             <div className="border-b-2 border-[#D9D9D9]">
//               <button
//                 onClick={() => setPersonalInfoOpen((prev) => !prev)}
//                 className="w-full text-left py-4 flex justify-between items-center"
//               >
//                 <span>Особисті дані</span>
//                 <span className="text-gray-400">{isPersonalInfoOpen ? '\u25B2' : '\u25BC'}</span>
//               </button>
//               {isPersonalInfoOpen && (
//                 <div className="pl-4 py-4">
//                   <p>
//                     Дата народження: <span className="text-gray-400">12.04.2003</span>
//                   </p>
//                   <p>
//                     Стать: <span className="text-gray-400">Чоловік</span>
//                   </p>
//                   <button className="mt-4 bg-orange-500 text-black px-4 py-2 rounded hover:bg-orange-600 transition">
//                     Редагувати
//                   </button>
//                 </div>
//               )}
//             </div>
//
//             {/* Мої замовлення */}
//             <div className="border-b-2 border-[#D9D9D9]">
//               <button
//                 onClick={() => setOrdersOpen((prev) => !prev)}
//                 className="w-full text-left py-4 flex justify-between items-center"
//               >
//                 <span>Мої замовлення</span>
//                 <span className="text-gray-400">{isOrdersOpen ? '\u25B2' : '\u25BC'}</span>
//               </button>
//               {isOrdersOpen && (
//                 <div className="pl-4 py-4">
//                   <p>Шевченко Тарас</p>
//                   <p className="text-gray-400">+380 (994) 567 30 45</p>
//                   <button className="mt-4 bg-orange-500 text-black px-4 py-2 rounded hover:bg-orange-600 transition">
//                     Редагувати
//                   </button>
//                 </div>
//               )}
//             </div>
//
//             {/* Контакти */}
//             <div className="border-b-2 border-[#D9D9D9]">
//               <button
//                 onClick={() => setContactsOpen((prev) => !prev)}
//                 className="w-full text-left py-4 flex justify-between items-center"
//               >
//                 <span>Контакти</span>
//                 <span className="text-gray-400">{isContactsOpen ? '\u25B2' : '\u25BC'}</span>
//               </button>
//               {isContactsOpen && (
//                 <div className="pl-4 py-4">
//                   <p>
//                     Підтверджений телефон: <span className="text-gray-400">+380 (994) 567 30 45</span>
//                   </p>
//                   <p>
//                     Електронна пошта: <span
//                     className="text-gray-400">{auth?.user?.email || 'sophie23gen@gmail.com'}</span>
//                   </p>
//                   <button className="mt-4 bg-orange-500 text-black px-4 py-2 rounded hover:bg-orange-600 transition">
//                     Редагувати
//                   </button>
//                 </div>
//               )}
//             </div>
//
//             {/* Адреса доставки */}
//             <div className="border-b-2 border-[#D9D9D9]">
//               <button
//                 onClick={() => setAddressOpen((prev) => !prev)}
//                 className="w-full text-left py-4 flex justify-between items-center"
//               >
//                 <span>Адреса доставки</span>
//                 <span className="text-gray-400">{isAddressOpen ? '\u25B2' : '\u25BC'}</span>
//               </button>
//               {isAddressOpen && (
//                 <div className="pl-4 py-4">
//                   <p>Lorem ipsum dolor sit amet consectetur. In </p>
//                   <button className="mt-4 bg-orange-500 text-black px-4 py-2 rounded hover:bg-orange-600 transition">
//                     Редагувати
//                   </button>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//
//       </ProfileLayout>
//   );
// }











// <AuthenticatedLayout
//     user={auth.user}
//     header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Profile</h2>}
// >
//     <Head title="Profile" />
//
//     <div className="py-12">
//         <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
//             <div className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
//                 <UpdateProfileInformationForm
//                     mustVerifyEmail={mustVerifyEmail}
//                     status={status}
//                     className="max-w-xl"
//                 />
//             </div>
//
//             <div className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
//                 <UpdatePasswordForm className="max-w-xl" />
//             </div>
//
//             <div className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
//                 <DeleteUserForm className="max-w-xl" />
//             </div>
//         </div>
//     </div>
// </AuthenticatedLayout>
