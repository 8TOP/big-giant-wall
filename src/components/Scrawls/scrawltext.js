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
        const { content, contentCoords } = this.props;
        switch (this.props.content.date) {
            case "":
                return (
                    <div className="scrawl-item"
                        style={{
                            top:  contentCoords.y,
                            left: contentCoords.x
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
            default:
                return (
                    <div className="scrawl-item"
                        style={{
                            top:  (contentCoords.y),
                            left: (contentCoords.x)
                        }}
                    >
                        {`${this.props.content.value} | x:${content.coords.x}, y:${content.coords.y}`}<br />
                        {`zoneDif: ${this.props.content.test}`}
                    </div>
                );
        }
    }
}

export default ScrawlText;