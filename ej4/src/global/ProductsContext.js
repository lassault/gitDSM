import React, { createContext } from 'react';
import { db } from '../config/Config';

export const ProductsContext = createContext();

export class ProductsContextProvider extends React.Component {

    state = {
        products: []
    }

    componentDidMount() {
        const prevProducts = this.state.products;
        db.collection('Products').onSnapshot(snapshot => {
            let changes = snapshot.docChanges();
            changes.forEach(change => {
                if (change.type === 'added') {
                    prevProducts.push({
                        ProductId: change.doc.id,
                        ProductName: change.doc.data().ProductName,
                        ProductDescription: change.doc.data().ProductDescription,
                        ProductPrice: change.doc.data().ProductPrice,
                        ProductImage: change.doc.data().ProductImage,
                    })
                }
                this.setState({
                    products: prevProducts
                })
            })
        })
    }

    render() {
        return (
            <ProductsContext.Provider value={{products:[...this.state.products]}}>
                {this.props.children}
            </ProductsContext.Provider>
        )
    }
}