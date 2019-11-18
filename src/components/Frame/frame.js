import React from 'react';
import Brick from '../Brick/brick';
import './frame.css';

class Frame extends React.Component {
    constructor(props) {
        super(props);
        //
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
        //console.log("abacus: ", newValue);
        return sign + newValue.join("");
    }
    
    wallCrawl = (e) => {
        const { scroll } = this.props.location;
        let littleScroll = {
            x: scroll.x + e.deltaX,
            y: scroll.y + e.deltaY
        };
        this.props.scrollHandler(littleScroll);
    }
    componentDidMount() {
        this.elem = document.getElementById("wallFrame");
        this.props.frameElem(this.elem);
        this.setScroll();
    }
    setScroll() {
        const { size, scope } = this.props.masonry;
        this.elem.scrollLeft = (size * scope) - (window.innerWidth / 2) + this.props.location.scroll.x;
        this.elem.scrollTop = (size * scope) - (window.innerHeight / 2) + this.props.location.scroll.y;
    }
    render() {
        const { size, scope } = this.props.masonry;
        const { zone } = this.props.location;
        const setSize = ((scope * 2) + 1) * size;
        const { content } = this.props;
        let grid = [];
        for (let x = -scope; x <= scope; x++){
            grid.push([]);
            for (let y = -scope; y <= scope; y++){
                grid[x + scope].push([this.abacus(zone.x, x), this.abacus(zone.y, y)]);
            }
        }
        if (content.length > 0) {
            //this.setScroll();
            return (
                <div
                    id="wallFrame"
                    className="wall-frame"
                    onWheel={(e) => this.wallCrawl(e)}
                >
                    
                    <div
                        id="brickSet"
                        className="brick-set"
                        style={{
                            width: (setSize),
                            height: (setSize)
                        }}
                    >
                        {
                            grid.map((column, x) => {
                                return (
                                    column.map((brick, y) => {
                                        return (
                                            <Brick
                                                key={(x * ((scope * 2) + 1)) + (y)}
                                                zone={grid[x][y]}
                                                contents={content[x][y]}
                                                size={size}
                                            />
                                        )
                                    })
                                )
                            })
                        }
                    </div>
                </div>
            )
        } else {
            return (
                <div
                    id="wallFrame"
                    className="wall-frame"
                    onWheel={(e) => this.wallCrawl(e)}
                >
                    <div
                        id="brickSet"
                        className="brick-set"
                        style={{
                            width: (setSize),
                            height: (setSize)
                        }}
                    >
                    </div>
                </div>
            )
        }
    }
}

export default Frame;