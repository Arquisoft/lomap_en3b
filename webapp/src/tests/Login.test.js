import {
    fireEvent,
    getByDisplayValue,
    render,
    screen
} from "@testing-library/react";

import React from "react";
import App from "../App"
describe('Login View',()=>{

    beforeEach(()=>
        render(<App/>)//since there is not a session it will redirect to login
    )


    test('Title',()=>{

        const title=screen.getByText('LoMAP')
        expect(title).toBeInTheDocument();
        const subtitle=screen.getByText('Welcome to LoMap')
        expect(subtitle).toBeInTheDocument();
        const helper=screen.getByText('Select an Identity provider')
        expect(helper).toBeInTheDocument();
    })



});