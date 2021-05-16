import React from 'react';

class Header extends React.Component {
    render(){
        return (
            <div>
                <h1>{this.props.titulo}</h1>
            </div>
        )
    }
}

export default Header;