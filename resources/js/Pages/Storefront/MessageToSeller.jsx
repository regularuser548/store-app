import React, { useState, useRef, useCallback } from "react";
import { Button, message, Space } from 'antd';
import { Head, Link } from "@inertiajs/react";
import axios from "axios";
import StoreFrontLayout from "@/Layouts/StoreFrontLayout.jsx";
import ProfileLayout from "@/Layouts/ProfileLayout.jsx";



export default function MessageToSeller({props, children}) {
  return (
      <ProfileLayout>


        <div className="bg-[#0f0f0f] text-white p-6 min-h-screen md:px-[8%]">

          <div
            className="rounded-md px-1 py-1 text-sm lg:text-base flex items-center space-x-3 lg:whitespace-nowrap text-[#ffffff] hover:text-orange-500">
            <h2 className="text-3xl font-bold mb-4">Листування з продавцями</h2>
            <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M22.5 11.25H25C25.663 11.25 26.2989 11.5134 26.7678 11.9822C27.2366 12.4511 27.5 13.087 27.5 13.75V27.5L22.5 22.5H15C14.337 22.5 13.7011 22.2366 13.2322 21.7678C12.7634 21.2989 12.5 20.663 12.5 20V18.75M17.5 11.25C17.5 11.913 17.2366 12.5489 16.7678 13.0178C16.2989 13.4866 15.663 13.75 15 13.75H7.5L2.5 18.75V5C2.5 4.33696 2.76339 3.70107 3.23223 3.23223C3.70107 2.76339 4.33696 2.5 5 2.5H15C15.663 2.5 16.2989 2.76339 16.7678 3.23223C17.2366 3.70107 17.5 4.33696 17.5 5V11.25Z"
                stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>

          </div>


          <div className="lg:p-20">
            <div
              className="flex flex-col lg:flex-row items-start lg:items-center sm:items-start space-y-4 lg:space-y-0 lg:space-x-4">
              <div
                className="bg-[#1E1E1E]  text-white text-2xl p-4 rounded-md max-w-sm mx-auto text-center border border-[#D9D9D996]">
                <p className="break-words">
                  Отримуйте сповіщення про замовлення та спілкуйтеся з ShopHub в наших соцмережах
                </p>
              </div>


              <div className="pr-[20%]">
                <svg width="70" height="70" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18.75 12.5L31.25 25L18.75 37.5" stroke="white" strokeOpacity="0.75" strokeWidth="2"
                        strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>


              <div className="flex flex-col space-y-4">
                <Link
                  href={route('login')}
                  className="rounded-md px-3 py-2 text-sm md:text-base flex items-center space-x-3 whitespace-nowrap text-white hover:text-orange-500"
                  type="primary"

                >
                  <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clipPath="url(#clip0_291_529)">
                      <path
                        d="M38.2812 0H11.7188C5.24666 0 0 5.24666 0 11.7188V38.2812C0 44.7533 5.24666 50 11.7188 50H38.2812C44.7533 50 50 44.7533 50 38.2812V11.7188C50 5.24666 44.7533 0 38.2812 0Z"
                        fill="url(#paint0_radial_291_529)"/>
                      <path
                        d="M38.2812 0H11.7188C5.24666 0 0 5.24666 0 11.7188V38.2812C0 44.7533 5.24666 50 11.7188 50H38.2812C44.7533 50 50 44.7533 50 38.2812V11.7188C50 5.24666 44.7533 0 38.2812 0Z"
                        fill="url(#paint1_radial_291_529)"/>
                      <path
                        d="M25.0018 5.46875C19.6975 5.46875 19.0316 5.49199 16.9484 5.58672C14.8691 5.68203 13.4498 6.01113 12.208 6.49414C10.9232 6.99297 9.83359 7.66035 8.74805 8.74629C7.66152 9.83203 6.99414 10.9217 6.49375 12.2059C6.00938 13.448 5.67988 14.868 5.58633 16.9463C5.49316 19.0297 5.46875 19.6957 5.46875 25.0002C5.46875 30.3047 5.49219 30.9684 5.58672 33.0516C5.68242 35.1309 6.01152 36.5502 6.49414 37.792C6.99336 39.0768 7.66074 40.1664 8.74668 41.252C9.83203 42.3385 10.9217 43.0074 12.2055 43.5062C13.4482 43.9893 14.8678 44.3184 16.9467 44.4137C19.0301 44.5084 19.6953 44.5316 24.9994 44.5316C30.3043 44.5316 30.968 44.5084 33.0512 44.4137C35.1305 44.3184 36.5514 43.9893 37.7941 43.5062C39.0783 43.0074 40.1664 42.3385 41.2516 41.252C42.3381 40.1664 43.0053 39.0768 43.5059 37.7926C43.9859 36.5502 44.3156 35.1305 44.4133 33.052C44.5068 30.9688 44.5312 30.3047 44.5312 25.0002C44.5312 19.6957 44.5068 19.0301 44.4133 16.9467C44.3156 14.8674 43.9859 13.4482 43.5059 12.2064C43.0053 10.9217 42.3381 9.83203 41.2516 8.74629C40.1652 7.65996 39.0787 6.99258 37.793 6.49434C36.5479 6.01113 35.1277 5.68184 33.0484 5.58672C30.965 5.49199 30.3018 5.46875 24.9957 5.46875H25.0018ZM23.2496 8.98848C23.7697 8.9877 24.35 8.98848 25.0018 8.98848C30.2168 8.98848 30.8348 9.00723 32.8941 9.10078C34.7984 9.18789 35.832 9.50605 36.5205 9.77344C37.432 10.1273 38.0818 10.5506 38.765 11.2344C39.4486 11.918 39.8717 12.5689 40.2266 13.4805C40.4939 14.168 40.8125 15.2016 40.8992 17.1059C40.9928 19.1648 41.0131 19.7832 41.0131 24.9957C41.0131 30.2082 40.9928 30.8268 40.8992 32.8855C40.8121 34.7898 40.4939 35.8234 40.2266 36.5111C39.8727 37.4227 39.4486 38.0717 38.765 38.7549C38.0814 39.4385 37.4324 39.8615 36.5205 40.2156C35.8328 40.4842 34.7984 40.8016 32.8941 40.8887C30.8352 40.9822 30.2168 41.0025 25.0018 41.0025C19.7865 41.0025 19.1684 40.9822 17.1096 40.8887C15.2053 40.8008 14.1717 40.4826 13.4826 40.2152C12.5713 39.8611 11.9201 39.4381 11.2365 38.7545C10.5529 38.0709 10.1299 37.4215 9.775 36.5096C9.50762 35.8219 9.18906 34.7883 9.10234 32.884C9.00879 30.825 8.99004 30.2066 8.99004 24.9908C8.99004 19.775 9.00879 19.16 9.10234 17.101C9.18945 15.1967 9.50762 14.1631 9.775 13.4746C10.1291 12.5631 10.5529 11.9121 11.2367 11.2285C11.9205 10.5449 12.5713 10.1217 13.4828 9.76699C14.1713 9.49844 15.2053 9.18105 17.1096 9.09355C18.9113 9.01211 19.6096 8.98769 23.2496 8.98359V8.98848ZM35.4275 12.2314C34.1336 12.2314 33.0838 13.2803 33.0838 14.5744C33.0838 15.8684 34.1336 16.9182 35.4275 16.9182C36.7215 16.9182 37.7713 15.8684 37.7713 14.5744C37.7713 13.2805 36.7215 12.2307 35.4275 12.2307V12.2314ZM25.0018 14.9699C19.4627 14.9699 14.9717 19.4609 14.9717 25.0002C14.9717 30.5395 19.4627 35.0283 25.0018 35.0283C30.541 35.0283 35.0305 30.5395 35.0305 25.0002C35.0305 19.4611 30.5406 14.9699 25.0014 14.9699H25.0018ZM25.0018 18.4896C28.5973 18.4896 31.5123 21.4043 31.5123 25.0002C31.5123 28.5957 28.5973 31.5107 25.0018 31.5107C21.4062 31.5107 18.4914 28.5957 18.4914 25.0002C18.4914 21.4043 21.4061 18.4896 25.0018 18.4896Z"
                        fill="white"/>
                    </g>
                    <defs>
                      <radialGradient id="paint0_radial_291_529" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse"
                                      gradientTransform="translate(13.2812 53.851) rotate(-90) scale(49.5537 46.0889)">
                        <stop stopColor="#FFDD55"/>
                        <stop offset="0.1" stopColor="#FFDD55"/>
                        <stop offset="0.5" stopColor="#FF543E"/>
                        <stop offset="1" stopColor="#C837AB"/>
                      </radialGradient>
                      <radialGradient id="paint1_radial_291_529" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse"
                                      gradientTransform="translate(-8.3752 3.60176) rotate(78.681) scale(22.1508 91.3062)">
                        <stop stopColor="#3771C8"/>
                        <stop offset="0.128" stopColor="#3771C8"/>
                        <stop offset="1" stopColor="#6600FF" stopOpacity="0"/>
                      </radialGradient>
                      <clipPath id="clip0_291_529">
                        <rect width="50" height="50" fill="white"/>
                      </clipPath>
                    </defs>
                  </svg>

                  <span>Повідомлення</span>
                </Link>
                <Link
                  href={route('login')}
                  className="rounded-md px-3 py-2 text-sm md:text-base flex items-center space-x-3 whitespace-nowrap text-white hover:text-orange-500"
                  type="primary"
                >
                  <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M50 25.0002C50 11.193 38.807 0 25 0C11.193 0 0 11.193 0 25.0002C0 37.4784 9.14219 47.8212 21.0938 49.6966V32.2268H14.7461V25.0002H21.0938V19.4923C21.0938 13.2266 24.8262 9.76569 30.5367 9.76569C33.2719 9.76569 36.1328 10.254 36.1328 10.254V16.4064H32.9805C29.8748 16.4064 28.9062 18.3335 28.9062 20.3107V25.0002H35.8398L34.7314 32.2268H28.9062V49.6966C40.8578 47.8212 50 37.4786 50 25.0002Z"
                      fill="#1877F2"/>
                    <path
                      d="M34.7314 32.2265L35.8398 24.9999H28.9062V20.3104C28.9062 18.333 29.8748 16.4061 32.9805 16.4061H36.1328V10.2537C36.1328 10.2537 33.2719 9.76541 30.5365 9.76541C24.8262 9.76541 21.0938 13.2264 21.0938 19.492V24.9999H14.7461V32.2265H21.0938V49.6963C22.386 49.8988 23.692 50.0003 25 50C26.308 50.0003 27.614 49.8988 28.9062 49.6963V32.2265H34.7314Z"
                      fill="white"/>
                  </svg>

                  <span>Повідомлення</span>
                </Link>
                <Link
                  href={route('login')}
                  className="rounded-md px-3 py-2 text-sm md:text-base flex items-center space-x-3 whitespace-nowrap text-white hover:text-orange-500"
                  type="primary"
                >
                  <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clipPath="url(#clip0_291_521)">
                      <path
                        d="M25 0C18.3711 0 12.0078 2.63555 7.32422 7.32227C2.63583 12.0109 0.0013416 18.3695 0 25C0 31.6277 2.63672 37.991 7.32422 42.6777C12.0078 47.3645 18.3711 50 25 50C31.6289 50 37.9922 47.3645 42.6758 42.6777C47.3633 37.991 50 31.6277 50 25C50 18.3723 47.3633 12.009 42.6758 7.32227C37.9922 2.63555 31.6289 0 25 0Z"
                        fill="url(#paint0_linear_291_521)"/>
                      <path
                        d="M11.3163 24.7359C18.6053 21.5609 23.4647 19.4677 25.8944 18.4562C32.8397 15.5684 34.2811 15.0668 35.2225 15.0498C35.4295 15.0465 35.8905 15.0977 36.1913 15.3408C36.4413 15.5459 36.5116 15.8232 36.5467 16.018C36.578 16.2125 36.6209 16.6559 36.5858 17.0019C36.2108 20.9551 34.5819 30.548 33.7538 34.9758C33.4061 36.8492 32.7147 37.4773 32.0467 37.5387C30.5936 37.6723 29.492 36.5793 28.0858 35.6578C25.8866 34.2152 24.6444 33.3176 22.5077 31.9102C20.0389 30.2836 21.6405 29.3895 23.0467 27.9285C23.4139 27.5461 29.8124 21.7277 29.9334 21.2C29.9491 21.134 29.9647 20.8879 29.8163 20.7582C29.6717 20.6281 29.4569 20.6727 29.3006 20.7078C29.078 20.7578 25.5663 23.0812 18.7538 27.6777C17.7577 28.3629 16.8553 28.6969 16.0428 28.6793C15.1522 28.6602 13.4334 28.1746 12.1561 27.7598C10.5936 27.2508 9.34751 26.9816 9.45688 26.1172C9.51157 25.6672 10.1327 25.2066 11.3163 24.7359Z"
                        fill="white"/>
                    </g>
                    <defs>
                      <linearGradient id="paint0_linear_291_521" x1="2500" y1="0" x2="2500" y2="5000"
                                      gradientUnits="userSpaceOnUse">
                        <stop stopColor="#2AABEE"/>
                        <stop offset="1" stopColor="#229ED9"/>
                      </linearGradient>
                      <clipPath id="clip0_291_521">
                        <rect width="50" height="50" fill="white"/>
                      </clipPath>
                    </defs>
                  </svg>

                  <span>Повідомлення</span>
                </Link>
              </div>
            </div>
          </div>
        </div>


      </ProfileLayout>
  );
}
