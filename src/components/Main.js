import React, { Fragment } from 'react';
import Header from './Header';
import Catalog from './Catalog';
import Footer from './Footer';

function Main({ products, selectedProducts, addToCart, userToken, currency, setCurrency, coefficient }) {

    return <Fragment>
        <Header 
            userToken={userToken} 
            selectedProducts={selectedProducts} 
            currency={currency}
            setCurrency={setCurrency}>
        </Header>
        <Catalog 
            products={products} 
            addToCart={addToCart} 
            currency={currency}
            coefficient={coefficient}
        >
        </Catalog>
        <Footer></Footer>
    </Fragment>;
}

export default Main;