import {useForm} from "@inertiajs/react";
import CrmMenuLayout from "@/Layouts/CrmMenuLayout.jsx";
import TaxonomyForm from "@/Pages/Crm/Taxonomy/Components/TaxonomyForm.jsx";
import TaxonForm from "@/Pages/Crm/Taxon/Components/TaxonForm.jsx";
import {useState} from "react";

export default function Create({taxon, taxons, taxonomy, props}) {

  const {data, setData, post, progress} = useForm({
    name: "",
    slug: "",
    parent_id: taxon.parent_id,
    priority: taxon.priority,
    image: "",
  });

  const [imageList, setImageList] = useState([]);

  function handleSubmit(e) {
    e.preventDefault();

    data.image = imageList[0]?.originFileObj;

    post(route('taxon.store', {taxonomy: taxonomy.id}));
  }


  return (
    <>
      <TaxonForm fields={data} imageList={imageList} setImageList={setImageList} changeHandler={setData} taxons={taxons} submit={handleSubmit}></TaxonForm>
    </>
  );

}
