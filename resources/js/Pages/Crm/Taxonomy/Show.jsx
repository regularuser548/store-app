import {Link, router, useForm} from "@inertiajs/react";
import CrmMenuLayout from "@/Pages/Crm/CrmMenuLayout.jsx";
import TaxonomyForm from "@/Pages/Crm/Taxonomy/Components/TaxonomyForm.jsx";
import {Button, Empty, Tree} from "antd";

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

  function buildTaxonTree(taxons) {
    const tree = [];
    for (const taxon in taxons) {

      tree.push({
        key: taxon.key,
        label: taxon.label,
        children: []
      });

      if (Array.isArray(taxon.children) && taxon.children.length > 0) {
        tree.children = taxon.children.map(child => buildTaxonTree(child));
      }

    }
    return tree;

  }

  function handleSelect(selectedKeys, info) {
    router.visit(route('taxon.edit', {taxon: selectedKeys[0], taxonomy: taxonomy.id}));
  }

  return (
    <CrmMenuLayout>
      {taxons && taxons.length > 0 ? (
          <Tree
            fieldNames={{title: 'name', key: 'id'}}
            showLine
            onSelect={handleSelect}
            // onCheck={onCheck}
            treeData={taxons}
            defaultExpandAll
          />) :
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={'Немає підкатегорій'}>
        </Empty>
      }

      {/*<Button onClick={() => router.visit(route('taxon.create', {taxonomy: taxonomy.id}))}*/}
      {/*        className='border bg-gray-200'>*/}
      {/*  Створити Підкатегорію*/}
      {/*</Button>*/}
      <Button type="primary" onClick={() => router.visit(route('taxon.create', {taxonomy: taxonomy.id}))}>Додати</Button>
    </CrmMenuLayout>
  );

}
