import {LocationLM} from "./location";
/**
 * User LoMap class
 */
class User{
    publicLocat = new Array();
    privateLocat = new Array();
    privateReviews = new Array();
    publicReviews = new Array();
    podURL;
    friendsLocat = new Array();
    constructor() {
        this.resourceURLPublic = "Public pod-url";
        this.resourceURLPrivate = "Private pod-url";
    }

    /**
     * This method adds a new public location the user's list of public locations
     * @param {Number} CoorLat location's latitude
     * @param {Number} CoorLng location's longitude
     * @param {String} name location's name
     * @param {String} description location's description
     * @param {String} category location's category
     */
    addNewPublicLoc(CoorLat, CoorLng, name, description, category){
        let l = new LocationLM(CoorLat, CoorLng, name, description, category);
        let num = this.publicLocat.length;
        this.publicLocat.push(l);
        //Error handle
        if(this.publicLocat.length != (num +1)){
            //throw error
        }

    }
    /**
     * This method adds a new public location the user's list of public locations
     * @param {Number} CoorLat location's latitude
     * @param {Number} CoorLng location's longitude
     * @param {String} name location's name
     * @param {String} description location's description
     * @param {String} category location's category     */
    addNewPrivateLoc(CoorLat, CoorLng, name, description, category){
        let l = new LocationLM(CoorLat, CoorLng, name, description, category);
        let num = this.privateLocat.length;
        this.privateLocat.push(l);
        //Error handle
        if(this.privateLocat.length != (num +1)){
            //throw error
        }
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
            if(this.publicLocat.length != (num - 1)){
                //throw error
            }
        }
    }
    removePrivateLoc(l){
        const index = this.privateLocat.indexOf(l);
        if(index > -1){
            let num = this.privateLocat.length;
            this.privateLocat.splice(index, 1);
            if(this.privateLocat.length != (num - 1)){
                //throw error
            }
        }
    }

    setPodURL(pod){
        this.podURL = pod;
    }


    addNewPublicReview (LocID, Review){
        this.publicLocat.forEach((loc) =>
        {
            if(loc.id.equals(LocID)){
                loc.addPublicReview(Review);
            }
        });
    }

    addNewPrivateReview (LocID, Review){
        this.privateLocat.forEach((loc) =>
        {
            if(loc.id.equals(LocID)){
                loc.addPrivateReview(Review);
            }
        });
        //If the location is not private, it's added to a public location as private
        this.publicLocat.forEach((loc) =>
        {
            if(loc.id.equals(LocID)){
                loc.addPrivateReview(Review);
            }
        });

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
}

export {User};