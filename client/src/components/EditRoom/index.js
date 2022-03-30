import { Container, Col, Row, Button, Modal, Form } from "react-bootstrap";
import "./editRoom.css";

import { EDIT_ROOM } from "../../utils/mutations";
import { useSessionContext } from "../../utils/SessionContext.js";

import Auth from "../../utils/auth";
import { useMutation } from "@apollo/client";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const EditRoom = ({ room }) => {
  const [roomName, setRoomName] = useState(room.name);
  const [roomBlurb, setRoomBlurb] = useState(room.blurb);
  // const [roomArea, setRoomArea] = useState(room.area);
  const { currentSession, setRoom } = useSessionContext();
  const [onShow, setOnShow] = useState(false);

  const [editRoom, { error, data }] = useMutation(EDIT_ROOM);

  const handleEditSubmit = async (event) => {
    event.preventDefault();
    console.log(room);
    try {
      const { data } = await editRoom({
        variables: {
          _id: room._id,
          name: roomName,
          blurb: roomBlurb,
          // area: room.area._id,
          // is_active: true,
        },
      });

      setRoom({ currentRoom: data });
      // setRoomName('');

      window.location.reload();

    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'roomName') {
      setRoomName(value);
      console.log(roomName);
    }

    if (name === 'roomBlurb') {
      setRoomBlurb(value);
      console.log(roomBlurb);
    }

    // if (name === 'roomArea') {
    //   setRoomArea(value);
    //   console.log(roomArea);
    // }
  };


  return (
    <>
      {
        Auth.loggedIn() ? (
          <>
            <Modal show={onShow} onHide={() => setOnShow(false)} backdrop="static" keyboard={false} role="dialog">
              <Form onSubmit={handleEditSubmit}>
                <Modal.Header closeButton>
                  <Modal.Title>Update Room</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                  <Form.Group className="mb-3" controlId="formBasicText">
                    <Form.Label>Room Name</Form.Label>
                    <Form.Control
                      autoFocus
                      onChange={handleChange}
                      defaultValue={room.name}
                      className="form-input"
                      type="text"
                      name="roomName"
                    />

                    <Form.Label>Blurb</Form.Label>
                    <Form.Control as="textarea" rows={4}
                      onChange={handleChange}
                      defaultValue={room.blurb}
                      className="form-input"
                      type="textarea"
                      name="roomBlurb"
                    />

                    {/* TODO: Add room selector once we get the context sorted out. */}
                    {/* <Form.Label>Parent Area</Form.Label>
                    <Form.Select
                      onChange={handleChange}
                      defaultValue={room.area}
                      name="roomArea"
                    >

                      <option value='placeholder1'>Placeholder 1</option>
                      <option value='placeholder2'>Placeholder 2</option>
                      <option value='placeholder3'>Placeholder 3</option>

                    </Form.Select> */}

                    {/* {error ? (
                      <div>
                        <p className="error-text">Please enter a room name.</p>
                      </div>
                    ) : null} */}
                  </Form.Group>

                </Modal.Body>
              </Form>
              <Modal.Footer>
                <Button onClick={handleEditSubmit} variant="outline-dark">
                  Submit
                </Button>
              </Modal.Footer>
            </Modal>
            <i className="bi-pencil icon" onClick={() => setOnShow(!onShow)} />
          </>
        ) : (
          <p>
            You need to be logged in. Please
            <Link to="/login"> login</Link> or <Link to="/signup"> sign up</Link>
          </p>
        )
      }
    </>
  );
}

export default EditRoom;
