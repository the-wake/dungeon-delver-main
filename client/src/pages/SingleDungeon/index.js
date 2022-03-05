import "./singleDungeon.css";
import { Col, Container, Row } from "react-bootstrap";


import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

const SingleDungeon = () => {


    // const { name } = useParams();

    // const { loading, data } = useQuery(QUERY_SINGLE_DUNGEON, {
    //     //have to pass state prop from campaignForm to 
    //     //retrieve new name
    //     variables: { name: props.name },
    // });

    // const dungeon = data?.dungeon || {};

    // if (loading) {
    //     return <div>
    //         <h3>Dungeon loading...</h3>
    //     </div>
    // }


    return ( 
        <Container>
            <Col>
            <Row>

            </Row>
            </Col>
        </Container>
     );
}
 
export default SingleDungeon;