import React from 'react';
import "./creatures.css";
import Carousel from 'react-bootstrap/Carousel'
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
    
    const Creatures = () => {
    return ( 
        <Container className="my-creatures-container">
            <h1>Summon Creatures!</h1>
            <Row>
              <Col>
                <Carousel className='carousel'>
                    <Carousel.Item>
                        <img className='d-block w-100' 
                        src={require("./images/Demon1.jpg")}
                        alt="Fire Demon" 
                        style={{}}
                        />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img className='d-block w-100' 
                        src={require("./images/Dragon1.jpg")}
                        alt="Roaring Dragon" 
                        style={{}}
                        />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img className='d-block w-100' 
                        src={require("./images/Goblin1.jpg")}
                        alt="Goblin with a Dagger" 
                        style={{}}
                        />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img className='d-block w-100' 
                        src={require("./images/Demon2.jpg")}
                        alt="Abyssal Demon" 
                        style={{}}
                        />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img className='d-block w-100' 
                        src={require("./images/Dragon2.jpg")}
                        alt="Astral Dragon" 
                        style={{}}
                        />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img className='d-block w-100' 
                        src={require("./images/Goblin2.jpg")}
                        alt="Goblin Archer" 
                        style={{}}
                        />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img className='d-block w-100' 
                        src={require("./images/EarthElemental.jpg")}
                        alt="Earth Elemental" 
                        style={{}}
                        />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img className='d-block w-100' 
                        src={require("./images/FireElemental.jpg")}
                        alt="Fire Elemental" 
                        style={{}}
                        />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img className='d-block w-100' 
                        src={require("./images/IceElemental.jpg")}
                        alt="Ice Elemental" 
                        style={{}}
                        />
                    </Carousel.Item>
                </Carousel>
              </Col>
            <Col className='creatureForm'>
                <Form>
                    <Form.Group className="mb-3 w-75" controlId="formBasicText">
                      <Form.Label>Name and/or Title</Form.Label>
                      <Form.Control type="text" placeholder="Enter Creature Name" />
                      <Form.Text className="text-muted">
                        e.g. Godzilla, King of the Monsters
                      </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3 w-75" controlId="formBasicText">
                      <Form.Label>Room</Form.Label>
                      <Form.Control type="text" placeholder="Enter Room " />
                    </Form.Group>

                    <Form.Group className="mb-3 w-75" controlId="formBasicText">
                      <Form.Label>Key NPC</Form.Label>
                      <Form.Control type="text" placeholder="Enter Key NPC" />
                    </Form.Group>

                </Form>
            </Col>
            <Col>
            <Form.Group className="mb-3 w-75" controlId="formBasicText">
                      <Form.Label>Loot</Form.Label>
                      <Form.Control type="text" placeholder="Enter Possible Loot" />
                    </Form.Group>
            
                    <Form.Group className="mb-3 w-75" controlId="formBasicText">
                      <Form.Label>HP</Form.Label>
                      <Form.Control type="text" placeholder="Enter Hit Points" />
                    </Form.Group>

                    <Button variant="dark" type="submit">
                      Summon
                    </Button>
                    {/* <Form.Group className="mb-3 w-75" controlId="formBasicText">
                      <Form.Label>Loot</Form.Label>
                      <Form.Control type="text" placeholder="Enter Possible Loot" />
                    </Form.Group>

                    <Form.Group className="mb-3 w-75" controlId="formBasicText">
                      <Form.Label>Loot</Form.Label>
                      <Form.Control type="text" placeholder="Enter Possible Loot" />
                    </Form.Group> */}
            </Col>
        </Row>
    </Container>
     );
}
 
export default Creatures;