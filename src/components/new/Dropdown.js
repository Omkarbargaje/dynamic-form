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
      <label htmlFor="label" className="mx-2 text-gray-800 text-lg my-2">Option Name</label>
      <input
        type="text"
        name="label"
        placeholder="Label Name"
        onChange={onChange}
        value={optionsNameAndValue.label || ""}
        className="py-1 pl-2 my-2 rounded-lg"
      />
      <label htmlFor="label" className="mx-2 gray-800 text-lg my-2">Value</label>
      <input
        type="text"
        name="value"
        placeholder="Value"
        onChange={onChange}
        value={optionsNameAndValue.value || ""}
        className="py-1 pl-2 my-2 rounded-lg"
      />
      <button onClick={onSave} className="mx-5 gray-800 text-lg bg-green-700 hover:bg-green-800 text-white font-semibold px-4 py-1 rounded-2xl shadow-md transform transition-transform duration-100 btn-click-effect">Save</button>
     
      <button onClick={() => removeOptions(keyVal)} className="mx-5 gray-800 text-lg bg-red-700 hover:bg-red-800 text-white font-semibold px-4 py-1 rounded-2xl shadow-md transform transition-transform duration-100 btn-click-effect">Delete</button>

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

  const generateSelectTag = () =>

    ({ handelOnChange, value, index, deleteFinalData }) => {

      const deleteElement = () => {

        // console.log("key in generateComponent",key)

        deleteFinalData(index);

      };

      console.log("key in generateComponent", index);

      return (
        <div className=" my-10">
          <label htmlFor={inputProp.label} className="mx-2 text-2xl text-gray-800 font-semibold">{inputProp.label}:</label>
          <select
            name={inputProp.keyName}
            id={inputProp.keyName}
            value={value[inputProp.keyName]}
            onChange={handelOnChange}
            className="text-lg pl-1 text-gray-800 rounded-sm"
          >
            <option value="">select option</option>
            {Object.keys(optionsData).map((key) => (
              <option value={optionsData[key].value}>
                {optionsData[key].label}
              </option>
            ))}
          </select>
          <button onClick={deleteElement} className="mx-2 px-4 bg-red-700 hover:bg-red-800 text-white font-semibold py-1 rounded-2xl shadow-md transform transition-transform duration-100 btn-click-effect ">Delete</button>
        </div>
      );
    };

  const addEntry = () => {
    // setInputProp(defaultProps)
    props.addField(generateSelectTag());
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
    //     <div className="flex justify-center">

    //     <div className="InputForm bg-gray-500 py-10 w-3/4 flex flex-col md:flex-row md:items-center md:justify-between px-5">

    // <div className="flex justify-center flex-col">

    //       <div className="flex- justify-center">

    //       <label htmlFor="label" className=" block mb-2 text-lg font-semibold text-white">Label</label>

    //       <input
    //         type="text"
    //         name="label"
    //         value={inputProp.label}
    //         onChange={handleChange}
    //       />

    //       <label htmlFor="keyName" className=" block mb-2 text-lg font-semibold text-white">Key Name</label>

    //       <input type="text" name="keyName" value={inputProp.keyName} onChange={handleChange} />

    //       <button onClick={addOptions} className="block mb-2 text-lg font-semibold text-white">Add Options</button>

    //       </div>
    //       <div>

    //       <div>{Object.keys(optionsList).map((key) => optionsList[key])}</div>

    //       <button onClick={addEntry} className="block mb-2 text-lg font-semibold text-white">Add</button>

    //       </div>

    // </div>

    //     </div>
    //     </div>

    <div className="flex justify-center">
      <div className="InputForm bg-gray-500 p-8 w-full md:w-3/4 rounded-lg shadow-md min-h-min">
        <div className="flex justify-center flex-col space-y-4">
          <div className="flex justify-center flex-col">
            
            <div>
              <label
                htmlFor="label"
                className="block mb-2 text-lg font-semibold text-white"
              > Dropdown Name </label>

              <input
                type="text"
                name="label"
                value={inputProp.label}
                onChange={handleChange}
                className="border py-2 px-3 text-gray-800 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
              />
            </div>

            <div>
              <label
                htmlFor="keyName"
                className="block mb-2 text-lg font-semibold text-white"
              > Key Name </label>

              <input
                type="text"
                name="keyName"
                value={inputProp.keyName}
                onChange={handleChange}
                className="border py-2 px-3 text-gray-800 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
              />
            </div>

            <div className="my-5">

              <button
                onClick={addOptions}
                style={{ marginLeft: "25%", marginRight: "25%" }}
                className=" bg-green-700 hover:bg-green-800 text-white font-semibold py-2 px-4 rounded-lg shadow-md transform transition-transform duration-100 btn-click-effect w-40"
              > Add Options </button>

            </div>

          </div>

      <div className="space-y-4 bg-gray-200 py-5 rounded-md">

            {Object.keys(optionsList).map((key) => optionsList[key])}

         <div >
          <button
            onClick={addEntry}
            className="bg-green-700 hover:bg-green-800 text-white font-semibold py-2 px-4 rounded-lg shadow-md transform transition-transform duration-100 btn-click-effect"
          > Create Dropdown </button>
        </div>

      </div>
        </div>
      </div>
    </div>
  );
}
