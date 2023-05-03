import {fireEvent, render, screen,within} from "@testing-library/react";
import List from "../components/List";
import React from "react";
const mockImpl=()=>{}
    describe('Insert location form',()=>{

    beforeEach(()=>
        render(<List isVisible={mockImpl} onAddMarker={mockImpl()}/>)
    )
        test('Title renders',()=>{

            const title=screen.getByText( /Add a marker!/i)
            expect(title).toBeInTheDocument();
            const subtitle=screen.getByText( /Click on the map after filling this form/i)
            expect(subtitle).toBeInTheDocument();

        })
        test('Add name functionality',()=>{
            const nameField=screen.getByText( /Name:/i)
            expect(nameField).toBeInTheDocument();

        })

        test('Select privacy level',()=>{
            const pubButton=screen.getByDisplayValue( /Public/i)
            expect(pubButton).toBeInTheDocument();
            const privButton=screen.getByDisplayValue( /Private/i)
            expect(privButton).toBeInTheDocument();
            fireEvent.click(pubButton)
            expect(pubButton).toBeChecked()
            expect(privButton).not.toBeChecked()
            fireEvent.click(privButton)
            expect(privButton).toBeChecked()
            expect(pubButton).not.toBeChecked()



        })
        test('Add picture functionality',()=>{

            const addpicButton=screen.getByLabelText( /add image/i)
            expect(addpicButton).toBeInTheDocument();

        })
        test('Add description functionality',()=>{

            const description=screen.getByLabelText( /Description/i)
            expect(description).toBeInTheDocument();
            expect(description).toBeEmpty()
        })
        test('Finish button',()=>{

            const finishButton=screen.getByLabelText( /Finish button/i)
            expect(finishButton).toBeInTheDocument();



        })
});