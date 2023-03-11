import {LoginButton, SessionProvider} from "@inrupt/solid-ui-react";

import React from 'react';
import {Button} from "@mui/material";

function  Login( ){

    const provider="https://login.inrupt.com/"; //url of the pod provider. Will consider making a multiple choice cbox.
    const appName="LoMap"; //Our app where the user has been redirected from

    //sessionProvider Wil provide child components of session data.
    //Its VERY important that login button is inside a session data component.
    return (
        <section >
        <SessionProvider sessionId="">
                    <LoginButton  oidcIssuer={provider} redirectUrl={window.location.href} clientName={appName}>
                        <Button size="large" variant="outlined" color="primary"  >Log In</Button>
            </LoginButton>

        </SessionProvider>
        </section>

    );
}
export default Login;