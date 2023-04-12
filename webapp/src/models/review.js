// Import uuid for generating id
import {
    v4 as uuidv4
} from 'uuid';

function check(locationID, locationID1) {
    if(!!locationID){

    }
}

class Review{
    locationID
    revID
    revScore
    revComment
    revImg
    constructor(locationID) {
        check(locationID, "locationID");
        this.locationID = locationID;
        this.revID = uuidv4();
    }
    addScore(score){
        this.revScore = score;
    }
    addComment(comment){
        this.revComment = comment;
    }
    addImg(img){
        this.revImg = img;
    }
}
export {Review};