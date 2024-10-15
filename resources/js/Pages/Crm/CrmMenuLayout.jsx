import {Head, Link, router, useForm} from "@inertiajs/react";

export default function CrmMenuLayout({props, children}) {

    return (
        <div className='flex'>
            <Head title="ShopHub CRM"/>

            <div className=''>
                <Link href={route('storefront.index')} className="block border">Home</Link>
                <Link href={route('product.index')} className="block border">Product Listing</Link>
                <Link href={route('product.create')} className="block border">Create Product</Link>
                <Link href={route('user.index')} className="block border">Users</Link>
            </div>

            <div className='max-h-screen overflow-y-scroll'>{children}</div>
        </div>
    );

}
