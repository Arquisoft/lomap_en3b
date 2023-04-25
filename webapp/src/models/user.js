import {LocationLM} from "./location";

/**
 * This class represents de current user that uses the app.
 * The user will have a set of locations (public or private)
 * a resource URL where the data will be stored and received (this resource is a partial path)
 * it will be used for:
 *      - Location
 *      - Reviews
 *      - Images
 * , a list of new locations (to insert in the pod) and a webID.
 */
export class User{
    locations = new Map();
    newLocations = [];
    userWebId;
    locResourceURL = "/lomap/locations.ttl";
    revResourceURL = "/lomap/reviews.ttl";
    imgResourceURL = "/lomap/images";
    constructor(sessionGiven) {
        this.userWebId = sessionGiven.info.webId.replace("/profile/card#me", "/");
    }

    /**
     * This method add the locations given in a list to the user's locations.
     * If the location is already contained, it is skipped.
     * It also fills the locOwner field from the Location to the one given
     * @param {LocationLM[]} listLocs list of locations
     * @param {string} webID owner of the locations
     */
    addLocationsFromPOD(listLocs, webID) {
        listLocs.forEach( (loc) => {
            if (! this.locations.has(loc.locID)) {
                loc.locOwner = webID;
                this.locations.set(loc.locID, loc);
            }
        });
    }

    /**
     * It checks is the locations are already contained. All will be added but
     * the newLocations array will be fill with the new ones
     * @param {LocationLM[]} listLocs list of locations
     * @param {string} webID owner of the locations
     */
    addLocations(listLocs, webID){
        listLocs.forEach( (loc) => {
            if (! this.locations.has(loc.locID)) {
                loc.locOwner = webID;
                this.locations.set(loc.locID, loc);
            } else {
                loc.locOwner = webID;
                this.locations.set(loc.locID, loc);
                this.newLocations.push(loc);
            }
        });
    }

    /**
     * This method returns the list of new locations, and it resets the
     * list to empty.
     * @returns {*[]}
     */
    getNewLocations(){
        let ret = [];
        ret = this.newLocations;
        this.newLocations = [];
        return ret;
    }
}