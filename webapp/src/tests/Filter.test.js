import {fireEvent, render, screen} from "@testing-library/react";
import MapView from "../views/mapView";
import React from "react";


describe(("Filter menu functionality "),()=>{
    beforeEach(()=>{
        render(<MapView/>)

    })
    test('Show filter menu from header button ',()=>{
        const filtersAvailable=['sight','restaurant','monument','park','bar','shop']
        const filterButton=screen.getByLabelText( /Filter Locations/i)
        fireEvent.click(filterButton)
        const filterContainer=screen.getByLabelText(/Filtering options/i)
        const options=screen.getAllByRole('checkbox')
        for (let i = 0; i <filtersAvailable.length ; i++) {
            if(!filtersAvailable.includes(options[i].value)){
                throw new Error("Filter "+filtersAvailable[i]+" did not render.")
            }
        }
        expect(filterContainer).toBeInTheDocument();

    })
    //test('Filters selected are the ones being sent'){
//jest.spyOn('updateFilterListInUse')
   // }
})