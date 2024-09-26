import {Head, Link, router, useForm} from "@inertiajs/react";

export default function CrmMenuLayout({props, children}) {

    return (
        <div className='flex'>
            <Head title="ShopHub CRM"/>

            <div className=''>
                <Link href="/" className="block border">Home</Link>
                <Link href="/crm/product" className="block border">Product Listing</Link>
                <Link href="/crm/product/create" className="block border">Create Product</Link>
            </div>

            <div className='max-h-screen overflow-y-scroll'>{children}</div>
        </div>
    );

}
