import {LocationLM} from "./location";

/**
 * This class represents de current user that uses the app.
 * The user will have a set of locations (public or private)
 * a resource URL where the data will be stored and received (this resource is a partial path)
 * it will be used for:
 *      - Location
 *      - Reviews
 *      - Images
 * and a webID.
 */
export class User{
    locations = new Map();
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
}