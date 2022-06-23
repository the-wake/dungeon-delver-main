import React, { Component, useState, setState, useEffect } from 'react';
import { Container, Col, Row, Button, Form, Modal, Dropdown, DropdownButton } from "react-bootstrap";

import { Link, useLocation } from 'react-router-dom';

import { useMutation } from '@apollo/client';
import { ADD_CONNECTION } from '../../utils/mutations';

import { useSessionContext } from '../../utils/SessionContext.js';


const RoomConnections = () => {
  const { currentSession, setCampaign, setArea, setRoom } = useSessionContext();
  const { currentCampaign, currentArea, currentRoom } = currentSession;

  const [newConnection, setConnectionValue] = useState('');
  const [addConnection, { error, data }] = useMutation(ADD_CONNECTION);

  const location = useLocation();
  var { campaignData } = location.state;
  var { areaData } = location.state;
  var { roomData } = location.state;
  console.log(location);

  var localRooms = areaData.rooms;
  var localConnections = roomData.connections;
  console.log(localRooms);
  console.log(localConnections);
  console.log('Current room =', roomData)

  const handleConnectionSubmit = async (event) => {
    try {
      const { data } = await addConnection({
        variables: {
          _id: roomData._id,
          connection: newConnection,
        },
      });

      console.log(data);

      setConnectionValue('');
      window.location.reload();


    } catch (error) {
      console.error(error);
    }
  };

  // Experimenting with the handleSelect script below.
  // const handleChange = (event) => {
  //   const { name, value } = event.target;

  //   if (name === 'connections') {
  //     setConnectionValue(value);
  //   }
  // };

  // What runs when a specific room is selected from the dropdown menu.
  // This will then run the mutation via the useEffect hook.
  const handleSelect = (key) => {
    setConnectionValue(key);
  };  

  // Uses the useEffect hook to sync the newConnection state and run it when updated.
  useEffect(() => {
    console.log('newConnection useState = ', newConnection);
    if (newConnection) {
      handleConnectionSubmit()
    };
  }, [newConnection]);

  return (
    <>
      <Col xs={3}>
        <DropdownButton id="dropdown-basic-button" title="Add a Connection" className="mt-4 mb-3" onSelect={handleSelect}>
          {localRooms.map((room, pos) => (
            <Dropdown.Item key={pos} value={room._id} eventKey={room._id}>{room.name}</Dropdown.Item>
          ))}
        </DropdownButton>
        {localConnections && localConnections.map((connection, pos) => (
          <Row key={pos}>
            <Link className='room-connection mt-2' to={`/rooms/${connection._id}`}
              onClick={() => {
                setArea({ currentArea: connection.area });
                setRoom({ currentRoom: connection });
                console.log(connection);
              }}
              state={{ campaignData, areaData, roomData: connection }}>
              {connection.name}
            </Link>
          </Row>
        ))}
      </Col>
    </>
  );
};

export default RoomConnections;

// Load room data as context provided by the parent page (SingleRoom).
// Unpack that context to load in the array containing the connections.
// Display those connections to the right side.
// Store those connections within the component as an array.
// Adding/removing connections pushes/pulls from that array, then runs the EDIT_ROOM mutation with the updated data.

// Then, either run a filter over rooms that are already connected, or add a conditional to mark ones that are already connected with e.g. an asterisk.

// Then, make the links reciprocal (by default, at least).