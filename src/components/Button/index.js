import React from "react";


export default function Button({ type, children, handleClick }) {
  return (
    <button className="btn btn-light mt-2 btn btn-outline-dark" type={type} onClick={handleClick}>
      {children}
    </button>
  );
}
