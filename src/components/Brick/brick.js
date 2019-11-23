import React from 'react';
import ScrawlText from '../Scrawls/scrawltext';
import './brick.css';

class Brick extends React.Component {
    constructor(props) {
        super(props);
    }
    
    makeScrawl = (e) => {
        if (this.props.mode === "draw") {
            const { coords } = this.props.location;
            console.log("making new scrawl");
            const newScrawl = {
                id: "new",
                type: "text",
                date: "",
                value: "",
                coords: {
                    x: e.clientX - coords.x,
                    y: e.clientY - coords.y
                },
                zone: {
                    x: this.props.location.zone.x,
                    y: this.props.location.zone.y
                }
            };
            console.log(newScrawl);
            this.local[0] = newScrawl;
            console.log("local: ", this.local);
            this.props.setMode("explore");
        }
    }
    componentDidMount() {
        const { zone } = this.props;
        this.elem = document.getElementById(`x${zone[0]}_y${zone[1]}`);
    }
    render() {
        const { contents, size, zone, position } = this.props;
        if (contents) {
            return (
                <div
                    id={`x${zone[0]}_y${zone[1]}`}
                    className="brick"
                    style={{
                        width: size,
                        height: size
                    }}
                    x={position.x}
                    y={position.y}
                    onClick={(e) => this.props.brickClick(zone, e.nativeEvent)}
                >{`${zone[0]}, ${zone[1]}`}
                    <div className="wall-main-layer">
                        {
                            contents.map((scrawl, i) => {
                                // console.log("mapping", scrawl);
                                switch (scrawl.type) { 
                                    case "text":
                                        return (
                                            <ScrawlText
                                                key={scrawl.id}
                                                content={scrawl}
                                            />
                                        )
                                    default:
                                        break;
                                }
                            })
                        }
                    </div>
                    <div className="wall-base-layer">

                    </div>
                </div>
            )
        } else {
            return (
                <div></div>
            );
        }
    }
}

export default Brick;