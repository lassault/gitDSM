import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React, { createContext } from 'react';
import { db } from '../config/Config';

import '../components/Receipts/Receipts.css';

export const ReceiptsContext = createContext();

export class ReceiptsContextProvider extends React.Component {

    state = {
        receipts: []
    }

    componentDidMount() {
        const prevReceipts = this.state.receipts;
        db.collection('Receipts').onSnapshot(snapshot => {
            let changes = snapshot.docChanges();
            changes.forEach(change => {
                if (change.type === 'added') {
                    prevReceipts.push({
                        Id: change.doc.id,
                        Name: change.doc.data().Name,
                        Country: change.doc.data().Country,
                        Email: change.doc.data().Email,
                        Address: change.doc.data().Address,
                        MobilePhone: change.doc.data().MobilePhone,
                        TotalItems: change.doc.data().TotalItems,
                        TotalPrice: change.doc.data().TotalPrice,
                        UserId: change.doc.data().UserId
                    })
                } else if (change.type === 'removed') {
                    prevReceipts.splice(change.oldIndex, 1);
                    toast.warn('Este pedido ha sido eliminado.');
                }
                this.setState({
                    receipts: prevReceipts
                })
            })
        })
    }

    render() {
        return (
            <ReceiptsContext.Provider value={{receipts:[...this.state.receipts]}}>
                {this.props.children}
            </ReceiptsContext.Provider>
        )
    }
}