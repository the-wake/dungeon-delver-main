import { Container, Col, Row, Button, Modal, Form } from "react-bootstrap";
import "./editDungeon.css";

import { EDIT_DUNGEON } from "../../utils/mutations";
import { useSessionContext } from "../../utils/SessionContext.js";

import Auth from "../../utils/auth";
import { useMutation } from "@apollo/client";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const EditDungeon = ({ dungeon }) => {
  const [dungeonName, setDungeonName] = useState('');
  const { currentSession, setDungeon } = useSessionContext();
  const [onShow, setOnShow] = useState(false);


  const [editDungeon, { error, data }] = useMutation(EDIT_DUNGEON);

  const handleEditSubmit = async (event) => {
    event.preventDefault();
    console.log(dungeon);
    try {
      const { data } = await editDungeon({
        variables: {
          _id: dungeon._id,
          name: dungeonName,
          campaign: dungeon.campaign._id,
          // is_active: true,
        },
      });

      setDungeon({ currentDungeon: data });
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
      console.log(dungeonName);
    }
  };


  return (
    <>
      {
        Auth.loggedIn() ? (
          <>
            <Modal show={onShow} onHide={() => setOnShow(false)} backdrop="static" keyboard={false} role="dialog">
              <Form onSubmit={handleEditSubmit}>
                <Modal.Header closeButton>
                  <Modal.Title>New Dungeon Name</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                  <Form.Group className="mb-3" controlId="formBasicText">
                    <Form.Label></Form.Label>
                    <Form.Control
                      autoFocus
                      onChange={handleChange}
                      value={dungeonName}
                      className="form-input"
                      type="text"
                      placeholder="New Dungeon Name"
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

export default EditDungeon;
