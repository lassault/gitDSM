import React, { useContext } from 'react';
import { CartContext } from '../../global/CartContext';
import { ProductsContext } from '../../global/ProductsContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Product } from '../Product/Product';


import './Products.css';

export const Products = ({ user }) => {

    const { products } = useContext(ProductsContext);
    const { dispatch } = useContext(CartContext);

    if (user) {
        return (
            <div>
                {products.length !== 0 && <h1>Products</h1>}
                <div className='products-container'>
                    {products.length === 0 && <div>No products to display</div>}
                    {products.map(product => (
                        <Product key={product.Id} product={product} 
                            minus={ () => dispatch({ type: 'DEC_PRODUCT', id: product.Id, product }) }
                            plus={ () => dispatch({type: 'INC_PRODUCT', id: product.Id, product }) }></Product>
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
                        <Product key={product.Id} product={product} minus={() => toast.error('Debes iniciar sesión para poder comprar.')} plus={() => toast.error('Debes iniciar sesión para poder comprar')}></Product>
                    ))}
                </div>
            </div>
        )
    }
}