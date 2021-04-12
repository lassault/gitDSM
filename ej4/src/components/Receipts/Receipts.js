import { useContext, useState } from 'react';

import { Popup } from '../Popup/Popup';
import { Receipt } from '../Receipt/Receipt';

import { ReceiptsContext } from '../../global/ReceiptsContext';

import './Receipts.css';

export const Receipts = ({ user }) => {

    const { receipts } = useContext(ReceiptsContext);

    const [isOpen, setIsOpen] = useState(false);
    const [receipt, setReceipt] = useState(null);

    const togglePopup = (receipt) => {
        setReceipt(receipt);
        setIsOpen(!isOpen);
    }

    if (user) {
        return (
            <div>
                <h1>Pedidos</h1>
                <div className='receipts-container'>
                    {receipts.length === 0 && <div>No receipts to display</div>}
                    {receipts.map(receipt => (
                        <Receipt key={receipt.Id} receipt={receipt} remove={() => togglePopup(receipt)}></Receipt>
                    ))}
                    {isOpen && <Popup receipt={receipt} handleClose={togglePopup}></Popup>}
                </div>
            </div>
        )
    } else {
        return (
            <div>
                <h1>Pedidos</h1>
                <div className='receipts-container'>
                    <p>Debes iniciar sesión para poder ver los pedidos.</p>
                </div>
            </div>
        )
    }
}