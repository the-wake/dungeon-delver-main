import "./singleCampaign.css";
import { Container, Col, Row, Button } from "react-bootstrap";

import { useParams, useLocation } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import DungeonForm from '../../components/DungeonForm';
import DungeonList from '../../components/DungeonList';
import { QUERY_DUNGEONS } from "../../utils/queries";


const SingleCampaign = () => {
    const location = useLocation();
    const { campaignData } = location.state;

    // console.log(campaignData);

    const { loading, data } = useQuery(QUERY_DUNGEONS);
    console.log(data);

    const dungeons = data?.getDungeons || [];
    // console.log(dungeons);
    // const { name } = useParams();

    // const { loading, data } = useQuery(QUERY_SINGLE_CAMPAIGN, {
    //     //have to pass state prop from campaignForm to 
    //     //retrieve new name
    //     variables: { name: props.name },
    // });

    // const campaign = data?.campaign || {};

    // if (loading) {
    //     return <div>
    //         <h4>Campaign loading...</h4>
    //     </div>
    // }

    return (

        <Container className='my-campaign-container'>
            <Row>
            <Col xs={10}>
                <h1 className="campaign-name mt-1">{campaignData.name}</h1>
                </Col>
                <Col className="flex">
                <Button className="mt-4 mb-5">
                        Edit Campaign
                    </Button>
            </Col>
            </Row>
            <Row>
                <Col>
                    
                </Col>
            </Row>

            <Row>
                <DungeonForm dungeons={dungeons} campaign={campaignData}></DungeonForm>
                <h2 className="mb-3 mt-3 mx-3">Dungeons in {campaignData.name}</h2>
                {loading ? (
                    <h2>
                        Retrieving Data...
                    </h2>
                ) : (
                    <DungeonList dungeons={dungeons} campaign={campaignData}></DungeonList>
                )}
            </Row>

        </Container>
    );
}

export default SingleCampaign;