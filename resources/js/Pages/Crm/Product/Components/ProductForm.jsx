import {Head, router, useForm, usePage} from "@inertiajs/react";
import GuestLayout from "@/Layouts/GuestLayout.jsx";
import {useState} from "react";
import CrmMenuLayout from "@/Pages/Crm/CrmMenuLayout.jsx";
import TextInput from "@/Components/TextInput.jsx";
import SessionError from "@/Components/SessionError.jsx";
import FormField from "@/Components/FormField.jsx";

export default function ProductForm({fields, changeHandler, submit, props}) {

  const {errors} = usePage().props;

  function handleChange(e) {
    const key = e.target.id;
    const value = e.target.value
    changeHandler(values => ({
      ...values,
      [key]: value,
    }))

  }


  return (
    <form onSubmit={submit}>

      <FormField id='name' data={fields} changeHandler={handleChange}
                 placeholder='Name' className='block' required/>

      <FormField id="sku" data={fields} onChange={handleChange} placeholder="SKU" className='block'
                 required/>

      <FormField id="stock" data={fields} onChange={handleChange} placeholder="Stock" type='number'
                 className='block' required min="0"/>

      <FormField id="price" data={fields} onChange={handleChange} placeholder="Price" type='number'
                 className='block' required min="0"/>

      <FormField id="weight" data={fields} onChange={handleChange} placeholder="Weight" type='number'
                 className='block' min="0"/>

      <FormField id="width" data={fields} onChange={handleChange} placeholder="Width" type='number'
                 className='block' min="0"/>

      <FormField id="height" data={fields} onChange={handleChange} placeholder="Height" type='number'
                 className='block' min="0"/>

      <FormField id="length" data={fields} onChange={handleChange} placeholder="Length" type='number'
                 className='block' min="0"/>

      <textarea id="description" value={fields.description} onChange={handleChange}
                placeholder="Description" className='block' required/>
      {errors.description && <div className="text-red-500">{errors.description}</div>}

      <FormField id="meta_keywords" data={fields} onChange={handleChange} placeholder="Keywords (separate by ,)"
                 className='block'/>

      <select id="state" value={fields.state} onChange={handleChange}>
        <option value="draft">Draft</option>
        <option value="inactive">Inactive</option>
        <option value="active">Active</option>
        <option value="unavailable">Unavailable</option>
        <option value="retired">Retired</option>
      </select>
      {errors.state && <div className="text-red-500">{errors.state}</div>}

      {/*<label htmlFor="videos" className='block'>Videos</label>*/}
      {/*<input id="videos" onChange={e => changeHandler('videos', e.target.files)} type='file' multiple*/}
      {/*           accept="video/*" className=''/>*/}
      {/*{errors.videos && <div className="text-red-500">{errors.videos}</div>}*/}

      {/*<label htmlFor="images" className='block'>Images</label>*/}
      {/*<input id="images" onChange={e => changeHandler('images', e.target.files)} type='file' multiple*/}
      {/*           accept="image/*" className=''/>*/}
      {/*{errors.images && <div className="text-red-500">{errors.images}</div>}*/}

      <button type="submit" className='block border bg-green-500'>Submit</button>
    </form>

  );
}
