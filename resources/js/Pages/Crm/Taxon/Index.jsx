import CrmMenuLayout from "@/Layouts/CrmMenuLayout.jsx";
import Taxonomy from "@/Pages/Crm/Taxonomy/Components/Taxonomy.jsx";
import React from "react";
import {Button, Empty} from "antd";
import {router} from "@inertiajs/react";

export default function Index({taxonomies, images, props}) {

    return (
        <>
            <div className='flex flex-wrap'>
                {taxonomies.length > 0 ? (
                    taxonomies.map((item, index) => (
                        <Taxonomy key={item.id} item={item} image={images[item.id]}></Taxonomy>
                    ))
                ) : (
                  <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={'Немає підкатегорій'}>
                    <Button type="primary" onClick={() => router.visit(route('taxon.create'))}>Додати</Button>
                  </Empty>
                )}
            </div>
        </>
    );
}
