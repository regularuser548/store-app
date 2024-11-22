import React, { useState } from 'react';
import { router } from '@inertiajs/react';

export default function Show({ product, images }) {
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(5); // Состояние для рейтинга
  const [photo, setPhoto] = useState(null); // Состояние для фото

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('content', comment);
    formData.append('rating', rating);
    if (photo) {
      formData.append('photo', photo);
    }

    router.post(route('comments.store'), formData, {
      onSuccess: () => {
        setComment('');
        setRating(5);
        setPhoto(null);
      },
    });
  };

  return (
    <div className="flex flex-col items-center p-4">
      {/* Отображение продуктов */}
      <div className="flex">
        <div className="w-1/3">
          {images.map((item, index) => (
            <img key={index} src={images[index]} alt="" className="w-1/4 inline" />
          ))}
        </div>
        <div className="w-1/3 ml-8">
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="mt-4">SKU: {product.sku}</p>
          <p className="mt-2">Price: ${product.price}</p>
          <p className="mt-2">{product.description}</p>
        </div>
      </div>

      {/* Кнопка для открытия формы */}
      <div className="mt-4">
        <button className="font-bold" onClick={() => document.getElementById('commentForm').classList.toggle('hidden')}>
          Добавить комментарий
        </button>
      </div>

      {/* Форма добавления комментария */}
      <div id="commentForm" className="mt-8 w-full max-w-md hidden">
        <h2 className="text-xl font-semibold">Добавить комментарий</h2>
        <form onSubmit={handleSubmit} className="mt-4">
          <textarea
            className="w-full p-2 border rounded"
            placeholder="Ваш комментарий..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          ></textarea>
          <div className="mt-2">
            <label>
              Оценка:
              <select
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                className="ml-2 p-2 border rounded"
              >
                {[1, 2, 3, 4, 5].map((star) => (
                  <option key={star} value={star}>
                    {star}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div className="mt-2">
            <label>
              Фото:
              <input
                type="file"
                className="ml-2"
                onChange={(e) => setPhoto(e.target.files[0])}
              />
            </label>
          </div>
          <button
            type="submit"
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Отправить
          </button>
        </form>
      </div>
    </div>
  );
}
