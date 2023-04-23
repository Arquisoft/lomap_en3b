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
    /** List of all the locations */
    locations = [];

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
     * This method add location to the public map of locations
     * @param {Array} list 
     */
    addPublicLocations(list){
        list.forEach( (loc) => 
        {
            this.addPublicLocation(loc);
        });
    }

    addPublicLocation(loc){
        this.publicLocat.set(
            loc.locID, 
            loc
        );
        this.locations.push(loc);
    }

    /**
     * This method add location to the private map of locations
     * @param {Array} list 
     */
    addPrivateLocations(list){
        list.forEach( (loc) => 
        {
            this.addPrivateLocation(loc);
        });

    }

    addPrivateLocation(loc){
        this.privateLocat.set(
            loc.locID, 
            loc
        );
        this.locations.push(loc);
    }

    addLocations(list){
        let ret = [];
        list.forEach((loc) => {
            if(loc.privacy === 'public'){
                //check if already contained
                if(this.publicLocat.has(loc.locID)){
                    //check is anyting has been modified
                    //TODO: decide how to check when a location has been changed
                } else {
                    this.addPublicLocation(loc);
                    ret.push(loc);
                }
            } else {
                if(this.privateLocat.has(loc.locID)){
                    //check is anyting has been modified
                    //TODO: decide how to check when a location has been changed
                } else {
                    this.addPrivateLocation(loc);
                    ret.push(loc);
                }                
            }
        });

        return ret;
    }

}

export {User};