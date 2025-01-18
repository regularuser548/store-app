import Checkbox from '@/Components/Checkbox';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
      <div className="flex items-center justify-center min-h-screen bg-[#0F0F0F]">
        <div>
          <Head title="Log in"/>

          {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}

          <form onSubmit={submit} className="flex flex-col items-center w-full max-w-md bg-[#0F0F0F] text-white">
            <div className="w-96">
              <h1 className="text-5xl font-bold text-center mb-10">ShopHub</h1>
              <h2 className="text-4xl text-orange-500 text-center mb-2">Вхід</h2>

              <div className="flex justify-center items-center">
                <div className="w-2/3 flex flex-col items-center">
                  <div className="mb-4 w-full">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-200">
                      Логін
                    </label>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      value={data.email}
                      className="mt-2 block w-full bg-[#1E1E1E] border border-[#FFFFFF] rounded-md p-2 text-[#FFFFFF] focus:ring-2 focus:ring-orange-500 focus:outline-none"
                      autoComplete="username"
                      onChange={(e) => setData('email', e.target.value)}
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-2">{errors.email}</p>}
                  </div>

                  <div className="mb-4 w-full">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-200">
                      Пароль
                    </label>
                    <input
                      id="password"
                      type="password"
                      name="password"
                      value={data.password}
                      className="mt-2 block w-full bg-[#1E1E1E] border border-[#FFFFFF] rounded-md p-2 text-[#FFFFFF] focus:ring-2 focus:ring-orange-500 focus:outline-none"
                      autoComplete="current-password"
                      onChange={(e) => setData('password', e.target.value)}
                    />
                    {errors.password && <p className="text-red-500 text-sm mt-2">{errors.password}</p>}
                  </div>

                  <div className="w-full">
                    <button
                      type="submit"
                      className="bg-orange-500 hover:bg-orange-600 text-[#0F0F0F] font-bold py-2 px-4 rounded mt-10 block w-full "
                      disabled={processing}
                    >
                      Увійти
                    </button>
                  </div>

                </div>
              </div>


              <div className="flex justify-center items-center">
                <div className="text-center my-8">
                  <label className="flex items-center">
                    <Checkbox
                      name="remember"
                      checked={data.remember}
                      onChange={(e) => setData('remember', e.target.checked)}
                    />
                    <span className="ms-2 text-sm text-gray-600 dark:text-gray-400">Запам'ятати мене</span>
                  </label>

                </div>
              </div>


              {/*<div className="flex items-center justify-end mt-4">*/}
              {/*  {canResetPassword && (*/}
              {/*    <Link*/}
              {/*      href={route('password.request')}*/}
              {/*      className="underline text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"*/}
                {/*    >*/}
                {/*      Забув пароль*/}
                {/*    </Link>*/}
                {/*  )}*/}

                {/*<PrimaryButton className="ms-4" disabled={processing}>*/}
                {/*  Log in*/}
                {/*</PrimaryButton>*/}
                {/*</div>*/}


              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-2 mr-10 ms-10 sm:mr-0 sm:ms-0 ">
                {canResetPassword && (
                  <Link
                    href={route('password.request')}
                    className="underline border border-white px-2 py-5 rounded-md text-center text-white hover:bg-gray-700 focus:ring-2 focus:ring-orange-500 sm:w-auto w-full"
                  >
                    Забув пароль
                  </Link>
                )}
                <Link
                  href={route('register')}
                  className="underline border border-white px-4 py-5 rounded-md text-center text-white hover:bg-gray-700 focus:ring-2 focus:ring-orange-500 sm:w-auto w-full"
                >
                  Реєстрація аккаунту
                </Link>
              </div>


            </div>
          </form>
        </div>
      </div>

    );
}
