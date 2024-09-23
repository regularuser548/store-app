import {Head} from "@inertiajs/react";
import GuestLayout from "@/Layouts/GuestLayout.jsx";

export default function Index(props) {
    return (
        <div>
            <Head title="ShopHub CRM" />
                {props.products.map( (item) => (
                    <div key={item.id} id={item.id} className="border-2 m-2">
                        <h3>{item.name}</h3>
                        <p>{item.sku}</p>
                        <p>{item.price}</p>
                        <img src={props.images[0]} alt='' />
                    </div>
                )) }
        </div>
    );
}
