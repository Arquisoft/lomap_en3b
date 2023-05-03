import {fireEvent, getByLabelText, render, screen} from "@testing-library/react";
import MapView from "../views/mapView";
import React from "react";


describe(("Filter menu functionality "),()=>{
    beforeEach(()=>{
        render(<MapView/>)
        const filterButton=screen.getByLabelText( /Filter Locations/i)
        fireEvent.click(filterButton)
    })
    test('Show filter menu from header button ',()=>{
        const filtersAvailable=['sight','restaurant','monument','park','bar','shop']
        const filterContainer=screen.getByLabelText(/Filtering options/i)
        const options=screen.getAllByRole('checkbox')
        for (let i = 0; i <filtersAvailable.length ; i++) {
            if(!filtersAvailable.includes(options[i].value)){
                throw new Error("Filter "+filtersAvailable[i]+" did not render.")
            }
        }
        expect(filterContainer).toBeInTheDocument();

    })
    test('Filter selected',()=>{

        const filter=screen.getByDisplayValue(/shop/i)
        fireEvent.click(filter);
        expect(filter).toBeChecked();


    })
    test('Filter deselected',()=>{

        const filter=screen.getByDisplayValue(/restaurant/i)
        fireEvent.click(filter);
        expect(filter).toBeChecked();
        fireEvent.click(filter);
        expect(filter).not.toBeChecked();

    })
    test('Filter color changes',()=>{
        let yellowIcon=document.querySelector("svg[color='yellow']");
        expect(yellowIcon).not.toBeInTheDocument();
        const filter=document.querySelector("input[value='sight']");
        fireEvent.click(filter);
        expect(filter).toBeChecked();
        yellowIcon=document.querySelector("svg[color='yellow']");
        expect(yellowIcon).toBeInTheDocument();
        fireEvent.click(filter);
        expect(filter).not.toBeChecked();
        yellowIcon=document.querySelector("svg[color='yellow']");
        expect(yellowIcon).not.toBeInTheDocument();
    })
})