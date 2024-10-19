import {useForm} from "@inertiajs/react";
import CrmMenuLayout from "@/Pages/Crm/CrmMenuLayout.jsx";
import TaxonomyForm from "@/Pages/Crm/Taxonomy/Components/TaxonomyForm.jsx";

export default function Create(props) {

    const {data, setData, post, progress} = useForm({
        name: "",
        slug: "",
        image: "",
    });

    function handleSubmit(e) {
        e.preventDefault();
        post(route('taxonomy.store'));
    }

    return (
        <CrmMenuLayout>
            <TaxonomyForm fields={data} changeHandler={setData} submit={handleSubmit}></TaxonomyForm>
        </CrmMenuLayout>
    );

}
