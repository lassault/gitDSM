import Icon from 'react-icons-kit';
import { iosTrashOutline } from 'react-icons-kit/ionicons/iosTrashOutline';

import './Receipt.css';

export const Receipt = ({ receipt, remove }) => {

    return (
        <div className='receipt'>
            <div className='receipt-img'>
                <img src={receipt.Country} alt='Not found' />
            </div>
            <div className='receipt-name'>{receipt.Name}</div>
            <div className='receipt-address'>{receipt.Address}</div>
            <div className='receipt-price'>{receipt.TotalPrice}.00 €</div>
            <div className='receipt-quantity'>{receipt.TotalItems} vacunas</div>
            <button className='receipt-remove' onClick={remove}>
                <Icon icon={iosTrashOutline} size={24} />
            </button>
        </div>
    )
}