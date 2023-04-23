//import {useSession} from "@inrupt/solid-ui-react";
//import * as sessionMetho from "@inrupt/solid-client-authn-browser";
import {readLocations, writeLocations} from "./podAccess";
class SessionManager{
    //With this we can control the login status for solid
    //session;

    session;
    user = new User();
    constructor(session) {
        this.session = session;
    }

    async setUpSessionData(){
        //Access user's pod and get the location & reviews
        let retPublic = await readLocations(this.user.resourceURLPublic, this.session.getDefaultSession());
        let retPrivate = await readLocations(this.user.resourceURLPrivate, this.session.getDefaultSession());

        //await readLocations(this.user.resourceURLPublic, this.session);
        //await readLocations(this.user.resourceURLPublic, this.session);

        retPublic.forEach((loc) =>
        {
            this.user.saveLocationsFromPOD(loc, false)
        });

        retPrivate.forEach((loc) =>
        {
            this.user.saveLocationsFromPOD(loc, true)
        });

    }
    async saveSessionData(){
        //Access user's pod and save current session Locations and reviews
        await writeLocations(this.user, this.session.getDefaultSession());

        //await writeLocations(this.user, this.session);
    }

    requestLocations(){
        //
        return this.user.getAllLoc();
    }

    requestReviewToLocation(locId){
        //
        return this.user.getReviewsForLoc(locId);
    }

    addLocation(CoorLat, CoorLng, name, description, category, privacy){
        //
        this.user.addLocation(CoorLat, CoorLng, name, description, category, privacy);
    }

    addCommentToLocation(locId, cmmt, privacy) {
        //
        this.user.addCommentReviewToLoc(locId, cmmt, privacy);

    }

    addScoreToLocation(locId, scr, privacy) {
        //
        this.user.addScoreReviewToLoc(locId, scr, privacy);
    }


}

export {
    SessionManager,
}