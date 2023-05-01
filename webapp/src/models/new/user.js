import {checkStringInvalidFormat} from "../../util/utilMethods";

export class User {
    locations = new Map(); // a map to store the user's locations
    reviews = new Map(); // a map to store the user's reviews
    userWebId; // the user's WebID
    locResourceURL = "/lomap/locations.ttl"; // the URL for the user's location resource
    revResourceURL = "/lomap/reviews.ttl"; // the URL for the user's review resource
    imgResourceURL = "/lomap/images"; // the URL for the user's image resource

    /**
     * Constructor for the User class.
     * @param {*} sessionGiven - An object containing information about the user's session.
     */
    constructor(sessionGiven) {
        checkStringInvalidFormat(sessionGiven, 'userWebId' );
        this.userWebId = sessionGiven.info.webId.replace("/profile/card#me", "/");
    }

    /**
     * Method to add a location to the user's list of locations.
     * @param {LocationLM} loc - The location to add.
     */
    addLocation(loc){
        if(!this.locations.has(loc.locID)) {
            this.locations.set(loc.locID, loc);
        }
    }

    /**
     * Adds a review to the user's reviews Map object.
     * @param {ReviewLM} rev - The review to be added.
     */
    addReview(rev){
        let aux;
        if(!this.reviews.has(rev.ItemReviewed)) {
            aux = this.reviews.get(rev.ItemReviewed);
        } else{
            aux = [];
        }
        aux = aux.push(rev);
        this.reviews.set(rev.ItemReviewed, aux);
    }

}