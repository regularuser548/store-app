import {useForm} from "@inertiajs/react";
import {useState} from "react";
import CrmMenuLayout from "@/Layouts/CrmMenuLayout.jsx";
import ProductForm from "@/Pages/Crm/Product/Components/ProductForm.jsx";
import MediaUploadForm from "@/Pages/Crm/Product/Components/MediaUploadForm.jsx";

export default function Create({taxonomyTree}) {

  //https://vanilo.io/docs/4.x/products#all-product-fields
  const {data, setData, post, progress} = useForm({
    name: "",
    sku: "",
    stock: "",
    price: "",
    weight: "",
    width: "",
    height: "",
    length: "",
    description: "",
    meta_keywords: "",
    state: "draft",
    video_id: "",
    taxon_id: "",

    images: ""
  });

  const [imageList, setImageList] = useState([]);

  function handleSubmit(e) {
    e.preventDefault();

    data.images = imageList.map(obj => obj.originFileObj);

    post(route('product.store'));
  }

  return (
    <>
      <ProductForm fields={data} changeHandler={setData} taxonomyTree={taxonomyTree} submit={handleSubmit}></ProductForm>
      <MediaUploadForm fileList={imageList} changeHandler={setImageList} max={10} text='Додати Фото'
                       accept='image/jpg, image/png, image/bmp, image/gif, image/svg, image/webp, image/avif'
                       listType='picture-card'>
      </MediaUploadForm>
    </>
  );

}
