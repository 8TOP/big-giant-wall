import React from "react";
import "./App.css";
import Header from "./components/Header/header"
import Frame from "./components/Frame/frame";
import Options from './components/Options/options';

const initialState = {
  content: []
};

const backendUrl = "http://localhost:3000";
// const backendUrl = "https://big-giant-wall-backend.herokuapp.com";

console.log(backendUrl);
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
    this.clickMode = "";
    this.localContent = [];
    this.masonry = {
      size: 1000,
      scope: 3
    }
    this.location = {
      zone: {
        x: "0",
        y: "0"
      },
      scroll: {
        x: this.masonry.size / 2,
        y: this.masonry.size / 2
      }
    }
    this.scrollingDeets = {
      x: 0,
      y: 0
    }
  }
  abacus = (firstValue, secondValue) => {
    const rune = "0123456789abcdefghijklmnopqrstuvwxyz".split("");
    const unPad = (value) => {
        while (value[0] === "0" && value.length > 1) {
            value.shift();
        }
        return value;
    }
    const base = 36;
    //
    if (typeof firstValue === "number") {
      firstValue = firstValue.toString();
    }
    let init = firstValue.split("");
    let initSign = (init[0] === "-" ? init.shift() : "");
    let inc, incSign;
    if (typeof secondValue === "number") {
        inc = secondValue.toString(base).split("");
        incSign = (secondValue >= 0 ? "" : inc.shift());
    } else if (typeof secondValue === "string") {
        inc = secondValue.split("");
        incSign = (inc[0] === "-" ? inc.shift() : "");
    }
    let newValue = [];

    init.reverse();
    inc.reverse();

    let longerValue;
    let shorterValue;
    let longerSign;
    let biggerValue = [];
    let smallerValue = [];
    if (init.length > inc.length) {
        longerValue = biggerValue = init;
        shorterValue = smallerValue = inc;
        longerSign = initSign;
    } else if (init.length < inc.length) {
        longerValue = biggerValue = inc;
        shorterValue = smallerValue = init;
        longerSign = incSign;
    } else {
        longerValue = init;
        shorterValue = inc;
        longerSign = initSign;
    }
    let digit = 0;
    let sign = "";
    for (let l = longerValue.length - 1; l >= 0; l--) {
        if (l > shorterValue.length - 1) {
            digit = rune.indexOf(longerValue[l]);
            sign = longerSign;
        } else {
            if (initSign === incSign) {
                digit = rune.indexOf(init[l]) + rune.indexOf(inc[l]);
                if (digit >= base) {
                    digit -= base;
                    for (let x = 0; x <= newValue.length; x++) {
                        if (x === newValue.length) {
                            newValue.push("1");
                            break;
                        }
                        if (newValue[x] === rune[base - 1]) {
                            newValue[x] = "0";
                        } else {
                            newValue[x] = rune[rune.indexOf(newValue[x]) + 1];
                            break;
                        }
                    }
                }
                sign = initSign;
            } else {
                if (biggerValue.length === 0) {
                    if (rune.indexOf(init[l]) > rune.indexOf(inc[l])) {
                        biggerValue = init;
                        smallerValue = inc;
                        sign = initSign;
                    } else if (rune.indexOf(init[l]) < rune.indexOf(inc[l])) {
                        biggerValue = inc;
                        smallerValue = init;
                        sign = incSign;
                    }
                }
                if (biggerValue.length > 0) {
                    digit = rune.indexOf(biggerValue[l]) - rune.indexOf(smallerValue[l]);
                    if (digit < 0) {
                        digit += base;
                        for (let x = 0; x < newValue.length; x++) {
                            if (newValue[x] === "0") {
                                newValue[x] = rune[base - 1];
                            } else {
                                newValue[x] = rune[rune.indexOf(newValue[x]) - 1];
                                break;
                            }
                        }
                    }
                } else {
                    digit = "";
                }
            }
        }
        newValue.unshift(rune[Math.abs(digit)]);
    }
    newValue = unPad(newValue.reverse());
    return sign + newValue.join("");
  }
  adjustScroll() {
    this.loadFreeze = false;
    const { x, y } = this.scrollingDeets;
    const { size } = this.masonry;
    this.elem.scrollLeft += (size * x);
    this.elem.scrollTop += (size * y);
    this.scrollingDeets = {
      x: 0,
      y: 0
    }
  }
  brickClick = (zone, e) => {
    switch (this.clickMode) {
      case "write":
        const newScrawl = {
          id: "new",
          type: "text",
          date: "",
          value: "",
          coords: {
              x: e.layerX,
              y: e.layerY
          },
          zone: {
              x: zone.x,
              y: zone.y
          },
          position: {
            x: e.target.parentNode.attributes[2].nodeValue,
            y: e.target.parentNode.attributes[3].nodeValue
          }
        };
        this.localContent[0] = newScrawl;
        this.loadContent();
        break;
      case "explore":
        break;
      default:
        break;
    }
    this.clickMode = "";
  }
  clearLocal() {
    this.localContent = [];
  }
  componentDidMount() {
    // const { zone } = this.location;
    // fetch('http://localhost:3000/')
    //   .then(response => response.json())
    //   .then(console.log);
    this.loadContent();
  }
  frameElem(elem) {
    this.elem = elem;
  }
  loadContent() {
    this.loadFreeze = true;
    const { zone } = this.location;
    console.log(`${backendUrl}/zoneX/${zone.x}/zoneY/${zone.y}`)
    fetch(`${backendUrl}/zoneX/${zone.x}/zoneY/${zone.y}`, {
      method: 'get',
      headers: { 'Content-Type': 'application/json' }
    })
      .then(response => response.json())
      .then(loadedContent => {
        if (this.localContent.length > 0) {
          const { position } = this.localContent[0];
          loadedContent[position.x][position.y].push(this.localContent[0]);
        }
        this.adjustScroll();
        this.setState({ content: loadedContent });
      })
      .catch(err => console.log(err));
  }
  menuAction = (action) => {
    this.clickMode = action;
    console.log("clickMode set to " + this.clickMode);
  }
  scrollHandler(scroll) {
    const { size } = this.masonry;
    const { zone } = this.location;
    this.location.scroll = scroll;
    if (scroll.x >= size) {
      this.location.scroll.x -= size;
      this.scrollingDeets = {
        x: -1,
        y: 0
      };
      this.transit(this.abacus(zone.x, 1), zone.y);
    } else if (scroll.x < 0) {
      this.location.scroll.x += size;
      this.scrollingDeets = {
        x: 1,
        y: 0
      }
      this.transit(this.abacus(zone.x, -1), zone.y);
    }
    //
    if (scroll.y >= size) {
      this.location.scroll.y -= size;
      this.scrollingDeets = {
        x: 0,
        y: -1
      }
      this.transit(zone.x, this.abacus(zone.y, 1));
    } else if (scroll.y < 0) {
      this.location.scroll.y += size;
      this.scrollingDeets = {
        x: 0,
        y: 1
      }
      this.transit(zone.x, this.abacus(zone.y, -1));
    }
  }
  transit(zoneX, zoneY) {
    this.location.zone = {
      x: zoneX,
      y: zoneY
    }
    if (!this.loadFreeze) {
      this.loadContent();
    }
  }
  //
  render() {
    return (
      <div className="App">
        <Options
          action={this.menuAction}
        />
        <Header
          location={this.location.zone}
        />
        <Frame
          content={this.state.content}
          location={this.location}
          masonry={this.masonry}
          scrollHandler={this.scrollHandler.bind(this)}
          frameElem={this.frameElem.bind(this)}
          brickClick={this.brickClick.bind(this)}
          backendUrl={backendUrl}
          clearLocal={this.clearLocal.bind(this)}
        />
      </div>
    );
  }
}

export default App;
