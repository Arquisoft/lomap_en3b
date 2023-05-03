import {User} from "../models/user";
import {
    readLocations, readReviews,
    writeLocationWithImg,
    writeLocationWithoutImg,
    writeReviewWithIMG,
    writeReviewWithoutIMG
} from "./podAccess";
import {getFriendsWebIds} from "./podHandler";
import {convertDomainModelLocationIntoViewLocation, convertDomainModelReviewIntoViewReview} from "../util/convertor";
import {extractBase64Image, getRate} from "../util/utilMethods";

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
     * Completes the review's data from what the user has entered.
     * @param {ReviewLM} rev - The review to compete.
     * @param {string} comment - The comment text of the review
     * @param {string} rating - The rating of the review
     * @param {string} img - The images of the review
     * @returns {ReviewLM} review with all the data
     */
    completeReviewData(rev, comment, rating, img){
        if(comment){
            rev.comment= comment;
        }
        if(rating){
            rev.rate= getRate(rating);
        }
        if(img){
            rev.media = extractBase64Image(img);
        } else {
            rev.media = "";
        }
        return rev;
    }

    /**
     * Checks if a review can be added to the user's list of reviews.
     * @param {ReviewLM} rev - The review to check.
     * @returns {boolean} - True if the review can be added, false otherwise.
     */
    canBeReviewAdded(rev){
        if(this.user.reviews.get(rev.ItemReviewed)) {
            let listReviews = this.user.reviews.get(rev.ItemReviewed);
            for(let i = 0; i < listReviews.length; i++){
                let review = listReviews[i];
                if(review.user === rev.user && review.ItemReviewed === rev.ItemReviewed && review.comment === rev.comment &&
                    review.rate === rev.rate && review.media === rev.media){
                    return false;
                }
            }
        }
        return true;
    }

    /**
     * This method add a list of location retrieved from the pod to the user's list of locations
     * @param {LocationLM[]} listLocs list of locations from the pod
     */
    saveLocationsFromPOD(listLocs){
        if(listLocs) {
            for (let i = 0; i < listLocs.length; i++) {
                let loc = listLocs[i];
                this.addLocation(loc);
            }
        }
    }

    /**
     * This method add a list of reviews retrieved from the pod to the user's list of reviews
     * @param {ReviewLM[]} listRevs list of review from the pod
     */
    saveReviewsFromPOD(listRevs){
        if(listRevs) {
            for (let i = 0; i < listRevs.length; i++) {
                if(this.canBeReviewAdded(listRevs[i])){
                    this.addReview(listRevs[i]);
                }
            }
        }
    }


    /**
     * This method saves a location inside the user's pod.
     * @param {LocationLM} loc location to save inside the user's pod
     */
    saveToPODLocation(loc) {
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
        let locats = await readLocations(resource, this.session, this.user.userWebId);

        let resourceR = this.user.userWebId.concat("private").concat(this.user.revResourceURL);
        let reviews = await readReviews(resourceR, this.session);
        this.saveReviewsFromPOD(reviews);

        return locats;
    }
    async retrievePublicLocations() {
        let resource = this.user.userWebId.concat("public").concat(this.user.locResourceURL);
        let locats = await readLocations(resource, this.session, this.user.userWebId);

        let resourceR = this.user.userWebId.concat("public").concat(this.user.revResourceURL);
        let reviews = await readReviews(resourceR, this.session);
        this.saveReviewsFromPOD(reviews);

        return locats;
    }

    async retrieveFriendsPublicLocations() {
        let friends = await getFriendsWebIds(this.session.info.webId);

        let friendsLocations = [];
        let reviews = [];
        for (let i = 0; i < friends.length; i++) {
            try {
                //concat it with the previous locations (concat returns a new array instead of modifying any of the existing ones)
                let friendID = friends[i].replace("/profile/card", "/");
                let resource = friendID.concat("public").concat(this.user.locResourceURL);

                let resourceR = friendID.concat("public").concat(this.user.revResourceURL);
                reviews = reviews.concat(await readReviews(resourceR, this.session));
                friendsLocations = friendsLocations.concat( await readLocations(resource, this.session, friendID));
            } catch (err) {
                //Friend does not have LoMap??
                console.error(err);
            }
        }
        //Add Reviews
        this.saveReviewsFromPOD(reviews);

        return friendsLocations;
    }

    /**
     * This method saves a review inside the user's pod.
     * @param {ReviewLM} rev review to save inside the user's pod
     * @param {string} locOwner location owner that has the review
     * @param {string} privacy
     */
    saveToPODReview(rev, locOwner, privacy) {
        let resourceURL = locOwner.concat(privacy).concat(this.user.revResourceURL);
        if(rev.media) {
            let resourceIMGURL = locOwner.concat(privacy).concat(this.user.imgResourceURL);
            writeReviewWithIMG(resourceURL, this.session, rev, privacy, resourceIMGURL)
                .then(() => {
                    window.alert("Review saved");
                })
                .catch(error => {
                    console.error(error);
                });
        } else {
            writeReviewWithoutIMG(resourceURL, this.session, rev, privacy)
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
            let comments = [];
            if(this.user.reviews.has(aux[i].locID)){
                let reviews = this.user.reviews.get(aux[i].locID);
                for(let j = 0; j < reviews.length; j++){
                    comments.push(convertDomainModelReviewIntoViewReview(reviews[j]));
                }
            }
            ret.push(convertDomainModelLocationIntoViewLocation(aux[i], i, comments));
        }
        return ret;
    }

}
