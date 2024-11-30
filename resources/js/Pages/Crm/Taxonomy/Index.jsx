import CrmMenuLayout from "@/Pages/Crm/CrmMenuLayout.jsx";
import Taxonomy from "@/Pages/Crm/Taxonomy/Components/Taxonomy.jsx";
import React from "react";
import {Empty} from "antd";

export default function Index({taxonomies, images, props}) {

    return (
        <CrmMenuLayout>
            <div className='flex flex-wrap'>
                {taxonomies.length > 0 ? (
                    taxonomies.map((item, index) => (
                        <Taxonomy key={item.id} item={item} image={images[item.id]}></Taxonomy>
                    ))
                ) : (
                    <Empty description={'Немає категорій'}></Empty>
                )}
            </div>
        </CrmMenuLayout>
    );
}
