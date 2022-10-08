import axios from "axios";
import { useState } from "react";
import Select from "react-select";
//accepts the entire tag from the parent class
const PopUp = props => {
  const [oldUser, setOldUser] = useState('');
  const customStyles = {
    dropdownIndicator: (base) => ({
      ...base, //  ;
      // ;
      color: "rgb(83, 134, 189)",
      background: "rgb(2, 9, 39)", // Custom colour
    }),
  };

  const handleOnSubmit = () => {
    //console.log(props.content)
    var name = document.getElementById("popup-firstName").value
    var lastName = document.getElementById("popup-lastName").value
    var plant = document.getElementById("popup-plant").value
    if (props.content === 'Update' || props.content === 'Delete' || props.content === "Insert") {
      axiosChange(name, plant, lastName);

    }

  }
  const handleOnClose = () => {
    props.setExists(false);
    props.handleClose();
  }
  const handleChange = (e) => {
    setOldUser(e.label);
    var name = e.label.split(",")
    var last = name[0];
    var first = name[1];
    document.getElementById("popup-firstName").value = first;
    document.getElementById("popup-lastName").value = last;
    document.getElementById("popup-plant").value = props.plant;
  }
  const handleUpdate = () => {
    var first = document.getElementById("popup-firstName").value.replace(/\s/g, "");
    var last = document.getElementById("popup-lastName").value.replace(/\s/g, "");
    var plant = document.getElementById("popup-plant").value.replace(/\s/g, "");
    axiosChange(first, plant, last)
  }
  function axiosChange(name, plant, lastName) {
    var http = `http://localhost:3001/${props.content}`;
    //var http = "https://mysterious-badlands-20103.herokuapp.com/insert";

    axios
      .post(http, {
        name: name,
        plant: plant,
        lastName: lastName,
        old: oldUser,
        oldPlant: props.plant
      })
      .then(() => {
        props.setExists(false);
        props.handleClose()
      });
  }
  //console.log(props.list)
  return (
    <>
      {props.exists === false ? (
        <div className="popup-box">
          <title> Add Employee</title>
          <div className="box">
            Add New Employee{/*pass handleClose component */}
            <button className="btn-close" onClick={props.handleClose}>X</button>
            <section>
              <input placeholder="First Name" className="popup-firstName" id="popup-firstName"></input>
              <input placeholder="Last Name" className="popup-lastName" id="popup-lastName"></input>
              <input placeholder="Plant" className="popup-plant" id="popup-plant"></input>
              <button className="pop-btn" onClick={handleOnSubmit}>Submit</button>
            </section>
          </div>
        </div >) : (<div className="popup-box">
          <title> Add Employee</title>
          <div className="box2">
            {props.content + " Employee"}
            <button className="btn-close" onClick={handleOnClose}>X</button>
            <section>
              <button className="pop-btn2" onClick={handleUpdate}>{props.content}</button>
              <input placeholder="First Name" className="popup-firstName" id="popup-firstName"></input>
              <input placeholder="Last Name" className="popup-lastName" id="popup-lastName"></input>
              <input placeholder="Plant" className="popup-plant" id="popup-plant"></input>
              <Select
                className="popup-selector"
                id="popup-selector"
                placeholder="Pick the Employee"
                styles={customStyles}
                options={props.list}
                onChange={handleChange}
              ></Select>
            </section>
          </div> </div>)
      }</>

  );
}
export default PopUp;