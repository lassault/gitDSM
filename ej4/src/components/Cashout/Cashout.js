import React, { useContext, useEffect, useState } from 'react';
import { auth, db } from '../../config/Config';
import { CartContext } from '../../global/CartContext';
import { Navbar } from '../Navbar/Navbar';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

import './Cashout.css';

export const Cashout = (props) => {

    const history = useHistory();

    const { shoppingCart, totalPrice, totalQty, dispatch } = useContext(CartContext);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [country, setCountry] = useState('');
    const [mobilePhone, setMobilePhone] = useState('');
    const [address, setAddress] = useState('');
    const [error] = useState('');

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
                    toast.success('Tu pedido ha sido realizado. Gracias por su compra. En 5 segundos será redirigido a la pagina principal.');
                    setTimeout(() => {
                        history.push('/');
                    }, 5000)
                }).catch(
                    error => toast.error(error.message)
                    )
            }
        })
    }

    return(
        <div>
            <Navbar user={props.user}></Navbar>
            <div className='container'>
                <br/>
                <h2>Detalles Pedido</h2>
                <br/>
                <form autoComplete='off' className='form-group' onSubmit={cashoutSubmit}>
                    <label htmlFor='name'>Nombre</label>
                    <input type='text' className='form-control' required
                        value={name} disabled />
                    <br/>
                    <label htmlFor='email'>Email</label>
                    <input type='text' className='form-control' required
                        value={email} disabled />
                    <br/>
                    <label htmlFor='phone'>Telefono Movil</label>
                    <input type='number' className='form-control' required
                        onChange={(e) => setMobilePhone(e.target.value)} value={mobilePhone} placeholder='+34123456789'/>
                    <br/>
                    <label htmlFor='address'>Direccion de envio</label>
                    <input type='text' className='form-control' required
                        onChange={(e) => setAddress(e.target.value)} value={address} />
                    <br/>
                    <label htmlFor='price'>Precio</label>
                    <input type='number' className='form-control' required
                        value={totalPrice} disabled />
                    <br/>
                    <label htmlFor='products'>Nº de productos</label>
                    <input type='number' className='form-control' required
                        value={totalQty} disabled />
                    <br/>
                    <button type='submit' className='btn btn-success btn-md mybtn'>ENVIAR</button>
                </form>
                { error && 
                <span className='error-msg'>{error}</span>
                }
            </div>
        </div>
    )
}