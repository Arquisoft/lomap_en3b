import {User} from "../models/user";
import {readLocations, writeLocationsNew} from "./podAccess";
import {
    convertDomainModelLocationsIntoViewLocations,
    convertViewLocationsIntoDomainModelLocations
} from "../util/Convertor";
import {getFriendsWebIds} from "./podHandler";

/**
 * Class to handle business logic
 */
export class Controller {
    copy;
    /**
     * Constructor of the class. It initialises the object and sets the user's data
     * to start working with it. Also, it saves the current session to be used in
     * some methods.
     * @param sessionGiven
     */
    constructor(sessionGiven){
        this.session = sessionGiven;
        this.user = new User(sessionGiven);
    }

    async saveRetrievedLocations() {
        let friends = await getFriendsWebIds(this.user.userWebId);
        // Code to get the friends locations
        console.log()
        let locations = await readLocations(
            this.user.userWebId.concat("public".concat(this.user.locResourceURL)),
            this.session,
            this.user.userWebId);

        //I should load this to the user
        this.saveLocationsFromPOD(locations);

        locations = locations.concat(await readLocations(
            this.user.userWebId.concat("private".concat(this.user.locResourceURL)),
            this.session,
            this.user.userWebId));

        let friendsLocations = [];
        for (let i = 0; i < friends.length; i++) {
            try {
                let fWebID = friends[i].replace("/profile/card", "/");
                console.log(friends[i].replace("/profile/card", "/").concat("public".concat(this.user.locResourceURL)))
                //concat it with the previous locations (concat returns a new array instead of modifying any of the existing ones)
                let aux = await readLocations(
                    friends[i]
                        .replace("/profile/card", "/")
                        .concat("public"
                            .concat(this.user.locResourceURL)),
                    this.session,
                    fWebID);
                //Save to user
                this.saveLocationsFromPOD(aux);
                // keep as before
                friendsLocations = friendsLocations.concat(aux);
            } catch (err) {
                //Friend does not have LoMap??
                console.log(err);
            }
        }
        this.copy = locations.concat(friendsLocations);
        //return locations.concat(friendsLocations);
        console.log("Final:");
        console.log(this.copy);
        return this.copy;
    }

    getViewLocations(){
        return convertDomainModelLocationsIntoViewLocations(this.user.getAllLocations());
    }

    /**
     * This method assigns a list of locations to the current user.
     * @param {LocationLM[]} list list of locations of type LocationLM
     * @param {User} user POD's owner where the locations come from
     */
    saveLocationsFromPOD(list){
        this.user.addLocationsFromPOD(list);
    }

    /**
     * This method saves location from the user session
     * into the Solid PODs
     * @returns {Promise<void>}
     */
    async saveLocationsToPOD() {
        //Get list of locations
        let locats = this.user.getNewLocations();

        if (locats.length !== 0) {
            //Iterate over the list saving the locations
            for (const loc of locats) {
                let owner = loc.locOwner;
                let resourceURL = owner.concat(loc.privacy).concat(this.user.locResourceURL);

                //Insert in POD
                await writeLocationsNew(resourceURL, this.session, loc);
            }
            window.alert("Saved");
        }
    }

    /**
     * This method updates the locations of the user
     * @param {Object[]} list list of locations from the View layer
     * @returns {Object[]} a list of markers with the id of the domain layer
     */
    updateUserLocations(list){
        let ret = convertViewLocationsIntoDomainModelLocations(list);

        let auxList = ret[0];

        if(Array.isArray(auxList)) {
            this.user.addLocations(auxList, this.user.userWebId)
        }
        return ret[1];
    }

    /**
     * This method helps the view layer to know were an insertion to the pod can be performed
     * @returns {boolean} If nothing new return false, false otherwise
     */
    canAdd(){
        let aucx = this.user.newLocations;
        return aucx.length !== 0;
    }


    //TO REMOVE IF EVERYTHING WORKS
    /*
    async saveRetrievedLocations() {
        let friends = await getFriendsWebIds(this.session.info.webId);
        let resource = this.session.info.webId.replace("/profile/card#me", "/private/lomap/locations.ttl");
        // Code to get the friends locations
        let locations = await readLocations(resource, this.session);
        resource = this.session.info.webId.replace("/profile/card#me", "/public/lomap/locations.ttl");
        locations = locations.concat(await readLocations(resource, this.session));
        let friendsLocations = [];
        for (let i = 0; i < friends.length; i++) {
            try {
                //concat it with the previous locations (concat returns a new array instead of modifying any of the existing ones)
                friendsLocations = friendsLocations.concat(await readLocations(
                    friends[i].replace("/profile/card", "/") + "public/lomap/locations.ttl",
                    this.session));
            } catch (err) {
                //Friend does not have LoMap??
                console.log(err);
            }
        }
        this.copy = locations.concat(friendsLocations);
        //return locations.concat(friendsLocations);
        return this.copy;
    }

     */

}