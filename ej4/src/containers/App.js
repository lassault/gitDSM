import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Home } from '../components/Home/Home';
import { AddProducts } from '../components/AddProducts/AddProducts'
import { ProductsContextProvider } from '../global/ProductsContext';
import { Signup } from '../components/Signup/Signup';
import { Login } from '../components/Login/Login';
import { Cart } from '../components/Cart/Cart';
import { auth, db } from '../config/Config';
import { CartContextProvider } from '../global/CartContext';
import { Cashout } from '../components/Cashout/Cashout';
import { ReceiptsContextProvider } from '../global/ReceiptsContext';

export class App extends Component {

  state = {
    user: null
  }

  componentDidMount() {
    auth.onAuthStateChanged(user => {
      if (user) {
        db.collection('SignedUsers').doc(user.uid).get().then(snapshot => {
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
            <Route exact path='/' component={() => <Home user={this.state.user} country={this.state.country}></Home>}/>
            <Route path='/signup' component={Signup}/>
            <Route path='/login' component={Login}/>
            <Route path='/addproducts' component={AddProducts} />
            <Route path='/cartproducts' component={()=><Cart user={this.state.user}></Cart>}/>
            <Route path='/cashout' component={()=><Cashout user={this.state.user}></Cashout>}></Route>
          </Switch>
        </BrowserRouter>
      </CartContextProvider>
      </ProductsContextProvider>
      </ReceiptsContextProvider>
    )
  }
}

export default App