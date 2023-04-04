import {useSession} from "@inrupt/solid-ui-react";
import {checkForLomap} from "./podHandler";
import * as sessionMetho from "@inrupt/solid-client-authn-browser";
import {User} from "../models/user";

class SessionManager{
    //With this we can control the login status for solid
    //session;
    session = sessionMetho;
    isLoggedIn = false;
    user
    constructor() {
        //this.session = useSession();
        this.session.getDefaultSession()
        //this.session = sessionMetho.getDefaultSession();
    }

    sessionState() {
        //We have logged in
        this.session.onLogin(async () => {
            let pod = await checkForLomap(this.session);
            this.user.setPodURL(pod);
            this.isLoggedIn = true;

        });
        //We have logged out
        this.session.onLogout(() => {
            this.isLoggedIn = false;
        })
    }
}

export {
    SessionManager,
}