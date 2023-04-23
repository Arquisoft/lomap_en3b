import {User} from "../models/user";
import {readLocations, writeLocations} from "../handlers/podAccess";
import {
    convertViewLocationIntoDomainModelLocation,
    
    convertViewLocationsIntoDomainModelLocations,
    convertDomainModelLocationsIntoViewLocations
} from "../util/dataConvertor";

class Controller{
    
    constructor(session) {
        this.user = new User();
    }

    /**
     * This method loads the location form the user's POD into our domain model
     * it also returns the locations in the view format
     * @param {*} session user's session
     * @returns an array of locations 
     */
    async retrieveLocations(session){
        await this.getLocationsFromPOD(session);

        //Convert them into ViewLocations
        return convertDomainModelLocationsIntoViewLocations(this.user.locations);

    }

    /**
     * This method handles the insertion into user's pod
     * @param {*} session user's session
     * @param {*} markers list of locations to add into the pod
     */
    async saveLocations(session, markers){
        //Convert markers into LocationLM
        let locations = convertViewLocationsIntoDomainModelLocations(markers);

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
    async getLocationsFromPOD(session){
        let retPublic = [];
        //Public
        retPublic =  await readLocations(
            session.info.webId.replace(
                "/profile/card#me", 
                this.user.resourceURLPublic.locat), 
            session
        ); 
        this.user.addPublicLocations(retPublic);

        //Private
        let retPrivate = [];
        retPrivate =  await readLocations(
            session.info.webId.replace(
                "/profile/card#me", 
                this.user.resourceURLPrivate.locat), 
            session
        ); 
        this.user.addPrivateLocations(retPrivate);
    }

    /**
     * This method save the list of LocationsLM into the user's pod
     * @param {*} session user's session
     * @param {*} list list of locations object from out domain model
     */
    async setLocationsFromPOD(session, list){
        let retPublic = [];

        list.forEach(async (loc) => {
            if(loc.privacy === 'public'){
                await writeLocations(
                    session.info.webId.replace(
                        "/profile/card#me", 
                        this.user.resourceURLPublic.locat), 
                    session,
                    loc
                ); 
            } else {
                await writeLocations(
                    session.info.webId.replace(
                        "/profile/card#me", 
                        this.user.resourceURLPrivate.locat), 
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