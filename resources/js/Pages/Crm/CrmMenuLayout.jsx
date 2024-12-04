import {Head, Link, router, useForm} from "@inertiajs/react";

export default function CrmMenuLayout({props, children}) {

    return (
        <div className='flex'>
            <Head title="CRM"/>

            <div className=''>
                <Link href={route('storefront.index')} className="block border">Головна</Link>
                <Link href={route('product.index')} className="block border">Список Товарів</Link>
                <Link href={route('product.create')} className="block border">Додати Товар</Link>
                <Link href={route('user.index')} className="block border">Користувачі</Link>
                <Link href={route('taxonomy.index')} className="block border">Список Категорій</Link>
                <Link href={route('taxonomy.create')} className="block border">Створити Категорію</Link>
            </div>

            <div className='h-screen w-screen overflow-y-scroll'>{children}</div>
        </div>
    );

}
