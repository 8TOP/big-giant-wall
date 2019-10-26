import React from 'react';
import ScrawlText from '../Scrawls/scrawltext';
import Cell from '../Scrawls/cell';
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
        this.focal = {
            x: Math.ceil(window.innerWidth / 2),
            y: Math.ceil(window.innerHeight / 2)
        }
    }
    makeScrawl = (e) => {
        if (this.props.mode === "draw") {
            console.log("making new scrawl");
            const click = {
                x: e.clientX,
                y: e.clientY
            }
            const newScrawl = {
                id: this.props.localContent.length+1,
                type: "text",
                date: "",
                value: "",
                coords: {
                    x: e.clientX,// - this.props.location.coords.x
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
            location.coords.x -= e.movementX;
            location.coords.y -= e.movementY;
            console.log(location.coords);
            if (location.coords.x > 1000) {
                location.coords.x -= 1000;
                location.zone.x = zoneEnumerator(location.zone.x, 1);
                this.props.loadContent();
            } else if (location.coords.x < 0) {
                location.coords.x += 1000;
                location.zone.x = zoneEnumerator(location.zone.x, -1);
                this.props.loadContent();
            }
            if (location.coords.y > 1000) {
                location.coords.y -= 1000;
                location.zone.y = zoneEnumerator(location.zone.y, 1);
                this.props.loadContent();
            } else if (location.coords.y < 0) {
                location.coords.y += 1000;
                location.zone.y = zoneEnumerator(location.zone.y, -1);
                this.props.loadContent();
            }
            transit(location.zone, location.coords);
        }
    }
    render() {
        const { content, localContent, location } = this.props;
        const allContent = content.concat(localContent);
        const zoneDif = (c, contentZone) => {
            const contentZoneSign = (contentZone[c].charAt(0) === "-" ? -1 : 1)
            const reticleZoneSign = (location.zone[c].charAt(0) === "-" ? -1 : 1);
            const contentZoneIndex = rune.indexOf(contentZone[c].charAt(contentZone[c].length - 1));
            const reticleZoneIndex = rune.indexOf(location.zone[c].charAt(location.zone[c].length - 1));
            let result = (contentZoneSign * contentZoneIndex) - (reticleZoneSign * reticleZoneIndex);
            return (Math.abs(result) === 35 ? 1 * contentZoneSign * reticleZoneSign : result);
        }
        return (
            <div
                className="wall-frame"
                onMouseMove={this.pullWall.bind(this)}
                onClick={this.makeScrawl.bind(this)}
            >
                <div className="ret">+</div>
                {
                    allContent.map((item, i) => {
                        const contentCoords = {
                            y:  ((this.focal.y - location.coords.y) + (allContent[i].coords.y + (1000 * zoneDif("y", allContent[i].zone)))),
                            x: ((this.focal.x - location.coords.x) + (allContent[i].coords.x + (1000 * zoneDif("x", allContent[i].zone))))
                        }
                        switch (allContent[i].type) {
                            case "text":
                                return (
                                    <ScrawlText
                                        key={allContent[i].id}
                                        content={allContent[i]}
                                        contentZone={allContent[i].zone}
                                        contentCoords={contentCoords}
                                        location={location}
                                        saveScrawl={this.props.saveScrawl}
                                    />
                                )
                            case "cell":
                                return (
                                    <Cell
                                        key={allContent[i].id}
                                        contentZone={allContent[i].zone}
                                        contentCoords={contentCoords}
                                        location={location}
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