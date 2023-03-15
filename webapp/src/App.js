import './styles/App.css';
import { SessionProvider} from "@inrupt/solid-ui-react";
import { useState} from "react";
import LoginForm from "./components/LoginForm"
import { useSession } from "@inrupt/solid-ui-react/dist";

import AuthenticatedUserView from "./components/UserView";


export default function App()
{
//We use this state variable
    const [isLoggedIn, setIsLoggedIn] = useState(false);

//With this we can control the login status for solid
    const {session} = useSession();

//We have logged in
    session.onLogin(() => {
        setIsLoggedIn(true)
    })

//We have logged out
    session.onLogout(() => {
        setIsLoggedIn(false)
    })

    return (
        <SessionProvider sessionId="log-in-example">
            {(!isLoggedIn) ? <LoginForm/> : <AuthenticatedUserView/>}
        </SessionProvider>
    )


}




