import './views/styles/App.css';
import { SessionProvider} from "@inrupt/solid-ui-react";
import { useState} from "react";
import LoginForm from "./views/loginView"
import { useSession } from "@inrupt/solid-ui-react/dist";
import { checkForLomap } from './handlers/podHandler';
import { requestAccessToLomap } from './handlers/podHandler';
import  {issueAccessRequest} from '@inrupt/solid-client-access-grants';
import AuthenticatedUserView from "./views/mapView";
import ModalDialogue from "./components/ModalDialogue";


export default  function App()
{
//We use this state variable
    const [isLoggedIn, setIsLoggedIn] = useState(false);

//With this we can control the login status for solid
    const {session} = useSession();
    let podSet=[];
//We have logged in
    session.onLogin(() => {
        checkForLomap(session).then((pods) => {

            if (pods.length <= 1)
                setIsLoggedIn(false);//now the user will see the map
            else{
                podSet=pods;
            }
        });
        return (
            <SessionProvider sessionId="log-in-example">

                {(!isLoggedIn) ? <AuthenticatedUserView/> : <ModalDialogue podSet={podSet}/>}

            </SessionProvider>
        )


    });
//We have logged out
    session.onLogout(() => {
        setIsLoggedIn(false)
    })

    return (
        <SessionProvider sessionId="log-in-example">

            {(!isLoggedIn) ?  <LoginForm/> : <AuthenticatedUserView/>}

        </SessionProvider>
    )

}




