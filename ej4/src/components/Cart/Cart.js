import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '../Navbar/Navbar';
import { Item } from '../Item/Item';
import { CartContext } from '../../global/CartContext';

import './Cart.css';

export const Cart = ({ user }) => {

    const { shoppingCart, dispatch, totalPrice, totalQty } = useContext(CartContext);
    
    return (
        <div>
            <Navbar user={user}></Navbar>
            <div>
                {shoppingCart.length !== 0 && <h1>Carrito</h1>}
                <div className='cart-container'>
                    {shoppingCart.length === 0 && 
                        <div>
                            <span>No hay ningún producto en el carrito.</span>
                            <br />
                            <span>Vuelve a la <Link to='/'>página inicial.</Link></span>
                        </div>
                    }
                    {shoppingCart.map(cart => (
                        <Item key={cart.Id} item={cart}
                            minus={() => dispatch({ type: 'DEC', id: cart.Id, cart})}
                            plus={() => dispatch({ type: 'INC', id: cart.Id, cart})}
                            remove={() => dispatch({ type: 'DELETE', id: cart.Id, cart })}></Item>
                    ))}
                    {shoppingCart.length > 0 &&
                        <div className='cart-summary'>
                            <div className='cart-summary-heading'>
                                Resumen
                            </div>
                            <div className='cart-summary-price'>
                                <span>Precio total</span>
                                <span>{totalPrice}.00 €</span>
                            </div>
                            <div className='cart-summary-price'>
                                <span>Unidades totales</span>
                                <span>{totalQty}</span>
                            </div>
                            <Link to='cashout' className='cashout-link'>
                                <button className='btn btn-success btn-md' style={{ marginTop: 5 + 'px' }}>Pago en metalico</button>
                            </Link>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}