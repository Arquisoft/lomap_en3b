import {User} from "../models/new/user";

export class Controller {
    /**
     * Creates a new Controller instance.
     * @param {*} sessionGiven - The session object.
     */
    constructor(sessionGiven){
        this.session = sessionGiven;
        this.user = new User(sessionGiven);
    }

    /**
     * Adds a new location to the user's list of locations. If the location already exists in the user's
     * list of locations nothing is added
     * @param {LocationLM} loc - The location to add.
     */
    newAddLocation (loc){
        this.user.addLocation(loc)
    }

    /**
     * Checks if a location can be added to the user's list of locations.
     * @param {LocationLM} loc - The location to check.
     * @returns {boolean} - True if the location can be added, false otherwise.
     */
    canBeLocationAdded(loc){
        for (let value of this.user.locations.values()){
            if(value.name === loc.name && value.lat === loc.lat
                && value.lng === loc.lng && value.privacy === loc.privacy){
                return false;
            }
        }
        return true;
    }

    /**
     * Adds a new review to the user's list of reviews.
     * @param {ReviewLM} rev - The review to add.
     */
    newAddReview (rev){
        this.user.addReview(rev)
    }

    /**
     * Checks if a review can be added to the user's list of reviews.
     * @param {ReviewLM} rev - The review to check.
     * @returns {boolean} - True if the review can be added, false otherwise.
     */
    canBeReviewAdded(rev){
        //TODO: How can be this be done?
    }

    /**
     * This method add a list of location retrived from the pod to the user's list of locations
     * @param {LocationLM[]} listLocs list of locations from the pod
     */
    saveLocationsFromPOD(listLocs){
        listLocs.forEach( (loc) => {
            //Add location
            console.log(loc);
            this.newAddLocation(loc);
        });
    }
}