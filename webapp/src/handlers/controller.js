import {SessionManager} from "./sessionManager";
import {convertDomainModelObjectsIntoViewObjects} from "../util/Convertor";

class Controller{
    sessionMng;
    setSession(session) {
        this.sessionMng = new SessionManager(session);
    }

    getSession(){
        return this.sessionMng.session;
    }

    async logIn() {
        //Get Data From POD
        await this.sessionMng.setUpSessionData();
        return this;
    }

    logOut(){
        //save data into POD
        this.sessionMng.saveSessionData();
    }

    requestLocations(){
        //Get sessionMng.get User's Locations
        return convertDomainModelObjectsIntoViewObjects(this.sessionMng.requestLocations());
    }

    requestReviewToLocation(locId){
        //Get sessionMng.get User's Review to Location
        return this.sessionMng.requestReviewToLocation(locId);
    }

    addLocation(CoorLat, CoorLng, name, description, category, privacy){
        //sessionMng -> Set new Location in user
        this.sessionMng.addLocation(CoorLat, CoorLng, name, description, category,privacy);
    }

    addCommentToLocation(locId, cmmt, privacy){
        //sessionMng -> Set comment in Review (in user's location)
        this.sessionMng.addCommentToLocation(locId, cmmt, privacy);
    }

    addScoreToLocation(locId, scr, privacy){
        //sessionMng -> Set comment in Review (in user's location)
        this.sessionMng.addScoreToLocation(locId, scr, privacy);
    }
}

export{
    Controller,
}