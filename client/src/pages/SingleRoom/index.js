import "./singleRoom.css";

import React, { useState, useEffect } from 'react';
import { Container, Col, Row, Button, Form } from "react-bootstrap";

import { useParams, useLocation } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';

import EditRoom from '../../components/EditRoom';
import CreatureForm from '../../components/CreatureForm';
import CreatureList from '../../components/CreatureList';
import RoomConnections from '../../components/RoomConnections';
import { QUERY_CREATURES } from "../../utils/queries";
import { useSessionContext } from '../../utils/SessionContext.js';
import { Link } from 'react-router-dom';

import { EDIT_ROOM } from '../../utils/mutations';

const SingleRoom = () => {
  const { currentSession } = useSessionContext();
  const { currentCampaign, currentArea, currentRoom } = currentSession;

  const location = useLocation();
  // May want/need to add more state data.
  const { campaignData } = location.state;
  const { areaData } = location.state;
  const { roomData } = location.state;
  console.log(currentSession, campaignData, areaData, roomData);

  const notesDefault = () => {
    if (!roomData.notes) {
      return false;
    }
    return true;
  };

  const [roomNotes, setRoomNotes] = useState(roomData.notes);
  const [showNotes, setShowNotes] = useState(notesDefault());
  const [editRoom, { error, updatedNote }] = useMutation(EDIT_ROOM);

  // const { currentSession } = useSessionContext();
  // console.log(currentSession);
  // console.log('showNotes = ', showNotes);

  // No event argument or prevent default, since this isn't updated by form submission but rather each time handleChange is run.
  const handleAreaSubmit = async () => {
    try {
      const { updatedNote } = await editRoom({
        variables: {
          _id: roomData._id,
          notes: roomNotes,
        }
      });

    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'roomNotes') {
      setRoomNotes(value);
    }
  };

  // This works unless the user uses back/forward arrows. That will cause the areaData's note value to revert to how it was previously rendered.
  useEffect(() => {
    handleAreaSubmit();
    roomData.notes = roomNotes;
  }, [roomNotes]);

  const toggleNotes = () => {
    setShowNotes(!showNotes);
  };

  const { loading, data } = useQuery(QUERY_CREATURES, {
    variables: { room: roomData._id },
  });

  const creatures = data?.getCreatures || [];

  if (!loading) {
    console.log(creatures)
  };
  // console.log(areaData);


  return (
    <Container className='my-room-container'>
      <Row className="page-header">
        <Col xs={6}>
          <h1 className="area-name mt-1">{roomData.name}<EditRoom room={roomData} /></h1>
        </Col>
        <Col className="flex right-justify">
          {/* <EditRoom room={roomData}></EditRoom> */}
          <Link to={`/areas/${areaData._id}`} state={{ campaignData, areaData }}><h4>{areaData.name}</h4>
          </Link>
        </Col>
      </Row>

      <hr className='w-100 m-auto' />

      <Row className="mt-2">
        <Col>
          <Form.Group controlId="controlTextArea">
            <Form.Label className="interact mt-2" onClick={toggleNotes}>
              {showNotes ? 'Hide ' : 'Show'} Notes
            </Form.Label>
            {showNotes ?
              <Form.Control as="textarea" rows={4}
                onChange={handleChange}
                className="form-input"
                type="textarea"
                name="roomNotes"
                defaultValue={roomData.notes}
              />
              : null
            }
          </Form.Group>
        </Col>
      </Row>

      {roomData.blurb ? (
        <Row>
          <Col className="blurb" xs={10} lg={8}>
            <div>
              <p>"{roomData.blurb}"</p>
            </div>
          </Col>
        </Row>
      ) :
        <></>
      }

      <Row>
        <Col>
          <CreatureForm campaign={campaignData} area={areaData} room={roomData}></CreatureForm>
          <h2 className="mb-1 mt-3">Creatures in {roomData.name}</h2>
        </Col>
        {loading ? (
          <h2>
            Retrieving Data...
          </h2>
        ) : (
          <CreatureList campaign={campaignData} area={areaData} room={roomData} creatures={creatures}></CreatureList>
        )}

      </Row>

      <Row>
        <Col>
          <RoomConnections campaign={campaignData} area={areaData} room={roomData}></RoomConnections>
        </Col>
      </Row>

    </Container>
  );
}


export default SingleRoom;
