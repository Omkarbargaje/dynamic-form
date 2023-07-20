import React, { useState } from "react";

const defaultProps = {
  heading: "",
  optionName: "",
  keyName: "",
  optionValue: "",
};

function AddCheckBox({ keyVal, removeCheckBox, handelCheckboxsOnChange }) {
  const [checkbox_KeyName_And_Value, set_checkbox_KeyName_And_Value] = useState(
    {}
  );

  function handelChange(e) {
    set_checkbox_KeyName_And_Value((checkbox_KeyName_And_Value) => ({
      ...checkbox_KeyName_And_Value,
      [e.target.name]: e.target.value,
    }));
  }

  function onSave() {
    handelCheckboxsOnChange(keyVal, checkbox_KeyName_And_Value);
  }

  return (
    <div className="flex flex-row my-5">
      <label
        htmlFor="optionName"
        className="block mb-2 text-lg font-semibold text-white"
      >
        Checkbox name:
      </label>
      <input
        type="text"
        name="checkboxName"
        className="block mb-2 border py-1 px-3 rounded-lg mr-2"
        value={checkbox_KeyName_And_Value.checkboxName || ""}
        onChange={handelChange}
      />

      <label
        htmlFor="keyName"
        className="block mb-2 text-lg font-semibold text-white"
      >
        Value
      </label>
      <input
        type="text"
        name="value"
        className="block mb-2 border py-1 px-3 rounded-lg mr-2"
        value={checkbox_KeyName_And_Value.value || ""}
        onChange={handelChange}
      />

      <button
        onClick={onSave}
        className="mx-5 gray-800 text-lg bg-green-700 hover:bg-green-800 text-white font-semibold px-4 py-1 rounded-2xl shadow-md transform transition-transform duration-100 btn-click-effect"
      >
        Save
      </button>

      <button
        onClick={() => removeCheckBox(keyVal)}
        className="mx-5 gray-800 text-lg bg-red-700 hover:bg-red-800 text-white font-semibold px-4 py-1 rounded-2xl shadow-md transform transition-transform duration-100 btn-click-effect"
      >
        Delete
      </button>
    </div>
  );
}

export default function Checkbox(props) {
  //const [checkboxOptions,setCheckboxOptions] =useState({});
  const [inputProp, setInputProp] = useState(defaultProps);
  const [checkboxOptionsList, setCheckboxOptionsList] = useState({});
  const [checkboxesData, setCheckboxesData] = useState({});
  const [keys, setKeys] = useState(0);

  // console.log(inputProp);
  // console.log(checkboxOptionsList);
  console.log(checkboxesData);
  console.log(keys);

  const handelChange = (e) => {
    setInputProp({ ...inputProp, [e.target.name]: e.target.value });
  };

  const removeCheckBox = (key) => {
    setCheckboxOptionsList((options) => {
      const newObj = { ...options };
      delete newObj[key];
      return newObj;
    });

    setCheckboxesData((options) => {
      const newObj = { ...options };
      delete newObj[key];
      return newObj;
    });
  };

  const handelCheckboxsOnChange = (key, data) => {
    setCheckboxesData((inputProp) => ({ ...inputProp, [key]: data }));
  };

  const generateCheckboxes =
    () =>
    ({ value, handelOnChange, index, deleteFinalData }) => {
      const deleteElement = (e) => {
        deleteFinalData(index);
      };

      return (
        <div className="flex justify-center">
          <div className="flex justify-center flex-col">
            <div className="flex flex-row">
              <div className="mb-2 text-3xl font-semibold text-gray-800 mx-2 px-2">
                {" "}
                <label htmlFor={inputProp.heading}>{inputProp.heading}:</label>
              </div>
              <div className="border text-2xl text-gray-800 border-gray-500 px-5 py-5 rounded-xl">
                {Object.keys(checkboxesData).map((key) => (
                  <div key={key} className="flex justify-start py-1">
                    <input
                      type="checkbox"
                      key={key}
                      name={checkboxesData[key].checkboxName}
                      value={checkboxesData[key].value}
                      onChange={handelOnChange}
                    />

                    <label
                      htmlFor={checkboxesData[key].checkboxName}
                      className="px-2"
                    >
                      {checkboxesData[key].checkboxName}
                    </label>
                  </div>
                ))}
              </div>
            </div>
<div className="flex justify-center my-5">

            <button
              className="w-20 bg-red-700 hover:bg-red-800 text-white font-semibold py-1 rounded-2xl shadow-md transform transition-transform duration-100 btn-click-effect"
              onClick={deleteElement}
            >
              Delete
            </button>
</div>
          </div>
        </div>
      );
    };

  const addEntry = () => {
    setInputProp(defaultProps);
    props.addField(generateCheckboxes());
  };

  const addCheckboxOption = () => {
    setCheckboxOptionsList({
      ...checkboxOptionsList,
      [keys]: (
        <AddCheckBox
          key={keys}
          keyVal={keys}
          removeCheckBox={removeCheckBox}
          handelCheckboxsOnChange={handelCheckboxsOnChange}
        />
      ),
    });
    setKeys((key) => key + 1);
  };

  return (
    <div className="flex justify-center">
      <div className="InputForm bg-gray-500 py-10 w-3/4 flex flex-col md:flex-row md:items-center px-5 justify-center">
        <div className="flex flex-col justify-center items-center">
          <div className="flex justify-center flex-col my-10">
            <label
              htmlFor="heading"
              className="block mb-2 text-lg font-semibold text-white"
            >
              Checkbox Heading:
            </label>
            <input
              type="text"
              name="heading"
              className="block mb-2 border py-1 px-3 rounded-lg mr-2"
              value={inputProp.heading}
              onChange={handelChange}
            />

            <label
              htmlFor="heading"
              className="block mb-2 text-lg font-semibold text-white"
            >
              key Name:
            </label>
            <input
              type="text"
              name="keyName"
              className="block mb-2 border py-1 px-3 rounded-lg mr-2"
              value={inputProp.keyName}
              onChange={handelChange}
            />

            <button
              onClick={addCheckboxOption}
              className="bg-green-700 hover:bg-green-800 text-white font-semibold px-4 py-1 rounded-2xl shadow-md transform transition-transform duration-100 btn-click-effect"
            >
              Add CheckBox
            </button>
          </div>

          <div>
            {Object.keys(checkboxOptionsList).map(
              (key) => checkboxOptionsList[key]
            )}
          </div>

          <button
            onClick={addEntry}
            className="bg-green-700 hover:bg-green-800 text-white font-semibold px-4 py-1 rounded-2xl shadow-md transform transition-transform duration-100 btn-click-effect"
          >
            Create CheckBoxes
          </button>
        </div>

        {console.log(inputProp)}
      </div>
    </div>
  );
}
