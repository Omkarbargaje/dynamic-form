//import React, { useState } from "react";
import { useState } from "react";
import "./AddInputs.css";
import InputForm from "./InputForm";
import Dropdown from "./Dropdown";

export default function InputTypeFormGenerator() {
  const [elementType, setElementType] = useState("input");
  const [showForm, setShowForm] = useState(false);
  const [finalFormList, setFinalFormList] = useState({});
  const [finalFormData, setFinalFormData] = useState({});
  const [keys, setKeys] = useState(0);

  console.log("finalFormData: " + finalFormData);

  const handelOnChange = (e) => {
    console.log("handel on change");
    setFinalFormData((finalFormData) => ({
      ...finalFormData,
      [e.target.name]: e.target.value,
    }));
  };

  const deleteFinalData = (key) => {
    setFinalFormList((formData) => {
      console.log("delte key: ", key);
      let newData = { ...formData };
      delete newData[key];
      return newData;
    });
  };

  const addField = (ElementHtml) => {
    setFinalFormList((finalFormList) => ({
      ...finalFormList,
      [keys]: (
        <ElementHtml
          handelOnChange={handelOnChange}
          value={finalFormData}
          index={keys}
          deleteFinalData={deleteFinalData}
        />
      ),
    }));
    /*here ElementHtml is using as < > because in <inputForm/> we are calling a addField where we are passing a generateComponent in it which is returing a component  */
    setKeys((key) => key + 1);
  };

  const componentMap = {
    input: <InputForm addField={addField} />,
    dropdown: <Dropdown addField={addField} />,
    // checkbox: <InputForm/>,
    // radio: <InputForm/>,
    // textArea: <InputForm/>
  };

  const handleElementType = (e) => setElementType(e.target.value);

  const handleClick = () => {
    if (elementType) {
      setShowForm(true);
    }
  };

  // const onSubmit = () => {
  //   // makeking http request to endpoint with body as finalFormData
  // };

  console.log("final form data: ", finalFormData);

  return (
    <>
      <div id="addFields">
        <div id="container">
          <div className="addInputFields">
            <div>
              <label htmlFor="inputType" className="inputFieldHeading">
                Choose a input Field:
              </label>
              <select
                name="inputType"
                id="inputType"
                onChange={handleElementType}
              >
                <option value="input">Input</option>
                <option value="dropdown">Dropdown</option>
                <option value="checkbox">Checkbox</option>
                <option value="radio">Radio Button</option>
                <option value="textArea">Text Area</option>
              </select>
            </div>

            <div></div>
          </div>

          <button className="addBtn" onClick={handleClick}>
            Select
          </button>
        </div>
      </div>
      <div>{showForm ? componentMap[elementType] : ""}</div>{" "}
      {/**elemetType is variable which is supposed to be the key for componentmap so we use [] to resolve the keyname from elementType */}
     

<div className="flex justify-center">

      <div className=" bg-pink-200 my-10 w-full md:w-3/4 rounded-lg shadow-md min-h-min">

        <div className="text-5xl font-semibold text-gray-800 py-10">
          User Form
        </div>

        <div>{Object.keys(finalFormList).map((key) => finalFormList[key])}</div>

        <div className="py-5">
            <button onClick={() => {}}> Submit</button>
        </div>

      </div>
</div>
    </>
  );
}

// const object = {
//   keys: (object) => {
//     let arr = [];
//     for (let key in object) {
//       arr.push(key);
//     }
//     return arr;
//   }
// }

// const tempObje = {
//   fname: "shubham",
//   lname: 'karmalkarj',
//   roll: 23
// }
// console.log(object.keys(tempObje))
