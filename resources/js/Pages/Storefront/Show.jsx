import React, {useState} from 'react';
import {router, useForm} from '@inertiajs/react';
import {Breadcrumb, Button, Input, Rate, Tag} from "antd";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import axios from "axios";
import {HomeOutlined, UserOutlined} from "@ant-design/icons";


const {TextArea} = Input;
export default function Show({product, images, comments = []}) {
  const {data, setData, post, errors} = useForm({
    comment: '',
    rating: 5,
    product_id: product.id,
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    post(route('comments.store'));
    data.comment = '';
  };
  const handleDelete = (id) => {
    if (confirm('Ви точно хочете видалити цей коментар?')) {
      router.delete(route('comments.destroy', id));
    }
  };
  const handleAddToCart = () => {
    axios.post(route('cart.add'), {product});
  };


  const ratings = comments
    .filter(comment => comment.rating !== undefined) // Отбираем только те, у которых есть рейтинг
    .map(comment => comment.rating); // Извлекаем значения рейтинга

  const averageRating = ratings.length > 0
    ? ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length
    : 0; // Если нет рейтингов, возвращаем 0
  // console.log("Середнє арифметичне:", averageRating);

  const [isAvailable, setIsAvailable] = useState(product.stock > 0 && product.state === 'active');

  function initializeGallery() {
    let images = product.media.map((item, index) => ({
      original: item.original_url,
      thumbnail: item.original_url,
    }));

    if (product.video_id) {
      images.unshift({
        embedUrl: "https://www.youtube.com/embed/" + product.video_id,
        thumbnail: `https://img.youtube.com/vi/${product.video_id}/0.jpg`,
        renderItem:
          (item) => (
            <div className="video-wrapper flex justify-center">
              <iframe
                width="80%"
                height="400px"
                src={item.embedUrl}
                allowFullScreen
              ></iframe>
            </div>
          )
      })
    }
    return images;
  }

  const [imageGalleryItems, setImageGalleryItems] = useState(initializeGallery);

  function initializeBreadcrumbs() {
    const breadcrumbs = product?.category_path?.map((name, index) => ({
      title: name
    }));

    if (breadcrumbs) {
      breadcrumbs.unshift({
        href: route('storefront.index'),
        title: <HomeOutlined/>,
      })
    }

    return breadcrumbs;
  }

  const [breadcrumbs, setBreadcrumbs] = useState(initializeBreadcrumbs);


  return (
    <div>
      <Breadcrumb className='mt-2 ms-12'
                  items={breadcrumbs}
      />
      <div className="flex flex-col lg:flex-row bg-[#0F0F0F] text-white p-6 rounded-md">
        <div className="lg:w-2/3 flex justify-center items-center bg-[#0F0F0F] rounded-md">
          <div className="w-full h-full">
            <ImageGallery
              items={imageGalleryItems}
              showIndex={false}
              infinite={true}
              showFullscreenButton={false}
              showThumbnails={true}
              showPlayButton={false}
              showNav={true}
              slideVertically={false}
              slideDuration={450}
              slideInterval={2000}
              slideOnThumbnailOver={false}
              thumbnailPosition="bottom"
              useWindowKeyDown={true}
            />
          </div>
        </div>

        {/* Details Section */}
        <div className="lg:w-1/3 flex flex-col justify-between lg:pl-6  lg:mt-0">
          {/* Product Info */}
          <div>
            <h2 className="text-2xl font-bold ">{product.name}</h2>
            <div className="flex items-center space-x-2 ">
              <span className="text-yellow-500"> <Rate disabled defaultValue={averageRating}/></span>
              <span className="text-sm text-gray-400">(Оцінка товару - {averageRating})</span>
            </div>
            <p className="text-3xl font-semibold ">Ціна: {product.price} ₴</p>
          </div>

          {/* Product Details */}
          <div className="">
            <p>
              <span className="font-bold">Код замовлення:</span> {product.id}
            </p>
            <p>
              {/*<span className="font-bold">Виробник товару:</span> Samsung*/}
            </p>
          </div>

          {/* Product Description */}
          <div className="mb-4">
            <h3 className="text-xl font-semibold">Опис:</h3>
            <ul className="mt-2 text-gray-300">
              <li>{product.description}</li>
            </ul>
          </div>

          {/* Purchase Button */}
          <div className="flex items-center mt-4">
            <button
              className="bg-orange-500 text-[#000000] font-bold py-2 px-6 rounded-md hover:bg-orange-600 flex items-center"
              onClick={() => handleAddToCart()}
              disabled={!isAvailable}>
              Придбати
              <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M8.75 27.5C8.0625 27.5 7.47417 27.2554 6.985 26.7663C6.49583 26.2771 6.25083 25.6883 6.25 25C6.24917 24.3117 6.49417 23.7233 6.985 23.235C7.47583 22.7467 8.06417 22.5017 8.75 22.5C9.43583 22.4983 10.0246 22.7433 10.5163 23.235C11.0079 23.7267 11.2525 24.315 11.25 25C11.2475 25.685 11.0029 26.2738 10.5163 26.7663C10.0296 27.2588 9.44083 27.5033 8.75 27.5ZM21.25 27.5C20.5625 27.5 19.9742 27.2554 19.485 26.7663C18.9958 26.2771 18.7508 25.6883 18.75 25C18.7492 24.3117 18.9942 23.7233 19.485 23.235C19.9758 22.7467 20.5642 22.5017 21.25 22.5C21.9358 22.4983 22.5246 22.7433 23.0163 23.235C23.5079 23.7267 23.7525 24.315 23.75 25C23.7475 25.685 23.5029 26.2738 23.0163 26.7663C22.5296 27.2588 21.9408 27.5033 21.25 27.5ZM7.6875 7.5L10.6875 13.75H19.4375L22.875 7.5H7.6875ZM6.5 5H24.9375C25.4167 5 25.7812 5.21375 26.0312 5.64125C26.2813 6.06875 26.2917 6.50083 26.0625 6.9375L21.625 14.9375C21.3958 15.3542 21.0887 15.6771 20.7038 15.9062C20.3188 16.1354 19.8967 16.25 19.4375 16.25H10.125L8.75 18.75H23.75V21.25H8.75C7.8125 21.25 7.10417 20.8388 6.625 20.0163C6.14583 19.1938 6.125 18.3758 6.5625 17.5625L8.25 14.5L3.75 5H1.25V2.5H5.3125L6.5 5Z"
                  fill="black"/>
              </svg>
            </button>

            <span
              className={`ml-4 ${
                isAvailable ? "text-green-400" : "text-red-400"
              }`}
            >
              {isAvailable ? "В наявності" : "Не в наявності"}
            </span>
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
          <h2 className="text-xl font-semibold mb-4 flex justify-center">Коментарі</h2>
          {comments.length > 0 ? (
            comments.map((comment) => (
              <div key={comment.id} className="border-b py-4">
                <p className="text-sm text-gray-500">
                  {comment.user?.name || 'Анонім'} —{' '}
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
                    Видалити
                  </Button>
                )}
              </div>
            ))
          ) : (
            <p className="text-gray-500">Коментарів поки що немає.</p>
          )}
        </div>

        <div className="mt-8 w-full max-w-md">
          <h2 className="text-xl font-semibold">Додати коментар</h2>
          <form onSubmit={handleSubmit} className="mt-4">
            <TextArea
              rows={4}
              placeholder="Додати коментар..."
              value={data.comment}
              onChange={(e) => setData('comment', e.target.value)}
            ></TextArea>

            {errors.comment && (
              <p className="text-red-500 text-sm">{errors.comment}</p>
            )}

            <div className="mt-4 flex justify-around items-centerь">
              <label className="text-2xl">
                Оцінка:
                <Rate rootClassName="ms-2" onChange={(e) => setData('rating', Number(e))} value={data.rating}/>
              </label>
              <Button
                type="primary"
                onClick={handleSubmit}
              >
                Відправити
              </Button>
            </div>
            {errors.rating && (
              <p className="text-red-500 text-sm">{errors.rating}</p>
            )}
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
