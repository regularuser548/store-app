import {Head, router} from "@inertiajs/react";
import CrmMenuLayout from "@/Pages/Crm/CrmMenuLayout.jsx";
import Product from "@/Components/Product.jsx";
import {Button, Empty} from "antd";

export default function Index(props) {

  return (
    <CrmMenuLayout>
      <div className='flex flex-wrap'>
        {props.products && props.products.length > 0 ?
          props.products.map((item) => (
            <Product key={item.id} item={item} image={props.images[item.id]} isCrm={true}></Product>
          )) :
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={'Немає товарів'}>
            <Button type="primary" onClick={() => router.visit(route('product.create'))}>Додати</Button>
          </Empty>}
      </div>
    </CrmMenuLayout>
  );
}
