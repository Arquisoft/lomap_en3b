import './views/styles/App.css';
import { SessionProvider} from "@inrupt/solid-ui-react";
import { useState} from "react";
import LoginForm from "./views/loginView"
import { useSession } from "@inrupt/solid-ui-react/dist";
import { checkForLomap } from './handlers/podHandler';
import  {issueAccessRequest} from '@inrupt/solid-client-access-grants';


import AuthenticatedUserView from "./views/mapView";


export default  function App()
{
//We use this state variable
    const [isLoggedIn, setIsLoggedIn] = useState(false);

//With this we can control the login status for solid
    const {session} = useSession();

//We have logged in
    session.onLogin(() => {
            checkForLomap(session.info.webId).then((podWithFolder)=>{
                if(podWithFolder) {
                    setIsLoggedIn(true);//now the user will see the map
                }
                 }).catch(()=>{
                     alert("An error has ocurred while entering lomap.")});
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

    async function requestAccessToLomap( resourceOwner,webid){

        //this part sets the requested access (if granted) to expire in 5 minutes.
        let accessExpiration = new Date( Date.now() +  5 * 60000 );

        // Call `issueAccessRequest` to create an access request
        const requestVC = await issueAccessRequest( //Vc stands for Verifiable credential
            {

                "access":  { read: true , write:true},//the permissions to be asking
                "resources":webid+'lomap/' ,   // Array of URLs=in this case lomaps folder url
                "resourceOwner": resourceOwner,
                "expirationDate": accessExpiration,
                "purpose": [ "https://example.com/purposes#print" ]
            },
            { fetch : session.fetch ,updateAcr:true}//update acr makes the request grant effective if given
        );
    }
}




