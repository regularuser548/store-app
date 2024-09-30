import {Head} from "@inertiajs/react";
import CrmMenuLayout from "@/Pages/Crm/CrmMenuLayout.jsx";
import Product from "@/Pages/Crm/Product/Components/Product.jsx";

export default function Index(props) {

    return (
        <CrmMenuLayout>
            <Head title="ShopHub CRM" />
            <div className='flex flex-wrap'>
                {props.products.map( (item) => (
                    <Product key={item.id} item={item} image={props.images[item.id]}></Product>
                ))}
            </div>
        </CrmMenuLayout>
    );
}
