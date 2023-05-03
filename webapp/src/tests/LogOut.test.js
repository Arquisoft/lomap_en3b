import {
    fireEvent,
    getByDisplayValue,
    render,
    screen
} from "@testing-library/react";

import React from "react";

import MapView from "../views/mapView"

describe('Log out functionality ',()=>{


    test('Show log out dialogue',()=>{

        render(<MapView/>);
        const logOutMenuOption=screen.getByLabelText( /Log out option/i)
        fireEvent.click(logOutMenuOption)
        const logoutDialog=screen.getByLabelText(/Log out dialogue/i)
        expect(logoutDialog).toBeInTheDocument()
        const message=screen.getByText(/Are you sure you want to leave?/i)
        expect(message).toBeInTheDocument()
        const logOutButton=screen.getByLabelText( /Log out button/i)
        fireEvent.click(logOutButton)
        const goBack=screen.getByLabelText( /Go back button/i)
        fireEvent.click(goBack)



    })



});