// Import uuid for generating id
import {v4 as uuidv4} from 'uuid';
import {StringInvalidFormatException} from "../util/Exceptions/exceptions";
import {Review} from "./review";


/**
 * This class represents our domain model Locations
 * It will have the following fields:
 *      - CoorLat
 *      - CoorLng
 *      - Name
 *      - Description
 *      - Category
 *      - Privacy
 *      - Date
 *      - LocID
 *      - Owner
 */
export class LocationLM {
    /** User's webID */
    locOwner = "";
    reviews = new Map();

    constructor(coorLat, coorLng, name, descrip, cat, priv, date, id = uuidv4()) {
        this.lat = coorLat;
        this.lng = coorLng;
        checkStringInvalidFormat(name, 'name' );
        this.name = name;
        if(descrip) {
            this.description = descrip;
        } else {
            this.description = "";
        }
        checkStringInvalidFormat(cat, 'cat' );
        this.category = cat;
        checkStringInvalidFormat(priv, 'priv' );
        this.privacy = priv;
        this.dateTime = date;
        this.locID = id;
    }

    addReview(){
        let r = new Review(this.locID);
        this.reviews.set(r.revID, r);
    }

    addReviewComment(idRev, str, userID){
        this.reviews.get(idRev).comment = str;
        this.reviews.get(idRev).user = userID;
    }
    addReviewRate(idRev, rateVal, userID){
        this.reviews.get(idRev).rate = rateVal;
        this.reviews.get(idRev).user = userID;
    }
    addReviewImg(idRev, img, userID){
        this.reviews.get(idRev).media = img;
        this.reviews.get(idRev).user = userID;
    }

    getAllReviews(){
        let ret = [];

        for (let value of this.reviews.values()){
            ret.push(value);
        }

        return ret;
    }
}

function checkStringInvalidFormat (value, str){
    if(!value){
        throw new StringInvalidFormatException( String(str + '=' + value));
    }
}
