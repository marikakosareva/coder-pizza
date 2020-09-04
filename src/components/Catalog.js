import React, { useState } from 'react';
import { menu } from './../constants/menu';
import ProductCard from './ProductCard';

function Catalog({ products, addToCart, currency, coefficient }) {

    const [activeMenuItem, setActiveMenuItem] = useState('pizza');

    const onClick = (name) => {
        setActiveMenuItem(name);
    }

    return <div className='catalog'>
        <nav>
            {menu.map(item =>   <div key={item} className='menu-item'>
                                    <div onClick={() => onClick(item.toLocaleLowerCase())}>{item}</div>
                                </div>)}
        </nav>
        <main>
            <div className='products-container'>
                {
                    products ? products.filter(item => item.type === activeMenuItem).map(item => {
                    const props = { ...item, addToCart: () => addToCart(item), currency: currency, coefficient: coefficient };
                    return (<ProductCard key={ item.id } { ...props }/>)}) : null
                }
            </div>
        </main>
    </div>;
}

export default Catalog;