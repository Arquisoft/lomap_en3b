import React, {useEffect} from "react";

import DropdownList from "react-widgets/DropdownList";

const ModalDialogue=((open)=>{

    if(!open) return null;
    return(
        <div className="overlay">
            <div  className="modalContainer">
                <div className="modalRight">
                    <div className="content">
                        <h3>Choose a pod to create your folder</h3>

                    </div>
                    <div className="podList">
                        <DropdownList
                            defaultValue="pod1"
                            data={["Pod1", "Pod2", "Pod3", "Pod4"]}
                        />
                        <button
                        className="podChosen"
                        onClick={()=>open(false)}>
                            Create folder
                        </button>
                        <button
                            className="cancel"
                            onClick={()=>open(false)}>
                            Exit
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
});


export default ModalDialogue;