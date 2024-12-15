import {router, useForm} from "@inertiajs/react";
import CrmMenuLayout from "@/Layouts/CrmMenuLayout.jsx";
import TaxonomyForm from "@/Pages/Crm/Taxonomy/Components/TaxonomyForm.jsx";
import TaxonForm from "@/Pages/Crm/Taxon/Components/TaxonForm.jsx";
import {Button, Empty} from "antd";
import React, {useState} from "react";

export default function Edit({taxon, taxonomy, taxons, image = null, props}) {

  const {data, setData, post, progress} = useForm({
    name: taxon.name,
    slug: taxon.slug,
    parent_id: taxon.parent_id,
    priority: taxon.priority,
    image: "",

    _method: "put",
  });

  const [imageList, setImageList] = useState([]);

  function handleSubmit(e) {
    e.preventDefault();

    data.image = imageList[0]?.originFileObj;

    router.post(route('taxon.update', {taxonomy: taxonomy.id, taxon: taxon.id}), data);
  }

  return (
    <>
      <TaxonForm fields={data} imageList={imageList} setImageList={setImageList} changeHandler={setData} taxons={taxons} submit={handleSubmit}></TaxonForm>
      {image ?
        <img src={image} className='w-1/4' alt='image'/>
        :
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={'Немає іконки'}></Empty>
      }

      <Button className=''
              onClick={e => router.visit(route('taxon.create', {taxonomy: taxonomy.id, parent: taxon.id}))}>Додати Підкатегорію
      </Button>

      <Button className='m-2 p-1 bg-red-500'
              onClick={e => router.delete(route('taxon.destroy', {taxonomy: taxonomy.id, taxon: taxon.id}))}>Видалити
      </Button>
    </>
  );

}
