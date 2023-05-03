import {checkStringInvalidFormat} from "../util/utilMethods";
import {getProfilePicture} from "../handlers/podHandler";

export class User {
    profilePicture;
    locations = new Map(); // a map to store the user's locations
    reviews = new Map(); // a map to store the user's reviews
    userWebId; // the user's WebID
    locResourceURL = "/lomapen3b/locations.ttl"; // the URL for the user's location resource
    revResourceURL = "/lomapen3b/reviews.ttl"; // the URL for the user's review resource
    imgResourceURL = "/lomapen3b/images"; // the URL for the user's image resource

    /**
     * Constructor for the User class.
     * @param {*} sessionGiven - An object containing information about the user's session.
     */
    constructor(sessionGiven) {
        checkStringInvalidFormat(sessionGiven, 'userWebId');
        this.userWebId = sessionGiven.info.webId.replace("/profile/card#me", "/");
        this.profilePicture = getProfilePicture(sessionGiven.info.webId)
            .then( (pic) =>
            {
                return pic;
            })
            .catch( () => {
                console.error("Something went wrong while getting the user's picture! ");
            });
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
        if (this.reviews.has(rev.ItemReviewed)) {
            this.reviews.get(rev.ItemReviewed).push(rev);
        } else {
            this.reviews.set(rev.ItemReviewed, [rev]);
        }
    }
}