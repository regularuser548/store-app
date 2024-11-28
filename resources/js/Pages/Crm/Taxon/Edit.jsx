import {router, useForm} from "@inertiajs/react";
import CrmMenuLayout from "@/Pages/Crm/CrmMenuLayout.jsx";
import TaxonomyForm from "@/Pages/Crm/Taxonomy/Components/TaxonomyForm.jsx";
import TaxonForm from "@/Pages/Crm/Taxon/Components/TaxonForm.jsx";

export default function Edit({taxon, taxonomy, taxons, image = null, props}) {

  const {data, setData, post, progress} = useForm({
    name: taxon.name,
    slug: taxon.slug,
    parent_id: taxon.parent_id,
    priority: taxon.priority,
    image: "",

    _method: "put",
  });

  function handleSubmit(e) {
    e.preventDefault();
    router.post(route('taxon.update', {taxonomy: taxonomy.id, taxon: taxon.id}), data);
  }

  return (
    <CrmMenuLayout>
      <TaxonForm fields={data} changeHandler={setData} taxons={taxons} submit={handleSubmit}></TaxonForm>
      {image ? <img src={image} className='w-1/4' alt='image'/> : null}

      <button className='border m-2 p-1 bg-red-500'
              onClick={e => router.delete(route('taxon.destroy', {taxon: taxon.id}))}>Delete
      </button>
    </CrmMenuLayout>
  );

}
