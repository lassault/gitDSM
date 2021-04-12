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
                        Id: change.doc.id,
                        Name: change.doc.data().ProductName,
                        Description: change.doc.data().ProductDescription,
                        Price: change.doc.data().ProductPrice,
                        Image: change.doc.data().ProductImage,
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