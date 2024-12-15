import {usePage} from "@inertiajs/react";
import {Input} from "antd";

export default function FormField({id, data, changeHandler, className = '', ...props}) {

    const {errors} = usePage().props;

    return (
        <div>
            <Input id={id} value={data[id]} onChange={changeHandler} className={className} {...props}/>
            {errors[id] && <div className="text-red-500">{errors[id]}</div>}
        </div>
    )
}
