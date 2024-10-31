import {Head, router, useForm} from "@inertiajs/react";
import CrmMenuLayout from "@/Pages/Crm/CrmMenuLayout.jsx";
import ProductForm from "@/Pages/Crm/Product/Components/ProductForm.jsx";
import {Button, Card, Image, Upload} from "antd";
import {arrayMove, horizontalListSortingStrategy, SortableContext, useSortable} from "@dnd-kit/sortable";
import {UploadOutlined} from "@ant-design/icons";
import {DndContext, PointerSensor, useSensor} from "@dnd-kit/core";
import React, {useState} from "react";
import {CSS} from "@dnd-kit/utilities";
import SortableMediaList from "@/Pages/Crm/Product/Components/SortableMediaList.jsx";

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

    images: '',
    videos: '',

    //workaround
    _method: 'put'
  })

  const [imageList, setImageList] = useState(images);
  const [videoList, setVideoList] = useState(videos);



  function handleSubmit(e) {
    e.preventDefault();

    let formData = new FormData();

    imageList.forEach((item, index) => {
      formData.append(`media_order[${index}]`, item.id);
    });

    formData.append("collection_name", 'default');

    axios.post(route('product.sync.mediaOrder', {product: product.id}), formData)
      .then(r => router.post(route('product.update', {product: product.id}), data));

  }

  return (
    <CrmMenuLayout>
      <ProductForm fields={data} changeHandler={setData} submit={handleSubmit}></ProductForm>

      <button className='border m-2 p-1' onClick={() => router.visit(route('product.index'))}>Cancel</button>

      <SortableMediaList images={imageList} setImages={setImageList}></SortableMediaList>

      <div id='videoContainer'>
        {videoList ? videoList.map((item, index) => (
          <video controls id={item.id} key={item.id} className='w-1/2 inline'>
            <source src={videoList[index].url} type='video/mp4'/>
          </video>
        )) : <p>No videos</p>}
      </div>

      <button className='border m-2 p-1 bg-red-500'
              onClick={() => router.delete(route('product.destroy', {product: product.id}))}>Delete
      </button>

    </CrmMenuLayout>
  );
}
