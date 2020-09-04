import React, { Fragment, useState, useEffect } from 'react';
import { getOrders } from './../services/services';
import Header from './Header';
import Footer from './Footer';
import EmptyPage from './EmptyRage';


function Orders ({ userToken, selectedProducts, currency, setCurrency }) {

    const [orders, setOrders] = useState(null);
    
    useEffect(() => {
        getOrders(userToken)
            .then((res) => {
                setOrders(res);
            })
            .catch(err => {
                console.log(err);
            })
    },[userToken]);

    function getDate(timestamp) {
        const date = new Date(timestamp);
        return date.toDateString();
    }

    return <Fragment>
        <Header 
            userToken={userToken} 
            selectedProducts={selectedProducts}
            currency={currency}
            setCurrency={setCurrency}>
        </Header>
        { 
            (orders && orders.length) ? <div className='list-container'>
                <div className='orders-title'><h3>Your Orders</h3></div>
                <div className='orders-list'>
                    <div className='order-raw'>
                        <div>Time</div>
                        <div>Order</div>
                        <div>Price</div>
                    </div>
                    {
                        orders.map((item) => <div key={item.time} className='order-raw'>
                                <div>{getDate(item.time)}</div>
                                <div>{JSON.parse(item.order).map((i, id) => <div key={i.name + item.time + id}>{i.name}</div>)}</div>
                                <div>{item.price}</div>
                            </div>
                        )
                    }
                </div>
            </div> : <div className='empty-container'><EmptyPage text='No Orders'/></div>
        }
        <Footer></Footer>
    </Fragment>;
}

export default Orders;