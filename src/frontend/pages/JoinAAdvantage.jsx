import axios from "axios";

function Join() {
  //controls the background color of this page with hexdecimals
  document.body.style.background = "#1C1C1C";
  function tests() {
    console.log("yo");
    axios.post("http://localhost:3001/tests",{yo: "aye"});
  }

  return (
    <>
      {/*This is the container for the Name html. I use containers because they're easy to move around without needing to change every single div */}
      <div className="join-container">
        NAME
        <input placeholder="First" className="join-input"></input>
        <input placeholder="Middle" className="join-input"></input>
        <input placeholder="Last" className="join-input"></input>
        <input placeholder="Suffix" className="join-input"></input>
      </div>
      <div className="development-end"> </div>

      <div className="join-container">
        BIRTHDAY
        <input type={"date"} className="join-input"></input>
      </div>

      <div className="join-container">
        EMAIL
        <input
          type="email"
          className="join-input"
          placeholder="Email Address"
        ></input>
        <input type="email" className="join-input" placeholder="Verify"></input>
      </div>

      <div className="join-container">
        PHONE
        <input
          type="phone"
          className="join-input"
          placeholder="Country / region code"
        ></input>
        <input
          type="phone"
          className="join-input"
          placeholder="Mobile Number"
        ></input>
      </div>

      <div className="join-container">
        ADDRESS
        <input
          type="text"
          className="join-input"
          placeholder="Country / region code"
        ></input>
        <input
          type="text"
          className="join-input"
          placeholder="Street 1"
        ></input>
        <input
          type="text"
          className="join-input"
          placeholder="Street 2"
        ></input>
        <input type="text" className="join-input" placeholder="City"></input>
        <input
          type="text"
          className="join-input"
          placeholder="State/Province"
        ></input>
        <input
          type="text"
          className="join-input"
          placeholder="Zip/Postal Code"
        ></input>
      </div>

      <div className="join-container">
        PASSWORD
        <input
          type="text"
          className="join-input"
          placeholder="Password"
        ></input>{" "}
      </div>

      <div className="join-container">
        <button onClick={tests}>Submit</button>
      </div>
    </>
  );
}
//exports the main function, returns the html to whichever file calls this function
export default Join;
