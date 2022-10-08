import axios from "axios";
import React from "react";

const getData = async () => {
  const res = await axios.post("http://localhost:3001/Control");

  if (res) {
    return res.data;
  }
};

const addPlant = async () => {
  const res = await axios.post("http://localhost:3001/Control-add", {
    plant: "820",
  });

  if (res) {
    return res.data;
  }
};

export default class Home extends React.Component {
  //onload call this function

  constructor(props) {
    super(props);
    this.state = {
      plants: [],
    };
  }

  componentDidMount() {
    var promise = getData();
    promise.then((element) => {
      this.setState({ plants: element });
    });
    addPlant();
  }

  render() {
    document.body.style.background = "rgb(255,255,255)";

    return (
      <>
        <title> Sonoco Home</title>
        <div className="plant-container">
          <h1>Plants</h1>
          <>
            {this.state.plants.length > 0 ? (
              <div className="plant-list">
                {" "}
                {this.state.plants.map((element, index) => {
                  return (
                    <div className="plant" key={index}>
                      {" "}
                      {element}{" "}
                    </div>
                  );
                })}
              </div>
            ) : (
              <div>Please Refresh</div>
            )}
          </>
          <button onClick={addPlant}>Add a Plant</button>
        </div>
      </>
    );
  }
}
