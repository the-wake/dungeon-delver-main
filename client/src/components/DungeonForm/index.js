import React, { useState } from 'react';
import { Form, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useMutation } from '@apollo/client';

//bootstrap components
import { Button, Container, Row, Modal } from 'react-bootstrap';

//actions
import { ADD_DUNGEON } from '../../utils/mutations';
// import { QUERY_CAMPAIGNS, QUERY_ME } from '../../utils/queries';

import Auth from '../../utils/auth';
import { isRequiredArgument } from 'graphql';

const DungeonForm = (props) => {
  const [dungeonName, setDungeonName] = useState('');
  const [onShow, setOnShow] = useState(false);

  const [addDungeon, { error, data }] = useMutation(ADD_DUNGEON);

  const handleDungeonSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await addDungeon({
        variables: {
          name: dungeonName,
          campaign: props.campaign._id,
          is_active: true,
          user: Auth.getProfile(),
        },
      });
      // console.log("Dungeon Data:", data)

      setDungeonName('');

      window.location.reload();


    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'dungeonName') {
      setDungeonName(value);
    }
  };


  return (
    // <div style={{ background: "black", color: "red" }}>
    <div>
      {Auth.loggedIn() ? (
        <>
          <Container>
            <Modal show={onShow} onHide={() => setOnShow(false)} backdrop="static" keyboard={false} role="dialog">
              <Form onSubmit={handleDungeonSubmit}>
                <Modal.Header closeButton>
                  <Modal.Title>New Dungeon Name</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                  <Form.Group className="mb-3" controlId="formBasicText">
                    <Form.Label></Form.Label>
                    <Form.Control
                      autoFocus
                      onChange={handleChange}
                      className="form-input"
                      type="text"
                      placeholder="Dungeon Name"
                      name="dungeonName" />

                    {error ? (
                      <div>
                        <p className="error-text">Please enter a dungeon name.</p>
                      </div>
                    ) : null}
                  </Form.Group>

                </Modal.Body>
              </Form>
              <Modal.Footer>
                <Button onClick={handleDungeonSubmit} variant="outline-dark">
                  Submit
                </Button>
              </Modal.Footer>
            </Modal>
          </Container>
          <Container>
            <Button onClick={() => setOnShow(!onShow)} className="mt-4 mb-4 right-element" variant="outline-dark">
              Add Dungeon
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

export default DungeonForm;
