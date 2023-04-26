import {v4 as uuidv4} from 'uuid';

export class Review{
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
