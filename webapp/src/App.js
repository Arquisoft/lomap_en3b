import './views/styles/App.css';
import { SessionProvider} from "@inrupt/solid-ui-react";
import { useState} from "react";
import LoginForm from "./views/loginView"
import { useSession } from "@inrupt/solid-ui-react/dist";
import { checkForLomap } from './handlers/podHandler';
import MapView from "./views/mapView";

export default  function App()
{
//We use this state variable
    const [isLoggedIn, setIsLoggedIn] = useState(false);

//With this we can control the login status for solid
    const {session} = useSession();

//We have logged in
    session.onLogin(async () => {

         await checkForLomap(session);

        setIsLoggedIn(true);
    });
//We have logged out
    session.onLogout(() => {
        setIsLoggedIn(false)
    })

    return (
        <SessionProvider sessionId="log-in-example"  restorePreviousSession='true' >

            {(!isLoggedIn) ?  <LoginForm/> : <MapView session={session} />}

        </SessionProvider>
    )

}




