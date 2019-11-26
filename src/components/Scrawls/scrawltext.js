import React from 'react';
import './scrawltext.css';

class ScrawlText extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            textValue: "",
            content: this.props.content
        }
    }
    inputCapture = (e) => {
        this.setState({ textValue: e.target.value });
    }
    formatContentObject = (input) => {
        const output = {
            id: input.id,
            type: input.type,
            value: input.text_value,
            coords: {
                x: input.coordx,
                y: input.coordy
            },
            zone: {
                x: input.zonex,
                y: input.zoney
            },
            date: input.date,
            text: input.test
        }
        return output;
    }
    saveScrawl = () => {
        const { content } = this.state;
        fetch(`${this.props.backendUrl}/create`, {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                type: content.type,
                text_value: this.state.textValue,
                coordx: content.coords.x,
                coordy: content.coords.y,
                zonex: content.zone.x,
                zoney: content.zone.y,
                posted_by: "me",
                test: ""
            })
        })
            .then(response => response.json())
            .then(item => this.formatContentObject(item))
            .then(formatted => {
                console.log("scrawl saved");
                this.setState({ content: formatted });
                this.props.clearLocal();
            })
            .catch(err => console.log("there was an error", err));
    }
    componentDidMount() {
        // console.log("mount");
    }
    render() {
        const { size, position } = this.props;
        const { content } = this.state;

        switch (content.date) {
            case "":
                return (
                    <div
                        className="scrawl-item"
                        style={{
                            top:  ((position.y * size) + content.coords.y),
                            left: ((position.x * size) + content.coords.x)
                        }}
                    >
                        <input
                            type="text"
                            className="scrawl-text-new"
                            placeholder="new scrawl"
                            onChange={this.inputCapture}
                        />
                        <input
                            type="submit"
                            className="scrawl-submit-btn"
                            value="OK"
                            onClick={() => this.saveScrawl()}
                        />
                    </div>
                );
            default:
                return (
                    <div
                        className="scrawl-item"
                        style={{
                            top:  ((position.y * size) + content.coords.y),
                            left: ((position.x * size) + content.coords.x)
                        }}
                    >
                        {`${content.value}`}<br />
                    </div>
                );
        }
    }
}

export default ScrawlText;