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
    window.location = "/campaigns"
  };





  return (

    <Container>
      <Row className='background'>
        <Col>
          <img className='wizard' src={`${process.env.PUBLIC_URL}/assets/images/wizard-4417430_1280.png`} alt="Great wizard" />
        </Col>

        <Col className='signUp'>


          <Form className="mt-5" onSubmit={handleFormSubmit}>
            <h1 className='text-center'>Login</h1>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>

              <Form.Control
                autoFocus
                onChange={handleChange}
                // id="email"
                className="form-input"
                type="email"
                placeholder="Email"
                name="email"
                style={{ background: "beige" }} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>

              <Form.Control
                onChange={handleChange}
                // id="password"
                className="form-input"
                type="password"
                placeholder="*******"
                name="password"
                style={{ background: "beige" }} />
              {error ? (
                <div>
                  <p className='error-text'>Please check your email or password</p>
                </div>
              ) : null}
            </Form.Group>

            {/* <Button style={{ background: "chartreuse" }} variant="outline-dark" block-size="lg" type="submit"> */}
            <Button variant="outline-dark" block-size="lg" type="submit">
              Submit
            </Button>
            <Row className="mt-3">
              <Link className='instead' to="/signup">Sign up instead</Link>
            </Row>
          </Form>
        </Col>
      </Row>
    </Container>
  );

};

export default Login;