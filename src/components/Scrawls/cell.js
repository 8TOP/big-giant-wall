import React from 'react';
import './cell.css';

const rune = "0123456789abcdefghijklmnopqrstuvwxyz".split("");

const Cell = ({ contentCoords }) => {
    return (
        <div className="wall-cell"
            style={{
                top:  contentCoords.y,
                left: contentCoords.x
            }}
        ></div>
    );
}

export default Cell;