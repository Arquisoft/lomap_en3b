import {SessionManager} from "./sessionManager";

class Controller{
    sessionMng;
    constructor() {
        this.sessionMng = new SessionManager();
        this.user = new User();
    }

    /**
     * This method handles the session
     * @param isLoggedInValue
     * @returns {Controller}
     */
    sessionHandler(){
        this.sessionMng.sessionState();
        return this;
    }

    getSessionState(){
        return this.sessionMng.isLoggedIn;
    }

    getSession(){
        return this.sessionMng.session;
    }
}

export{
    Controller,
}