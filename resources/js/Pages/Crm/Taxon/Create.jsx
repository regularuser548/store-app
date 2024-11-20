import {useForm} from "@inertiajs/react";
import CrmMenuLayout from "@/Pages/Crm/CrmMenuLayout.jsx";
import TaxonomyForm from "@/Pages/Crm/Taxonomy/Components/TaxonomyForm.jsx";
import TaxonForm from "@/Pages/Crm/Taxon/Components/TaxonForm.jsx";

export default function Create({taxon, taxons, taxonomy, props}) {

  const {data, setData, post, progress} = useForm({
    name: "",
    slug: "",
    parent: taxon.parent_id,
    priority: taxon.priority,
    image: "",
  });

  function handleSubmit(e) {
    e.preventDefault();
    post(route('taxon.store', {taxonomy: taxonomy.id}));
  }


  return (
    <CrmMenuLayout>
      {console.log(taxon)}
      <TaxonForm fields={data} changeHandler={setData} taxons={taxons} submit={handleSubmit}></TaxonForm>
    </CrmMenuLayout>
  );

}
