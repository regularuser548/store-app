import {Head} from "@inertiajs/react";
import CrmMenuLayout from "@/Pages/Crm/CrmMenuLayout.jsx";
import Product from "@/Components/Product.jsx";

export default function Index(props) {

  return (
    <CrmMenuLayout>
      <div className='flex flex-wrap'>
        {props.products.map((item) => (
          <Product key={item.id} item={item} image={props.images[item.id]} isCrm={true}></Product>
        ))}
      </div>
    </CrmMenuLayout>
  );
}
