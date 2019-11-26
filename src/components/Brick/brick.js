import React from 'react';
import './brick.css';

class Brick extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        const { zone } = this.props;
        this.elem = document.getElementById(`x${zone.x}_y${zone.y}`);
    }
    render() {
        const { contents, size, zone, position, backendUrl } = this.props;
        if (contents) {
            return (
                <div
                    id={`x${zone.x}_y${zone.y}`}
                    className="brick"
                    style={{
                        width: size,
                        height: size
                    }}
                    x={position.x}
                    y={position.y}
                    onClick={(e) => this.props.brickClick(zone, e.nativeEvent)}
                >{`${zone.x}, ${zone.y}`}
                    <div className="wall-main-layer">
                        {
                            // contents.map((scrawl, i) => {
                            //     // console.log("mapping", scrawl);
                            //     switch (scrawl.type) { 
                            //         case "text":
                            //             return (
                            //                 <ScrawlText
                            //                     key={scrawl.id}
                            //                     content={scrawl}
                            //                     backendUrl={backendUrl}
                            //                 />
                            //             )
                            //         default:
                            //             break;
                            //     }
                            // })
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