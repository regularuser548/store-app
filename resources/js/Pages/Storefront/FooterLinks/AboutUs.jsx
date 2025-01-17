import React, { useState, useRef, useCallback } from "react";
import { Button, message, Space } from 'antd';
import { Head, Link } from "@inertiajs/react";
import axios from "axios";
import StoreFrontLayout from "@/Layouts/StoreFrontLayout.jsx";
import ProfileLayout from "@/Layouts/ProfileLayout.jsx";


const  AboutUs = ({props, children}) => {
  return (
    <div className="p-6 bg-[#0f0f0f] min-h-screen text-[#ffffff] md:px-[7%]">
      <h1 className="text-3xl text-center mb-16 sm:text-5xl font-bold">Про Нас</h1>
      <p className="text-base sm:text-lg text-left mb-16 ">
        ShopHub − найбільший онлайн-ритейлер у країні.  Ми втілюємо маленькі мрії та грандіозні плани мільйонів людей.
        У нас можна знайти буквально все. Ми продаємо за справедливою ціною та надаємо гарантію, бо вважаємо, що онлайн-шопінг
        має бути максимально зручним і безпечним. І щоразу, коли хтось натискає «Купити», ми розуміємо, що робимо потрібну справу.
      </p>
      <h2 className="text-4xl text-center sm:text-5xl font-bold mb-4">ShopHub</h2>
      <p className="text-lg text-center mb-16  sm:text-xl italic">завжди для тебе</p>
      <h3 className="text-xl sm:text-2xl font-bold mb-6 ">Наша мета – бути корисними.</h3>
      <p className="text-base sm:text-lg text-left mb-6">
        Ми віримо, що речі існують для того, щоб робити життя простішим, приємнішим і добрішим.
        Тому й пошук тієї самої речі повинен бути швидким, зручним і приємним. Ми не просто продаємо
        побутову техніку, електроніку, прикраси або вино. Ми допомагаємо знайти саме те, що треба,
        в одному місці та без зайвих хвилювань, щоб ви не витрачали життя на пошуки, а просто жили щасливо.
      </p>
      <p className="text-base sm:text-lg text-left">
        ShopHub − це універсальна відповідь на будь-який запит,
        початок пошуку та його кінцева зупинка, справжній помічник.
        Ми назавжди позбавляємо своїх покупців від неприємних компромісів,
        виконуємо бажання і даємо змогу мріяти сміливіше. Завдяки розумному пошуку
        та чесному сервісу ми робимо життя наших клієнтів трішки кращим просто зараз.
      </p>

    </div>
  );
};

export default AboutUs;
