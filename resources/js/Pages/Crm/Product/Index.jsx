import {Head, Link, router} from "@inertiajs/react";
import CrmMenuLayout from "@/Pages/Crm/CrmMenuLayout.jsx";

export default function Index(props) {

    return (
        <CrmMenuLayout>
            <Head title="ShopHub CRM" />
                {props.products.map( (item) => (
                    <div key={item.id} id={item.id} className="border-2 m-2">
                        <div>
                            <h3 className='font-bold'>Name: {item.name}</h3>
                            <p>ID: {item.id}</p>
                            <p>SKU: {item.sku}</p>
                            <p>Price: {item.price}</p>
                        </div>
                        <div>
                            <img src={props.images[item.id]} alt='' className='w-1/6' />
                        </div>

                        <button onClick={e => router.visit(`product/${item.id}/edit`)}>Edit</button>
                    </div>
                )) }
        </CrmMenuLayout>
    );
}
