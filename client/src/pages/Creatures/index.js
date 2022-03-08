import React from 'react';
import "./creatures.css";
import Carousel from 'react-bootstrap/Carousel'
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

// import Demon1 from './images/Demon1.jpg';
// import Demon2 from './images/Demon2.jpg';
// import Dragon1 from './images/Dragon1.jpg';
// import Dragon2 from './images/Dragon2.jpg';
// import Goblin1 from './images/Goblin1.jpg';
// import Goblin2 from './images/Goblin2.jpg';
// import EarthElemental from './images/EarthElemental.jpg';
// import FireElemental from './images/FireElemental.jpg';
// import IceElemental from './images/IceElemental.jpg';

    // const fadeImages = [
    //     {
    //         name: Demon1,
    //         caption: 'Demon'
    //     },
    //     {
    //         name: Demon2,
    //         caption: 'Demon'
    //     },
    //     {
    //         name: Dragon1,
    //         caption: 'Dragon'
    //     },
    //     {
    //         name: Dragon2,
    //         caption: 'Dragon'
    //     },
    //     {
    //         name: Goblin1,
    //         caption: 'Goblin'
    //     },
    //     {
    //         name: Goblin2,
    //         caption: 'Goblin'
    //     },
    //     {
    //         name: EarthElemental,
    //         caption: 'EarthElemental'
    //     },
    //     {
    //         name: FireElemental,
    //         caption: 'FireElemental'
    //     },
    //     {
    //         name: IceElemental,
    //         caption: 'IceElemental'
    //     },
    // ];
    
    const Creatures = () => {
    return ( 
        <Container className="my-creatures-container">
            <Row>
              <Col>
                <Carousel>
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
                <h1>Summon your creatures!</h1>
                <Form>
                    <Form.Group className="mb-3 w-50" controlId="formBasicText">
                      <Form.Label>Name</Form.Label>
                      <Form.Control type="text" placeholder="Enter Creature Name" />
                      <Form.Text className="text-muted">
                        e.g. Godzilla
                      </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3 w-75" controlId="formBasicText">
                      <Form.Label>Title</Form.Label>
                      <Form.Control type="text" placeholder="Title of the Beast" />
                      <Form.Text className="text-muted">
                        e.g. King of Monsters
                      </Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                      <Form.Check type="checkbox" label="Mark as favorite" />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                      Summon
                    </Button>
                </Form>
            </Col>
        </Row>
    </Container>
     );
}
 
export default Creatures;