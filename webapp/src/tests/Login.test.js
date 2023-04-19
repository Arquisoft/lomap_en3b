import {fireEvent, queryAllByRole, queryAllByText, render, screen} from "@testing-library/react";
import Header from "../components/Header";
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
    })

    test('providerList',()=>{

        const providerOption=screen.getAllByRole('button' )[0]
        expect(providerOption).toBeInTheDocument();

        fireEvent.click(providerOption)

        const providerList=["inrupt","solid community","solid web","inrupt pod browser"]

        for (let i = 0; i <providerList.length ; i++) {

            expect(screen.getByLabelText(providerList[i])).toBeInTheDocument();
            }


    })


});