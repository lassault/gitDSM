import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React, { createContext } from 'react';
import { db } from '../config/Config';

import '../components/Receipts/Receipts.css';

toast.configure();

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
                        ReceiptId: change.doc.id,
                        ReceiptName: change.doc.data().Name,
                        ReceiptCountry: change.doc.data().Country,
                        ReceiptEmail: change.doc.data().Email,
                        ReceiptAddress: change.doc.data().Address,
                        ReceiptMobilePhone: change.doc.data().MobilePhone,
                        ReceiptTotalItems: change.doc.data().TotalItems,
                        ReceiptTotalPrice: change.doc.data().TotalPrice,
                        ReceiptUserId: change.doc.data().UserId
                    })
                } else if (change.type === 'removed') {
                    prevReceipts.splice(change.oldIndex, 1);
                    toast.info('This receipt has been removed.', {
                        position: 'top-right',
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: false,
                        progress: undefined,
                        className: 'red'
                    });
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