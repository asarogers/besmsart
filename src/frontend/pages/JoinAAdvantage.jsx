function Join() {
  //controls the background color of this page with hexdecimals
  document.body.style.background = "#1C1C1C";

  return (<>name
    <div className="join-name-container">
      <input placeholder="First" className="join-first"></input>
      <input placeholder="Middle"></input>
      <input placeholder="Last"></input>
      <input placeholder="Suffix"></input>
  </div></>);
}
//exports the main function, returns the html to whichever file calls this function
export default Join;
