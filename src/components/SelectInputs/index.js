import React from 'react'

export default function Select({id, name, onChange, label, options, type}){

  return(
    <>
      <label htmlFor={id}>{label}</label>
      <select
        id={id}
        name={name}
        onChange={onChange}
      >
        <option>Selecciona una opción</option>
        { !!options && options.length > 0 && options.map((el, index ) =>( <option key={index} value={el._id}>{el[type]}</option> ))}
      </select>
    </>
  )
}