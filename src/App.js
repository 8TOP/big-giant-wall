import React from "react";
import "./App.css";
import Header from "./components/Header/header"
import Frame from "./components/Frame/frame";
import WallMenu from "./components/WallMenu/wallmenu";
import { content } from './content';

const startLoc = {
  x: 500,
  y: 500,
  a: 0,
  b: 0
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content: content,
      location: {
        zone: {
          x: "0",
          y: "0"
        },
        coords: {
          x: 0,
          y: 0
        }
      },
      mode: "explore"
    };
  }
  addScrawl = (scrawl) => {
    content.push(scrawl);
    this.setState({ content: content })
    console.log(this.state.content);
  }
  saveScrawl = (i, value) => {
    for (let c of content) {
      if (c.id === i) {
        c.phase = "set";
        c.value = value;
        break;
      }
    }
    console.log("content", content);
    this.setState({ content: content });
    console.log("state content", this.state.content);
  }
  setMode = (mode) => {
    console.log(mode);
    this.setState({ mode: mode });
  }
  transit(zone, coords) {
    const newLoc = {
      zone: zone,
      coords: coords
    };
    this.setState({ location: newLoc });
  }
  //
  render() {
    return (
      <div className="App">
        <Header
          location={this.state.location.zone}
        />
        <WallMenu
          setMode={this.setMode}
        />
        <Frame
          content={this.state.content}
          location={this.state.location}
          mode={this.state.mode}
          setMode={this.setMode}
          addScrawl={this.addScrawl}
          saveScrawl={this.saveScrawl}
          transit={this.transit.bind(this)}
        />
      </div>
    );
  }
}

export default App;
