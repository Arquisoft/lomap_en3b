import './views/styles/App.css';
import { SessionProvider} from "@inrupt/solid-ui-react";
import { useState} from "react";
import LoginForm from "./views/loginView"
import { useSession } from "@inrupt/solid-ui-react/dist";
import { checkForLomap } from './handlers/PodHandler';
import { requestAccessToLomap } from './handlers/PodHandler';
import AuthenticatedUserView from "./views/mapView";
import {User} from "./models/User";
import {writeLocations1} from "./handlers/PodAccess";



const {session} = useSession();
export default  function App()
{
//We use this state variable
    const [isLoggedIn, setIsLoggedIn] = useState(false);

//With this we can control the login status for solid

    const user = new User();

//We have logged in
    session.onLogin(async () => {

        user.podURL = await checkForLomap(session);
         setIsLoggedIn(true);

    });
//We have logged out
    session.onLogout(async () => {

        await writeLocations1(session, user);
        setIsLoggedIn(false)
    })

    return (
        <SessionProvider sessionId="log-in-example"  restorePreviousSession='true' >

            {(!isLoggedIn) ?  <LoginForm/> : <AuthenticatedUserView/>}

        </SessionProvider>
    )

}




