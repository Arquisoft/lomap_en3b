import React, {useEffect} from "react";
import {requestAccessToLomap} from "../handlers/PodHandler";
//import DropdownList from "react-widgets/DropdownList";
import {Box, Button, Modal, Typography} from "@mui/material";
import {LogoutButton, SessionProvider, useSession} from "@inrupt/solid-ui-react";
function ChildModal() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <React.Fragment>
            <Button onClick={handleOpen}>Cancel</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="child-modal-title"
                aria-describedby="child-modal-description"
            >
                <Box sx={{  width: 200 }}>
                    <h2 id="child-modal-title">Are you sure?</h2>
                    <p id="child-modal-description">
                       You can only access lomap if you have a LoMap folder
                    </p>
                    <Button onClick={handleClose}>stay</Button>
                    <SessionProvider sessionId="LoMap">
                        <LogoutButton>
                            <Button onClick={handleClose}>Leave</Button>
                        </LogoutButton>
                    </SessionProvider>
                </Box>
            </Modal>
        </React.Fragment>
    );
}





function ModalDialogue(podSet){
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return(
        <>

                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box >
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Choose a pod to create the LoMap Folder at.
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                           You'll need to provide LoMap with read and write permissions.
                            For that, you will be redirected to your browser's access management.
                        </Typography>
                        <SessionProvider sessionId="LoMap">

                                <Button onClick={console.log(podSet)}>Proceed</Button>

                        </SessionProvider>

                        <ChildModal />
                    </Box>
                </Modal>
        </>

    );
};


export default ModalDialogue;