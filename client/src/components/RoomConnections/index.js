import React, { useState, Component } from 'react';
import { Container, Col, Row, Button, Form, Modal, Dropdown, DropdownButton } from "react-bootstrap";

import { useMutation } from '@apollo/client';

import { EDIT_ROOM } from '../../utils/mutations';

const RoomConncetions = (area, room) => {
  // const { currentSession, setCampaign, setArea, setRoom } = useSessionContext();
  // const { currentCampaign, currentArea, currentRoom } = currentSession;

  // TODO: Distinguish the connection array from the connection to be pushed/pulled.
  const [connections, setConnectionValue] = useState(room.connections);
  const [editRoom, { error, data }] = useMutation(EDIT_ROOM);


  const handleRoomSubmit = async (event) => {
    event.preventDefault();
    console.log("here", handleRoomSubmit)
    try {
      const { data } = await editRoom({
        variables: {
          conncetions: connections,
        },
      });

      window.location.reload();


    } catch (error) {
      console.error(error);
    }
  };

  // Experimenting with the handleSelect script below.
  // const handleChange = (event) => {
  //   const { name, value } = event.target;

  //   if (name === 'conncetions') {
  //     setConnectionValue(value);
  //   }
  // };

  const handleSelect = (key) => {
    // this.setState( {
    //     key: key
    // })
    console.log(`Key selected: ${key}`);
    
};

  return (
    <>
      {/* <Container>
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
          </Container> */}

      <hr />
      <Row xs={1} md={2} lg={3} className="g-4">
        <p>Connection data goes here.</p>
        {/* TODO: Populate connections */}
      </Row>
      <DropdownButton id="dropdown-basic-button" title="Add a Connection" onSelect={handleSelect}>
        {area.area.rooms.map((room, pos) => (
          <Dropdown.Item key={pos} value={room._id} eventKey={room.name}>{room.name}</Dropdown.Item>
        ))}
        {/* <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item> */}
      </DropdownButton>
    </>
  );
};

export default RoomConncetions;

// Load room data as context provided by the parent page (SingleRoom).
// Unpack that context to load in the array containing the connections.
// Display those connections below the creatures. (Maybe to the right side instead using an if/then checking whether the room has connections.)
// Store those connections within the component as an array.
// Adding/removing connections pushes/pulls from that array, then runs the EDIT_ROOM mutation with the updated data.

// Then, either run a filter over rooms that are already connected, or add a conditional to mark ones that are already connected with e.g. an asterisk.



// Modal version of add-room interface:

// <Row className="g-4">
// {/* <Button onClick={() => setOnShow(!onShow)} className="mt-4 mb-4 right-element" variant="outline-dark"> */}
// <a class="interact" onClick={handleShow}>Add Connection</a>
// <Modal show={show} onHide={handleClose}>
  // <Modal.Header closeButton>
    // <Modal.Title>Modal heading</Modal.Title>
  // </Modal.Header>
  // <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
  // <Modal.Footer>
    // <Button variant="secondary" onClick={handleClose}>
      // Close
    // </Button>
    // <Button variant="primary" onClick={handleClose}>
      // Save Changes
    // </Button>
  // </Modal.Footer>
// </Modal>
// </Row>

// // Modal helper scripts
// const [show, setShow] = useState(false);
// const handleClose = () => setShow(false);
// const handleShow = () => setShow(true);