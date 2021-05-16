import React from 'react';

import Header from './Header/Header';
import Multiplicar from './Multiplicar/Multiplicar';
import Resultado from './Resultado/Resultado';

import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      entrada: 0,
      resultado: 0,
      botonPulsado: 0,
      boton1: 37,
      boton2: 43
    }
  }

  Resultado = (event) => {
    let multiplicar = event.target.value * this.state.botonPulsado;
    this.setState({
      entrada: event.target.value,
      resultado: multiplicar
    })
  }

  Multiplicar = (numero) => {
    let multiplicar = this.state.entrada * numero;
    this.setState({
      resultado: multiplicar,
      botonPulsado: numero
    })
  }

  render() {
    return (
      <div className='App'>
        <Header titulo='Escribe un número' />
        <Multiplicar cambiando={this.Resultado} />
        <br></br>
        <button onClick={() => this.Multiplicar(this.state.boton1)}> 37 </button>
        <button onClick={() => this.Multiplicar(this.state.boton2)}> 43 </button>
        <Resultado valor={this.state.resultado} />
        <p>El botón pulsado es: {this.state.botonPulsado}</p>
      </div>
    )
  }

}

export default App;
