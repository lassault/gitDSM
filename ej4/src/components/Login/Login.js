import React, { useState } from 'react';
import { auth } from '../../config/Config';
import { toast } from 'react-toastify';

toast.configure();

export const Login = (props) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const login = (e) => {
        e.preventDefault();
        auth.signInWithEmailAndPassword(email, password).then(() => {
            setEmail('');
            setPassword('');
            props.history.push('/');
        }).catch(error => toast.error(error.message))
    }

    return (
        <div className='container'>
            <br />
            <h2>Login</h2>
            <br />
            <form autoComplete='off' className='form-group' onSubmit={login}>
                <label htmlFor="email">Email</label>
                <input type='email' className='form-control' required 
                    onChange={(e) => setEmail(e.target.value)} value={email}></input>
                <br/>
                <label htmlFor='password'>Password</label>
                <input type='password' className='form-control' required 
                    onChange={(e) => setPassword(e.target.value)} value={password}></input>
                <br/>
                <button type='submit' className='btn btn-success btn-md mybtn'>LOGIN</button>
            </form>
        </div>
    )
}