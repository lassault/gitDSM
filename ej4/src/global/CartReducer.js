import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../components/Products/Products.css';

export const CartReducer = (state, action) => {

    const { shoppingCart, totalPrice, totalQty } = state;

    let product;
    let index;
    let updatedPrice;
    let updatedQty;

    switch (action.type) {
        case 'INC_PRODUCT':
            const check = shoppingCart.find(product => product.Id === action.id);
            if (check) {
            product = action.product;
            product.qty = ++product.qty;
            product.TotalProductPrice = product.qty * product.Price;
            updatedQty = totalQty + 1;
            updatedPrice = totalPrice + product.Price;
            index = shoppingCart.findIndex(cart => cart.Id === action.id);
            shoppingCart[index] = product;
            return {
                shoppingCart: [...shoppingCart], totalPrice: updatedPrice, totalQty: updatedQty
            }
            } else {
                toast.success('This product has been added to your cart.');
                product = action.product;
                product['qty'] = 1;
                product['TotalProductPrice'] = product.Price * product.qty;
                updatedQty = totalQty + 1;
                updatedPrice = totalPrice + product.Price;
                return {
                    shoppingCart: [product, ...shoppingCart], totalPrice: updatedPrice, totalQty: updatedQty
                }
            }

        case 'DEC_PRODUCT':
            product = action.product;
            if (product.qty > 1) {
                product.qty = product.qty - 1;
                product.TotalProductPrice = product.qty * product.Price;
                updatedPrice = totalPrice - product.Price;
                updatedQty = totalQty - 1;
                index = shoppingCart.findIndex(cart => cart.Id === action.id);
                shoppingCart[index] = product;

                return {
                    shoppingCart: [...shoppingCart], totalPrice: updatedPrice, totalQty: updatedQty
                }
            } else {
                toast.warn('This product has been removed from your cart.');
                return state;
            }

        case 'INC':
            product = action.cart;
            product.qty = ++product.qty;
            product.TotalProductPrice = product.qty * product.Price;
            updatedQty = totalQty + 1;
            updatedPrice = totalPrice + product.Price;
            index = shoppingCart.findIndex(cart => cart.ProductId === action.id);
            shoppingCart[index] = product;
            return {
                shoppingCart: [...shoppingCart], totalPrice: updatedPrice, totalQty: updatedQty
            }

        case 'DEC':
            product = action.cart;
            if (product.qty > 1) {
                product.qty = product.qty - 1;
                product.TotalProductPrice = product.qty * product.Price;
                updatedPrice = totalPrice - product.Price;
                updatedQty = totalQty - 1;
                index = shoppingCart.findIndex(cart => cart.Id === action.id);
                shoppingCart[index] = product;

                return {
                    shoppingCart: [...shoppingCart], totalPrice: updatedPrice, totalQty: updatedQty
                }
            } else {
                toast.warn('This product has been removed from your cart.');
                return state;
            }

        case 'DELETE':
            const filtered = shoppingCart.filter(product => product.Id !== action.id);
            product = action.cart;
            updatedQty = totalQty - product.qty;
            updatedPrice = totalPrice - product.qty * product.Price;
            toast.warn('This product has been removed from your cart.');
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