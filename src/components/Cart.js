import React, { Fragment, useState } from 'react';
import ProductRow from './ProductRow';
import Header from './Header';
import Footer from './Footer';
import EmptyPage from './EmptyRage';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { postOrder } from './../services/services';

function Cart ({ selectedProducts, setSelectedProducts, userToken, deleteFromCart, currency, setCurrency, coefficient }) {

    const [showUserInfoInput, setShowUserInfoInput] = useState(false);
    const [showMessage, setShowMessage] = useState(false);

    const deliveryPrice = 3;
    const totalPrice = ((selectedProducts.reduce((acc, item) => acc += item.price, 0) + deliveryPrice) * coefficient).toFixed(2);

    const order = () => {
        setShowUserInfoInput(true);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        postOrder({
            token: userToken,
            order: JSON.stringify(selectedProducts),
            price: `${totalPrice} ${currency}`,
            time: Date.now()
        })
        setSelectedProducts([]);
        setShowUserInfoInput(false);
        setShowMessage(true);

    };
 
    return  (
        <Fragment>
            <Header 
                userToken={userToken} 
                selectedProducts={selectedProducts}
                currency={currency}
                setCurrency={setCurrency}>
            </Header>
                { 
                    !showMessage && (selectedProducts.length ? <Fragment>
                    <div className='list-container'>
                        { 
                            selectedProducts.map((item, index) => <ProductRow key={index} coefficient={coefficient} currency={currency} deleteFromCart={deleteFromCart} { ...item }/>) 
                        }
                        <div className='product-row'><p> + delivery cost {(coefficient * deliveryPrice).toFixed(2)} {currency}</p></div>
                        {
                            <div className='price-container'>
                                <span>Total: {totalPrice} {currency}</span>
                            </div>
                        }                        
                        <div className="user-info-container">                           
                            {
                                !showUserInfoInput && <Button onClick={order} variant='warning'>Order</Button>
                            }
                            { 
                                showUserInfoInput ? <Form onSubmit={(e) => handleSubmit(e)}>
                                        <Form.Group controlId='name'>
                                            <Form.Label>You name</Form.Label>
                                            <Form.Control type='text' placeholder='Name' />
                                        </Form.Group>

                                        <Form.Group controlId='address'>
                                            <Form.Label>Address</Form.Label>
                                            <Form.Control as='textarea' rows='3' placeholder='Address' />
                                        </Form.Group>

                                        <Button variant='warning' type='submit'>
                                            Submit
                                        </Button>
                                    </Form> : null
                            }   
                        </div> 
                    </div>
                    </Fragment> : <div className='empty-container'><EmptyPage text='Empty Cart' /></div>)
                }
            
            {
                showMessage ?   <div className='empty-container'>
                                    <p>Thank you for the order!</p>
                                </div> : null
            }
            <Footer />
        </Fragment>);
}

export default Cart;