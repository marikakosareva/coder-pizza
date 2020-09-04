import React from 'react';
import logo from './../img/pizza.svg';
import { Link } from 'react-router-dom'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import ToggleButton from 'react-bootstrap/ToggleButton'

function Header({ userToken, selectedProducts, currency, setCurrency }) {

    return <div className='header-container'>
        <img alt='logo' src={logo} width={30} height={30}></img>
        <Link to='/'> // Coder Pizza</Link>
        <div className='user-info'>
            {
                userToken ? <Link to='orders'>Orders</Link> : <Link to='login'>Log In</Link>
            }
            <Link to='cart'>Cart</Link>
            <span>
                {
                    selectedProducts.length ? selectedProducts.length : null
                }
            </span>
            <ButtonGroup toggle>
                <ToggleButton 
                    checked={currency === 'EUR'} 
                    variant='warning' 
                    type='radio' 
                    name='radio'
                    value={'EUR'}
                    onChange={(e) => setCurrency(e.currentTarget.value)}>
                    EUR
                </ToggleButton>
                <ToggleButton 
                    checked={currency === 'USD'} 
                    variant='warning' 
                    type='radio' 
                    name='radio'
                    value={'USD'}
                    onChange={(e) => setCurrency(e.currentTarget.value)}>
                    USD
                </ToggleButton>
            </ButtonGroup>
        </div>
    </div>;
}

export default Header;