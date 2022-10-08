import React from "react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

function Header() {
  //returns the location we are currently on
  const path = useLocation().pathname;
  //changes the background when the botton are clicked
  const [color, changeColor] = useState();
  document.body.style.background = color;
  
  //document.getElementById
  return (
    <header className="header">
      <div className="mainLink mainLink-glow">
        <Link to={"/Control"}>
          Control
        </Link>
      </div>
      <div className="mainLink mainLink-glow">
        <Link to={"/show"}>
          Display Point Trend
        </Link>
      </div>
      <div className="mainLink mainLink-glow">
        <Link to={"/assign"}>
          {" "}
          Assign Points
        </Link>
      </div>
    </header>
  );
}

export default Header;
