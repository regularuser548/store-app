import {router, useForm} from "@inertiajs/react";
import CrmMenuLayout from "@/Pages/Crm/CrmMenuLayout.jsx";
import TaxonomyForm from "@/Pages/Crm/Taxonomy/Components/TaxonomyForm.jsx";
import {Button, Empty} from "antd";
import {useState} from "react";

export default function Edit({taxonomy, image = null, props}) {

  const {data, setData, post, progress} = useForm({
    name: taxonomy.name,
    slug: taxonomy.slug,
    image: "",

    _method: "put",
  });

  const [imageList, setImageList] = useState([]);

  function handleSubmit(e) {
    e.preventDefault();

    data.image = imageList[0]?.originFileObj;

    router.post(route('taxonomy.update', {taxonomy: taxonomy.id}), data);
  }

  return (
    <CrmMenuLayout>
      <TaxonomyForm fields={data} changeHandler={setData} imageList={imageList} setImageList={setImageList}
                    submit={handleSubmit}></TaxonomyForm>
      {image ?
        <img src={image} className='w-1/4' alt='image'/>
        :
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={'Немає іконки'}></Empty>}

      <Button className='bg-red-500'
              onClick={e => router.delete(route('taxonomy.destroy', {taxonomy: taxonomy.id}))}>Видалити
      </Button>
    </CrmMenuLayout>
  );

}
