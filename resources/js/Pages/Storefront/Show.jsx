// import React from 'react';
import React from 'react';
import {router, useForm} from '@inertiajs/react';
import {Button, Input, Rate} from "antd";
const {TextArea} = Input;

export default function Show({ product,images,comments = [] }) {
  const { data, setData, post, errors } = useForm({
    comment: '',
    rating: 5,
    product_id: product.id,
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    post(route('comments.store'));
  };
  const handleDelete = (id) => {
    if (confirm('Вы уверены, что хотите удалить этот комментарий?')) {
      router.delete(route('comments.destroy', id));
    }
  };

  return (
    <div className="flex flex-col items-center p-4">
      <div className="w-1/3">
        {/*<img src={image} alt={product.name} className="w-full" />*/}
        {images.map((item, index) => (
          <img key={index} src={images[index]} alt='' className='w-1/4 inline'/>
        ))}
      </div>
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
              {comment.rating && <Rate disabled defaultValue={comment.rating}/>}
              {comment.can_delete && ( // Проверка, можно ли удалять
                <Button
                  type="danger"
                  color="danger" variant="dashed"
                  onClick={() => handleDelete(comment.id)}
                  className="mt-2"
                >
                  Удалить
                </Button>
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
              <Rate onChange={(e) => setData('rating', Number(e))} value={data.rating}/>
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


// // import React from 'react';
// import React from 'react';
// import {router, useForm} from '@inertiajs/react';
// import {Button, Input, Rate} from "antd";
// const {TextArea} = Input;
//
// export default function Show({ product, comments = [] }) {
//   const { data, setData, post, errors } = useForm({
//     comment: '',
//     rating: 5,
//     product_id: product.id,
//   });
//
//   const handleSubmit = (e) => {
//     e.preventDefault();
//
//     post(route('comments.store'));
//   };
//   const handleDelete = (id) => {
//     if (confirm('Вы уверены, что хотите удалить этот комментарий?')) {
//       router.delete(route('comments.destroy', id));
//     }
//   };
//
//   return (
//     <div className="flex flex-col items-center p-4">
//       <div className="w-1/3">
//         <h1 className="text-3xl font-bold">{product.name}</h1>
//         <p className="mt-2">SKU: {product.sku}</p>
//         <p className="mt-2">Price: ${product.price}</p>
//         <p className="mt-2">{product.description}</p>
//       </div>
//
//       <div className="w-full max-w-2xl mt-8">
//         <h2 className="text-xl font-semibold mb-4">Комментарии</h2>
//         {comments.length > 0 ? (
//           comments.map((comment) => (
//             <div key={comment.id} className="border-b py-4">
//               <p className="text-sm text-gray-500">
//                 {comment.user?.name || 'Аноним'} —{' '}
//                 {new Date(comment.created_at).toLocaleDateString()}
//               </p>
//               <p className="mt-1">{comment.comment}</p>
//               {comment.rating && <Rate disabled defaultValue={comment.rating}/>}
//               {comment.can_delete && ( // Проверка, можно ли удалять
//                 <Button
//                   type="danger"
//                   onClick={() => handleDelete(comment.id)}
//                   className="mt-2"
//                 >
//                   Удалить
//                 </Button>
//               )}
//             </div>
//           ))
//         ) : (
//           <p className="text-gray-500">Комментариев пока нет.</p>
//         )}
//       </div>
//
//       <div className="mt-8 w-full max-w-md">
//         <h2 className="text-xl font-semibold">Добавить комментарий</h2>
//         <form onSubmit={handleSubmit} className="mt-4">
//           <TextArea
//             rows={4}
//             placeholder="Ваш комментарий..."
//             value={data.comment}
//             onChange={(e) => setData('comment', e.target.value)}
//           ></TextArea>
//
//           {errors.comment && (
//             <p className="text-red-500 text-sm">{errors.comment}</p>
//           )}
//
//           <div className="mt-2">
//             <label>
//               Оценка:
//               <Rate onChange={(e) => setData('rating', Number(e))} value={data.rating}/>
//             </label>
//           </div>
//           {errors.rating && (
//             <p className="text-red-500 text-sm">{errors.rating}</p>
//           )}
//
//           <Button
//             type="primary"
//             onClick={handleSubmit}
//           >
//             Отправить
//           </Button>
//         </form>
//       </div>
//     </div>
//   );
// }
