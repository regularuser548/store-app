import {router, usePage} from "@inertiajs/react";
import ProductForm from "@/Pages/Crm/Product/Components/ProductForm.jsx";
import {Button, Empty, Form, Tabs} from "antd";
import React, {useEffect, useState} from "react";
import SortableMediaList from "@/Pages/Crm/Product/Components/SortableMediaList.jsx";
import MediaUploadForm from "@/Pages/Crm/Product/Components/MediaUploadForm.jsx";
import TabPane from "antd/es/tabs/TabPane.js";

export default function Edit({product, images, taxonomyTree, currentCategory}) {
  //https://vanilo.io/docs/4.x/products#all-product-fields
  const initialValues = {
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

  const [form] = Form.useForm();

  const [imageList, setImageList] = useState(images);

  const [uploadingImages, setUploadingImages] = useState([]);

  const {errors} = usePage().props;
  const [precognitiveErrors, setPrecognitiveErrors] = useState({});

  useEffect(() => {
    setPrecognitiveErrors((prevErrors) => ({...prevErrors, ...errors}));
  }, [errors]);


  const validateField = async (fieldName, fieldValue) => {
    try {
      // Make a Precognition validation request
      await axios.post(
        route('product.update', {product: product.id}),
        form.getFieldsValue(),
        {headers: {Precognition: true}}
      );
      // Clear the error for the field if validation passes
      setPrecognitiveErrors((prevErrors) => ({...prevErrors, [fieldName]: undefined}));
    } catch (error) {
      if (error.response && error.response.data.errors) {
        // Set the validation error for the field
        setPrecognitiveErrors((prevErrors) => ({
          ...prevErrors,
          [fieldName]: error.response.data.errors[fieldName]?.[0],
        }));
      }
    }

  };

  function handleSubmit(values) {

  }


  function updateProduct() {
    let data = form.getFieldsValue();

    data.images = uploadingImages.map(obj => obj.originFileObj);
    data.taxon_id = data.full_category_ids?.at(-1);

    //console.log(data);
    return axios.put(route('product.update', {product: product.id}), data);
  }

  function syncMediaOrder() {
    let mediaOrder = new FormData();

    imageList.forEach((item, index) => {
      mediaOrder.append(`media_order[${index}]`, item.id);
    });

    mediaOrder.append("collection_name", 'default');

    return axios.post(route('product.sync.mediaOrder', {product: product.id}), mediaOrder)
  }

  function addMedia() {
    let newImages = new FormData();

    uploadingImages.forEach((item, index) => {
      newImages.append(`images[${index}]`, item.originFileObj);
    });

    return axios.post(route('product.addMedia', {product: product.id}), newImages)
  }

  const items = [
    {
      key: "1",
      label: "Данні Товара",
      children:
        <div>
          <ProductForm form={form} initialValues={initialValues} taxonomyTree={taxonomyTree}
                       errors={precognitiveErrors}
                       submitHandler={handleSubmit}
                       uploadingImages={uploadingImages}
                       setUploadingImages={setUploadingImages}
                       validateFieldHandler={validateField}>
          </ProductForm>
        </div>,
    },
    {
      key: "2",
      label: "Фото Товара",
      children:
        <div>
          <SortableMediaList images={imageList} setImages={setImageList}></SortableMediaList>
        </div>,
    },
    {
      key: "3",
      label: "Відео Товара",
      children: <div>Content of Tab 3</div>, // Tab content
    },
  ];

  return (
    <>

      {/*<button className='border m-2 p-1' onClick={() => router.visit(route('product.index'))}>Cancel</button>*/}


      {/*{product.video_id ?*/}
      {/*  <iframe*/}
      {/*    id="ytplayer" type="text/html" width="640" height="360"*/}
      {/*    src={`https://www.youtube.com/embed/${product.video_id}?rel=0&iv_load_policy=3`}>*/}
      {/*  </iframe> :*/}
      {/*  <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={*/}
      {/*    <span>Відео відсутнє</span>*/}
      {/*  }/>}*/}

      <div className='m-2'>
        <Button type={'primary'}>Зберегти</Button>
        <Button>Скасувати</Button>
        <Button onClick={() => router.delete(route('product.destroy', {product: product.id}))}>Видалити</Button>
      </div>

      <Tabs items={items}/>

    </>
  );
}
