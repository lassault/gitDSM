import React, { useContext } from 'react';
import { CartContext } from '../../global/CartContext';
import { ProductsContext } from '../../global/ProductsContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Product } from '../Product/Product';

import './Products.css';


toast.configure();

export const Products = ({ user }) => {

    const { products } = useContext(ProductsContext);
    const { dispatch } = useContext(CartContext);

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
                    {products.length === 0 && <div>No products to display</div>}
                    {products.map(product => (
                        <Product product={product} 
                            minus={ () => dispatch({ type: 'DEC_PRODUCT', id: product.ProductId, product }) }
                            plus={ () => dispatch({type: 'INC_PRODUCT', id: product.ProductId, product }) }></Product>
                    ))}
                </div>
            </div>
        )
    } else {
        return (
            <div>
                {products.length !== 0 && <h1>Productos</h1>}
                <div className='products-container'>
                    {products.map(product => (
                        <Product product={product} minus={() => displayToast()} plus={() => displayToast()}></Product>
                    ))}
                </div>
            </div>
        )
    }
}