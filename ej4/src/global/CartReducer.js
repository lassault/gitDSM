import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../components/Products/Products.css';

toast.configure();

export const CartReducer = (state, action) => {

    const { shoppingCart, totalPrice, totalQty } = state;

    let product;
    let index;
    let updatedPrice;
    let updatedQty;

    switch (action.type) {
        case 'INC':
            product = action.cart;
            product.qty = ++product.qty;
            product.TotalProductPrice = product.qty * product.ProductPrice;
            updatedQty = totalQty + 1;
            updatedPrice = totalPrice + product.ProductPrice;
            index = shoppingCart.findIndex(cart => cart.ProductId === action.id);
            shoppingCart[index] = product;
            return {
                shoppingCart: [...shoppingCart], totalPrice: updatedPrice, totalQty: updatedQty
            }

        case 'INC_PRODUCT':
            const check = shoppingCart.find(product => product.ProductId === action.id);
            if (check) {
            product = action.product;
            product.qty = ++product.qty;
            product.TotalProductPrice = product.qty * product.ProductPrice;
            updatedQty = totalQty + 1;
            updatedPrice = totalPrice + product.ProductPrice;
            index = shoppingCart.findIndex(cart => cart.ProductId === action.id);
            shoppingCart[index] = product;
            return {
                shoppingCart: [...shoppingCart], totalPrice: updatedPrice, totalQty: updatedQty
            }
            } else {
                toast.info('This product has been added to your cart.', {
                    position: 'top-right',
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: false,
                    progress: undefined,
                    className: 'green'
                });
                product = action.product;
                product['qty'] = 1;
                product['TotalProductPrice'] = product.ProductPrice * product.qty;
                updatedQty = totalQty + 1;
                updatedPrice = totalPrice + product.ProductPrice;
                return {
                    shoppingCart: [product, ...shoppingCart], totalPrice: updatedPrice, totalQty: updatedQty
                }
            }

        case 'DEC':
            product = action.cart;
            if (product.qty > 1) {
                product.qty = product.qty - 1;
                product.TotalProductPrice = product.qty * product.ProductPrice;
                updatedPrice = totalPrice - product.ProductPrice;
                updatedQty = totalQty - 1;
                index = shoppingCart.findIndex(cart => cart.ProductId === action.id);
                shoppingCart[index] = product;

                return {
                    shoppingCart: [...shoppingCart], totalPrice: updatedPrice, totalQty: updatedQty
                }
            } else {
                return state;
            }

        case 'DEC_PRODUCT':
            product = action.product;
            if (product.qty > 1) {
                product.qty = product.qty - 1;
                product.TotalProductPrice = product.qty * product.ProductPrice;
                updatedPrice = totalPrice - product.ProductPrice;
                updatedQty = totalQty - 1;
                index = shoppingCart.findIndex(cart => cart.ProductId === action.id);
                shoppingCart[index] = product;

                return {
                    shoppingCart: [...shoppingCart], totalPrice: updatedPrice, totalQty: updatedQty
                }
            } else {
                toast.info('This product has been removed from your cart.', {
                    position: 'top-right',
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: false,
                    progress: undefined,
                    className: 'red'
                });
                return state;
            }

        case 'DELETE':
            const filtered = shoppingCart.filter(product => product.ProductId !== action.id);
            product = action.cart;
            updatedQty = totalQty - product.qty;
            updatedPrice = totalPrice - product.qty * product.ProductPrice;
            toast.info('This product has been removed from your cart.', {
                position: 'top-right',
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
                className: 'red'
            });
            return {
                shoppingCart: [...filtered], totalPrice: updatedPrice, totalQty: updatedQty
            }

        case 'EMPTY':
            return {
                shoppingCart: [], totalPrice: 0, totalQty: 0
            }

        default:
            return state;
    }
}