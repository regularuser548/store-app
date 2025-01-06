import {router} from "@inertiajs/react";
import ProductForm from "@/Pages/Crm/Product/Components/ProductForm.jsx";
import {Button, Empty} from "antd";
import React, {useState} from "react";
import SortableMediaList from "@/Pages/Crm/Product/Components/SortableMediaList.jsx";
import MediaUploadForm from "@/Pages/Crm/Product/Components/MediaUploadForm.jsx";

export default function Edit({product, images, taxonomyTree, currentCategory}) {
  //https://vanilo.io/docs/4.x/products#all-product-fields
  const formFields = {
    name: product.name,
    sku: product.sku,
    stock: product.stock,
    price: product.price,
    weight: product.weight,
    width: product.width,
    height: product.height,
    length: product.length,
    description: product.description,
    state: product.state,
    video_id: product.video_id,
    full_category_ids: currentCategory,

    images: '',

    //workaround
    _method: 'put'
  }

  const [imageList, setImageList] = useState(images);

  const [uploadingImages, setUploadingImages] = useState([]);

  const [errors, setErrors] = useState({});

  function handleSubmit(values) {
    //e.preventDefault();

    let mediaOrder = new FormData();

    imageList.forEach((item, index) => {
      mediaOrder.append(`media_order[${index}]`, item.id);
    });

    mediaOrder.append("collection_name", 'default');

    // axios.post(route('product.sync.mediaOrder', {product: product.id}), mediaOrder)
    //   .then(r => router.visit(route('product.store', {product: product.id})));

    values.taxon_id = values.full_category_ids?.at(-1);

    console.log(values);

  }

  function handleImageUpload() {
    if (uploadingImages.length > 0) {
      let newImages = new FormData();

      uploadingImages.forEach((item, index) => {
        newImages.append(`images[${index}]`, item.originFileObj);
      });

      router.post(route('product.addMedia', {product: product.id}), newImages, {preserveState: false});
    }
  }

  return (
    <>

      <ProductForm initialValues={formFields} taxonomyTree={taxonomyTree}
                   submitHandler={handleSubmit}
                   precognitiveValidationUrl={route('product.update', {product: product.id})}></ProductForm>

      {/*<button className='border m-2 p-1' onClick={() => router.visit(route('product.index'))}>Cancel</button>*/}


      {/*<SortableMediaList images={imageList} setImages={setImageList}></SortableMediaList>*/}

      {/*<div>*/}
      {/*  <MediaUploadForm fileList={uploadingImages} changeHandler={setUploadingImages} max={10} text='Додати Фото'*/}
      {/*                   accept='image/jpg, image/png, image/bmp, image/gif, image/svg, image/webp, image/avif'*/}
      {/*                   listType='picture-card'>*/}

      {/*  </MediaUploadForm>*/}
      {/*  <Button onClick={handleImageUpload} disabled={uploadingImages.length === 0}>Завантажити</Button>*/}
      {/*</div>*/}

      {/*{product.video_id ?*/}
      {/*  <iframe*/}
      {/*    id="ytplayer" type="text/html" width="640" height="360"*/}
      {/*    src={`https://www.youtube.com/embed/${product.video_id}?rel=0&iv_load_policy=3`}>*/}
      {/*  </iframe> :*/}
      {/*  <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={*/}
      {/*    <span>Відео відсутнє</span>*/}
      {/*  }/>}*/}

      <Button onClick={() => router.delete(route('product.destroy', {product: product.id}))}>Видалити</Button>

    </>
  );
}
