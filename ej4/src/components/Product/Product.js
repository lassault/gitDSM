import Icon from 'react-icons-kit';
import Flippy, { FrontSide, BackSide } from 'react-flippy';
import { isMobile } from 'react-device-detect';
import { ic_remove } from 'react-icons-kit/md/ic_remove';
import { ic_add } from 'react-icons-kit/md/ic_add';

import './Product.css';


export const Product = ({ product, minus, plus }) => {

    return (
        <Flippy
            flipOnHover={(isMobile) ? false : true}
            flipOnClick={(isMobile) ? true : true}
            flipDirection='horizontal'
            key={product.ProductId}
        >
            <FrontSide>
                <img src={product.Image} alt={product.Name} />
            </FrontSide>
            <BackSide>
                <div className='product-name'>
                    {product.Name}
                </div>
                <div className='product-description'>
                    {product.Description}
                </div>
                <div className='product-price'>
                    <Icon className='minus' icon={ic_remove} size={20} onClick={minus}/>
                    <span>{product.Price}.00 €</span>
                    <Icon className='plus' icon={ic_add} size={20} onClick={plus}/>
                </div>
            </BackSide>
        </Flippy>
    )

}