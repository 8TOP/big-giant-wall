import React from "react";
import "./App.css";
import Header from "./components/Header/header"
import Frame from "./components/Frame/frame";
import WallMenu from "./components/WallMenu/wallmenu";
//import { content } from './content';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content: [],
      localContent: [],
      location: {
        zone: {
          x: "0",
          y: "0"
        },
        coords: {
          x: 500,
          y: 500
        }
      },
      mode: "explore"
    };
  }
  componentDidMount() {
    fetch('http://localhost:3000/')
      .then(response => response.json())
      .then(console.log);
    this.loadContent();
  }
  loadContent() {
    const { zone } = this.state.location;
    fetch(`http://localhost:3000/zoneX/${zone.x}/zoneY/${zone.y}`, {
      method: 'get',
      headers: { 'Content-Type': 'application/json'}
    })
      .then(response => response.json())
      .then(loadedContent => {
        // let stagedContent = [];
        // for (let item of loadedContent) {
        //   stagedContent.push(item);
        // }
        this.setState({ content: loadedContent });
    })
  }
  addScrawl = (scrawl) => {
    let tempArr = this.state.localContent;
    tempArr.push(scrawl);
    this.setState({ localContent: tempArr })
  }
  // saveScrawl = (i, value) => {
  //   for (let c of content) {
  //     if (c.id === i) {
  //       c.phase = "set";
  //       c.value = value;
  //       break;
  //     }
  //   }
  //   console.log("content", content);
  //   this.setState({ content: content });
  //   console.log("state content", this.state.content);
  // }
  setMode = (mode) => {
    console.log(mode);
    this.setState({ mode: mode });
  }
  transit(zone, coords) {
    const newLoc = {
      zone: zone,
      coords: coords
    };
    // if (zone !== this.state.location.zone) {
    //   this.loadContent();
    // }
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
          localContent={this.state.localContent}
          location={this.state.location}
          mode={this.state.mode}
          setMode={this.setMode}
          addScrawl={this.addScrawl}
          saveScrawl={this.saveScrawl}
          transit={this.transit.bind(this)}
          loadContent={this.loadContent.bind(this)}
        />
      </div>
    );
  }
}

export default App;
