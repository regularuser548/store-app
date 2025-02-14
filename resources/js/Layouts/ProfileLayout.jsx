import {Head, Link, router, useForm, usePage} from "@inertiajs/react";
import StoreFrontLayout from "@/Layouts/StoreFrontLayout.jsx";
import React from "react";
import {EditFilled} from "@ant-design/icons";

export default function ProfileLayout({props, children}) {
  const {auth} = usePage().props

  const handleUploadAvatar = (e) => {
    const file = e.target.files[0];

    axios.post(route('avatar.store'), {
      avatar: file
    }, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }


  return (

    <div className="flex-auto bg-[#0f0f0f]">

      {auth.user ? (
        <div className="flex flex-col md:flex-row h-full p-3">
          {/* Левая панель */}
          <div className="w-full md:w-64 text-white p-7 flex flex-col">

            <div className="flex flex-col items-center mb-10">
              <input
                id="fileInput"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleUploadAvatar}
              />
              <div className='relative w-24 h-24'>
                <img
                  src="/avatars/default.jpg"
                  alt="Profile Image"
                  className="rounded-full w-24 h-24 mb-4"
                />
                {/*<button*/}
                {/*  className="absolute bottom-0 right-0 bg-gray-400 text-white border-2 border-gray-200*/}
                {/*  w-8 h-8 rounded-full flex items-center justify-center shadow-lg hover:bg-gray-500"*/}
                {/*  aria-label="Edit Avatar"*/}
                {/*  onClick={() => document.getElementById('fileInput').click()}*/}
                {/*>*/}
                {/*  <EditFilled/>*/}
                {/*</button>*/}
              </div>

              <h2 className="text-xl font-semibold">{auth.user.name}</h2>
              <p className="text-gray-400 text-sm text-center md:text-left">{auth.user.email}</p>

            </div>


            {/* Меню */}
            <nav className="space-y-4">
              <Link href={route('orders.index')}
                    className="rounded-md px-2 py-1 text-sm lg:text-base flex items-center space-x-3 whitespace-nowrap text-[#ffffff] hover:text-orange-500"
                    type="primary">
                <svg width="33" height="33" className="flex-shrink-0" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd"
                        d="M23.3337 4.66668H4.66699C4.35757 4.66668 4.06083 4.78959 3.84203 5.00839C3.62324 5.22718 3.50033 5.52392 3.50033 5.83334V22.1667C3.50033 22.4761 3.62324 22.7728 3.84203 22.9916C4.06083 23.2104 4.35757 23.3333 4.66699 23.3333H23.3337C23.6431 23.3333 23.9398 23.2104 24.1586 22.9916C24.3774 22.7728 24.5003 22.4761 24.5003 22.1667V5.83334C24.5003 5.52392 24.3774 5.22718 24.1586 5.00839C23.9398 4.78959 23.6431 4.66668 23.3337 4.66668ZM4.66699 2.33334C3.73873 2.33334 2.8485 2.70209 2.19212 3.35847C1.53574 4.01485 1.16699 4.90509 1.16699 5.83334V22.1667C1.16699 23.0949 1.53574 23.9852 2.19212 24.6416C2.8485 25.2979 3.73873 25.6667 4.66699 25.6667H23.3337C24.2619 25.6667 25.1522 25.2979 25.8085 24.6416C26.4649 23.9852 26.8337 23.0949 26.8337 22.1667V5.83334C26.8337 4.90509 26.4649 4.01485 25.8085 3.35847C25.1522 2.70209 24.2619 2.33334 23.3337 2.33334H4.66699ZM7.00033 8.16668H9.33366V10.5H7.00033V8.16668ZM12.8337 8.16668C12.5242 8.16668 12.2275 8.28959 12.0087 8.50839C11.7899 8.72718 11.667 9.02392 11.667 9.33334C11.667 9.64276 11.7899 9.93951 12.0087 10.1583C12.2275 10.3771 12.5242 10.5 12.8337 10.5H19.8337C20.1431 10.5 20.4398 10.3771 20.6586 10.1583C20.8774 9.93951 21.0003 9.64276 21.0003 9.33334C21.0003 9.02392 20.8774 8.72718 20.6586 8.50839C20.4398 8.28959 20.1431 8.16668 19.8337 8.16668H12.8337ZM9.33366 12.8333H7.00033V15.1667H9.33366V12.8333ZM11.667 14C11.667 13.6906 11.7899 13.3938 12.0087 13.1751C12.2275 12.9563 12.5242 12.8333 12.8337 12.8333H19.8337C20.1431 12.8333 20.4398 12.9563 20.6586 13.1751C20.8774 13.3938 21.0003 13.6906 21.0003 14C21.0003 14.3094 20.8774 14.6062 20.6586 14.825C20.4398 15.0438 20.1431 15.1667 19.8337 15.1667H12.8337C12.5242 15.1667 12.2275 15.0438 12.0087 14.825C11.7899 14.6062 11.667 14.3094 11.667 14ZM9.33366 17.5H7.00033V19.8333H9.33366V17.5ZM11.667 18.6667C11.667 18.3573 11.7899 18.0605 12.0087 17.8417C12.2275 17.6229 12.5242 17.5 12.8337 17.5H19.8337C20.1431 17.5 20.4398 17.6229 20.6586 17.8417C20.8774 18.0605 21.0003 18.3573 21.0003 18.6667C21.0003 18.9761 20.8774 19.2728 20.6586 19.4916C20.4398 19.7104 20.1431 19.8333 19.8337 19.8333H12.8337C12.5242 19.8333 12.2275 19.7104 12.0087 19.4916C11.7899 19.2728 11.667 18.9761 11.667 18.6667Z"
                        fill="white"/>
                </svg>
                <span>Мої замовлення</span>
              </Link>

              <Link href={route('storefront.MessageToSeller')}
                    className="rounded-md px-2 py-1 text-sm lg:text-base flex items-center space-x-3 whitespace-nowrap text-[#ffffff] hover:text-orange-500"
                    type="primary">
                <svg width="33" height="33" className="flex-shrink-0" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M18 9H20C20.5304 9 21.0391 9.21071 21.4142 9.58579C21.7893 9.96086 22 10.4696 22 11V22L18 18H12C11.4696 18 10.9609 17.7893 10.5858 17.4142C10.2107 17.0391 10 16.5304 10 16V15M14 9C14 9.53043 13.7893 10.0391 13.4142 10.4142C13.0391 10.7893 12.5304 11 12 11H6L2 15V4C2 3.46957 2.21071 2.96086 2.58579 2.58579C2.96086 2.21071 3.46957 2 4 2H12C12.5304 2 13.0391 2.21071 13.4142 2.58579C13.7893 2.96086 14 3.46957 14 4V9Z"
                    stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>Чат з продавцями</span>
              </Link>

              <Link href={route('cart.show')}
                    className="rounded-md px-1 py-1 text-sm lg:text-base flex items-center space-x-3 whitespace-nowrap text-[#ffffff] hover:text-orange-500"
                    type="primary">
                <svg width="33" height="33" className="flex-shrink-0" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M4.125 7.21875C3.8515 7.21875 3.58919 7.3274 3.3958 7.52079C3.2024 7.71419 3.09375 7.97649 3.09375 8.25C3.09375 8.5235 3.2024 8.7858 3.3958 8.9792C3.58919 9.1726 3.8515 9.28125 4.125 9.28125H6.41437L9.12037 20.1094C9.35034 21.0272 10.1723 21.6562 11.1179 21.6562H23.9776C24.9088 21.6562 25.6998 21.0375 25.9442 20.1403L28.6172 10.3125H26.4578L23.9766 19.5937H11.1169L8.41191 8.76562C8.30017 8.32139 8.04259 7.9275 7.68042 7.64704C7.31825 7.36658 6.87243 7.21576 6.41437 7.21875H4.125ZM22.6875 21.6562C20.9911 21.6562 19.5938 23.0536 19.5938 24.75C19.5938 26.4464 20.9911 27.8437 22.6875 27.8437C24.3839 27.8437 25.7812 26.4464 25.7812 24.75C25.7812 23.0536 24.3839 21.6562 22.6875 21.6562ZM13.4062 21.6562C11.7098 21.6562 10.3125 23.0536 10.3125 24.75C10.3125 26.4464 11.7098 27.8437 13.4062 27.8437C15.1027 27.8437 16.5 26.4464 16.5 24.75C16.5 23.0536 15.1027 21.6562 13.4062 21.6562ZM16.5 7.21875V12.375H13.4062L17.5312 16.5L21.6562 12.375H18.5625V7.21875H16.5ZM13.4062 23.7187C13.9879 23.7187 14.4375 24.1684 14.4375 24.75C14.4375 25.3316 13.9879 25.7812 13.4062 25.7812C12.8246 25.7812 12.375 25.3316 12.375 24.75C12.375 24.1684 12.8246 23.7187 13.4062 23.7187ZM22.6875 23.7187C23.2691 23.7187 23.7188 24.1684 23.7188 24.75C23.7188 25.3316 23.2691 25.7812 22.6875 25.7812C22.1059 25.7812 21.6562 25.3316 21.6562 24.75C21.6562 24.1684 22.1059 23.7187 22.6875 23.7187Z"
                    fill="white"/>
                </svg>
                <span className={'px-1'}>Кошик</span>
              </Link>

              <Link href={route('favorites.index')}
                    className="rounded-md px-2 py-1 text-sm lg:text-base flex items-center space-x-3 whitespace-nowrap text-[#ffffff] hover:text-orange-500"
                    type="primary">
                <svg width="33" height="33" className="flex-shrink-0" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd"
                        d="M22.499 14.7525C23.3239 13.9146 23.7821 12.7833 23.773 11.6075C23.7638 10.4317 23.2879 9.30776 22.45 8.48285C22.0351 8.07439 21.5438 7.75165 21.0042 7.53306C20.4646 7.31447 19.8872 7.2043 19.305 7.20885C18.1292 7.21804 17.0052 7.69394 16.1803 8.53185C15.9563 8.75585 15.6716 9.03079 15.3263 9.35668L14.3661 10.2608L13.406 9.35668C13.0599 9.03001 12.7748 8.75507 12.5508 8.53185C11.7194 7.70044 10.5918 7.23336 9.41597 7.23336C8.24018 7.23336 7.11254 7.70044 6.28113 8.53185C4.56847 10.2457 4.54863 13.0165 6.21813 14.7385L14.3661 22.8865L22.499 14.7525ZM5.29063 7.54251C5.83233 7.00067 6.47546 6.57086 7.18329 6.27761C7.89112 5.98436 8.64979 5.83342 9.41597 5.83342C10.1821 5.83342 10.9408 5.98436 11.6486 6.27761C12.3565 6.57086 12.9996 7.00067 13.5413 7.54251C13.7536 7.75562 14.0286 8.02084 14.3661 8.33818C14.7021 8.02084 14.9771 7.75523 15.191 7.54135C16.2766 6.43904 17.7556 5.81313 19.3027 5.80132C20.8498 5.7895 22.3382 6.39275 23.4405 7.47835C24.5428 8.56394 25.1687 10.043 25.1805 11.59C25.1923 13.1371 24.5891 14.6255 23.5035 15.7278L15.191 24.0415C14.9722 24.2602 14.6755 24.3831 14.3661 24.3831C14.0568 24.3831 13.7601 24.2602 13.5413 24.0415L5.22647 15.7267C4.16018 14.627 3.56923 13.152 3.58123 11.6203C3.59324 10.0886 4.20724 8.62303 5.29063 7.54018V7.54251Z"
                        fill="white"/>
                </svg>
                <span>Список вподобань</span>
              </Link>
            </nav>
          </div>

          {/* Правая часть */}
          <div className="flex-1 bg-[#0f0f0f] p-6">
            <div>{children}</div>
          </div>
        </div>) : (<div className="flex-1 bg-[#0f0f0f] p-6">
        <div>{children}</div>
      </div>)}
    </div>
  );
}

