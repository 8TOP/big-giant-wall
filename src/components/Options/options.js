import React from 'react';
import "./options.css";

class Options extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visibility: "hidden",
            top: 0,
            left: 0
        }
        this.menuMaster = document.getElementById("options_menu");
        this.menu = document.getElementById("mode_menu");
        window.oncontextmenu = function (e) {
            console.log(e);
            this.showOptions(true, e);
            return false;
        }.bind(this)
    }
    
    showOptions = (show, e) => {
        if (show) {
            this.setState({
                visibility: "visible",
                top: e.clientY - 20,
                left: e.clientX -75
            })
        } else {
            this.setState({ visibility: "hidden" })
        }
    }
    optionSelected = (action) => {
        this.props.action(action);
        this.showOptions(false);
    }
    render() {
        
        return (
            <div
                id="options_menu"
                className="mode-menu-elem"
                style={{visibility: this.state.visibility}}
            >
                <div className="mode-menu"
                    id="mode_menu"
                    style={{ top: this.state.top, left: this.state.left }}
                >
                    <input
                        type="button"
                        value="Write"
                        className="mode-menu-item"
                        onClick={() => this.optionSelected("write")}
                    />
                    <input
                        type="button"
                        value="Explore"
                        className="mode-menu-item"
                        onClick={() => this.optionSelected("explore")}
                    />
                </div>
                <div
                    className="mode-menu-backdrop"
                    onClick={(e) => this.showOptions(false, e)}
                ></div>
            </div>
        );
    }
}

export default Options;