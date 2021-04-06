import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from 'react-icons-kit';
import { ic_add } from 'react-icons-kit/md/ic_add';
import { ic_remove } from 'react-icons-kit/md/ic_remove';
import { iosTrashOutline } from 'react-icons-kit/ionicons/iosTrashOutline';

import { Navbar } from '../Navbar/Navbar';
import { CartContext } from '../../global/CartContext';

import './Cart.css';

export const Cart = ({ user }) => {

    const { shoppingCart, dispatch, totalPrice, totalQty } = useContext(CartContext);
    
    return(
        <div>
            <Navbar user={user}></Navbar>
            <div>
                { shoppingCart.length !== 0 &&
                    <h1>Cart</h1>
                }
                <div className='cart-container'>
                    { shoppingCart.length === 0 &&
                        <div>
                            <span>No items in your cart</span>
                            <br/>
                            <span><Link to='/'>Return to Home Page</Link></span>
                        </div>
                    }
                    { shoppingCart && shoppingCart.map(cart => (
                        <div className='cart-card' key={cart.ProductId}>

                            <div className='cart-img'>
                                <img src={cart.ProductImage} alt='Not found'></img>
                            </div>

                            <div className='cart-name'>{cart.ProductName}</div>
                            <div className='cart-price-original'>{cart.ProductPrice}.00 €</div>

                            <div className='inc' onClick={() => dispatch({ type: 'INC', id: cart.ProductId, cart })}>
                                <Icon icon={ic_add} size={24} />
                            </div>

                            <div className='quantity'>{cart.qty}</div>

                            <div className='dec' onClick={() => dispatch({ type: 'DEC', id: cart.ProductId, cart })}>
                                <Icon icon={ic_remove} size={24} />
                            </div>

                            <div className='cart-price'>
                                {cart.TotalProductPrice}.00 €
                            </div>

                            <button className='delete-btn' onClick={() => dispatch({ type: 'DELETE', id: cart.ProductId, cart })}>
                                <Icon icon={iosTrashOutline} size={24} />
                            </button>
                        </div>
                    ))}
                    { shoppingCart.length > 0 && 
                        <div className='cart-summary'>
                            <div className='cart-summary-heading'>
                                Cart-Summary
                            </div>
                            <div className='cart-summary-price'>
                                <span>Total Price</span>
                                <span>{totalPrice}.00 €</span>
                            </div>
                            <div className='cart-summary-price'>
                                <span>Total Qty</span>
                                <span>{totalQty}</span>
                            </div>
                            <Link to='cashout' className='cashout-link'>
                                <button className='btn btn-success btn-md' style={{ marginTop: 5 + 'px' }}>Cash on delivery</button>
                            </Link>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}