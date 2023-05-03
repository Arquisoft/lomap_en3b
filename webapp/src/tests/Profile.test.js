import {fireEvent, render, screen} from "@testing-library/react";
import MapView from "../views/mapView";
import React from "react";

describe('Profile ',()=>{

    beforeEach(()=>{
            render(<MapView/>)

        }

    )
    test('Show Profile',()=>{

        const profileButton=screen.getByLabelText( /Show Profile/i)
        fireEvent.click(profileButton)
        const profileContainer=screen.getByLabelText(/Profile container/i)
        expect(profileContainer).toBeInTheDocument();

    })

})
