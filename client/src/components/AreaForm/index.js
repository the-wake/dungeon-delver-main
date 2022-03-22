import React, { useState } from 'react';
import { Form, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useMutation } from '@apollo/client';

//bootstrap components
import { Button, Container, Row, Modal } from 'react-bootstrap';

//actions
import { ADD_AREA } from '../../utils/mutations';
// import { QUERY_CAMPAIGNS, QUERY_ME } from '../../utils/queries';

import Auth from '../../utils/auth';
import { isRequiredArgument } from 'graphql';

const AreaForm = (props) => {
  const [areaName, setAreaName] = useState('');
  const [onShow, setOnShow] = useState(false);

  const [addArea, { error, data }] = useMutation(ADD_AREA);

  const handleAreaSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await addArea({
        variables: {
          name: areaName,
          campaign: props.campaign._id,
          is_active: true,
          user: Auth.getProfile(),
        },
      });
      // console.log("Area Data:", data)

      setAreaName('');

      window.location.reload();


    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'areaName') {
      setAreaName(value);
    }
  };


  return (
    // <div style={{ background: "black", color: "red" }}>
    <div>
      {Auth.loggedIn() ? (
        <>
          <Container>
            <Modal show={onShow} onHide={() => setOnShow(false)} backdrop="static" keyboard={false} role="dialog">
              <Form onSubmit={handleAreaSubmit}>
                <Modal.Header closeButton>
                  <Modal.Title>New Area Name</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                  <Form.Group className="mb-3" controlId="formBasicText">
                    <Form.Label></Form.Label>
                    <Form.Control
                      autoFocus
                      onChange={handleChange}
                      className="form-input"
                      type="text"
                      placeholder="Area Name"
                      name="areaName" />

                    {error ? (
                      <div>
                        <p className="error-text">Please enter an area name.</p>
                      </div>
                    ) : null}
                  </Form.Group>

                </Modal.Body>
              </Form>
              <Modal.Footer>
                <Button onClick={handleAreaSubmit} variant="outline-dark">
                  Submit
                </Button>
              </Modal.Footer>
            </Modal>
          </Container>
          <Container>
            <Button onClick={() => setOnShow(!onShow)} className="mt-4 mb-4 right-element" variant="outline-dark">
              Add Area
            </Button>
          </Container>
        </>
      ) : (

        <p>
          You need to be logged in. Please
          <Link to="/login"> login</Link> or <Link to="/signup"> sign up</Link>
        </p>

      )}
    </div>
  );
};

export default AreaForm;
