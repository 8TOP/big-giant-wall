import React from 'react';
import './scrawltext.css';

const rune = "0123456789abcdefghijklmnopqrstuvwxyz".split("");

class ScrawlText extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            textValue: ""
        }
    }
    inputCapture = (e) => {
        this.setState({ textValue: e.target.value });
    }
    render() {
        const { contentZone, contentCoords } = this.props;
        const { zone, coords } = this.props.location;
        const coef = (c) => {
            let sign = (zone[c].charAt(0) === "-" ? -1 : 1);
            return sign * (rune.indexOf(contentZone[c].charAt(contentZone[c].length - 1)) - rune.indexOf(zone[c].charAt(zone[c].length - 1)));
        }
        switch (this.props.content.phase) {
            case "new":
                return (
                    <div className="scrawl-item"
                        style={{
                            top: (contentCoords.y + coords.y + (1000 * coef("y"))),
                            left: (contentCoords.x + coords.x + (1000 * coef("x")))
                        }}
                    >
                        <input
                            type="text"
                            className="scrawl-text-new"
                            onChange={this.inputCapture}
                        />
                        <input
                            type="submit"
                            className="scrawl-submit-btn"
                            value="OK"
                            onClick={() => this.props.saveScrawl(this.props.content.id, this.state.textValue)}
                        />
                    </div>
                );
            case "set":
                return (
                    <div className="scrawl-item"
                        style={{
                            top: (contentCoords.y + coords.y + (1000 * coef("y"))),
                            left: (contentCoords.x + coords.x + (1000 * coef("x")))
                        }}
                    >
                        {this.props.content.value}
                    </div>
                );
            default:
                break;
        }
    }
}

export default ScrawlText;