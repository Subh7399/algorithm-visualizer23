import { useState } from "react";
import Color, { messages } from "../config.js";

// Generating Random Array
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


export default function Bubble() {
  const [isValue, setValue] = useState("");
  const [isSpeed, setSpeed] = useState(50);
  const [isNext,setNext] = useState(0);
  const [isARRL,setARRL] = useState(0)
  const [isSwap,setSwapped] = useState(0)
  const [isCompared,setCompared] = useState({ time : 0, values : null, arr : []  })

  let tempArr = [];
  function generatearray(container, ARRAYL) {
    setARRL(ARRAYL)
    document.getElementById("s_pass").innerHTML = ''
    setSwapped(0)
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

  function swap(el1, el2, container) {
    return new Promise((resolve) => {
      var temp = el1.style.transform;
      el1.style.transform = el2.style.transform;
      el2.style.transform = temp;

      window.requestAnimationFrame(function () {
        setTimeout(() => {
          container.insertBefore(el2, el1);
          resolve();
        }, 250);
      });
    });
  }

  async function BubbleSort(delay = isSpeed * 10, isOneTime = false) {
    let x = 0
    let y = []
    let z = 0 
    let b = 1

    var blocks = document.querySelectorAll(".block");

    for (var i = 0; i < blocks.length; i += 1) {
      for (var j = isOneTime ? isNext : 0; j < blocks.length - i - 1; j += 1) {


        blocks[j].style.backgroundColor = Color.activeColor1;
        blocks[j + 1].style.backgroundColor = Color.activeColor2;

        await new Promise((resolve) =>
          setTimeout(() => {
            resolve();
          }, delay)
        );

        var value1 = Number(blocks[j].childNodes[0].innerHTML);
        var value2 = Number(blocks[j + 1].childNodes[0].innerHTML);

	x = x + 1
	y.push(`${value1} ; ${value2}`)
	setCompared({
	  time : isOneTime ? isCompared.time + 1 : x ,
	  values : `${value1} ; ${value2}`,
	  arr : y
	})


        if (value1 > value2) {
          await swap(
            blocks[j],
            blocks[j + 1],
            document.getElementById("array")
          );
          blocks = document.querySelectorAll(".block");
	  z = z + 1
	  setSwapped(isOneTime ? isSwap + 1 : z)
        }
        blocks[j].style.backgroundColor = Color.baseColor;
        blocks[j + 1].style.backgroundColor = Color.baseColor;



        if(!isOneTime){
          blocks[blocks.length - i - 1].style.backgroundColor = Color.resultColor;
        }
  
        if (isOneTime) {
          document.getElementsByClassName("NxBtn")[0].style.cursor = "pointer";
          document.getElementsByClassName("NxBtn")[0].removeAttribute("disabled");
          return;
        }
      }

	let a = []
	document.querySelectorAll('#array > .block > .block_id').forEach(e =>{
	  if(e.innerText !== undefined){
	    a.push(e.innerText)
	  }
	})
	 const c_ = document.createElement('li')
      c_.textContent = "Pass " + b + " [ "+a.toString()+" ]"

      document.getElementById("s_pass").insertBefore(c_, document.getElementById("s_pass").children[0])
	a = []
        b = b+1
    }

  }

  const cls = () => {
    document.getElementById("array").innerHTML = "";
  };

  return (
    <>
      <p className="header">Bubble Sort</p>
      <div id="btnHolder">
        <button
          id="gen"
          onClick={() => {
            cls();
            randArr = uniqueArr(initArr);
            generatearray(document.getElementById("array"), 20);
            document.getElementById("startBtn").style.cursor = "pointer";
            document.getElementById("startBtn").removeAttribute("disabled");
            document.getElementsByClassName("NxBtn")[0].style.cursor =
              "pointer";
            document
              .getElementsByClassName("NxBtn")[0]
              .removeAttribute("disabled");
            setValue(tempArr);
          }}
        >
          Generate
        </button>
        <button
          id="startBtn"
          onClick={(ev) => {
            setNext(0)
            BubbleSort(isSpeed*10, false);
            ev.target.style.cursor = "not-allowed";
            ev.target.disabled = "true";
          }}
        >
          Start
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
            generatearray(document.getElementById("array"), randArr.length);
            document.getElementById("startBtn").style.cursor = "pointer";
            document.getElementById("startBtn").removeAttribute("disabled");
            document.getElementsByClassName("NxBtn")[0].style.cursor =
              "pointer";
            document
              .getElementsByClassName("NxBtn")[0]
              .removeAttribute("disabled");
          }}
        />
        &nbsp; &nbsp;
        <button
          className="NxBtn btn2"
          style={{ background: "#263238" }}
          onClick={(ev) => {
            if(isNext == isARRL-2){
                setNext(0)
                BubbleSort(isSpeed*10, true);
            } else {
              setNext(isNext+1)
              ev.target.style.cursor = "not-allowed";
              ev.target.disabled = "true";
              BubbleSort(isSpeed*10, true);
            }

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
      </div>
      <div id="array" style={{    transform: `translate(-85px, -62px)` }}>
        <p className="initMsg">{messages.m2}</p>
      </div>
      <div className="information">
	<span>Swapped : {isSwap}</span>
	<br />
	<span>Compared : { isCompared.time }</span>
	<br />
	<span>Compared Values: { isCompared.values } 
	<details
  	    style={{ 
	    height: `100px`, 
	    overflowY : `auto`,
	    width :`200px` }}>
	  <summary>
	    Show 
	  </summary>
	    {isCompared.arr.map((e) => {
	      return (
		<ul key={Math.random()*100}>
		  <li>{e}</li>
		</ul>
	      )
	    })}
	</details>
	</span>
      </div>
      <br />
      <div className="sortpass">
	Sorted Pass
	<details>
	  <summary>
	    Show 
	  </summary>
      <ul id="s_pass"
  	    style={{ 
	    height: `auto`,
	    maxHeight : '100px',
	    overflowY : `auto`,
	    width : '550px'
	     }}>
      </ul>
	  </details>
      </div>
    </>
  );
}
