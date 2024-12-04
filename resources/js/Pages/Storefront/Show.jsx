import React from 'react';
import {router, useForm} from '@inertiajs/react';
import {Button, Input, Rate} from "antd";
const {TextArea} = Input;

export default function Show({ product, comments = [] }) {
  const { data, setData, post, errors } = useForm({
    comment: '',
    rating: 5,
    product_id: product.id,
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    post(route('comments.store'));
  };

  return (
    <div className="flex flex-col items-center p-4">
      <div className="w-1/3">
        <h1 className="text-3xl font-bold">{product.name}</h1>
        <p className="mt-2">SKU: {product.sku}</p>
        <p className="mt-2">Price: ${product.price}</p>
        <p className="mt-2">{product.description}</p>
      </div>

      <div className="w-full max-w-2xl mt-8">
        <h2 className="text-xl font-semibold mb-4">Комментарии</h2>
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment.id} className="border-b py-4">
              <p className="text-sm text-gray-500">
                {comment.user?.name || 'Аноним'} —{' '}
                {new Date(comment.created_at).toLocaleDateString()}
              </p>
              <p className="mt-1">{comment.comment}</p>
              {comment.rating && (
                // <p className="text-yellow-500">Оценка: {comment.rating}⭐</p>
                <Rate disabled defaultValue={comment.rating} />
          )}
            </div>
          ))
        ) : (
          <p className="text-gray-500">Комментариев пока нет.</p>
        )}
      </div>

      <div className="mt-8 w-full max-w-md">
        <h2 className="text-xl font-semibold">Добавить комментарий</h2>
        <form onSubmit={handleSubmit} className="mt-4">
          <TextArea
            rows={4}
            placeholder="Ваш комментарий..."
            value={data.comment}
            onChange={(e) => setData('comment', e.target.value)}
          ></TextArea>

          {errors.comment && (
            <p className="text-red-500 text-sm">{errors.comment}</p>
          )}

          <div className="mt-2">
            <label>
              Оценка:
              {/*<select*/}
              {/*  value={data.rating}*/}
              {/*  onChange={(e) => setData('rating', Number(e.target.value))}*/}
              {/*  className="ml-2 p-2 border rounded"*/}
              {/*>*/}
              {/*  {[1, 2, 3, 4, 5].map((star) => (*/}
              {/*    <option key={star} value={star}>*/}
              {/*      {star}*/}
              {/*    </option>*/}
              {/*  ))}*/}
              {/*</select>*/}
              <Rate onChange={(e) => setData('rating', Number(e))} value={data.rating} />
            </label>
          </div>
          {errors.rating && (
            <p className="text-red-500 text-sm">{errors.rating}</p>
          )}

          <Button
            type="primary"
            onClick={handleSubmit}
          >
            Отправить
          </Button>
        </form>
      </div>
    </div>
  );
}
