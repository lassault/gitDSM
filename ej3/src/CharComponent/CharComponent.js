import React from 'react';

class CharComponent extends React.Component {
    render() {
        return (
            <div className='CharComponent' onClick={this.props.click}>
                <p>{this.props.letra}</p>
            </div>
        )
    }
}

export default CharComponent;