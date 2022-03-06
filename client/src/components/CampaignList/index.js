import { Link } from 'react-router-dom'


const CampaignList = ({campaigns}) => {
    if (!campaigns.length) {
        return <h3>You have no campaigns yet...</h3>
    }


    return ( 
        <div>
            {
                campaigns &&
                campaigns.map((campaign) => (
                    <div key={campaign._id} className="card">
                       <p>{campaign.name}</p> 
                    
                        </div>
                ))
            }
        </div>
     );
}
 
export default CampaignList;