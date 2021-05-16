import React from 'react';

class ValidationComponent extends React.Component {

    render() {
        let aviso = '';

        if (this.props.longitud < 5) {
            aviso = "Texto demasiado corto"
        }

        if (this.props.longitud > 10) {
            aviso = "Texto suficientemente largo"
        }

        return (
            <div>
                <p>{aviso}</p>
            </div>
        )
    }
}

export default ValidationComponent;