import React from "react";
import "./header.css";

function Header(props) {
  return (
    <nav className="navbar">
      <a className="navbar-brand" href="#">
        <h2 className="ml-2">Clicky Game</h2>
      </a>

      <div className="guess text-center">{props.msg}</div>

      <div className="guess mr-2">
        Score: {props.score} | Top Score: {props.highScore}
      </div>
    </nav>
  );
}

export default Header;
