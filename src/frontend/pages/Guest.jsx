import axios from "axios";
import React, { useEffect, useState } from "react";
import Select from "react-select";
import PopUp from "../components/PopUps";

function Body() {
  const [userName, setUserName] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [btnPath, setBtnPath] = useState("");
  const [doesExist, setDoesExist] = useState(false);
  const [nameList, setNameList] = useState([]);
  const [thePlant, setThePlant] = useState("");
  const [thePoints, setThePoints] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    checkPoints(userName);
  }, [userName]);
  const customStyles = {
    dropdownIndicator: (base) => ({
      ...base, //  ;
      // ;
      color: "rgb(83, 134, 189)",
      background: "rgb(2, 9, 39)", // Custom colour
    }),
  };
  const options = [
    {
      label: "asa.rogers@sonoco.com",
      value: 1,
    },
    {
      label: "it works?",
      value: 2,
    },
    {
      label: "it works!",
      value: 3,
    },
  ];
  const pointsOption = [
    {
      label: "-15",
      value: -15,
    },
    {
      label: "-8",
      value: -8,
    },
    {
      label: "-6",
      value: -6,
    },
    {
      label: "-2",
      value: -2,
    },
    {
      label: "0",
      value: 0,
    },
    {
      label: "2",
      value: 2,
    },
    {
      label: "6",
      value: 6,
    },
    {
      label: "8",
      value: 8,
    },
    {
      label: "15",
      value: 15,
    },
  ];
  const plantOptions = [
    {
      label: "820",
      value: 1,
    },
    {
      label: "A820",
      value: 2,
    },
  ];

  function clearAll() {
    //clear all fields
  }
  function notifyEmployee(e) {
   
  }
  const addPoints = () => {
    const reason = document.getElementById("callOutReason").value;
    const plant = thePlant;
    // ;
    var name = userName.split(", ");
    var last = name[0];
    var first = name[1];

    var _date = document.getElementById("assign-month").value;
    var newDate = _date.split("-");
    var month = returnDate(newDate[1]);
    var day = newDate[2];
    if (first && last && plant && reason && month && thePoints) {
      axiosAdd(
        "http://localhost:3001/Reasons-add",
        first,
        last,
        plant,
        reason,
        thePoints,
        month,
        day,
        newDate[0]
      );
    } else {
      console.log(typeof reason);
      var reasons = "";
      typeof first === "undefined"
        ? (reasons += "Please select an employee. ")
        : (reasons += "");
      typeof plant === "undefined"
        ? (reasons += "Please select a plant. ")
        : (reasons += "");
      typeof month === "undefined"
        ? (reasons += "Please select a date. ")
        : (reasons += "");
      typeof thePoints === "undefined"
        ? (reasons += "Please select points to add. ")
        : (reasons += "");
      reason == 0 ? (reasons += "Please give a reason ") : (reasons += "");
      alert(reasons);
    }
  };
  function returnDate(date) {
    var month;

    switch (date) {
      case "01":
        month = "January";
        break;
      case "02":
        month = "February";
        break;
      case "03":
        month = "March";
        break;
      case "04":
        month = "April";
        break;
      case "05":
        month = "May";
        break;
      case "06":
        month = "June";
        break;
      case "07":
        month = "July";
        break;
      case "08":
        month = "August";
        break;
      case "09":
        month = "September";
        break;
      case "10":
        month = "October";
        break;
      case "11":
        month = "November";
        break;
      case "12":
        month = "December";
        break;
      default:
        break;
    }
    return month;
  }
  const readPoints = async (e) => {
    setThePlant(e.label);
    await checkPoints(userName);
    axiosRead(e.label, "http://localhost:3001/Read");
  };
  function axiosAdd(
    http,
    name,
    lastName,
    plant,
    reason,
    point,
    month,
    day,
    year
  ) {
    //var http = "https://mysterious-badlands-20103.herokuapp.com/insert";

    axios
      .post(http, {
        name: name,
        plant: plant,
        lastName: lastName,
        reasons: reason,
        points: point,
        month: month,
        days: day,
        year: year,
      })
      .then((response) => {
        assignUserInfo(response.data);
      });
  }
  function assignUserInfo(points) {
    document.getElementById("accumulatedPoints").innerText = points;
    //className="accumulatedRating">Good
    var disciplinaryLevel = "";
    var rgb = "0,0,0";
    var accumulated = document.getElementById("accumulatedRating");
    var color = "#000000";
    if (points <= 20) {
      disciplinaryLevel = "Good";
      rgb = "#25d433";
    } else if (points < 40) {
      disciplinaryLevel = "Verbal";
      rgb = "#c3e333";
    } else if (points < 60) {
      disciplinaryLevel = "Written";
      rgb = "#d3b610";
    } else if (points < 80) {
      disciplinaryLevel = "Final";
      rgb = "#ec4c4c";
    } else {
      disciplinaryLevel = "Term";
      rgb = "#000000";
      color = "#fcfcfc";
    }

    //document.getElementById("callOutReason").innerText = "";
    //document.getElementById("pointsSelector").innerText = 0;

    accumulated.style.color = color;
    accumulated.innerText = disciplinaryLevel;
    accumulated.style.background = rgb;
  }
  function axiosRead(plant, http) {
    var list = [];
    axios
      .post(http, {
        plant: plant,
      })
      .then((response) => {
        response.data.forEach((element) => {
          list.push({ label: element.name, value: element.name });
        });

        setNameList(list);
      });
  }

  const togglePopup = (e) => {
    if (e) {
      var btn = e.target.innerText;
      switch (btn) {
        case "Drop":
          setBtnPath("Delete");
          //console.log("delete");
          setDoesExist(!doesExist);
          break;
        case "Add":
          //console.log("Insert");
          setBtnPath("Insert");
          break;
        case "Edit":
          //console.log("Edit");
          setBtnPath("Update");
          setDoesExist(!doesExist);
          break;
        default:
          console.log("happy");
          break;
      }
    }
    setIsOpen(!isOpen);

    axiosRead(thePlant, "http://localhost:3001/Read");
  };

  const setName = async (e) => {
    setUserName(e.label);
  };
  function setPoints(e) {
    setThePoints(e.label);
  }

  const checkPoints = async (userName) => {
    var name = userName.split(", ");
    var last = name[0];
    var first = name[1];
    var http = "http://localhost:3001/Reasons-read";
    //console.log(name)
    axios
      .post(http, {
        plant: thePlant,
        name: first,
        lastName: last,
      })
      .then((response) => {
        assignUserInfo(response.data);
      });
  };
  document.body.style.background = "#080808ce";
  return (
    <>
      <title>Point Assignment</title>
      <div className="assign-body">
        <label className="staffControl" htmlFor="checkbox">
          Staffing Control (HR)
        </label>
        <input type="checkbox" className="checkbox" id="checkbox"></input>
        <table className="assign-filter-table">
          <tbody>
            <tr>
              <th>Assignment Month</th>
            </tr>
            <tr>
              <th>
                <input
                  id="assign-month"
                  className="assign-month"
                  type="date"
                ></input>
              </th>
              <th>
                {isOpen && (
                  <PopUp
                    handleClose={togglePopup}
                    content={btnPath}
                    exists={doesExist}
                    setExists={setDoesExist}
                    list={nameList}
                    plant={thePlant}
                  ></PopUp>
                )}
                <button className="add-btn" onClick={togglePopup}>
                  Add
                </button>
              </th>
            </tr>
            <tr>
              <th>Plant ID</th>
            </tr>
            <tr>
              <th>
                <Select
                  id="assign-plant"
                  onChange={readPoints}
                  className="assign-plant"
                  styles={customStyles}
                  options={plantOptions}
                ></Select>
              </th>
              <th>
                <button className="edit-btn" onClick={togglePopup}>
                  Edit
                </button>
              </th>
            </tr>
            <tr>
              <th>
                <button className="drop-btn" onClick={togglePopup}>
                  Drop
                </button>
              </th>
            </tr>
            <tr className="add-drop-btns"></tr>
            <tr>
              <th></th>
            </tr>
          </tbody>
        </table>
        <section>
          <div className="form-body">
            <label htmlFor="employeeName" className="nameOfEmployee">
              Name of Employee
            </label>
            <Select
              className="employeeNameSelector"
              id="employeeName"
              placeholder="Find Name"
              styles={customStyles}
              options={nameList}
              onChange={setName}
            ></Select>
            <label htmlFor="callOutReason" className="reasonForCall">
              Reason for Call Off/Amendment
            </label>
            <input
              id="callOutReason"
              type={"text"}
              className="callOutReasonInput"
            ></input>
            <label className="pointsText" htmlFor="pointsSelector">
              <u>Points Issued on Current/Selected Month</u>
            </label>
            <Select
              onChange={setPoints}
              className="pointsSelector"
              id="pointsSelector"
              styles={customStyles}
              options={pointsOption}
            ></Select>
            <button className="issue-btn" onClick={addPoints}>
              Issue
            </button>
            <p className="pointExample">
              0 = Called In (Excuse Presented) <br />2 = Up to One Hour Away{" "}
              <br /> 6 = One Hour or More <br /> 8 = Absence with Notification{" "}
              <br /> 15 = Absence W/Out Notification{" "}
            </p>
          </div>
        </section>
        <table className="notify-table">
          <tbody>
            <tr>
              <th>
                <u className="accumulatedPoints-text">Points Accumulated</u>
              </th>
            </tr>
            <tr>
              <th
                className="accumulatedPoints"
                defaultValue={0}
                id="accumulatedPoints"
              ></th>
              <th className="accumulatedRating" id="accumulatedRating"></th>
            </tr>
          </tbody>
        </table>
        <div className="emailText">Supervisor/Team Lead Email </div>
        <Select
          className="supervisorSelector"
          styles={customStyles}
          options={options}
          onChange={(e) => {
            setEmail(e.label);
          }}
        ></Select>
        <button className="clearAll-btn">Clear All</button>
        <button className="employeeEmail-btn" onClick={notifyEmployee}>
          Employee Notification
        </button>
      </div>
    </>
  );
}
export default Body;
