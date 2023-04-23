// Import uuid for generating id
import {
    v4 as uuidv4
} from 'uuid';
import {
    ReviewInvalidFormatException
} from "../util/exceptions/exceptions";

function check(value, str) {
    if(!value){
        throw new ReviewInvalidFormatException(String(str  ));
    }
}

class Review{
    revID;
    ItemReviewed;
    comment;
    rate;
    media;
    user;
    date;

    constructor(locatID, reviewID=uuidv4()) {
        this.revID = reviewID;
        //TODO: Check
        this.ItemReviewed = locatID;
    }
}
export {Review};