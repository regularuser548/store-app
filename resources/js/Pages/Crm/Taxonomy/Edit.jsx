import {router, useForm} from "@inertiajs/react";
import CrmMenuLayout from "@/Pages/Crm/CrmMenuLayout.jsx";
import TaxonomyForm from "@/Pages/Crm/Taxonomy/Components/TaxonomyForm.jsx";

export default function Edit({taxonomy, image = null, props}) {

    const {data, setData, post, progress} = useForm({
        name: taxonomy.name,
        slug: taxonomy.slug,
        image: "",

        _method: "put",
    });

    function handleSubmit(e) {
        e.preventDefault();
        router.post(route('taxonomy.update', {taxonomy: taxonomy.id }), data);
    }

    return (
        <CrmMenuLayout>
            <TaxonomyForm fields={data} changeHandler={setData} submit={handleSubmit}></TaxonomyForm>
            {image ? <img src={image} className='w-1/4' alt='image'/> : null}

            <button className='border m-2 p-1 bg-red-500'
                    onClick={e => router.delete(route('taxonomy.destroy', {taxonomy: taxonomy.id}))}>Delete
            </button>
        </CrmMenuLayout>
    );

}
