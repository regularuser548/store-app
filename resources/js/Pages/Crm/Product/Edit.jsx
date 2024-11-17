import {Head, router, useForm} from "@inertiajs/react";
import CrmMenuLayout from "@/Pages/Crm/CrmMenuLayout.jsx";
import ProductForm from "@/Pages/Crm/Product/Components/ProductForm.jsx";
import {Button, Card, Empty, Image, Upload} from "antd";
import {arrayMove, horizontalListSortingStrategy, SortableContext, useSortable} from "@dnd-kit/sortable";
import {UploadOutlined} from "@ant-design/icons";
import {DndContext, PointerSensor, useSensor} from "@dnd-kit/core";
import React, {useState} from "react";
import {CSS} from "@dnd-kit/utilities";
import SortableMediaList from "@/Pages/Crm/Product/Components/SortableMediaList.jsx";
import MediaUploadForm from "@/Pages/Crm/Product/Components/MediaUploadForm.jsx";

export default function Edit({product, images, videos = null, props}) {
  //https://vanilo.io/docs/4.x/products#all-product-fields
  const {data, setData, post, progress} = useForm({
    name: product.name,
    sku: product.sku,
    stock: product.stock,
    price: product.price,
    weight: product.weight,
    width: product.width,
    height: product.height,
    length: product.length,
    description: product.description,
    meta_keywords: product.meta_keywords,
    state: product.state,
    video_id: product.video_id,

    images: '',

    //workaround
    _method: 'put'
  })

  const [imageList, setImageList] = useState(images);
  //const [videoList, setVideoList] = useState(videos);

  const [uploadingImages, setUploadingImages] = useState([]);


  function handleSubmit(e) {
    e.preventDefault();

    let mediaOrder = new FormData();

    imageList.forEach((item, index) => {
      mediaOrder.append(`media_order[${index}]`, item.id);
    });

    mediaOrder.append("collection_name", 'default');

    axios.post(route('product.sync.mediaOrder', {product: product.id}), mediaOrder)
      .then(r => router.post(route('product.update', {product: product.id}), data));

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
    <CrmMenuLayout className="">
      <ProductForm fields={data} changeHandler={setData} submit={handleSubmit}></ProductForm>

      {/*<button className='border m-2 p-1' onClick={() => router.visit(route('product.index'))}>Cancel</button>*/}


      <SortableMediaList images={imageList} setImages={setImageList}></SortableMediaList>
      <div>
        <MediaUploadForm fileList={uploadingImages} changeHandler={setUploadingImages} max={10} text='Додати Фото'
                         accept='image/jpg, image/png, image/bmp, image/gif, image/svg, image/webp, image/avif'
                         listType='picture-card'>

        </MediaUploadForm>
        <Button onClick={handleImageUpload} disabled={uploadingImages.length === 0}>Завантажити</Button>
      </div>

      {product.video_id ?
        <iframe
          id="ytplayer" type="text/html" width="640" height="360"
          src={`https://www.youtube.com/embed/${product.video_id}?rel=0&iv_load_policy=3`}>
        </iframe> :
        <Empty description={
          <span>Відео відсутнє</span>
      }/>}

      <Button onClick={() => router.delete(route('product.destroy', {product: product.id}))}>Видалити</Button>

    </CrmMenuLayout>
  );
}
