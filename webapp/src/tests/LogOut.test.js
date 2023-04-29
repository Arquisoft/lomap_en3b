import {
    fireEvent,
    getByDisplayValue,
    render,
    screen
} from "@testing-library/react";

import React from "react";
import App from "../App"
import Header from "../components/Header"
import LogOut from "../components/LogOut";
describe('Log out functionality ',()=>{

        const mockImpl=jest.fn()
        beforeEach(()=>{
            render(<Header onAddMarker={mockImpl()} onInfoList={mockImpl()} onAccountPage={mockImpl()} onFilterLocations={mockImpl()} onLogOut={mockImpl()}/>)
            const logOutMenuOption=screen.getByLabelText( /Log out option/i)
            fireEvent.click(logOutMenuOption)}
        )


    test('Show log out dialogue',()=>{


        const logoutDialog=screen.getByLabelText(/Log out dialogue/i)
        expect(logoutDialog).toBeInTheDocument()
        const message=screen.getByText(/Are you sure you want to leave?/i)
        expect(message).toBeInTheDocument()




    })
    test('User clicks on log out',()=>{
        const logOutButton=screen.getByLabelText( /Log out button/i)
        fireEvent.click(logOutButton)
           const handleLogOut= jest.spyOn(<LogOut/>,'handleLogOut')
           expect(handleLogOut).toBeCalled();

    })
    test('User clicks on go back',()=>{

        const goBack=screen.getByLabelText( /Go back button/i)
        fireEvent.click(goBack)
        const goback= jest.spyOn(<LogOut/>,'handleAddButtonClick')
        expect(goback).toBeCalled();
    })

});