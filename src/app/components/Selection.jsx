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

export default function Selection() {
  const [isValue, setValue] = useState("");
  const [isSpeed, setSpeed] = useState(50);
  const [isSwap, setSwapped] = useState(0);
  const [isCompared, setCompared] = useState({
    time: 0,
    values: null,
    arr: [],
  });
  const [isTrack, setTrack] = useState({ track_state: false, track_num: 0 });

  let tempArr = [];
  function generatebars(num = 20, container) {
    randArr = uniqueArr(initArr)
    setTrack({ track_state: false, track_num: 0 });
    document.getElementById("s_pass").innerHTML = "";
    setSwapped(0);
    setCompared({ time: 0, values: null, arr: [] });
    for (let i = 0; i < num; i += 1) {
      const value = randArr[i];
      const bar = document.createElement("div");
      bar.classList.add("bar");
      bar.style.height = `${value * 3}px`;
      bar.style.transform = `translateX(${i * 30}px)`;
      const barLabel = document.createElement("label");
      barLabel.classList.add("bar_id");
      barLabel.innerHTML = value;
      bar.appendChild(barLabel);
      container.appendChild(bar);
      tempArr.push(value);
    }
  }

  async function SelectionSort(delay = isSpeed * 10, isOneTime = false) {
    if (isOneTime) {
      setTrack({ track_state: true, track_num: isTrack.track_num });
    } else {
      setTrack({ track_state: false, track_num: 0 });
    }

    let bars = document.querySelectorAll(".bar");

    let x = 0;
    let y = [];
    let z = 0;

    var min_idx = 0;
    for (
      var i = isOneTime && isTrack.track_state ? isTrack.track_num : 0;
      i < bars.length;
      i++
    ) {
      min_idx = i;

      bars[i].style.backgroundColor = Color.activeColor1;

      for (
        var j =
          isOneTime && isTrack.track_state ? isTrack.track_num + 1 : i + 1;
        j < bars.length;
        j++
      ) {
        bars[j].style.backgroundColor = Color.activeColor2;

        await new Promise((resolve) =>
          setTimeout(() => {
            resolve();
          }, delay)
        );

        var val1 = parseInt(bars[j].childNodes[0].innerHTML);

        var val2 = parseInt(bars[min_idx].childNodes[0].innerHTML);

        y.push(`${val1} ; ${val2}`);
        x = x + 1;
        setCompared({
          time: x,
          values: `${val1} ; ${val2}`,
          arr: y,
        });

        if (val1 < val2) {
          if (min_idx !== i) {
            bars[min_idx].style.backgroundColor = Color.baseColor;
          }
          min_idx = j;
          z = z + 1;
          setSwapped(z);
        } else {
          bars[j].style.backgroundColor = Color.baseColor;
        }
      }

      var temp1 = bars[min_idx].style.height;
      var temp2 = bars[min_idx].childNodes[0].innerText;
      bars[min_idx].style.height = bars[i].style.height;
      bars[i].style.height = temp1;
      bars[min_idx].childNodes[0].innerText = bars[i].childNodes[0].innerText;
      bars[i].childNodes[0].innerText = temp2;

      await new Promise((resolve) => {
        setTimeout(() => {
          resolve();
        }, delay);
      });

      bars[min_idx].style.backgroundColor = Color.baseColor;

      bars[i].style.backgroundColor = Color.resultColor;

      let a = [];
      document.querySelectorAll("#array > .bar > .bar_id").forEach((e) => {
        if (e.innerText !== undefined) {
          a.push(e.innerText);
        }
      });
      const c_ = document.createElement("li");
      c_.textContent = "Pass " + (i + 1) + " [ " + a.toString() + " ]";
      document.getElementById("s_pass").insertBefore(c_, document.getElementById("s_pass").children[0]);
      a = [];

      if (isOneTime) {
        document.getElementsByClassName("NxBtn")[0].style.cursor = "pointer";
        document.getElementsByClassName("NxBtn")[0].removeAttribute("disabled");
        return;
      }
    }

    document.getElementById("Button2").disabled = false;
    //document.getElementById("Button2").style.backgroundColor = "#6f459e";
  }

  function disable() {
    document.getElementById("Button2").disabled = true;
    document.getElementById("Button2").style.cursor = "not-allowed";

    // document.getElementById("Button2").style.backgroundColor = "#d8b6ff";
  }

  const cls = () => {
    document.querySelector(".data-container").innerHTML = "";
  };

  return (
    <>
      <section className="header">Selection Sort Visualizer</section>
      <button
        className="btn1"
        onClick={() => {
          cls();
          generatebars(20, document.querySelector(".data-container"));
          setValue(tempArr);
          document.getElementById("Button2").disabled = false;
          document.getElementById("Button2").style.cursor = "pointer";
        }}
        id="Button1"
      >
        Generate
      </button>
      <button
        className="btn2"
        onClick={() => {
          SelectionSort();
          disable();
        }}
        id="Button2"
      >
        Selection Sort
      </button>
      <input
        type="text"
        style={{ width: "350px" }}
        value={isValue}
        placeholder="Insert Custom Value"
        onChange={(ev) => {
          randArr = ev.target.value.split(",");
          setValue(randArr.toString());
          cls();
          generatebars(randArr.length, document.getElementById("array"));
          document.getElementById("Button2").disabled = false;
          document.getElementById("Button2").style.cursor = "pointer";
        }}
      />
      &nbsp; &nbsp;
      <button
        className="NxBtn btn2"
        style={{ background: "#263238" }}
        onClick={(ev) => {
          SelectionSort(isSpeed * 10, true);
          setTrack({ track_state: true, track_num: isTrack.track_num + 1 });
          ev.target.style.cursor = "not-allowed";
          ev.target.disabled = "true";
        }}
      >
        Next
      </button>
      <div style={{ display: "flex", margin: "0.5rem", alignItems: "center" }}>
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
      <section className="data-container" id="array">
        <p className="initMsg">{messages.m2}</p>
      </section>
      <div className="information">
        <span>Swapped : {isSwap}</span>
        <br />
        <span>Compared : {isCompared.time}</span>
        <br />
        <span>
          Compared Values: {isCompared.values}
          <details>
            <summary>Show</summary>
            {isCompared.arr.map((e) => {
              return (
                <ul
                  style={{
                    height: `100px`,
                    overflowY: `auto`,
                    width: `200px`,
                  }}
                  key={Math.random() * 100}
                >
                  <li>{e}</li>
                </ul>
              );
            })}
          </details>
        </span>
      </div>
      <br />
      <div className="sortpass">
        Sorted Pass
        <details>
          <summary>Show</summary>

          <ul
            id="s_pass"
            style={{
              height: `auto`,
              maxHeight: "100px",
              overflowY: `auto`,
              width: "550px",
            }}
          ></ul>
        </details>
      </div>
    </>
  );
}
