import React, { useState } from 'react';
import { Form, Button, Container, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import "./style.css";



// import { useMutation } from '@apollo/client';
// import { ADD_USER } from '../utils/mutations';

// import Auth from '../utils/auth';

const SignUp = () => {
    const [signUpState, setSignUpState] = useState({
        username: "",
        email: '',
        password: ''
    });

    //test validation
    const [valid, setValid] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    // const [addUser, {error, data }] = useMutation(ADD_USER);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setSignUpState({
            ...signUpState,
            [name]: value,
        });
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        // console.log(signUpState);

        // try {
        //     const { data } = addUser({
        //         variables: { ...signUpState },
        //     });

        //     Auth.login(data.addUser.token);
        // } catch (error) {
        //     console.error(error);
        // }

        if (signUpState.username && signUpState.email && signUpState.password) {
            setValid(true);
        }
        setSubmitted(true);
    };

    return (

        <Container>
            <div className='signUp'>
            
                <Form onSubmit={handleFormSubmit}>
                    <Form.Group size="lg" className="mb-3" controlId="formBasicUsername">
                <div>
                    {/* test validation */}
            {submitted && valid ? <div className="success-message">Success! Thank you for registering</div> : null}
            </div>
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            autoFocus
                            onChange={handleChange}
                            value={signUpState.name}
                            id="username"
                            className="form-input"
                            type="text"
                            placeholder="Username"
                            name="username"
                        />
                        <Form.Text className="text-muted">
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email</Form.Label>
                      
                        <Form.Control
                            onChange={handleChange}
                            value={signUpState.email}
                            id="email"
                            className="form-input"
                            type="email"
                            placeholder="Email"
                            name="email" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                      
                        <Form.Control
                            onChange={handleChange}
                            value={signUpState.password}
                            id="password"
                            className="form-input"
                            type="password"
                            placeholder="*******"
                            name="password" />
                    </Form.Group>

                    <Button variant="primary" block-size="lg" type="submit">
                        Submit
                    </Button>
                </Form>
            </div>
        </Container>
    );
}

export default SignUp;