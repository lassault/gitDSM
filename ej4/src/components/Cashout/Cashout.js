import React, { useContext, useEffect, useState } from 'react';
import { auth, db } from '../../config/Config';
import { CartContext } from '../../global/CartContext';
import { Navbar } from '../Navbar/Navbar';
import { useHistory } from 'react-router-dom';

import './Cashout.css';
import { toast } from 'react-toastify';

toast.configure();

export const Cashout = (props) => {

    const history = useHistory();

    const { shoppingCart, totalPrice, totalQty, dispatch } = useContext(CartContext);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [country, setCountry] = useState('');
    const [mobilePhone, setMobilePhone] = useState('');
    const [address, setAddress] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        auth.onAuthStateChanged(user => {
            if (user) {
                db.collection('SignedUsers').doc(user.uid).onSnapshot(snapshot => {
                    setName(snapshot.data().Name);
                    setEmail(snapshot.data().Email);
                    setCountry(snapshot.data().Country);
                })
            } else {
                history.push('/login')
            }
        })
    })

    const cashoutSubmit = (e) => {
        e.preventDefault();
        auth.onAuthStateChanged(user => {
            if (user) {
                console.log(shoppingCart);
                console.log(user)
                const date = new Date();
                const time = date.getTime();
                db.collection('Receipts').doc(user.uid + '_' + time).set({
                    UserId: user.uid,
                    Name: name,
                    Country: country,
                    Email: email,
                    MobilePhone: mobilePhone,
                    Address: address,
                    TotalPrice: totalPrice,
                    TotalItems: totalQty
                }).then(() => {
                    setMobilePhone('');
                    setAddress('');
                    dispatch({ type: 'EMPTY' });
                    toast.info('Your order has been placed successfully. Thanks for visiting us. You will be redirected to home page after 5 seconds.', {
                        position: 'top-right',
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: false,
                        progress: undefined,
                        className: 'green'
                    });
                    setTimeout(() => {
                        history.push('/');
                    }, 5000)
                }).catch(error => setError(error.message))
            }
        })
    }

    return(
        <div>
            <Navbar user={props.user}></Navbar>
            <div className='container'>
                <br/>
                <h2>Cashout Details</h2>
                <br/>
                <form autoComplete='off' className='form-group' onSubmit={cashoutSubmit}>
                    <label htmlFor='name'>Name</label>
                    <input type='text' className='form-control' required
                        value={name} disabled />
                    <br/>
                    <label htmlFor='email'>Email</label>
                    <input type='text' className='form-control' required
                        value={email} disabled />
                    <br/>
                    <label htmlFor='phone'>Mobile Phone</label>
                    <input type='number' className='form-control' required
                        onChange={(e) => setMobilePhone(e.target.value)} value={mobilePhone} placeholder='+34123456789'/>
                    <br/>
                    <label htmlFor='address'>Delivery Address</label>
                    <input type='text' className='form-control' required
                        onChange={(e) => setAddress(e.target.value)} value={address} />
                    <br/>
                    <label htmlFor='price'>Price to pay</label>
                    <input type='number' className='form-control' required
                        value={totalPrice} disabled />
                    <br/>
                    <label htmlFor='products'>Nº of products</label>
                    <input type='number' className='form-control' required
                        value={totalQty} disabled />
                    <br/>
                    <button type='submit' className='btn btn-success btn-md mybtn'>SUBMIT</button>
                </form>
                { error && 
                <span className='error-msg'>{error}</span>
                }
            </div>
        </div>
    )
}