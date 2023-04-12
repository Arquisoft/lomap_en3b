// Import uuid for generating id
import {
    v4 as uuidv4
} from 'uuid';
import {ReviewInvalidFormatException, ReviewInvalidFormatForCommentException} from "../util/Exceptions/exceptions";

function check(value, str) {
    if(!value){
        throw new ReviewInvalidFormatException(String(str  ));
    }
}

function checkValidComment(str) {
    if (/\n/.exec(str) || !str) {
        throw new ReviewInvalidFormatForCommentException(String(str));
    }
}

class Review{
    locationID
    revID
    revScore
    revComment = [];
    revImg //Url
    revAuthor //Author
    constructor(locationID, reviewID=uuidv4(),) {
        check(reviewID, "reviewID");
        check(locationID, "locationID");
        this.revID = reviewID;
        this.locationID = locationID;
    }
    addScore(score){
        this.revScore = score;
    }
    addComment(comment){
        checkValidComment(comment);
        this.revComment.push(comment);
    }
    addImg(img){
        this.revImg = img;
    }

    getCommentsToPOD(){
        let output = "";
        this.revComment.forEach( c => {
            output += c + "\n";
        })

        return output;
    }

    addUser(name){
        this.revAuthor = name;
    }
}
export {Review};