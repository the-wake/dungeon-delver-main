import React, { useState } from 'react';
import { Form, Button, Container} from 'react-bootstrap';
// import { useMutation } from '@apollo/client';
// import { LOGIN_USER } from '../utils/mutations';


// import Auth from '../utils/auth';

const Login = (props) => {

    const [loginState, setLoginState] = useState({
        email: '',
        password: ''
    });

  



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
        // console.log(loginState);

        // try {
        //     const { data } = login({
        //         variables: { ...loginState },
        //     });

        //     Auth.login(data.login.token);
        // } catch (error) {
        //     console.error(error);
        // }

        setLoginState({
            email: '',
            password: '',
        });
    };

    
    
    
    
    return (
        
    <Container>
        <div className='signUp'>

            <Form onSubmit={handleFormSubmit}>
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
                </Form.Group>

                <Button variant="primary" block-size="lg" type="submit">
                    Submit
                </Button>
            </Form>

        </div>
    </Container>
);

};

export default Login;