import {fireEvent, render, screen} from '@testing-library/react'
import Header from '../components/Header'
import MapView from "../views/mapView";
import React from 'react'
const mockImpl=()=>{}
describe('Header renders all options',()=>{

        beforeEach(()=>
         render(<Header onAddMarker={mockImpl()} onInfoList={mockImpl()} onAccountPage={mockImpl()} onFilterLocations={mockImpl()}/>)
        )


    test('Title',()=>{

        const title=screen.getByText('LOMAP')
        expect(title).toBeInTheDocument();

    })

    test('ToolBar',()=>{

        const toolBar=screen.getByLabelText(/ToolBar/i)
        expect(toolBar).toBeInTheDocument();

    })
    test('Friends ',()=>{

        const friendsMenu=screen.getByLabelText(/Friend Menu/i)
        expect(friendsMenu).toBeInTheDocument();

    })

    test('Add locations',()=>{

        const AddLoc=screen.getByLabelText( /Add Location/i)
        expect(AddLoc).toBeInTheDocument();

    })
    test('Show Profile',()=>{

        const profile=screen.getByLabelText( /Show Profile/i)
        expect(profile).toBeInTheDocument();

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
