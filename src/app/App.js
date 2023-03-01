import { useState } from "react";
import Bubble from "./components/Bubble";
import Selection from "./components/Selection";
import Linear from "./components/Linear";
import Binary from "./components/Binary";
import "./App.css";
import Img from './assets/Welcome.gif'
import {messages} from './config.js'

function Welcome() {
  return (
    <>
      <div id="welcome_msg"><h3>{messages.m1}</h3></div>
      <img src={Img} alt="" />
    </>
  );
}

function App() {
  const [selOpt, setOpt] = useState("welcome");

  const toggleMenu = (id) => {
    if (document.getElementById(id).style.display !== "block") {
      document.getElementById(id).style.display = "block";
    } else {
      document.getElementById(id).style.display = "none";
    }
  };

  return (
    <>
      <div className="split-left">
        <div className="dropdown">
          <div className="select" onClick={() => toggleMenu("menu_Sort")}>
            <span className="selected">Sorting</span>
            <div className="caret"></div>
          </div>
          <ul className="menu" id="menu_Sort">
            <li
              onClick={() => {
                document.title =   'Algorithm Visualizer ~ Bubble Sort'
                setOpt("bubble");
              }}
            >
              Bubble Sort
            </li>
            <hr className="breakLine"/>
            <li
              onClick={() => {
                document.title =  'Algorithm Visualizer  ~ Selction Sort'
                setOpt("selection");
              }}
            >
              Selection Sort
            </li>
          </ul>
        </div>
        <div className="dropdown">
          <div className="select" onClick={() => toggleMenu("menu_search")}>
            <span className="selected">Searching</span>
            <div className="caret"></div>
          </div>
          <ul className="menu" id="menu_search">
            <li
              onClick={() => {
                document.title =  'Algorithm Visualizer  ~ Linear Search'
                setOpt("linear");
              }}
            >
              Linear Search
            </li>
            <hr className="breakLine"/>
            <li
              onClick={() => {
                document.title =  'Algorithm Visualizer  ~ Binary Search'
                setOpt("binary");
              }}
            >
              Binary Search
            </li>
          </ul>
        </div>
      </div>

      <div className="split-right">
        {selOpt === "welcome" ? <Welcome /> : ""}

        {selOpt === "bubble" ? <Bubble /> : ""}

        {selOpt === "selection" ? <Selection /> : ""}

        {selOpt === "linear" ? <Linear /> : ""}

        {selOpt === "binary" ? <Binary /> : ""}
      </div>
    </>
  );
}

export default App;
