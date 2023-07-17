import React, { useState } from "react";

const defaultProps = {
  label: "",
  inputType: "",
  keyName: "",
}

export default function InputForm(props) {
  const [inputProp, setInputProp] = useState(defaultProps);
 

  console.log(inputProp);

  const handleChange = (e) => {
    setInputProp({ ...inputProp, [e.target.name]: e.target.value });
  };

  const generateComponent =
    () =>
    ({ handelOnChange, value, index, deleteFinalData }) => {

      const deleteElement = () => {
        // console.log("key in generateComponent",key)
        deleteFinalData(index);
      }
      console.log("key in generateComponent",index)
      
      return (
        <div>
          <label htmlFor={inputProp.label}>{inputProp.label}</label>
          <input
            type={inputProp.inputType}
            name={inputProp.keyName}
            value= {value[inputProp.keyName]}
            onChange={handelOnChange}
          />
          <button onClick={deleteElement}>Delete</button>
        </div>
      );
    };


    const addEntry =()=>{
      setInputProp(defaultProps)
      props.addField(generateComponent())
      
    };

  return (
    <div className="InputForm">
      <label htmlFor="label">Label</label>
      <input type="text" name="label" value={inputProp.label} onChange={handleChange} />
      <select name="inputType" id="inputType" value={inputProp.inputType} onChange={handleChange}>
        <option value="">select input type</option>
        <option value="text">text</option>
        <option value="email">email</option>
        <option value="password">password</option>
        <option value="number">number</option>
        <option value="date">date</option>
      </select>
      <label htmlFor="keyName">Key Name</label>
      <input
        type="text"
        name="keyName"
        value={inputProp.keyName}
       onChange={handleChange}
      />

      <button onClick={addEntry}>Add</button>
    </div>
  );
}
