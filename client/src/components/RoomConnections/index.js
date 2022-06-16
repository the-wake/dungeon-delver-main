import React, { useState, Component } from 'react';
import { Container, Col, Row, Button, Form, Modal, Dropdown, DropdownButton } from "react-bootstrap";
import { Link } from 'react-router-dom';

import { useMutation } from '@apollo/client';
import { EDIT_ROOM } from '../../utils/mutations';

import { useSessionContext } from '../../utils/SessionContext.js';


const RoomConncetions = ({ campaign, area, room }) => {
  const { currentSession, setCampaign, setArea, setRoom } = useSessionContext();
  const { currentCampaign, currentArea, currentRoom } = currentSession;

  // TODO: Distinguish the connection array from the connection to be pushed/pulled.
  const [connections, setConnectionValue] = useState(room.connections);
  const [editRoom, { error, data }] = useMutation(EDIT_ROOM);

  var localRooms = area.rooms;
  var roomConnections = room.connections;
  console.log(localRooms);
  console.log(roomConnections);


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
    addConnection(key)
  };

  const addConnection = (id) => {
    console.log(`This will eventually add a room. Key: ${id}`)
  }

  return (
    <>
      {/* <hr className="mt-4 mb-2" /> */}
      <Col xs={3}>
        <DropdownButton id="dropdown-basic-button" title="Add a Connection" className="mt-4 mb-3" onSelect={handleSelect}>
          {localRooms.map((room, pos) => (
            <Dropdown.Item key={pos} value={room._id} eventKey={room._id}>{room.name}</Dropdown.Item>
          ))}
          {/* <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item> */}
        </DropdownButton>
        {roomConnections && roomConnections.map((connection, pos) => (
          <Row>
            <Link className='room-connection mt-2' to={`/rooms/${connection._id}`}
              onClick={() => {
                setArea({ currentArea: connection.area });
                setRoom({ currentRoom: connection });
              }}
              state={{ campaignData: campaign, areaData: area, roomData: connection }}>
              {connection.name}
            </Link>
          </Row>
        ))}
      </Col>
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

// Then, make the links reciprocal (by default, at least).



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

// Displayed as footer:

// return (
//   <>
//     {/* <hr className="mt-4 mb-2" /> */}
//     <Row xs={2} md={4} lg={5}>
//       {roomConnections && roomConnections.map((connection, pos) => (
//         <Link className='room-title' to={`/rooms/${connection._id}`}
//           onClick={() => {
//             setArea({ currentArea: connection.area });
//             setRoom({ currentRoom: connection });
//           }}
//           state={{ campaignData: campaign, areaData: area, roomData: connection }}>
//           {connection.name}
//         </Link>
//       ))}
//     </Row>
//     <DropdownButton id="dropdown-basic-button" title="Add a Connection" className="mt-4" onSelect={handleSelect}>
//       {localRooms.map((room, pos) => (
//         <Dropdown.Item key={pos} value={room._id} eventKey={room._id}>{room.name}</Dropdown.Item>
//       ))}
//       {/* <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
//       <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
//       <Dropdown.Item href="#/action-3">Something else</Dropdown.Item> */}
//     </DropdownButton>
//   </>
// );