import {fireEvent, render, screen,within} from "@testing-library/react";
import EditList from "../components/EditList";
import InfoList from "../components/InfoList";
import {LocationLM} from "../models/location"
import React from "react";
const mockImpl=()=>{}

describe("Container renders properly",()=>{
    beforeEach(()=>
        render(<InfoList isInfoVisible={mockImpl()} onInfoList={mockImpl()} selected={  new LocationLM(43.39635189868037,-5.831536216796875,"Lavander Haze","I love this flower field",'park','public','',"https://fdezariassara.inrupt.net/")} newComments={mockImpl()}  onEditMarker={mockImpl()} />)
    )

    test('Container renders',()=>{

        const container=screen.getByLabelText( /detailed view container/i)
        expect(container).toBeInTheDocument();
        let tab=document.querySelector(  "Reviews" )
        expect(tab).toBeInTheDocument();
        tab=screen.getByLabelText("Locations")
        expect(tab).toBeInTheDocument();
        tab=screen.getByLabelText("Close")
        expect(tab).toBeInTheDocument();

    })
})


/**
 *
 describe('Detailed location view: Location description',()=>{

     const selectedLoc=  Array(new LocationLM(43.39635189868037,-5.831536216796875,"Lavander Haze","I love this flower field",'park','private','',"https://fdezariassara.inrupt.net/"))
    beforeEach(()=>
        render(<EditList isVisible={mockImpl} onAddMarker={mockImpl()}/>)
    )
    test('Title renders',()=>{
        render(<InfoList isInfoVisible={true} onInfoList={true} selected={selectedLoc} newComments={mockImpl()}  onEditMarker={mockImpl()} />)
        const tab=screen.getByLabelText("Locations");
        expect(tab).toBeInTheDocument();
        const container=screen.getByLabelText(/details view/i)
        expect(container).not.toBeVisible();
        fireEvent.click(tab)
        expect(container).toBeVisible();
        const title=screen.getByLabelText(/locations name/i)
        screen.debug(screen.getByLabelText(/details view/i))
        expect(title).toBeInTheDocument()


    })

});
describe('Detailed location view: Comments view',()=>{

    beforeEach(()=>
        render(<EditList isVisible={mockImpl} onAddMarker={mockImpl()}/>)
    )
    test('Title renders',()=>{

        const title=screen.getByText( /Add a marker!/i)
        expect(title).toBeInTheDocument();
        const subtitle=screen.getByText( /Click on the map after filling this form/i)
        expect(subtitle).toBeInTheDocument();

    })

});
 */