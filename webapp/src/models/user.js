import {Review} from "./review";

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
    reviews = new Map();
    newLocations = [];
    newReviews = [];
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
    addLocationsFromPOD(listLocs) {
        listLocs.forEach( (loc) => {
            if (! this.locations.has(loc.locID)) {
                this.locations.set(loc.locID, loc);
            }
        });
    }

    addReviewsFromPOD(listRevs) {
        listRevs.forEach( (rev) => {
             if (! this.reviews.has(rev.ItemReviewed)) {
                 this.reviews.set(rev.ItemReviewed, rev);
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
        console.log(this);
        //NEW -> Solve problem with duplicates
        listLocs.forEach( (newLoc) => {
            console.log("newLoc")
            console.log(newLoc);
            let added = false;
            for (let myLoc of this.locations.values()) {
                //Check if a locations has been added
                console.log("myLoc")
                console.log(myLoc)
                if((newLoc.lat === myLoc.lat) && (newLoc.lng === myLoc.lng) && (newLoc.name === myLoc.name)){
                    //it has been added
                    added = true;
                }
            }
            console.log("Added")
            console.log(added)
            if(! added){
                newLoc.locOwner = this.userWebId;
                this.locations.set(newLoc.locID, newLoc);
                this.newLocations.push(newLoc);
            }
        });
        console.log(this)
    }
    addReviews(listRevs, webID, locationId){
        listRevs.forEach( (rev) => {
            if (!this.reviews.has(rev.revID)) {
                rev.user = webID;
                this.reviews.set(rev.revID, rev);
                this.newReviews.push(rev);
            }
            /**
            if (! this.reviews.has(rev.revID)) {
                rev.user = webID;
                this.reviews.set(rev.revID, rev);
            } else {
                rev.user = webID;
                this.reviews.set(rev.revID, rev);
                this.newReviews.push(rev);
            }
             */
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

    getNewReviews(){
        let ret = [];
        ret = this.newReviews;
        this.newReviews = [];
        return ret;
    }


    getAllLocations(){
        let ret = [];
        for (let loc in this.locations.values()){
            ret.push(loc);
        }
        return ret;

    }

    /**
     * This method adds a new review to the list of reviews.
     * It returns the new review ID to handle the insertion os content directly to it.
     * @param revLocID
     * @returns {*}
     */
    addReview(revLocID){
        let ret = new Review(revLocID);
        this.reviews.set(ret.revID, ret);
        return ret.revID;
    }
}