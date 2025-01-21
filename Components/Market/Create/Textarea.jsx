import React from "react";

const Textarea = ({ title, placeholder, name, handleChange }) => {
  return (
    <fieldset className={`${name}`}>
      <label
        style={{
          marginBottom: "10px",
        }}
      >
        {title} *
      </label>
      <textarea
        onChange={handleChange}
        id={`${name}`}
        placeholder={placeholder}
      />{" "}
    </fieldset>
  );
};

export default Textarea;
