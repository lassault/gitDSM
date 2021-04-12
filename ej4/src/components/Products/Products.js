import React, { useContext } from 'react';
import { CartContext } from '../../global/CartContext';
import { ProductsContext } from '../../global/ProductsContext';

import { ic_add } from 'react-icons-kit/md/ic_add';
import { ic_remove } from 'react-icons-kit/md/ic_remove';

import Flippy, { FrontSide, BackSide } from 'react-flippy'

import './Products.css';
import Icon from 'react-icons-kit';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { isMobile } from 'react-device-detect';

toast.configure();

export const Products = ({ user }) => {

    const { products } = useContext(ProductsContext);
    const { dispatch } = useContext(CartContext);

    const FlippyStyle = {
        width: '300px',
        height: 'auto',
        margin: '20px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        fontSize: '12px',
        fontWeight: '600',
        textAlign: 'center',
        position: 'relative',
        borderRadius: '25px'
    }

    const FrontSideStyle = {
        width: '100%',
        height: '200px',
        borderRadius: '25px',
        boxShadow: '5px 5px 4px 4px #e4e4e4'
    }

    const FrontSideStyleImg = {
        width: '100%',
        height: '100%',
        borderRadius: '25px'
    }

    const BackSideStyle = {
        width: '100%',
        height: '200px',
        borderRadius: '25px',
        boxShadow: '5px 5px 4px 4px #e4e4e4'
    }

    const displayToast = () => {
        toast.info('You must be logged to add items to the cart.', {
            position: 'top-right',
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            progress: undefined
        });
    }

    if (user) {
        return (
            <div>
                {products.length !== 0 && <h1>Products</h1>}
                <div className='products-container'>
                    {products.length === 0 && <div>No products to display</ div>}
                    {products.map(product => (
                        <Flippy flipOnHover={(isMobile) ? false : true} flipOnClick={(isMobile) ? true : true} flipDirection='horizontal' style={ FlippyStyle } key={product.ProductId}>
                            <FrontSide style={FrontSideStyle}>
                                <img style={FrontSideStyleImg} src= {product.ProductImage} alt='Not found'></    img>
                            </FrontSide>
                            <BackSide style={BackSideStyle}>
                                <div className='product-name'>
                                    {product.ProductName}
                                </div>
                                <div className='product-description'>
                                    {product.ProductDescription}
                                </div>
                                <div className='addcart-btn'>
                                    <Icon className='dec-product' onClick={ () => dispatch({ type: 'DEC_PRODUCT',    id: product.ProductId, product })}     icon={ic_remove} size={20} />
                                    <span>{product.ProductPrice}.00 €</ span>
                                    <Icon className='inc-product' onClick={ () => dispatch({ type: 'INC_PRODUCT',    id: product.ProductId, product})} icon=    {ic_add} size={20} />
                                </div>
                            </BackSide>
                        </Flippy>
                    ))}
                </div>
            </div>
        ) 
    } else {
        return (
            <div>
                {products.length !== 0 && <h1>Products</h1>}
                <div className='products-container'>
                    {products.length === 0 && <div>No products to display</ div>}
                    {products.map(product => (
                        <Flippy flipOnHover={(isMobile) ? false : true} flipOnClick={(isMobile) ? true : true} flipDirection='horizontal' style={FlippyStyle} key={product.ProductId}>
                            <FrontSide style={FrontSideStyle}>
                                <img style={FrontSideStyleImg} src={product.ProductImage} alt='Not found'></    img>
                            </FrontSide>
                            <BackSide style={BackSideStyle}>
                                <div className='product-name'>
                                    {product.ProductName}
                                </div>
                                <div className='product-description'>
                                    {product.ProductDescription}
                                </div>
                                <div className='addcart-btn'>
                                    <Icon className='dec-product' onClick={() => displayToast()} icon={ic_remove} size={20} />
                                    <span>{product.ProductPrice}.00 €</ span>
                                    <Icon className='inc-product' onClick={() => displayToast()} icon={ic_add} size={20} />
                                </div>
                            </BackSide>
                        </Flippy>
                    ))}
                </div>
            </div>
        )
    }
}