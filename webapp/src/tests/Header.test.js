import {fireEvent, render, screen} from '@testing-library/react'
import Header from '../components/Header'
import MapView from "../views/mapView";
import React from 'react'
const mockImpl=()=>{}
describe('Header renders all options',()=>{

        beforeEach(()=>
         render(<Header onAddMarker={mockImpl()} onInfoList={mockImpl()}   onFilterLocations={mockImpl()}/>)
        )


    test('Title',()=>{

        const title=screen.getByText('LOMAP')
        expect(title).toBeInTheDocument();

    })

    test('ToolBar',()=>{

        const toolBar=screen.getByLabelText(/ToolBar/i)
        expect(toolBar).toBeInTheDocument();

    })


    test('Add locations',()=>{

        const AddLoc=screen.getByLabelText( /Add Location/i)
        expect(AddLoc).toBeInTheDocument();

    })

    test('Filter Locations',()=>{

        const filterButton=screen.getByLabelText( /Filter Locations/i)
        expect(filterButton).toBeInTheDocument();

    })

    test('Log Out',()=>{

        const filterButton=screen.getByLabelText( /Log out/i)
        expect(filterButton).toBeInTheDocument();



    })
});
