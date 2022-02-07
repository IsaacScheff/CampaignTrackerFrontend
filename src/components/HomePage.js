import React from "react";

export function HomePage () {
    
    return (
        <div className='home-page'>
            <h className='campaign-title'>
                Welcome to Campaign Tracker! 
            </h>
            <div className='home-page-text'>
                <ul>
                    <li>Campaign Tracker is a structured forum for group note taking for Tabletop Role-Playing games</li> 
                    <li>Your group first creates a Campaign, with an image and a description</li>
                    <li>You can then make individual Posts within that Campaign, tagged with a topic such as NPC or location or anything else that suits you</li> 
                    <li>Posts can also have pictures associated with them. Within each Post you can further the discusson with Comments</li> 
                    <li>You may edit your Campaign and Post information, and delete any unwanted Campaigns, Posts, and Comments</li>
                </ul>  
            </div>
        </div>
    )
}

export default HomePage;