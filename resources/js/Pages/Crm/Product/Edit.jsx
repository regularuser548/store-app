import {router, usePage} from "@inertiajs/react";
import ProductForm from "@/Pages/Crm/Product/Components/ProductForm.jsx";
import {Button, Divider, Empty, Form, message, Tabs, Tooltip} from "antd";
import React, {useEffect, useState} from "react";
import SortableMediaList from "@/Pages/Crm/Product/Components/SortableMediaList.jsx";
import {DeleteOutlined} from "@ant-design/icons";

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
  }

  const [messageApi, contextHolder] = message.useMessage();

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
      await axios.put(
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

  function handleSubmit() {
    let data = form.getFieldsValue();

    data.images = uploadingImages.map(obj => obj.originFileObj);
    data.taxon_id = data.full_category_ids?.at(-1);
    data._method = 'put';

    router.post(route('product.update', {product: product.id}), data);
  }


  function syncMediaOrder() {
    let mediaOrder = new FormData();

    imageList.forEach((item, index) => {
      mediaOrder.append(`media_order[${index}]`, item.id);
    });

    mediaOrder.append("collection_name", 'default');

    axios.post(route('product.sync.mediaOrder', {product: product.id}), mediaOrder)
      .then(r => messageApi.open({
          type: 'success',
          content: 'Порядок збережено',
        })
      )
      .catch(r => messageApi.open({
          type: 'error',
          content: 'Помилка оновлення данних',
        })
      )
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
          <Button type={'primary'} onClick={syncMediaOrder}>Зберегти порядок розташування</Button>
          <Divider/>
          <SortableMediaList images={imageList} setImages={setImageList}></SortableMediaList>
        </div>,
    },
    {
      key: "3",
      label: "Відео Товара",
      children:
        <div className='flex justify-center items-center'>
          {product.video_id ?
            <iframe
              id="ytplayer" type="text/html" width="60%" height="360px"
              src={`https://www.youtube.com/embed/${product.video_id}?rel=0&iv_load_policy=3`}>
              allowFullScreen
            </iframe> :
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={
              <span>Відео відсутнє</span>
            }/>}
        </div>,
    },
  ];

  return (
    <>
      {contextHolder}
      <h1 className="text-2xl font-bold mb-4 inline me-4">Редагувати Товар</h1>

      <Tooltip title="Видалити Товар" placement='right'>
        <Button className='' onClick={() => router.delete(route('product.destroy', {product: product.id}))}>
          <DeleteOutlined/>
        </Button>
      </Tooltip>

      <Tabs items={items}/>
    </>
  );
}
