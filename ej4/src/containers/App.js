import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Home } from '../components/Home/Home';
import { ProductsContextProvider } from '../global/ProductsContext';
import { Login } from '../components/Login/Login';
import { Cart } from '../components/Cart/Cart';
import { auth, db } from '../config/Config';
import { CartContextProvider } from '../global/CartContext';
import { Cashout } from '../components/Cashout/Cashout';
import { Error } from '../components/Error/Error';
import { ReceiptsContextProvider } from '../global/ReceiptsContext';

export class App extends Component {

  state = {
    user: null
  }

  componentDidMount() {
    auth.onAuthStateChanged(user => {
      if (user) {
        db.collection('Users').doc(user.uid).get('Name').then(snapshot => {
          this.setState({
            user: snapshot.data().Name
          })
        })
      } else {
        this.setState({
          user: null
        })
      }
    })
  }

  render() {
    return (
      <ReceiptsContextProvider>
      <ProductsContextProvider>
      <CartContextProvider>
        <BrowserRouter>
          <Switch>
            <Route exact path='/' component={() => <Home user={this.state.user}></Home>}/>
            <Route path='/login' component={Login}/>
            <Route path='/cartproducts' component={()=><Cart user={this.state.user}></Cart>}/>
            <Route path='/cashout' component={()=><Cashout user={this.state.user}></Cashout>}></Route>
            <Route component={()=><Error user={this.state.user}></Error>}></Route>
          </Switch>
        </BrowserRouter>
      </CartContextProvider>
      </ProductsContextProvider>
      </ReceiptsContextProvider>
    )
  }
}

export default App