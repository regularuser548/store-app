import {usePage} from "@inertiajs/react";

export default function FormField({id, data= null, changeHandler, className = '', ...props}) {

    const {errors} = usePage().props;

    return (
        <div>
            <input id={id} value={data?.[id]} onChange={changeHandler} className={className} {...props}/>
            {errors[id] && <div className="text-red-500">{errors[id]}</div>}
        </div>
    )
}
