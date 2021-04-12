import { useContext, useState } from "react"
import Icon from "react-icons-kit";
import { iosTrashOutline } from "react-icons-kit/ionicons/iosTrashOutline";

import { Popup } from '../Popup/Popup';

import { ReceiptsContext } from '../../global/ReceiptsContext';

import './Receipts.css';
import '../Popup/Popup.css';

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
                    { receipts.length === 0 && <div>No receipts to display</div> }
                    { receipts.map(receipt => (
                        <div className='receipt-card' key={receipt.ReceiptId}>
                            <div className='receipt-img'>
                                <img src={receipt.ReceiptCountry} alt='Not found'></img>
                            </div>
                            <div className='receipt-name'>{receipt.ReceiptName}</div>
                            <div className='receipt-address'>{receipt.ReceiptAddress}</div>
                            <div className='receipt-price'>{receipt.ReceiptTotalPrice}.00 €</div>
                            <div className='quantity'>{receipt.ReceiptTotalItems} vacunas</div>
                            <button className='delete-btn' onClick={() => togglePopup(receipt)}>
                                <Icon icon={iosTrashOutline} size={24} />
                            </button>
                        </div>
                    ))}
                    { isOpen && 
                        <Popup
                            receipt={receipt}
                            handleClose={togglePopup}
                        />
                    }
                </div>
            </div>
        )
    } else {
        return (
            <div>
                <h1>Pedidos</h1>
                <div className='receipts-container'>
                    <p>No receipts to display</p>
                    <p>You must be logged in.</p>
                </div>
            </div>
        )
    }
}