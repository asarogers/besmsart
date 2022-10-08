function Join() {
  //controls the background color of this page with hexdecimals
  document.body.style.background = "#1C1C1C";

  return (<>name
    <div className="join-name-container">
      <input placeholder="First" className="join-input"></input>
      <input placeholder="Middle" className="join-input"></input>
      <input placeholder="Last" className="join-input"></input>
      <input placeholder="Suffix" className="join-input"></input>
  </div></>);
}
//exports the main function, returns the html to whichever file calls this function
export default Join;
