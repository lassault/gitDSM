
import React from 'react';

import Input from './Input/Input';
import CharComponent from './CharComponent/CharComponent';
import ValidationComponent from './ValidationComponent/ValidationComponent';

import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      texto: ''
    }
  }

  nuevaLetra = (event) => {
    this.setState({
      texto: event.target.value
    })
  }

  eliminarLetra = (index) => {
    const letras = [...this.state.texto];
    letras.splice(index, 1);
    this.setState({
      texto: letras.join('')
    })
  }

  render() {
    let textoescrito = this.state.texto.split('');
    let elementos = null;
    elementos = (
      <div>
        {textoescrito.map((valor, index) => {
          return <CharComponent
            click={() => this.eliminarLetra(index)}
            letra={valor}
            letraIndex={index}
          />
        })}
      </div>
    )

    return (
      <div className='App'>
        <Input
          text={this.state.texto}
          cambiando={this.nuevaLetra}
          longitud={this.state.texto.length}
        />

        <ValidationComponent
          longitud={this.state.texto.length}
        />

        {elementos}

      </div>
    )
  }
}

export default App;