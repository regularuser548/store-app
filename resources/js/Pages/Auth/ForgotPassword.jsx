import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, useForm } from '@inertiajs/react';

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('password.email'));
    };

    return (
           <div className="flex items-center justify-center min-h-screen bg-[#0F0F0F]">
             <Head title="Forgot Password" />


             {status && <div className="mb-4 font-medium text-sm text-green-600 dark:text-green-400">{status}</div>}

             <div className="mb-4 w-full flex justify-center items-center">
               <form onSubmit={submit} className="flex flex-col items-center w-full max-w-md bg-[#0F0F0F] text-white">
                 <label htmlFor="password" className="block font-medium text-gray-200 text-xl">
                   Введіть ваш емайл для відновлення пароля
                 </label>
                 <input
                   id="email"
                   type="email"
                   name="email"
                   value={data.email}
                   className="mt-2 block w-full bg-[#1E1E1E] border border-[#FFFFFF] rounded-md p-2 text-[#FFFFFF] focus:ring-2 focus:ring-orange-500 focus:outline-none"
                   onChange={(e) => setData('email', e.target.value)}
                 />
                 <InputError message={errors.email} className="mt-2"/>
                 {/*<div className="w-full ">*/}
                 {/*  <PrimaryButton className="bg-orange-500 hover:bg-orange-600 text-center text-[#0F0F0F] font-bold py-2 px-4 rounded mt-10 block w-full " disabled={processing}>*/}
                 {/*    Відновити пароль*/}
                 {/*  </PrimaryButton>*/}
                 {/*</div>*/}
                 <div className="w-full">
                   <button
                     type="submit"
                     className="bg-orange-500 hover:bg-orange-600 text-[#0F0F0F] font-bold py-2 px-4 rounded mt-3 block w-full "
                     disabled={processing}
                   >
                     Відновити пароль
                   </button>
                 </div>
               </form>
             </div>
           </div>
    );
}
