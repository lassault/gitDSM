import React from 'react';
import Icon from 'react-icons-kit';
import { iosTrashOutline } from 'react-icons-kit/ionicons/iosTrashOutline';
import { db } from "../../config/Config";

export const Popup = (props) => {

    const deleteReceipt = (e) => {
        e.preventDefault();
        db.collection('Receipts').doc(props.receipt.ReceiptId).delete().then(() => {
            console.log('Success');
        }).catch(error => console.log(error));
        props.handleClose(null);
    }

    return (
        <div className='popup-box'>
            <div className='box'>
                <span className='close-icon' onClick={props.handleClose}>x</span>
                <div>
                    <h1>Are you sure you want to delete this order?</h1>
                    <div className='receipt'>
                        <div className='receipt-img'>
                            <img src={props.receipt.Country} alt='Not found'></img>
                        </div>
                        <div className='receipt-name'>{props.receipt.Name}</div>
                        <div className='receipt-address'>{props.receipt.Address}</div>
                        <div className='quantity'>{props.receipt.TotalItems} items</div>
                        <div className='receipt-price'>{props.receipt.TotalPrice}.00 €</div>
                        <button className='receipt-remove' onClick={deleteReceipt}>
                            <Icon icon={iosTrashOutline} size={24} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}