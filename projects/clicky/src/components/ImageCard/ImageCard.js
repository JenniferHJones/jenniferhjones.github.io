import React from "react";
import "./ImageCard.css";

function ImageCard(props) {
  return (
    <div className="img-container" onClick={() => props.clickHandler()}>
      <img alt={props.name} src={props.image} />
    </div>
  );
}

export default ImageCard;
