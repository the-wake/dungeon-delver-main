import { Container, Col, Row, Button, Modal, Form, NumericInput } from "react-bootstrap";
import "./creatureForm.css";

import { ADD_CREATURE } from "../../utils/mutations";
import { useSessionContext } from "../../utils/SessionContext.js";

import Auth from "../../utils/auth";
import { useMutation } from "@apollo/client";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const CreatureForm = ({ campaign, area, room }) => {
  const [creatureName, setCreatureName] = useState('');
  const [roomOption, setRoomOption] = useState(room._id);
  const [hpOption, setHpOption] = useState('');
  const [creatureLoot, setCreatureLoot] = useState('');
  const [keyNpc, setKeyNpc] = useState(false);
  const [isAlive, setIsAlive] = useState(true);
  // console.log(roomOption);


  const { currentSession, setCurrentSession, setRoom, setArea } = useSessionContext();
  const { currentCampaign, currentArea, currentRoom } = currentSession;
  const [onShow, setOnShow] = useState(false);

  const [addCreature, { error, data }] = useMutation(ADD_CREATURE);

  const handleCreatureSubmit = async (event) => {
    event.preventDefault();
    try {

      const roomHandler = (room) => {
        if (room === 'No Room Assigned') {
          return null;
        }
        return room;
      };

      const { data } = await addCreature({
        variables: {
          name: creatureName,
          room: roomOption,
          // room: roomHandler(roomOption),
          hp: hpOption,
          loot: creatureLoot,
          key_npc: keyNpc,
          is_alive: isAlive,
          is_active: true,
          user: Auth.getProfile(),
        },
      });

      setCreatureName('');
      setHpOption('');
      setCreatureLoot('');
      setKeyNpc(false);
      setIsAlive(true);

      window.location.reload();

    } catch (error) {
      console.log(addCreature);
      console.error(error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'creatureName') {
      setCreatureName(value);
    }

    if (name === 'roomOption') {
      setRoomOption(value);
    }

    if (name === 'creatureHp') {
      setHpOption(parseInt(value));
    }

    if (name === 'creatureLoot') {
      setCreatureLoot(value);
    }

    if (name === 'keyNpc') {
      setKeyNpc(!keyNpc);
      console.log(keyNpc)
    }

    if (name === 'isAlive') {
      setIsAlive(!isAlive);
      console.log(isAlive)
    }
    console.log(value);
    console.log(typeof value);
  };


  return (
    <div>
      {Auth.loggedIn() ? (
        <>
          <Container>
            <Modal show={onShow} onHide={() => setOnShow(false)} backdrop="static" keyboard={false} role="dialog">
              <Form onSubmit={handleCreatureSubmit}>
                <Modal.Header closeButton>
                  <Modal.Title>Creature Information</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                  <Form.Group className="mb-3" controlId="formBasicText">
                    <Form.Label>Creature Name</Form.Label>
                    <Form.Control
                      autoFocus
                      onChange={handleChange}
                      className="form-input"
                      type="text"
                      name="creatureName" />

                    {error ? (
                      <div>
                        <p className="error-text">Please enter a creature name.</p>
                      </div>
                    ) : null}
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Room</Form.Label>
                    <Form.Select
                      onChange={handleChange}
                      selected={room._id}
                      name="roomOption">

                      {currentArea.rooms && currentArea.rooms.map((room, pos) => (
                        <option key={pos} value={room._id}>{room.name}</option>
                      ))}
                      {/* <option value={null}>No Room Assigned</option> */}

                    </Form.Select>

                    {error ? (
                      <div>
                        <p className='error-text'>Please select an area</p>
                      </div>
                    ) : null}
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicText">
                    <Form.Label>Current HP</Form.Label>
                    <Form.Control
                      onChange={handleChange}
                      className="form-input"
                      type="number"
                      name="creatureHp"
                    />

                    {error ? (
                      <div>
                        <p className="error-text">Please enter a valid number of hitpoints.</p>
                      </div>
                    ) : null}
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="controlTextArea">
                    <Form.Label>Loot</Form.Label>
                    <Form.Control as="textarea" rows={4}
                      onChange={handleChange}
                      className="form-input"
                      type="textarea"
                      placeholder="Amethyst of Evermore, Crown of Kings, etc."
                      name="creatureLoot"
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Key NPC?</Form.Label>
                    <Form.Check
                      inline={true}
                      onChange={handleChange}
                      className="form-input"
                      type="checkbox"
                      name="keyNpc" />
                    <Form.Label>Alive?</Form.Label>
                    <Form.Check
                      inline={true}
                      defaultChecked={true}
                      onChange={handleChange}
                      className="form-input"
                      type="checkbox"
                      name="isAlive" />
                  </Form.Group>

                </Modal.Body>
              </Form>
              <Modal.Footer>
                <Button onClick={handleCreatureSubmit} variant="primary">
                  Submit
                </Button>
              </Modal.Footer>
            </Modal>
          </Container>
          <Container>
            <Button onClick={() => setOnShow(!onShow)} className="mt-4 mb-4 right-element" variant="outline-dark">
              Add Creature
            </Button>
          </Container>
        </>
      ) : (

        <p>
          You need to be logged in. Please
          <Link to="/login"> login</Link> or <Link to="/signup"> sign up</Link>
        </p>

      )}
    </div >
  );
}

export default CreatureForm;