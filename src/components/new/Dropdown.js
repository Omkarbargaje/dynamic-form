import React, { useState } from "react";

function AddOptionsField({ keyVal, removeOptions, handleOptionsOnChange }) {
  // <option value = {value}>{label}</option>
  const [optionsNameAndValue, setOptionsNameAndValue] = useState({});

  function onChange(e) {
    setOptionsNameAndValue((optionsNameAndValue) => ({
      ...optionsNameAndValue,
      [e.target.name]: e.target.value,
    }));
  }

  function onSave() {
    handleOptionsOnChange(keyVal, optionsNameAndValue);
  }

  return (
    <div>
      <label htmlFor="label">Label Name</label>
      <input
        type="text"
        name="label"
        onChange={onChange}
        value={optionsNameAndValue.label || ""}
      />
      <label htmlFor="label">Value</label>
      <input
        type="text"
        name="value"
        onChange={onChange}
        value={optionsNameAndValue.value || ""}
      />
      <button onClick={() => removeOptions(keyVal)}>Delete</button>
      <button onClick={onSave}>Save</button>
    </div>
  );
}







export default function Dropdown(props) {
  const [inputProp, setInputProp] = useState({}); //for third person it includes label and keyName
  const [optionsData, setOptionsData] = useState({}); //for third person it includes data to generate dropdown
  const [optionsList, setOptionsList] = useState({}); // for second person it includes data to show options list
  const [keys, setKeys] = useState(0);

  console.log("inputProp: ", optionsData);

  const handleChange = (e) => {
    setInputProp({ ...inputProp, [e.target.name]: e.target.value });
  };

  const removeOptions = (key) => {

    setOptionsList((options) => {
      let newObj = { ...options };
      delete newObj[key];
      return newObj;
    });

    setOptionsData((props) => {
      let newObj = { ...props };
      delete newObj[key];
      return newObj;
    });
    
  };

  const generateSelectTag =
    () =>
    ({ handelOnChange, value, index, deleteFinalData }) => {
      const deleteElement = () => {
        // console.log("key in generateComponent",key)
        deleteFinalData(index);
      };
      console.log("key in generateComponent", index)

      return (
        <div>
          <label htmlFor={inputProp.label}>{inputProp.label}</label>
          <select name={inputProp.keyName} id={inputProp.keyName} value={value[inputProp.keyName]} onChange={handelOnChange}>
            <option value="">select option</option>
            {Object.keys(optionsData).map((key) => (
              <option value={optionsData[key].value} >
                {optionsData[key].label}
              </option>
            ))}
          </select>
          <button onClick={deleteElement}>Delete</button>
        </div>
      );
    };


    const addEntry =()=>{
        // setInputProp(defaultProps)
        props.addField(generateSelectTag())
        
      };

  const handleOptionsOnChange = (key, data) => {
    setOptionsData((inputProp) => ({ ...inputProp, [key]: data }));
  };

  const addOptions = () => {
    setOptionsList({
      ...optionsList,
      [keys]: (
        <AddOptionsField
          key={keys}
          keyVal={keys}
          removeOptions={removeOptions}
          handleOptionsOnChange={handleOptionsOnChange}
        />
      ),
    });
    setKeys((key) => key + 1);
  };

  return (
    <div className="InputForm" >

      <label htmlFor="label">Label</label>

      <input
        type="text"
        name="label"
        value={inputProp.label}
        onChange={handleChange}
      />

      <label htmlFor="keyName" >Key Name</label>

      <input type="text" name="keyName" value={inputProp.keyName} onChange={handleChange} />

      <button onClick={addOptions}>Add Options</button>

      <div>{Object.keys(optionsList).map((key) => optionsList[key])}</div>

      <button onClick={addEntry}>Add</button>
    </div>
  );
}
