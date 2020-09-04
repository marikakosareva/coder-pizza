import React from 'react';
import Button from 'react-bootstrap/Button';

function ProductRow ({ id, name, picture, price, deleteFromCart, currency, coefficient }) {
 return <div className='product-row'>
            <div>
                <img alt='Product' width={100} height={100} src={picture}></img>
            </div>
            <div>{name}</div>
            <div>{(price * coefficient).toFixed(2)} {currency}</div>
            <Button onClick={() => deleteFromCart(id)} variant='warning'>×</Button>
        </div>;
}

export default ProductRow;