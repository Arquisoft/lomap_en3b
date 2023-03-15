import './App.css';
import { SessionProvider} from "@inrupt/solid-ui-react";
import { useState} from "react";
import LoginForm from "./components/LoginForm"
import { useSession } from "@inrupt/solid-ui-react/dist";

import AuthenticatedUserView from "./components/UserView";
import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom"


import{GoogleMap, useLoadScript,Marker, InfoWindow} from "@react-google-maps/api";

import Header from "./components/Header"; // Tell Webpack this JS file uses this image
import {formatRelative} from "date-fns";
import mapStyles from "./mapStyles";


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




