import React from "react";
import "./styles.css";

export default function Button({ type, children, handleClick }) {
  return (
    <button className="btn btn-primary" type={type} onClick={handleClick}>
      {children}
    </button>
  );
}
