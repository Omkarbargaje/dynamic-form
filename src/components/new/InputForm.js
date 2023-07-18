import React, { useState } from "react";

const defaultProps = {
  label: "",
  inputType: "",
  keyName: "",
};

export default function InputForm(props) {
  const [inputProp, setInputProp] = useState(defaultProps);

  const handleChange = (e) => {
    setInputProp({ ...inputProp, [e.target.name]: e.target.value });
  };

  const generateComponent =
    () =>
    ({ handelOnChange, value, index, deleteFinalData }) => {
      const deleteElement = () => {
        deleteFinalData(index);
      };

      return (
        <div className="flex justify-center">
          <div className="flex justify-center my-5 items-center py-2 bg- bg-gray-400 md:w-1/4 min-w-min">
            <label
              htmlFor={inputProp.label}
              className="block mb-2 text-lg font-semibold text-gray-800 mx-2 px-2 "
            >
              {inputProp.label}
            </label>
            <input
              type={inputProp.inputType}
              name={inputProp.keyName}
              value={value[inputProp.keyName]}
              onChange={handelOnChange}
              className="block mb-2 border border-gray-800 py-1 px-3 rounded-lg"
            />
            <button
              onClick={deleteElement}
              className=" mx-5 px-4 bg-red-700 hover:bg-red-800 text-white font-semibold py-1 rounded-2xl shadow-md transform transition-transform duration-100 btn-click-effect"
            >
              Delete
            </button>{" "}
          </div>
        </div>
      );
    };

  const addEntry = () => {
    setInputProp(defaultProps);
    props.addField(generateComponent());
  };

  return (
    <div className="flex justify-center">
      <div className="InputForm bg-gray-500 py-10 w-3/4 flex flex-col md:flex-row md:items-center md:justify-between px-5">
        <div className="flex flex-col md:flex-row md:space-x-2 md:items-center">
          <label
            htmlFor="label"
            className="block mb-2 text-lg font-semibold text-white"
          >
            Label
          </label>
          <input
            type="text"
            name="label"
            placeholder="Label name"
            value={inputProp.label}
            onChange={handleChange}
            className="block mb-2 border py-1 px-3 rounded-lg"
          />
        </div>
        <div className="flex flex-col md:flex-row md:space-x-2 md:items-center">
          <label
            htmlFor="inputType"
            className="block mb-2 text-lg font-semibold text-white"
          >
            Select Input Type
          </label>
          <select
            name="inputType"
            id="inputType"
            value={inputProp.inputType}
            onChange={handleChange}
            className="block mb-2 border text-lg font-semibold text-gray-800 rounded-lg"
          >
            <option value="">Select input type</option>
            <option value="text">Text</option>
            <option value="email">Email</option>
            <option value="password">Password</option>
            <option value="number">Number</option>
            <option value="date">Date</option>
          </select>
        </div>
        <div className="flex flex-col md:flex-row md:space-x-2 md:items-center">
          <label
            htmlFor="keyName"
            className="block mb-2 text-lg font-semibold text-white"
          >
            Key Name
          </label>
          <input
            type="text"
            name="keyName"
            placeholder="Key name"
            value={inputProp.keyName}
            onChange={handleChange}
            className="block mb-2 border py-1 px-3 rounded-lg"
          />
        </div>
        <button
          onClick={addEntry}
          className="bg-green-700 hover:bg-green-800 text-white font-semibold px-4 py-1 rounded-2xl shadow-md transform transition-transform duration-100 btn-click-effect"
        >
          Add
        </button>
      </div>
    </div>
  );
}
