import React, {useState} from "react";
import Color, { messages } from "../config.js";

for (var initArr = [], i = 0; i < 100; ++i) initArr[i] = i;
function uniqueArr(array) {
  var tmp,
    current,
    top = array.length;
  if (top)
    while (--top) {
      current = Math.floor(Math.random() * (top + 1));
      tmp = array[current];
      array[current] = array[top];
      array[top] = tmp;
    }
  return array;
}

let randArr = uniqueArr(initArr);

export default function Linear() {
  const [isValue, setValue] = useState("");
  const [isSpeed, setSpeed] = useState(50);
  const [isNext, setNext] = useState(0);
  const [isCompared,setCompared] = useState({ time : 0, values : null, arr : [] })
  let tempArr = [];
  function generatearray(container, ARRAYL) {
    setCompared({time:0,values:null,arr : []})
    for (var i = 0; i < ARRAYL; i++) {
      var value = randArr[i];
      tempArr.push(value);
      var array_ele = document.createElement("div");
      array_ele.classList.add("block");
      array_ele.style.height = `${value * 3}px`;
      array_ele.style.transform = `translate(${i * 30}px)`;
      var array_ele_label = document.createElement("label");
      array_ele_label.classList.add("block_id");
      array_ele_label.innerText = value;
      array_ele.appendChild(array_ele_label);
      container.appendChild(array_ele);
    }
  }

 function cleanRes(){
  	document.getElementById("text").textContent = ''
  }

  async function LinearSearch(delay = isSpeed*10,isOneTime = false) {
    let x = 0
    let y = []
    var blocks = document.querySelectorAll(".block");
    var num = document.getElementById("fname").value;
    var output = document.getElementById("text");

    for (var i = 0; i < blocks.length; i += 1) {
      blocks[i].style.backgroundColor = Color.baseColor;
    }

    output.innerText = "";

    var flag = 0;

    for (var i = isOneTime ? isNext : 0; i < blocks.length; i += 1) {
      
      x =  x + 1
      blocks[i].style.backgroundColor = Color.activeColor1;

      await new Promise((resolve) =>
        setTimeout(() => {
          resolve();
        }, delay)
      );

      var value = Number(blocks[i].childNodes[0].innerHTML);
        y.push(`${value} ; ${num}`)
	setCompared({
	  time : isOneTime ? isCompared.time + 1 : x,
	  values : `${value} ; ${num}`,
	  arr : y
      })

      if (Number(value) === Number(num)) {
        flag = 1;
        output.innerText = "Element Found At Bar " + (i + 1) + ", Index " + i;
        blocks[i].style.backgroundColor = Color.resultColor;
        break;
      } else {
        blocks[i].style.backgroundColor = Color.baseColor;
      }
      if(isOneTime){
	return;
      }
    }

    if (Number(flag) === 0) {
      output.innerText = "Element Not Found";
    }
  }

  const cls = () => {
    document.querySelector("#array").innerHTML = "";
  };

  return (
    <>
      <p className="header">Linear Search</p>

      <div id="div_one_lin">

        <button
          id="gen"
          onClick={() => {
            cls();
	    cleanRes()
            randArr = uniqueArr(initArr);
            generatearray(document.getElementById("array"), 20);
            setValue(tempArr);
	    setNext(0)
          }}
        >
          Generate
        </button>


        <input
          type="text"
          style={{ width: "380px" }}
	  placeholder="Insert Custom Value"
          value={isValue}
          onChange={(ev) => {
            randArr = ev.target.value.split(",");
            setValue(randArr.toString());
            console.log(randArr);
            cls();
            generatearray(document.getElementById("array"), randArr.length);
	    setNext(0)
          }}
        />

	&nbsp;
	&nbsp;

        <label htmlFor="fname">Number to be Searched:</label>
        <input type="text" id="fname" />
	
	&nbsp;
	&nbsp;

        <button id="startBtn" onClick={() => {setNext(0); LinearSearch(); }}>
          Search
        </button>

	&nbsp;
	&nbsp;

        <button
          className="NxBtn btn2"
          style={{ background: "#263238" }}
          onClick={(ev) => {
	    LinearSearch(isSpeed*10,true)
	    setNext(isNext + 1)
          }}
        >
          Next
        </button>

        <div
          style={{ display: "flex", margin: "0.5rem", alignItems: "center" }}
        >
          <input
            type="range"
            min="1"
            max="100"
            value={isSpeed}
            onChange={(ev) => {
              setSpeed(ev.target.value);
            }}
            className="slider"
            id="myRange"
          />

          <p>
            Speed: <span id="speedVal">{isSpeed * 10}ms</span>
          </p>
        </div>


	<div style={{ 'padding' : '0.8rem' }} id="text"></div>
      </div>

      <div id="array">
        <p className="initMsg">{messages.m2}</p>
      </div>
      <div className="information">
	<span>Compared : { isCompared.time }</span>
	<br />
	<span>Compared Values: { isCompared.values } 
	<details>
	  <summary>
	    Show 
	  </summary>
	  <div style={{ 
	    height: `100px`, 
	    overflowY : `auto`,
	    width :`200px` }}>
	    {isCompared.arr.map((e) => {
	      return (
		<ul key={Math.random()*100}>
		  <li>{e}</li>
		</ul>
	      )
	    })}
	  </div>
	</details>
	</span>
      </div>
    </>
  );
}
