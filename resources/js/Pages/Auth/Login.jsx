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


                </div>
              </div>


              <div className="flex justify-center items-center">
                <button
                  type="submit"
                  className="bg-orange-500 hover:bg-orange-600 text-[#0F0F0F] font-bold py-2 px-4 rounded mt-4"
                  disabled={processing}
                >
                  Увійти
                </button>
              </div>

              <div className="flex justify-center items-center">
                <div className="text-center my-4">
                  <button
                    className="px-2 py-2 flex items-center space-x-3 whitespace-nowrap text-[#ffffff] hover:text-orange-500 hover:bg-gray-800 rounded transition duration-200"
                    aria-label="Войти с помощью Google"
                  >
                    <span className="text-sm text-gray-400">Увійти за допомогою Google</span>
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_477_443)">
                        <path
                          d="M12 10.2812H23.3281C23.4531 10.9792 23.5156 11.6458 23.5156 12.2812C23.5156 14.5417 23.0417 16.5599 22.0938 18.3359C21.1458 20.112 19.7943 21.5 18.0391 22.5C16.2839 23.5 14.2708 24 12 24C10.3646 24 8.80729 23.6849 7.32812 23.0547C5.84896 22.4245 4.57292 21.5729 3.5 20.5C2.42708 19.4271 1.57552 18.151 0.945312 16.6719C0.315104 15.1927 0 13.6354 0 12C0 10.3646 0.315104 8.80729 0.945312 7.32812C1.57552 5.84896 2.42708 4.57292 3.5 3.5C4.57292 2.42708 5.84896 1.57552 7.32812 0.945312C8.80729 0.315104 10.3646 0 12 0C15.125 0 17.8073 1.04688 20.0469 3.14062L16.7812 6.28125C15.5 5.04167 13.9062 4.42188 12 4.42188C10.6562 4.42188 9.41406 4.76042 8.27344 5.4375C7.13281 6.11458 6.22917 7.03385 5.5625 8.19531C4.89583 9.35677 4.5625 10.625 4.5625 12C4.5625 13.375 4.89583 14.6432 5.5625 15.8047C6.22917 16.9661 7.13281 17.8854 8.27344 18.5625C9.41406 19.2396 10.6562 19.5781 12 19.5781C12.9062 19.5781 13.7396 19.4531 14.5 19.2031C15.2604 18.9531 15.8854 18.6406 16.375 18.2656C16.8646 17.8906 17.2917 17.4635 17.6562 16.9844C18.0208 16.5052 18.2891 16.0521 18.4609 15.625C18.6328 15.1979 18.75 14.7917 18.8125 14.4062H12V10.2812Z"
                          fill="white"
                        />
                      </g>
                    </svg>
                  </button>

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

                {/*  <PrimaryButton className="ms-4" disabled={processing}>*/}
                {/*    Log in*/}
                {/*  </PrimaryButton>*/}
                {/*</div>*/}


                <div className="grid grid-cols-2">
                  {canResetPassword && (
                    <Link
                      href={route('password.request')}
                      className="underline border border-white px-4 py-2 rounded-l-md text-white hover:bg-gray-700 focus:ring-2 focus:ring-orange-500"
                    >
                      Забув пароль
                    </Link>
                  )}
                  <button
                    className="underline border border-white px-4 py-2 rounded-r-md text-white hover:bg-gray-700 focus:ring-2 focus:ring-orange-500">
                    Реєстрація аккаунту
                  </button>
                </div>

              </div>
          </form>
        </div>
      </div>

);
}
