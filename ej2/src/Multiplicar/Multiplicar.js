import React from 'react';

class Multiplicar extends React.Component {
    render(){
        return (
            <div>
                <input type='text' onChange={this.props.cambiando} />
            </div>
        )
    }
}

export default Multiplicar;