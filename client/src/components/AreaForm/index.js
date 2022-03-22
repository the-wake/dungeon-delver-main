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

const AreaForm = ({ campaign }) => {
  const [areaName, setAreaName] = useState('');
  const [areaType, setAreaType] = useState('Dungeon');
  const [onShow, setOnShow] = useState(false);

  const [addArea, { error, data }] = useMutation(ADD_AREA);

  const handleAreaSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await addArea({
        variables: {
          name: areaName,
          type: areaType,
          campaign: campaign._id,
          is_active: true,
          user: Auth.getProfile(),
        },
      });
      console.log("Area Data:", data)

      setAreaName('');
      setAreaType('');

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

    if (name === 'areaType') {
      setAreaType(value);
    }

    console.log(value)
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
                  <Modal.Title>Add Area to {campaign.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                  <Form.Group className="mb-3" controlId="formBasicText">
                    <Form.Label>{areaType} Name</Form.Label>
                    <Form.Control
                      autoFocus
                      onChange={handleChange}
                      className="form-input"
                      type="text"
                      name="areaName" />

                    {error ? (
                      <div>
                        <p className="error-text">Please enter a name.</p>
                      </div>
                    ) : null}
                  </Form.Group>

                  <Form.Group name="areaType" onChange={handleChange} className="mb-3">
                    <Form.Label>Type</Form.Label>
                    <Form.Check
                      defaultChecked={true}
                      name="areaType"
                      label="Dungeon"
                      type="radio"
                      className="form-input"
                      value="Dungeon"
                      id="Dungeon"
                    />
                    <Form.Check
                      name="areaType"
                      label="Town"
                      type="radio" 
                      className="form-input"
                      value="Town"
                      id="Town"
                    />
                    <Form.Check
                      name="areaType"
                      label="Wilderness"
                      type="radio" 
                      className="form-input"
                      value="Wilderness"
                      id="Wilderness"
                    />

                    {error ? (
                      <div>
                        <p className="error-text">Please enter an area type.</p>
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
