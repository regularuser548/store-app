import {Link, router} from "@inertiajs/react";
import {Button} from "antd";

export default function Taxonomy({item, image = null, props}) {

  return (
    <div className='m-2 p-2 border flex'>
      {image ?
        <img className='w-14' src={image} alt='Image'/>
        :
        null}
      <p className='me-2 font-bold block'
         onClick={() => router.visit(route('taxonomy.show', {taxonomy: item.id}))}>{item.name}</p>
      <span className='me-2'>{item.slug}</span>

      <Button type={'primary'}
              onClick={() => router.visit(route('taxonomy.show', {taxonomy: item.id}))} className=''>Підкатегорії</Button>

      <Button onClick={() => router.visit(route('taxonomy.edit', {taxonomy: item.id}))} className=''>Редагувати</Button>


    </div>
  );
}
