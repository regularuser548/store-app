import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';
import {useState} from "react";

export default function Register() {
    const [selectedRole, setSelectedRole] = useState('customer');

    const handleRoleChange = (e) => {
        setSelectedRole(e.target.value);
        setData('role', e.target.value);


    };

    const { data, setData, post, processing, errors, reset } = useForm({
        role: '',
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    // return (
    //     <GuestLayout>
    //         <Head title="Register" />
    //
    //         <form onSubmit={submit}>
    //
    //             <div className='mb-2 text-white'>
    //                 <legend>Account type:</legend>
    //                 <div>
    //                     <input type="radio" id="roleChoice1" name="role" value="customer" className='me-1'
    //                            checked={selectedRole === "customer"}
    //                            onChange={handleRoleChange}/>
    //                     <label htmlFor="roleChoice1">Customer</label>
    //
    //                     <input type="radio" id="roleChoice2" name="role" value="seller" className='m-1'
    //                            checked={selectedRole === "seller"}
    //                            onChange={handleRoleChange}/>
    //                     <label htmlFor="roleChoice2">Seller</label>
    //                 </div>
    //             </div>
    //
    //             <div>
    //                 <InputLabel htmlFor="name" value="Name" />
    //
    //                 <TextInput
    //                     id="name"
    //                     name="name"
    //                     value={data.name}
    //                     className="mt-1 block w-full"
    //                     autoComplete="name"
    //                     isFocused={true}
    //                     onChange={(e) => setData('name', e.target.value)}
    //                     required
    //                 />
    //
    //                 <InputError message={errors.name} className="mt-2" />
    //             </div>
    //
    //             <div className="mt-4">
    //                 <InputLabel htmlFor="email" value="Email" />
    //
    //                 <TextInput
    //                     id="email"
    //                     type="email"
    //                     name="email"
    //                     value={data.email}
    //                     className="mt-1 block w-full"
    //                     autoComplete="username"
    //                     onChange={(e) => setData('email', e.target.value)}
    //                     required
    //                 />
    //
    //                 <InputError message={errors.email} className="mt-2" />
    //             </div>
    //
    //             <div className="mt-4">
    //                 <InputLabel htmlFor="password" value="Password" />
    //
    //                 <TextInput
    //                     id="password"
    //                     type="password"
    //                     name="password"
    //                     value={data.password}
    //                     className="mt-1 block w-full"
    //                     autoComplete="new-password"
    //                     onChange={(e) => setData('password', e.target.value)}
    //                     required
    //                 />
    //
    //                 <InputError message={errors.password} className="mt-2" />
    //             </div>
    //
    //             <div className="mt-4">
    //                 <InputLabel htmlFor="password_confirmation" value="Confirm Password" />
    //
    //                 <TextInput
    //                     id="password_confirmation"
    //                     type="password"
    //                     name="password_confirmation"
    //                     value={data.password_confirmation}
    //                     className="mt-1 block w-full"
    //                     autoComplete="new-password"
    //                     onChange={(e) => setData('password_confirmation', e.target.value)}
    //                     required
    //                 />
    //
    //                 <InputError message={errors.password_confirmation} className="mt-2" />
    //             </div>
    //
    //             <div className="flex items-center justify-end mt-4">
    //                 <Link
    //                     href={route('login')}
    //                     className="underline text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
    //                 >
    //                     Already registered?
    //                 </Link>
    //
    //                 <PrimaryButton className="ms-4" disabled={processing}>
    //                     Register
    //                 </PrimaryButton>
    //             </div>
    //         </form>
    //     </GuestLayout>
    // );





  return (
    <div className="min-h-screen flex items-center justify-center bg-[#000000]">
      <div className="">
        <h1 className="text-white text-5xl font-bold text-center mb-10">ShopHub</h1>
        <div className="bg-[#0F0F0F]">
          <Head title="Реєстрація"/>

          <form onSubmit={submit} className="bg-[#262626D1] text-white p-8 pr-14 pl-14 rounded-xl max-w-md mx-auto">

            <h1 className="text-center text-orange-500 text-xl font-bold mb-6">Реєстрація</h1>

            <div className="mb-4  mr-20">
              <legend className="block mb-2">Тип аккаунта:</legend>
              <div className="flex items-center gap-5">
                <label className="flex items-center">
                  <input
                    type="radio"
                    id="roleChoice1"
                    name="role"
                    value="customer"
                    className="accent-orange-500"
                    checked={selectedRole === "customer"}
                    onChange={handleRoleChange}
                  />
                  <span>Клієнт</span>
                </label>

                <label className="flex items-center">
                  <input
                    type="radio"
                    id="roleChoice2"
                    name="role"
                    value="seller"
                    className="accent-orange-500 mr-2"
                    checked={selectedRole === "seller"}
                    onChange={handleRoleChange}
                  />
                  <span>Продавець</span>
                </label>
              </div>
            </div>

            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium text-gray-200">
                Ім’я
              </label>
              <input
                id="name"
                name="name"
                value={data.name}
                className="mt-2 block w-full bg-[#1E1E1E] border border-[#FFFFFF] rounded-md p-2 text-[#FFFFFF] focus:ring-2 focus:ring-orange-500 focus:outline-none"
                autoComplete="name"
                isFocused={true}
                onChange={(e) => setData('name', e.target.value)}
                required
              />
              <InputError message={errors.name} className="mt-2"/>
            </div>

            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium text-gray-200">
                Email
              </label>
              <input
                id="email"
                type="email"
                name="email"
                value={data.email}
                className="mt-2 block w-full bg-[#1E1E1E] border border-[#FFFFFF] rounded-md p-2 text-[#FFFFFF] focus:ring-2 focus:ring-orange-500 focus:outline-none"
                autoComplete="username"
                onChange={(e) => setData('email', e.target.value)}
                required
              />
              <InputError message={errors.email} className="mt-2"/>
            </div>

            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium text-gray-200">
                Пароль
              </label>
              <input
                id="password"
                type="password"
                name="password"
                value={data.password}
                className="mt-2 block w-full bg-[#1E1E1E] border border-[#FFFFFF] rounded-md p-2 text-[#FFFFFF] focus:ring-2 focus:ring-orange-500 focus:outline-none"
                autoComplete="new-password"
                onChange={(e) => setData('password', e.target.value)}
                required
              />
              <InputError message={errors.password} className="mt-2"/>
            </div>

            <div className="mb-4 w-full ">
              <label htmlFor="password" className="block text-sm font-medium text-gray-200">
                Пітвердіть ваш пароль
              </label>
              <input
                id="password_confirmation"
                type="password"
                name="password_confirmation"
                value={data.password_confirmation}
                className="mt-2 block w-full bg-[#1E1E1E] border border-[#FFFFFF] rounded-md p-2 text-[#FFFFFF] focus:ring-2 focus:ring-orange-500 focus:outline-none "
                autoComplete="new-password"
                onChange={(e) => setData('password_confirmation', e.target.value)}
                required
              />
              <InputError message={errors.password_confirmation} className="mt-2"/>
            </div>

            <div className="flex flex-col items-center mt-4 space-y-4">
              <label htmlFor="password" className="block text-sm font-medium text-gray-200"></label>
              <button
                type="submit"
                className="bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600 transition"
                disabled={processing}
              >
                Зареєструватися
              </button>

              <Link
                href={route('login')}
                className="text-sm text-gray-400 hover:text-white underline"
              >
                Вже є аккаунт?
              </Link>
            </div>

          </form>
        </div>
      </div>
    </div>
  );


}
