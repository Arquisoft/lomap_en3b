import {v4 as uuidv4} from 'uuid';
import {checkStringInvalidFormat} from "../util/utilMethods";

export class ReviewLM{
    const icon = '⭐';
    revID;
    ItemReviewed;
    comment = '';
    rate = 0;
    media = '';

    /**
     * Creates a new Review object with the specified properties.
     * @param {string} locatID - The ID of the location being reviewed.
     * @param {string} user - The name of the user who wrote the review.
     * @param {string} date - The date the review was written.
     * @param {string} reviewID - The ID of the review. If not provided, a new UUID will be generated.
     */
    constructor(locatID, user, date, reviewID=uuidv4()) {
        this.revID = reviewID;
        checkStringInvalidFormat(locatID, 'ItemReviewed' );
        this.ItemReviewed = locatID;
        checkStringInvalidFormat(user, 'user' );
        this.user = user;
        this.time = new Date(date);
    }
    
    getStars(){
        let ret;
        if (this.rate === 0) {
            ret = '';
        } else {
            ret = icon.repeat(this.rate);
        }
        return ret;
    }
}
