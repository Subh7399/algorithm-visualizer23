import React, { useState } from "react";
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

export default function Binary() {
  const [isValue, setValue] = useState("");
  const [isSpeed, setSpeed] = useState(50);
  const [isCompared,setCompared] = useState({ time : 0, values : null, arr : [] , mid:null })
  const [isTrack,setTrack] = useState({ bool: false, start: undefined, end: undefined })

  let tempArr = [];
  function generatearray(container, ARRAYL) {

    setCompared({time:0,values:null,arr : [],mid:null})
    var arr = [];
    for (var i = 0; i < ARRAYL; i++) {
      var val = randArr[i];
      arr.push(val);
    }

    arr.sort(function (a, b) {
      return a - b;
    });

    for (var i = 0; i < ARRAYL; i++) {
      var value = arr[i];
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

async function BinarySearch(delay = isSpeed*10,isOneTime = false) {
    var blocks = document.querySelectorAll(".block");
    var output = document.getElementById("text");
    var num = document.getElementById("fname").value;
    for (var i = 0; i < blocks.length; i += 1) {
      blocks[i].style.backgroundColor = Color.baseColor;
    }

    let x = 0
    let y = []

    output.innerText = "";

  var start = isOneTime && isTrack.bool ? isTrack.start : 0;
  var end = isOneTime && isTrack.bool ? isTrack.end  : blocks.length - 1;
  
  if(isOneTime && isTrack.bool){
    setTrack({ bool: false, start: start, end: end })
   }
    
    var flag = 0;

  for (let i = start; start <= end; i++) {
      var mid = Math.floor((start + end) / 2);
      blocks[mid].style.backgroundColor = Color.activeColor1;
      var value = Number(blocks[mid].childNodes[0].innerHTML);

      x = isOneTime ? isCompared.time + 1 : x + 1
      y.push(`${value} ; ${num}`)

      setCompared({		
	time : x,
	values : `${value} ; ${num}`,
	arr : y,
	mid : mid
      })

      await new Promise((resolve) =>
        setTimeout(() => {
          resolve();
        }, delay)
      );
      if (Number(value) === Number(num)) {
        output.innerText = "Element Found At Bar " + (mid + 1) +  ", Index " + mid;
        blocks[mid].style.backgroundColor = Color.resultColor;
        flag = 1;
        break;
      }
      if (value > num) {
        end = mid - 1;
        blocks[mid].style.backgroundColor = Color.activeColor2;
      } else {
        start = mid + 1;
        blocks[mid].style.backgroundColor = Color.activeColor2;
      }
    if(isOneTime) {
      setTrack({ bool: true, start: start, end: end })
      return 
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
      <p className="header">Binary Search</p>

      <div id="div_one_bin">
        <button
          id="gen"
          onClick={() => {
            cls();
            randArr = uniqueArr(initArr);
            generatearray(document.getElementById("array"), 20);
	    setValue(tempArr)
          }}
        >
          Generate
        </button>


        <input
          type="text"
          style={{ width: "350px" }}
	  placeholder="Insert Custom Value"
          value={isValue}
          onChange={(ev) => {
            randArr = ev.target.value.split(",");
            setValue(randArr.toString());
            console.log(randArr);
            cls();
            generatearray(document.getElementById("array") , randArr.length);
          }}
        />

        &nbsp; &nbsp;
        <label htmlFor="fname">Number to be Searched:</label>
        <input type="text" id="fname" name="fname" />
        &nbsp; &nbsp;
        <button id="startBtn" onClick={() => BinarySearch()}>
          Search
        </button>

        &nbsp; &nbsp;
        <button
          className="NxBtn btn2"
          style={{ background: "#263238" }}
          onClick={(ev) => {
	    BinarySearch(isSpeed*10,true)
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
	<span>Mid : { isCompared.mid }</span>
	<br/>
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
