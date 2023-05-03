import {render, screen} from "@testing-library/react";
import ErrorView from "../views/errorView";
import React from "react";

describe('Header renders all options',()=>{

    beforeEach(()=>
        render(<ErrorView/>)
    )


    test('Error message',()=>{

        const title=screen.getByText('We are sorry..')
        expect(title).toBeInTheDocument();

        const subtitle=screen.getByText('An error occurred')
        expect(subtitle).toBeInTheDocument();
    })


});
