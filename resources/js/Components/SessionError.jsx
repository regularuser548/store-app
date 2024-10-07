import {usePage} from "@inertiajs/react";
import Product from "@/Pages/Crm/Product/Components/Product.jsx";

export default function SessionError({className = ''}) {

    const {errors} = usePage().props;

    return (
        <div className='flex flex-wrap' id='session-error-container'>
            {errors.map((error, index) => (
                <p key={index}>{error}</p>
            ))}
        </div>
    )
}
