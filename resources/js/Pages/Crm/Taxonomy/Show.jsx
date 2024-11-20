import {Link, router, useForm} from "@inertiajs/react";
import CrmMenuLayout from "@/Pages/Crm/CrmMenuLayout.jsx";
import TaxonomyForm from "@/Pages/Crm/Taxonomy/Components/TaxonomyForm.jsx";
import {Tree} from "antd";

export default function Show({taxonomy, taxons, image = null, props}) {

  // const {data, setData, post, progress} = useForm({
  //   name: taxonomy.name,
  //   slug: taxonomy.slug,
  //   image: "",
  //
  //   _method: "put",
  // });
  //
  // function handleSubmit(e) {
  //   e.preventDefault();
  //   router.post(route('taxonomy.update', {taxonomy: taxonomy.id }), data);
  // }

  console.log(taxons)
  return (
    <CrmMenuLayout>
      <Tree
        // onSelect={onSelect}
        // onCheck={onCheck}
        treeData={taxons}
      />

      <Link href={route('taxon.create', {taxonomy: taxonomy.id})} className='border bg-gray-200'>Створити Підкатегорію</Link>
    </CrmMenuLayout>
  );

}
