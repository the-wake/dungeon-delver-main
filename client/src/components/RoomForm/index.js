import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import { useMutation } from '@apollo/client';
import { useSessionContext } from '../../utils/SessionContext.js';

//bootstrap components
import { Button, Container, Row, Form, Modal } from 'react-bootstrap';

//actions
import { ADD_ROOM } from '../../utils/mutations';
// import { QUERY_CAMPAIGNS, QUERY_ME } from '../../utils/queries';

import Auth from '../../utils/auth';

const RoomForm = ({ area, campaign }) => {
  const { currentSession, setCampaign, setArea, setRoom } = useSessionContext();
  const { currentCampaign, currentArea, currentRoom } = currentSession;

  // console.log("area", area)

  const [roomText, setRoomText] = useState('');
  const [areaOption, setAreaOption] = useState(area._id);
  const [roomBlurb, setRoomBlurb] = useState('');
  const [onShow, setOnShow] = useState(false);

  const [addRoom, { error, data }] = useMutation(ADD_ROOM);

  const handleRoomSubmit = async (event) => {
    event.preventDefault();
    console.log("here", handleRoomSubmit)
    try {
      const { data } = await addRoom({
        variables: {
          name: roomText,
          area: areaOption,
          blurb: roomBlurb,
          is_active: true,
          user: Auth.getProfile(),
        },
      });
      console.log("right here", data)

      setRoomText('');
      setAreaOption('');
      setRoomBlurb('');


      window.location.reload();


    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'roomText') {
      setRoomText(value);
    }

    if (name === 'areaOption') {
      setAreaOption(value);
    }

    if (name === 'blurbText') {
      setRoomBlurb(value);
    }
    console.log(value);
  };

  if (!area) { return (<div>Loading...</div>) }

  return (
    <div>
      {Auth.loggedIn() ? (
        <>
          <Container>
            <Row>
              <Modal show={onShow} onHide={() => setOnShow(false)} backdrop="static" keyboard={false} role="dialog">
                <Form onSubmit={handleRoomSubmit}>
                  <Modal.Header closeButton>
                    <Modal.Title>New Room</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>

                    <Form.Group className="mb-3" controlId="formBasicText">
                      <Form.Label>Room Name</Form.Label>
                      <Form.Control
                        autoFocus
                        onChange={handleChange}
                        className="form-input"
                        type="text"
                        name="roomText" />
                      {error ? (
                        <div>
                          <p className='error-text'>Please enter a room name.</p>
                        </div>
                      ) : null}
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Associated Area</Form.Label>

                      <Form.Select
                        onChange={handleChange}
                        selected={area._id}
                        name="areaOption">

                        {currentCampaign.areas && currentCampaign.areas.map((area, pos) => (
                          <option key={pos} value={area._id}>{area.name}</option>
                        ))}
                      </Form.Select>

                      {error ? (
                        <div>
                          <p className='error-text'>Please select a area</p>
                        </div>
                      ) : null}
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="controlTextArea">
                      <Form.Label>Blurb</Form.Label>
                      <Form.Control as="textarea" rows={4}
                        onChange={handleChange}
                        className="form-input"
                        type="textarea"
                        name="blurbText"
                      />
                      {error ? (
                        <div>
                          <p className='error-text'>Please enter a blurb. Don't be shy.</p>
                        </div>
                      ) : null}
                    </Form.Group>
                  </Modal.Body>
                </Form>
                <Modal.Footer>
                  <Button onClick={handleRoomSubmit} variant="primary">
                    Submit
                  </Button>
                </Modal.Footer>
              </Modal>
            </Row>
          </Container>
          <Container>

            {/* <Button onClick={() => setOnShow(!onShow)} className="mt-4 mb-4" variant='dark' style={{ color: "black", background: "seagreen" }}> */}
            <Button onClick={() => setOnShow(!onShow)} className="mt-4 mb-4 right-element" variant="outline-dark">
              Add Room
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


export default RoomForm;
