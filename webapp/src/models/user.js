import {LocationLM} from "./location";
/**
 * User LoMap class
 */
class User{
    publicLocat = [];
    privateLocat = [];
    privateReviews = [];
    publicReviews = [];
    podURL;
    friendsLocat = [];
    constructor() {
        this.resourceURLPublic = "Public pod-url";
        this.resourceURLPrivate = "Private pod-url";
    }

    /**
     *
     * @param {LocationLM} l
     */
    removePublicLoc(l){
        const index = this.publicLocat.indexOf(l);
        if(index > -1){
            let num = this.publicLocat.length;
            this.publicLocat.splice(index, 1);
            if(this.publicLocat.length !== (num - 1)){
                //throw error
            }
        }
    }
    removePrivateLoc(l){
        const index = this.privateLocat.indexOf(l);
        if(index > -1){
            let num = this.privateLocat.length;
            this.privateLocat.splice(index, 1);
            if(this.privateLocat.length !== (num - 1)){
                //throw error
            }
        }
    }

    setPodURL(pod){
        this.podURL = pod;
    }

    getReviews(){
        this.publicLocat.forEach((loc) =>
        {
            this.privateReviews = this.privateReviews.concat(loc.getPrivateReviews());
            this.publicReviews = this.publicReviews.concat(loc.getPublicReviews());
        });
        this.privateLocat.forEach((loc) =>
        {
            this.privateReviews = this.privateReviews.concat(loc.getPrivateReviews());
        });
    }

    addScoreReviewToLoc(locId, scr, privacy){
        let pos = lookForLocation(this.publicLocat, locId);
        if(pos === -1){
            pos = lookForLocation(this.privateLocat, locId);
            if(pos === -1){
                //TODO: Error
            }
            this.privateLocat[pos].addScoreReview(locId, scr, privacy);

        } else {
            this.publicLocat[pos].addScoreReview(locId, scr, privacy);
        }
    }
    addCommentReviewToLoc(locId, cmmt, privacy){
        let pos = lookForLocation(this.publicLocat, locId);
        if(pos === -1){
            pos = lookForLocation(this.privateLocat, locId);
            if(pos === -1){
                //TODO: Error
            }
            this.privateLocat[pos].addCommentReview(locId, cmmt, privacy);

        } else {
            this.publicLocat[pos].addCommentReview(locId, cmmt, privacy);
        }
    }

    addLocation(CoorLat, CoorLng, name, description, category, privacy){
        if(privacy){
            this.privateLocat.push(new LocationLM(CoorLat, CoorLng, name, description, category, privacy));
        } else {
            this.publicLocat.push(new LocationLM(CoorLat, CoorLng, name, description, category, privacy));
        }
    }

    getReviewsForLoc(locId){
        let pos = lookForLocation(this.publicLocat, locId);
        if(pos === -1) {
            pos = lookForLocation(this.privateLocat, locId);
            if (pos === -1) {
                //TODO: Error
            }
            return this.privateLocat[pos].getAllReviews()
        } else {
            return this.publicLocat[pos].getAllReviews()
        }
    }

    saveLocationsFromPOD(loc, privacy){
        if(privacy){
            this.privateLocat.push(loc);
        } else{
            this.publicLocat.push(loc);
        }
    }

    getAllLoc(){
        return []
            .concat(this.publicReviews)
            .concat(this.privateLocat);
    }
}

function lookForLocation(list, id){
    let i = 0;
    list.forEach((loc) =>
    {
        if(loc.locationID === id){
            return i;
        }
        i++;
    });
    return -1;
}
export {User};