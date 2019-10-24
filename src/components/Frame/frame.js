import React from 'react';
import ScrawlText from '../Scrawls/scrawltext';
import './frame.css';

const rune = "0123456789abcdefghijklmnopqrstuvwxyz".split("");

const zoneEnumerator = (value, dir) => {
    let str = value.split("");
    let sign = "";
    if (str[0] === "-") {
        str.shift();
        sign = "-";
        dir = -dir;
    }
    if (dir === 1) {
        for (let n = str.length-1; n >= -1; n--){
            if (n < 0) {
                str.unshift("1");
                break;
            }else if (str[n] !== "z") {
                str[n] = rune[rune.indexOf(str[n]) + 1];
                break;
            } else {
                str[n] = "0";
            }
        }
    } else if (dir === -1) {
        for (let n = str.length-1; n >= -1; n--){
            if (n < 0) {
                str.shift();
                break;
            }else if (str[n] !== "0") {
                str[n] = rune[rune.indexOf(str[n]) - 1];
                if (str.length === 1 && str[n] === "0") {
                    sign = "";
                }
                break;
            } else {
                if (str.length === 1) {
                    sign = "-";
                    str[0] = "1";
                    break;
                } else {
                    str[n] = "z";
                }
            }
        }
    }
    return sign + str.join("");
}

class Frame extends React.Component {
    constructor(props) {
        super(props);
        //
    }
    modeAction = (e) => {
        switch (this.props.mode) {
            case "draw":
                this.makeScrawl(e);
                break;
            case "explore":
                this.pullWall(e);
                break;
            default:
                break;
        }
    }
    makeScrawl = (e) => {
        if (this.props.mode === "draw") {
            console.log("making new scrawl");
            const newScrawl = {
                id: this.props.content.length+1,
                type: "text",
                phase: "new",
                value: "",
                coords: {
                    x: e.clientX,
                    y: e.clientY
                },
                zone: {
                    x: this.props.location.zone.x,
                    y: this.props.location.zone.y
                }
            };
            console.log(newScrawl);
            this.props.addScrawl(newScrawl);
            this.props.setMode("explore");
        }
    }
    pullWall = (e) => {
        let { location, transit } = this.props;
        if (e.buttons === 1 && this.props.mode === "explore") {
            location.coords.x += e.movementX;
            location.coords.y += e.movementY;
            if (location.coords.x > 1000) {
                location.coords.x -= 1000;
                location.zone.x = zoneEnumerator(location.zone.x, -1);
            } else if (location.coords.x < 0) {
                location.coords.x += 1000;
                location.zone.x = zoneEnumerator(location.zone.x, 1);
            }
            if (location.coords.y > 1000) {
                location.coords.y -= 1000;
                location.zone.y = zoneEnumerator(location.zone.y, -1);
            } else if (location.coords.y < 0) {
                location.coords.y += 1000;
                location.zone.y = zoneEnumerator(location.zone.y, 1);
            }
            transit(location.zone, location.coords);
        }
    }
    render() {
        const { content, location } = this.props;
        return (
            <div
                className="wall-frame"
                onMouseMove={this.pullWall.bind(this)}
                onClick={this.makeScrawl.bind(this)}
            >
                {
                    content.map((item, i) => {
                        switch (content[i].type) {
                            case "text":
                                return (
                                    <ScrawlText 
                                        key={content[i].id}
                                        content={content[i]}
                                        contentZone={content[i].zone}
                                        contentCoords={content[i].coords}
                                        location={location}
                                        saveScrawl={this.props.saveScrawl}
                                    />
                                )
                            default:
                                break;
                        }
                    })
                }
            </div>
        )
    }
}

export default Frame;