import {User} from "../models/user";
import {readLocations, writeLocations} from "../handlers/podAccess";
import {
    convertViewLocationsIntoDomainModelLocations,
    convertDomainModelLocationsIntoViewLocations
} from "../util/dataConvertor";
import {getFriendsWebIds} from "../handlers/podHandler";

class Controller{
    
    constructor(session) {
        this.user = new User(session);
        this.user.friends = getFriendsWebIds();
        console.log(this.user);
    }

    /**
     * This method loads the location form the user's POD into our domain model
     * it also returns the locations in the view format
     * @param {*} session user's session
     * @returns an array of locations 
     */
    async retrieveLocations(session){
        //Get user's Locations
        await this.getLocationsFromPOD(session);

        //Get user's friends' locations
        this.retrieveFriendsLocations(session);

        //Convert them into ViewLocations
        return convertDomainModelLocationsIntoViewLocations(this.user.locations);

    }

    retrieveFriendsLocations(session){
        this.user.friends.forEach((friend) => 
        {
            //For each friend, add location
            this.getLocationsFromPOD(friend, session)
        });;
    }

    /**
     * This method handles the insertion into user's pod
     * @param {*} session user's session
     * @param {*} markers list of locations to add into the pod
     */
    async saveLocations(session, markers){
        //Convert markers into LocationLM
        let locations = convertViewLocationsIntoDomainModelLocations(
            markers,
            this.user.WebID);

        //Get list of locations to save in the POD
        let ret = this.user.addLocations(locations);

        //Save new locations in the pod
        await this.setLocationsFromPOD(session, ret);
    }

    /**
     * This method gets the Locations from the pod as a list of LocationLM.
     * Get both locations, private and public, and stores them in one array 
     * that is returned.
     * @param {*} session user's current session
     * @returns a list of locationLM (our domain model Location)
     */
    async getLocationsFromPOD(user, session){
        let retPublic = [];
        //Public
        retPublic =  await readLocations(
            user.WebID.concat(user.resourceURLPublic.locat), 
            session
        ); 
        this.user.addPublicLocations(retPublic, user);

        //Private
        let retPrivate = [];
        retPrivate =  await readLocations(
            user.WebID.concat(user.resourceURLPrivate.locat), 
            session
        ); 
        this.user.addPrivateLocations(retPrivate, user);
    }

    /**
     * This method save the list of LocationsLM into the user's pod
     * @param {*} session user's session
     * @param {*} list list of locations object from out domain model
     */
    async setLocationsFromPOD(session, list){
        list.forEach(async (loc) => {
            /*
            console.log("Control - Locat");
            console.log(loc);
            */
            if(loc.privacy === 'public'){
                /*
                console.log("test");
                console.log(loc.webId);
                console.log(this.user.resourceURLPublic.locat);
                console.log(loc.webId.concat(this.user.resourceURLPublic.locat));
                */
                await writeLocations(
                    loc.webId.concat(this.user.resourceURLPublic.locat), 
                    session,
                    loc
                ); 
            } else {
                await writeLocations(
                    loc.webId.concat(this.user.resourceURLPrivate.locat), 
                    session,
                    loc
                ); 
            }
       });
   }
}

export{
    Controller
}