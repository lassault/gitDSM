import React, { useContext } from 'react';
import { CartContext } from '../../global/CartContext';
import { ProductsContext } from '../../global/ProductsContext';

import './Products.css';

export const Products = () => {

    const { products } = useContext(ProductsContext)
    const { dispatch } = useContext(CartContext);

    return (
        <div>
            {products.length !== 0 && <h1>Products</h1>}
            <div className='products-container'>
                {products.length === 0 && <div>No products to display</div>}
                {products.map(product => (
                    <div className='product-card' key={product.ProductId}>
                        <div className='product-img'>
                            <img src={product.ProductImage} alt='Not found'></img>
                        </div>
                        <div className='product-name'>
                            {product.ProductName}
                        </div>
                        <div className='product-price'>
                            {product.ProductPrice}.00 €
                        </div>
                        <button className='addcart-btn' onClick={()=> dispatch({ type: 'ADD_TO_CART', id: product.ProductId, product })}>ADD TO CART</button>
                    </div>
                ))}
            </div>
        </div>
    )
}