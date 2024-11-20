import {Link} from "@inertiajs/react";

export default function Taxon({item, image= null, props}) {

    return (
        <div className='m-2 p-2 border flex'>
            {image ?
                <img className='w-14' src={image} alt='Image'/>
                :
                null}
            <p className='me-2 font-bold block'>{item.name}</p>
            <span className='me-2'>{item.slug}</span>
            <Link href={route('taxonomy.edit', {taxonomy: item.id})} className='border bg-gray-200'>Edit</Link>
        </div>
    );
}
