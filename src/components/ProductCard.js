import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

function ProductCard ({ name, picture, description, price, addToCart, currency, coefficient }) {
 return <div className='product-card'>
            <Card border='light'>
                <Card.Img variant='top' src={picture} width={150} />
                <Card.Body>
                    <Card.Title>{name}</Card.Title>
                    <Card.Title>{(price * coefficient).toFixed(2)} {currency}</Card.Title>
                    <Card.Text>{description}</Card.Text>
                    <Button onClick={addToCart} variant='warning'>Take</Button>
                </Card.Body>
            </Card>
        </div>;
}

export default ProductCard;