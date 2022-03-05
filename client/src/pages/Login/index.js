import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../../utils/mutations';
import AuthService from '../../utils/auth';

import "./login.css";



// client\src\utils\auth.js


const Login = (props) => {
    const [loginState, setLoginState] = useState({
        email: '',
        password: ''
    });

    const [login, { error, data }] = useMutation(LOGIN_USER);





    const handleChange = (event) => {
        const { name, value } = event.target;

        setLoginState({
            ...loginState,
            [name]: value,
        });
    };

    //submit form
    const handleFormSubmit = async (event) => {
        event.preventDefault();
        console.log(loginState);

        try {
            const { data } = await login({
                variables: { ...loginState },
            });
            AuthService.login(data.login.token);
        } catch (error) {
            console.error(error);
        }
        setLoginState({
            email: '',
            password: '',
        });
        window.location = "/landingpage"
    };





    return (

        <Container>
            <Row>
                <Col>
                <img className='wizard' src={`${process.env.PUBLIC_URL}/assets/images/wizard-4417430_1280.png`} alt="Great wizard" />
                </Col>

                <Col className='signUp'>


                    <Form onSubmit={handleFormSubmit}>
                        <h2 className='text-center'>Login</h2>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email</Form.Label>

                            <Form.Control
                                autoFocus
                                onChange={handleChange}
                                value={loginState.email}
                                // id="email"
                                className="form-input"
                                type="email"
                                placeholder="Email"
                                name="email" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>

                            <Form.Control
                                onChange={handleChange}
                                value={loginState.password}
                                // id="password"
                                className="form-input"
                                type="password"
                                placeholder="*******"
                                name="password" />
                            {error ? (
                                <div>
                                    <p className='error-text'>Please check your email or password</p>
                                </div>
                            ) : null}
                        </Form.Group>

                        <Button variant="primary" block-size="lg" type="submit">
                            Submit
                        </Button>
                        <Container className='mt-3'>
                            <Link to="/signup">Sign up instead</Link>
                        </Container>
                    </Form>
                </Col>
            </Row>
        </Container>
    );

};

export default Login;