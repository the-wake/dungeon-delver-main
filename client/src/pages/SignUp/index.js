import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import { Form, Button, Container } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../../utils/mutations';
import AuthService from '../../utils/auth';
import "./signup.css";



const SignUp = (props) => {

    const [signUpState, setSignUpState] = useState({
        username: '',
        email: '',
        password: ''
    });
    const [addUser, { error, data }] = useMutation(ADD_USER);

    const navigate = useNavigate();



    //test validation
    // const [valid, setValid] = useState(false);
    // const [submitted, setSubmitted] = useState(false);


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

        try {
            const { data } = await addUser({
                variables: { ...signUpState },
            });
            // console.log(data)
            AuthService.login(data.addUser.token);
         

        } catch (error) {
            console.error(error);
        }

        //will redirect after sign up/log in
        window.location = "/campaigns"
        
    
    };

    //to redirect user to the campaign page
    // let navigate = useNavigate();
    // useEffect(() => {
    //     if (signUpState) {
    //         return navigate("/campaigns");
    //     }
    // }, [navigate, signUpState]);


    return (
        <Container>
            <div className='signUp'>

                <Form onSubmit={handleFormSubmit}>
                    <h2 className='text-center'>Sign up</h2>
                    <Form.Group size="lg" className="mb-3" controlId="formBasicUsername">
                        <div>
                            {/* test validation */}
                            {/* {submitted && valid ? <div className="success-message">Success! Thank you for registering</div> : null} */}
                        </div>
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            autoFocus
                            onChange={handleChange}
                            value={signUpState.name}
                            // id="username"
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
                            value={signUpState.password}
                            // id="password"
                            className="form-input"
                            type="password"
                            placeholder="*******"
                            name="password" />
                        {error ? (
                            <div>
                                <p className='error-text'>Please enter a valid email and password</p>
                            </div>
                        ) : null}
                    </Form.Group>

                    <Button variant="primary" block-size="lg" type="submit">
                        Submit
                    </Button>
                    <Container className='mt-3'>
                        <Link to="/login">Log in instead</Link>
                    </Container>
                </Form>
            </div>
        </Container>
    );
}

export default SignUp;