import { Container, Col, Row, Button, Modal, Form } from "react-bootstrap";
import "./editArea.css";

import { EDIT_AREA } from "../../utils/mutations";
import { useSessionContext } from "../../utils/SessionContext.js";

import Auth from "../../utils/auth";
import { useMutation } from "@apollo/client";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const EditArea = ({ area }) => {
  const [areaName, setAreaName] = useState(area.name);
  const { currentSession, setArea } = useSessionContext();
  const [onShow, setOnShow] = useState(false);

  const [editArea, { error, data }] = useMutation(EDIT_AREA);

  const handleEditSubmit = async (event) => {
    event.preventDefault();
    console.log(area);
    try {
      const { data } = await editArea({
        variables: {
          _id: area._id,
          name: areaName,
          campaign: area.campaign._id,
          // is_active: true,
        },
      });

      setArea({ currentArea: data });
      // setAreaName('');

      window.location.reload();

    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'areaName') {
      setAreaName(value);
      console.log(areaName);
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
                  <Modal.Title>Edit {area.type}</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                  {/* TODO: Also make an option for changing area type. */}
                  <Form.Group className="mb-3" controlId="formBasicText">
                    <Form.Label></Form.Label>
                    <Form.Control
                      autoFocus
                      onChange={handleChange}
                      defaultValue={area.name}
                      className="form-input"
                      type="text"
                      placeholder="New Area Name"
                      name="areaName"
                    />

                    {error ? (
                      <div>
                        <p className="error-text">Please enter an area name.</p>
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

export default EditArea;
