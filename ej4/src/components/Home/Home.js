import React from 'react';
import { Navbar } from '../Navbar/Navbar';
import { Products } from '../Products/Products';
import { Receipts } from '../Receipts/Receipts';

export const Home = ({ user }) => {

    return (
        <div className='wrapper'>
            <Navbar user={user} />
            <Products user={user} />
            <Receipts user={user} />
        </div>
    )
}