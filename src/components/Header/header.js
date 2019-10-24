import React from 'react';
import "./header.css";

class Header extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        let { location } = this.props;
        return (
            <header className="header-base">
                <div className="locator">{`@${location.x}, ${location.y}`}</div>
                <div className="user-control">
                    <div className="user-face"></div>
                    <div className="user-menu">
                        <div className="menu-item">User Name</div>
                        <div className="menu-item">Item 1</div>
                        <div className="menu-item">Item 2</div>
                        <div className="menu-item">Item 3</div>
                        <div className="menu-item">Item 4</div>
                    </div>
                </div>
            </header>  
        );
    }
}

export default Header;