import {LocationLM} from "./location";
/**
 * User LoMap class
 */
class User{
    /** User's name */
    name;
    /** List of public locations */
    publicLocat = new Map();
    /** List of private locations*/
    privateLocat = new Map();
    /** List of private reviews*/
    privateReviews = new Map();
    /** List of public reviews*/
    publicReviews = new Map();
    /** List of user's friends*/
    friendsLocat = [];

    /**
     * Constructor of User's class. Initialise the resource's URLs that will be used 
     * to retrieve and save data from/to the user's solid pod.
     */
    constructor() {
        this.resourceURLPublic = {
            locat:  "public/lomap/locations.ttl",
            rev:    "public/lomap/reviews.ttl",
            imgs:   "public/lomap/images/",
        };
        this.resourceURLPrivate = {
            locat:  "private/lomap/locations.ttl",
            rev:    "private/lomap/reviews.ttl",
            imgs:   "private/lomap/images/",
        };
    }

    /**
     * This method adds new locations to the user's list. 
     * @param {Array} list of locations to add
     * @returns a list with locations that need to be updated or added to the pod.
     */
    addLocations (list){
        let ret = [];
        list.forEach(element => {
            
        });
        return [];
    }

    addLocation (priv, loc){
        if(priv === 'public'){
            this.publicLocat.set(loc.key, loc);
        } else {
            this.privateLocat.set(loc.key, loc);
        }
    }
}

export {User};