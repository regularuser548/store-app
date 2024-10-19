import {usePage} from "@inertiajs/react";
import FormField from "@/Components/FormField.jsx";

export default function TaxonomyForm({fields, changeHandler, submit, props}) {

    const {errors} = usePage().props;

    function handleChange(e) {
        const key = e.target.id;
        const value = e.target.value
        changeHandler(values => ({
            ...values,
            [key]: value,
        }))

    }


    return (
        <form onSubmit={submit} className="border m-2 p-1">

            <FormField id='name' data={fields} placeholder='Taxonomy Name' required className='block' changeHandler={handleChange}></FormField>
            <FormField id='slug' data={fields} placeholder='Slug' className='block' changeHandler={handleChange}></FormField>

            <input id="image" onChange={e => changeHandler('image', e.target.files[0])} type='file'
                   accept="image/*" className=''/>
            {errors.image && <div className="text-red-500">{errors.image}</div>}

            <input type='submit' className='block' value='Submit'></input>

        </form>

    );
}
