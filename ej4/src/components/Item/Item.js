import Icon from "react-icons-kit"
import { iosTrashOutline } from "react-icons-kit/ionicons/iosTrashOutline"
import { ic_add } from "react-icons-kit/md/ic_add"
import { ic_remove } from "react-icons-kit/md/ic_remove"

import './Item.css';

export const Item = ({ item, minus, plus, remove }) => {

    return (
        <div className='item-card'>
            <div className='item-img'>
                <img src={item.Image} alt='Not found' />
            </div>
            <div className='item-name'>{item.Name}</div>
            <div className='item-price-original'>{item.Price}.00 €</div>
            <div className='plus' onClick={plus}>
                <Icon icon={ic_add} size={24} />
            </div>
            <div className='item-quantity'>{item.qty}</div>
            <div className='minus' onClick={minus}>
                <Icon icon={ic_remove} size={24} />
            </div>
            <div className='item-price'>{item.TotalProductPrice}.00 €</div>

            <button className='item-remove' onClick={remove}>
                <Icon icon={iosTrashOutline} size={24} />
            </button>
        </div>
    )
}