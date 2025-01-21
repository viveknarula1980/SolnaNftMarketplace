import React from "react";

const Input = ({ title, placeholder, name, handleChange }) => {
  return (
    <fieldset className={`${name}`}>
      <label
        style={{
          marginBottom: "10px",
        }}
      >
        {title} *
      </label>
      <input
        onChange={handleChange}
        type="text"
        id={`${name}`}
        placeholder={placeholder}
      />
    </fieldset>
  );
};

export default Input;
