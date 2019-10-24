import React from 'react';
import "./wallmenu.css";

class WallMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: "hidden",
            top: 0,
            left: 0
        };
        window.oncontextmenu = function (e) {
            this.setState({
                visible: "visible",
                top: e.clientY - 20,
                left: e.clientX - 75
            });
            return false;
        }.bind(this);
    }
    action = (trans) => {
        this.props.setMode(trans);
        this.setState({ visible: "hidden" });
    }
    vanish = () => {
        this.setState({ visible: "hidden" });
    }
    render() {
        return (
            <div className="mode-menu-elem"
                style={{
                    visibility: this.state.visible
                }}
            >
                <div className="mode-menu"
                    style={{
                        top: this.state.top,
                        left: this.state.left
                    }}
                >
                    <input
                        type="button"
                        value="Draw"
                        className="mode-menu-item"
                        onClick={() => this.action("draw")}
                    />
                    <input
                        type="button"
                        value="Explore"
                        className="mode-menu-item"
                        onClick={() => this.action("explore")}
                    />
                </div>
                <div
                    className="mode-menu-backdrop"
                    onClick={() => this.vanish()}
                ></div>
            </div>
        );
    }
}

export default WallMenu;