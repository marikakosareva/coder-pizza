import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { postUser } from './../services/services';

function LogIn ({ setUserToken }) {

    const [message, setMessage] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);

    function handleSubmit (event) {
        event.preventDefault();
        postUser({
            email: event.target.elements.formBasicEmail.value,
            password: event.target.elements.formBasicPassword.value,
        }).then(data => {
            if (data.result === 'ERROR') {
                setMessage(data.message);
            } else if (data.result === 'OK' || data.result === 'CREATED'){
                setUserToken(data.token);
                setMessage(data.message);
                setLoggedIn(true);
            }
        })
    }

    return <div className='login-container'>
            <Form onSubmit={(e) => handleSubmit(e)}>
                <Form.Group controlId='formBasicEmail'>
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type='email' placeholder='Enter email' />
                </Form.Group>

                <Form.Group controlId='formBasicPassword'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type='password' placeholder='Password' />
                </Form.Group>

                <Button variant='warning' type='submit'>
                    Submit
                </Button>
            </Form>
            <div className='message-container'><p>{message}</p></div>                
            <div className='message-container'>
                {
                    loggedIn ? <Link to='/'><u>Click here to proceed purchase.</u></Link> : null
                }
            </div>           
        </div>;
}

export default LogIn;