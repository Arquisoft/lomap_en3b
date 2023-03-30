import './views/styles/App.css';
import { SessionProvider} from "@inrupt/solid-ui-react";
import { useState} from "react";
import LoginForm from "./views/loginView"
import AuthenticatedUserView from "./views/mapView";
import {Controller} from "./handlers/controller";




export default  function App()
{
    //We use this state variable
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const crl = new Controller();
    //With this we can control the login status for solid
    //const {session} = useSession();

    crl.sessionHandler(isLoggedIn);
    setIsLoggedIn(crl.getSessionState());


    return (
        <SessionProvider sessionId="log-in-example"  restorePreviousSession='true' >

            {(!isLoggedIn) ?  <LoginForm/> : <AuthenticatedUserView/>}

        </SessionProvider>
    )

}