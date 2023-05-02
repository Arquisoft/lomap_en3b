import {User} from "../models/user";
import {
    readLocations,
    writeLocationWithImg,
    writeLocationWithoutImg,
    writeReviewWithIMG,
    writeReviewWithoutIMG
} from "./podAccess";
import {getFriendsWebIds} from "./podHandler";
import {convertDomainModelLocationIntoViewLocation} from "../util/convertor";

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
    addLocation (loc){
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
    addReview (rev){
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
     * This method add a list of location retrieved from the pod to the user's list of locations
     * @param {LocationLM[]} listLocs list of locations from the pod
     */
    saveLocationsFromPOD(listLocs){
        listLocs.forEach( (loc) => {
            //Add location
            this.addLocation(loc);
        });
    }

    /**
     * This method saves a location inside the user's pod.
     * @param {LocationLM} loc location to save inside the user's pod
     */
    saveToPODLocation(loc) {
        console.log(loc);
        if(loc.img) {
            let resourceURL = this.user.userWebId.concat(loc.privacy).concat(this.user.locResourceURL);
            let resourceIMGURL = this.user.userWebId.concat(loc.privacy).concat(this.user.imgResourceURL);
            writeLocationWithImg(resourceURL, this.session, loc, resourceIMGURL)
                .then(() => {
                    window.alert("Location saved");
                })
                .catch(error => {
                    console.error(error);
                });
        } else {
            console.log("Esta");
            let resourceURL = this.user.userWebId.concat(loc.privacy).concat(this.user.locResourceURL);
            writeLocationWithoutImg(resourceURL, this.session, loc)
                .then(() => {
                    window.alert("Location saved");
                })
                .catch(error => {
                    console.error(error);
                });
        }
    }


    //TODO: Comment method.
    async retrievePrivateLocations() {
        let resource = this.user.userWebId.concat("private").concat(this.user.locResourceURL);
        console.log(resource);
        let locats = await readLocations(resource, this.session, this.user.userWebId);
        return locats;
    }
    async retrievePublicLocations() {
        let resource = this.user.userWebId.concat("public").concat(this.user.locResourceURL);
        let locats = await readLocations(resource, this.session, this.user.userWebId);
        return locats;
    }

    async retrieveFriendsPublicLocations() {
        let friends = await getFriendsWebIds(this.user.userWebId);

        let friendsLocations = [];
        for (let i = 0; i < friends.length; i++) {
            try {
                //concat it with the previous locations (concat returns a new array instead of modifying any of the existing ones)
                let friendID = friends[i].replace("/profile/card", "/");
                let resource = friendID.concat("public").concat(this.user.locResourceURL);
                friendsLocations = friendsLocations.concat( await readLocations(resource, this.session, friendID));
            } catch (err) {
                //Friend does not have LoMap??
                console.log(err);
            }
        }
        return friendsLocations;
    }


    /**
     * This method add a list of reviews retrieved from the pod to the user's list of reviews
     * @param {ReviewLM[]} listRevs list of reviews from the pod
     */
    saveReviewsFromPOD(listRevs){
        listRevs.forEach( (rev) => {
            //Add review
            console.log(rev);
            this.addReview(rev);
        });
    }
    
    /**
     * This method saves a review inside the user's pod.
     * @param {ReviewLM} rev review to save inside the user's pod
     * @param {LocationLM} loc location that has the review
     */
    saveToPODReview(rev, loc) {
        console.log(rev);
        let resourceURL = loc.locOwner.concat(loc.privacy).concat(this.user.revResourceURL);
        if(rev.media) {
            let resourceIMGURL = loc.locOwner.concat(loc.privacy).concat(this.user.imgResourceURL);
            writeReviewWithIMG(resourceURL, this.session, rev, loc.locID, loc.privacy, resourceIMGURL)
                .then(() => {
                    window.alert("Review saved");
                })
                .catch(error => {
                    console.error(error);
                });
        } else {
            console.log("Esta");
            writeReviewWithoutIMG(resourceURL, this.session, rev, loc.locID, loc.privacy)
                .then(() => {
                    window.alert("Review saved");
                })
                .catch(error => {
                    console.error(error);
                });
        }
    }

    getViewLocations() {
        let ret = []
        let aux = [...this.user.locations.values()];
        for (let i = 0; i < aux.length; i++) {
            ret.push(convertDomainModelLocationIntoViewLocation(aux[i], i));
        }
        return ret;
    }

}
