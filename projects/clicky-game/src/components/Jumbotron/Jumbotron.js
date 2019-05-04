import React from "react";
import "./jumbotron.css";
// import background from "background.png";

function Jumbotron() {
  return (
    <div className="jumbotron text-center" style={{ borderRadius: 0 }}>
      <h1 className="title">Clicky Game!</h1>
      <h4>
        Click on an image to earn points. Be careful not to click the same image
        twice.
      </h4>
    </div>
  );
}

export default Jumbotron;
