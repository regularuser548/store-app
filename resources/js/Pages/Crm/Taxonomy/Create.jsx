import {useForm} from "@inertiajs/react";
import CrmMenuLayout from "@/Pages/Crm/CrmMenuLayout.jsx";
import TaxonomyForm from "@/Pages/Crm/Taxonomy/Components/TaxonomyForm.jsx";
import {useState} from "react";

export default function Create(props) {

  const {data, setData, post, progress} = useForm({
    name: "",
    slug: "",
    image: "",
  });

  const [imageList, setImageList] = useState([]);

  function handleSubmit(e) {
    e.preventDefault();

    data.image = imageList[0]?.originFileObj;

    post(route('taxonomy.store'));
  }

  return (
    <CrmMenuLayout>
      <TaxonomyForm fields={data} imageList={imageList} setImageList={setImageList} changeHandler={setData} submit={handleSubmit}></TaxonomyForm>
    </CrmMenuLayout>
  );

}
