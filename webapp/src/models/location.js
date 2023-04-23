// Import uuid for generating id
import { 
    v4 as uuidv4 
} from 'uuid';
// Import exception 
import {
    CoordinatesInvalidFormatException,
    StringInvalidFormatException
} from '../util/Exceptions/exceptions.js';
import {Review} from "./review";

/**
 * Location LoMap class
 */
class LocationLM {
    //Attributes
    publicReviews;
    privateReviews;
    constructor(CoorLat, CoorLng, name, description, category,privacy=false, locID = uuidv4(), rating=null) {

        //checkCoordinatesInvalidFormat((CoorLat>= -90 && CoorLat<= 90), CoorLat, 'latitude');
        this.lat = CoorLat;
        //checkCoordinatesInvalidFormat((CoorLng>= -180 && CoorLng<= 180), CoorLng, 'longitude');
        this.lng = CoorLng;
        //checkStringInvalidFormat(name, 'name' );
        this.name = name;
        //checkStringInvalidFormat(description, 'description' );
        this.description = description;
        //checkStringInvalidFormat(category, 'category' );
        this.locID = locID;
        this.privacy=privacy;
        this.category = category;
        if(rating){
            this.rating=rating;
        }

    }

    getPublicReviews(){
        return this.publicReviews;
    }

    getPrivateReviews(){
        return this.privateReviews;
    }

    privacyText(){
        if(this.privacy){
            return 'private'
        } else {
            return 'public'
        }
    }
    addPublicReview(Review) {
        //Check type
        this.publicReviews.push(Review);
    }
    addPrivateReview(Review) {
        //Check type
        this.privateReviews.push(Review);
    }

    addScoreReview(locId, scr, privacy){
        if(privacy){
            if(this.privateReviews == null){
                this.privateReviews = new Review(locId);
            }
            this.privateReviews.addScoreReview(scr);
        } else {
            if(this.publicReviews == null){
                this.publicReviews = new Review(locId);
            }
            this.publicReviews.addScoreReview(scr);

        }
    }

    addCommentReview(locId, cmmt, privacy){
        if(privacy){
            if(this.privateReviews == null){
                this.privateReviews = new Review(locId);
            }
            this.privateReviews.addCommentReview(cmmt);
        } else {
            if(this.publicReviews == null){
                this.publicReviews = new Review(locId);
            }
            this.publicReviews.addCommentReview(cmmt);

        }

    }

    getAllReviews() {
        let ret = [];

        return ret
                .concat(this.publicReviews)
                .concat(this.privateReviews);
    }
}

function checkCoordinatesInvalidFormat (cond, value, str){
    if(!cond){
        throw new CoordinatesInvalidFormatException( String(str + '=' + value));
    }
}
function checkStringInvalidFormat (value, str){
    if(!value){
        throw new StringInvalidFormatException( String(str + '=' + value));
    }
}

export { 
    LocationLM
};
