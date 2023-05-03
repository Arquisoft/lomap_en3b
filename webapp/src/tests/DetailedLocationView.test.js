import {fireEvent, render, screen,within} from "@testing-library/react";
import EditList from "../components/EditList";
import InfoList from "../components/InfoList";
import {LocationLM} from "../models/location"
import React from "react";
const mockImpl=()=>{}
const selectedLoc=  Array({ name:"Lavender Haze",description:"I love this flower field",category:'park',privacy:'private',key:'283987r',comments:[{comment:'First comment',commentPic:'pic.png',ratingStars:'3'},{comment:'Second comment',commentPic:'pic.png',ratingStars:'3'}]});
describe("Container renders properly",()=>{

    beforeEach(()=>
        render(<InfoList isInfoVisible={mockImpl()} onInfoList={mockImpl()} selected={selectedLoc} newComments={mockImpl()}  onEditMarker={mockImpl()} />)
    )

    test('Container renders',()=>{

        const container=screen.getByLabelText( /detailed view container/i)
        expect(container).toBeInTheDocument();
        let tab=screen.getByLabelText(  "Reviews" )
        expect(tab).toBeInTheDocument();
        tab=screen.getByLabelText("Locations")
        expect(tab).toBeInTheDocument();
        fireEvent.click(tab)
        screen.debug( )
        tab=screen.getByLabelText("Close")
        expect(tab).toBeInTheDocument();

    })
})


 describe('Detailed location view: Location description',()=>{


    beforeEach(()=> {
        render(<InfoList isInfoVisible={true} onInfoList={true} selected={selectedLoc} newComments={mockImpl()}
                         onEditMarker={mockImpl()}/>)
        const tab=screen.getByLabelText("Locations");
        expect(tab).toBeInTheDocument();
        const container=screen.getByLabelText(/details view/i)
        fireEvent.click(tab)
        expect(container).toBeVisible();
    })
    test('Title renders',()=>{


        const title=screen.getByLabelText(/locations name/i)

        expect(title).toBeInTheDocument()
        expect(title).toHaveTextContent('Lavender Haze')


    })

     test('Privacy & category render ',()=>{


         const description=screen.getByLabelText(/locations privacy and category/i)
         expect(description).toBeInTheDocument()
         expect(description).toHaveTextContent(/park • private/i)


     })
     test('Description renders',()=>{


         const description=screen.getByLabelText(/locations description/i)
         expect(description).toBeInTheDocument()
         expect(description).toHaveTextContent('I love this flower field')


     })
     describe('Detailed location view: Comments view',()=>{

         beforeEach(()=> {
             render(<InfoList isInfoVisible={true} onInfoList={true} selected={selectedLoc} newComments={mockImpl()}
                              onEditMarker={mockImpl()}/>)
             const tab=screen.getByLabelText("Reviews");
             expect(tab).toBeInTheDocument();
             const container=screen.getByLabelText(/details view/i)
             fireEvent.click(tab)
             expect(container).toBeVisible();

         })
         test('Title renders',()=>{
             screen.debug()
             const title=screen.getByText(/Reviews/i)
             expect(title).toBeInTheDocument()

         })

         test('Add comment ',()=>{

             const insertLocTextBox=screen.getByPlaceholderText(/Add a comment/i)
             expect(insertLocTextBox).toBeInTheDocument()


         })


     });
});

