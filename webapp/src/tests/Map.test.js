import {render, screen} from "@testing-library/react";
import Map from "../components/Map";
import React from "react";
import {Session} from "@inrupt/solid-client-authn-browser";

describe('Map tests ',()=>{
    const mockFunc=jest.fn();
    const locations=  Array(
        { name:"Lavender Haze",
            description:"I love this flower field",
            category:'park',
            privacy:'private',
            key:'283987r',
            comments:[
                {
                    comment:'First comment',
                    commentPic:'pic.png',
                    ratingStars:'3'
                },
                {
                    comment:'Second comment',
                    commentPic:'pic.png',
                    ratingStars:'3'
                }]
        },{ name:"Dog statue",
        description:"I love this statue",
        category:'monument',
        privacy:'public',
        key:'322227r',
        comments:[
        ]
    }
        );



    beforeEach(()=>{
        const session=new Session();
        session.info.webId="lomaper.net"
        const mockSession=jest.fn().mockReturnValue( session );
        render(<Map changesInFilters={mockFunc()} selectedFilters={mockFunc()}  isInteractive={mockFunc()}  session={mockSession()}  onMarkerAdded={mockFunc()}  markerData={ locations} onInfoList={mockFunc()}  changesInComments={mockFunc()} updatedReview={mockFunc()}  updateLocation={mockFunc()} editLocation={mockFunc()} />)
    })


    test('Map renders ',()=>{
        const mapcontainer=screen.getByLabelText("Map render")

        expect(mapcontainer).toBeInTheDocument();
        screen.debug(mapcontainer)
    })


});