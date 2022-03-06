import "./singleCampaign.css";
import { Container, Col, Row, Button } from "react-bootstrap";

import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import DungeonForm from '../../components/DungeonForm';
import DungeonList from '../../components/DungeonList';
import { QUERY_DUNGEONS } from "../../utils/queries";


const SingleCampaign = () => {

    const { loading, data } = useQuery(QUERY_DUNGEONS);
    console.log(data);

    const dungeons = data?.getDungeons || [];
    console.log(dungeons);
    // const { name } = useParams();

    // const { loading, data } = useQuery(QUERY_SINGLE_CAMPAIGN, {
    //     //have to pass state prop from campaignForm to 
    //     //retrieve new name
    //     variables: { name: props.name },
    // });

    // const campaign = data?.campaign || {};

    // if (loading) {
    //     return <div>
    //         <h3>Campaign loading...</h3>
    //     </div>
    // }

    return (

        <Container className='my-campaign-container'>
            <Col>
                <h1 className="text-center">Specific campaign name</h1>
                {/* <h1 className="text-center">{campaigns}</h1> */}
            </Col>
            <Row>
                <Col>
                    <Button className="mt-4 mb-4 mx-2">
                        Edit Campaign
                    </Button>
                </Col>
            </Row>
            <Row>
            </Row>

            <DungeonForm dungeons={dungeons}></DungeonForm>
            <h1 className="mb-3 mt-3 mx-3">My Dungeons</h1>
            <DungeonList dungeons={dungeons}></DungeonList>

        </Container>
    );
}

export default SingleCampaign;