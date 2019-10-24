import React from 'react';
import Scrawl from '../Scrawl/scrawl';
import './zone.css';

class Zone extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nothing: 0
        }
    }
    render() {
        const { content } = this.props;
        return (
            <div
                className="zone-block"
            >
                {
                    content.map((item, i) => {
                        return (
                            <Scrawl 
                                key={content[i].id}
                                value={content[i].value}
                                coords={content[i].coords}
                            />
                        )
                    })
                }
            </div>
        )
    }
}

export default Zone;