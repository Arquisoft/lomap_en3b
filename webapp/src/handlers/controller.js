import {SessionManager} from "./sessionManager";
import {User} from "../models/user";

class Controller{
    sessionMng;
    constructor() {
        this.sessionMng = new SessionManager();
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

    logIn(){
        //TODO: Modify sessionMng

        //Get Data From POD
        sessionMng.setUpSessionData();
    }

    logOut(){
        //save data into POD
        sessionMng.saveSessionData();
        //TODO: Modify sessionMng

    }

    requestLocations(){
        //Get sessionMng.get User's Locations
        return sessionMng.requestLocations();
    }

    requestReviewToLocation(locId){
        //Get sessionMng.get User's Review to Location
        return sessionMng.requestReviewToLocation(locId);
    }

    addLocation(CoorLat, CoorLng, name, description, category, privacy){
        //sessionMng -> Set new Location in user
        sessionMng.addLocation(CoorLat, CoorLng, name, description, category,privacy);
    }

    addCommentToLocation(locId, cmmt, privacy){
        //sessionMng -> Set comment in Review (in user's location)
        sessionMng.addCommentToLocation(locId, cmmt, privacy);
    }

    addScoreToLocation(locId, scr, privacy){
        //sessionMng -> Set comment in Review (in user's location)
        sessionMng.addScoreToLocation(locId, scr, privacy);
    }
}

export{
    Controller,
}