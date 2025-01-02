// import React from 'react';
import React from 'react';
import {router, useForm} from '@inertiajs/react';
import {Button, Input, Rate, Tag} from "antd";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";


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
  // console.log(images);


  const ImageSlider = () => {
    // Данные слайдов


    const images2 = Array.from(product.media).map((item, index) => ({
      original: item.original_url, // Assuming item.imageUrl is where the URL is stored for the original image
      thumbnail: item.original_url, // Assuming item.thumbnailUrl is where the URL is stored for the thumbnail
    }));

    console.log(images2);
    // const images = [
    //   {
    //     original: "https://prod-api.mediaexpert.pl/api/images/gallery_500_500/thumbnails/images/27/2782915/393720.jpg", // Основное изображение
    //     thumbnail: "https://prod-api.mediaexpert.pl/api/images/gallery_500_500/thumbnails/images/27/2782915/393720.jpg", // Миниатюра
    //   },
    // ];

    return (
      <div className="w-96 h-full">
        {/* Контейнер для галереи */}
        <ImageGallery
          items={images2}
          showIndex={false}
        showBullets={true}
        infinite={true}
        showThumbnails={true}
        showFullscreenButton={true}
        showGalleryFullscreenButton={true}
        showPlayButton={false}
        showGalleryPlayButton={true}
        showNav={true}
        slideVertically={false}
        isRTL={false}
        slideDuration={450}
        slideInterval={2000}
        slideOnThumbnailOver={false}
        thumbnailPosition= "bottom"
        showVideo={false}
        useWindowKeyDown={true}
          renderItem={(item) => (
            <div className="w-full h-full flex justify-center items-center">
              {/* Контейнер для изображения */}
              <img
                src={item.original}
                alt={item.description}
                className="w-full h-max object-fill" // Изображение на весь размер контейнера
              />
            </div>
          )}
          renderThumbInner={(item) => (
            <img
              src={item.thumbnail}
              alt={item.description}
              className="" // Стили миниатюр
            />
          )}
        />
      </div>
    );
  };


  return (
    <div>
      <div className="flex flex-col lg:flex-row bg-[#0F0F0F] text-white p-6 rounded-md">
        <div className="lg:w-2/3 flex justify-center items-center bg-[#0F0F0F] rounded-md">
          <ImageSlider/>
        </div>

        {/* Details Section */}
        <div className="lg:w-1/3 flex flex-col justify-between lg:pl-6  lg:mt-0">
          {/* Product Info */}
          <div>
            <h2 className="text-2xl font-bold ">{product.name}</h2>
            <div className="flex items-center space-x-2 ">
              <span className="text-yellow-500">★☆☆☆☆</span>
              <span className="text-sm text-gray-400">(Оцінка товару - 1/5)</span>
            </div>
            <p className="text-3xl font-semibold ">Ціна: {product.price} грн.</p>
          </div>

          {/* Product Details */}
          <div className="">
            <p>
              <span className="font-bold">Код замовлення:</span> 365714604
            </p>
            <p>
              <span className="font-bold">Виробник товару:</span> Samsung
            </p>
          </div>

          {/* Product Description */}
          <div className="mb-4">
            <h3 className="text-xl font-semibold">Опис:</h3>
            <ul className="mt-2 text-gray-300">
              <li>Роздільна здатність дисплея: 2340 x 1080</li>
              <li>Частота оновлення екрана: 120 Гц</li>
              <li>Вбудована пам'ять: 256 ГБ</li>
              <li>Операційна система: Android</li>
            </ul>
          </div>

          {/* Purchase Button */}
          <div className="flex items-center mt-4">
            <button className="bg-orange-500 text-white py-2 px-6 rounded-md hover:bg-orange-600">
              Придбати 🛒
            </button>
            <span className="ml-4 text-green-400">В наявності</span>
          </div>
        </div>
      </div>


      <div className="flex flex-col items-center p-4">

        {/*<div className="w-1/3">*/}
        {/*  /!*<img src={image} alt={product.name} className="w-full" />*!/*/}
        {/*  {images.map((item, index) => (*/}
        {/*    <img key={index} src={images[index]} alt='' className='w-1/4 inline'/>*/}
        {/*  ))}*/}
        {/*</div>*/}
        {/*<div className="w-1/3">*/}
        {/*  <h1 className="text-3xl font-bold">{product.name}</h1>*/}
        {/*  <p className="mt-2">SKU: {product.sku}</p>*/}
        {/*  <p className="mt-2">Price: ${product.price}</p>*/}
        {/*  <p className="mt-2">{product.description}</p>*/}
        {/*</div>*/}

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
