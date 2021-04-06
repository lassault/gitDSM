import React from 'react';
import { Navbar } from '../Navbar/Navbar';
import { Products } from '../Products/Products';

export const Home = ({ user }) => {
    return (
        <div className='wrapper'>
            <Navbar user={user}/>
            <Products />
        </div>
    )
}