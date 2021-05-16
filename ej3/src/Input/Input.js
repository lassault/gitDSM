import React from 'react';

class Input extends React.Component {

    render() {
        return (
            <div>
                <p>Introduce texto</p>
                <input type='text' onChange={this.props.cambiando} value={this.props.text} />
                <p>El texto tiene {this.props.longitud} caracteres</p>
            </div>
        )
    }
}

export default Input;