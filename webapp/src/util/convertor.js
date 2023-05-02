import {buildThing, createThing, getStringNoLocale} from "@inrupt/solid-client";
import {LocationLM} from "../models/location";
import {SCHEMA_LOMAP} from "./schema";
import {ReviewLM} from "../models/review";
import {base64ToImg, getStars} from "./utilMethods";

//Convert from view to domain (1)
export function convertViewLocationIntoDomainModelLocation(viewobj, userID) {
    return new LocationLM(
        viewobj.lat,            // CoorLat,
        viewobj.lng,            // CoorLng,
        viewobj.name,           // name,
        viewobj.description,    // description,
        viewobj.category,       // category
        viewobj.privacy,        // privacy
        viewobj.time,            // date
        userID
    );
}
//Convert from domain to view (1)
/**
 *
 * @param {LocationLM} dmObj
 * @param pos
 * @param revs
 * @returns {{locOwner: string, comments: *[], lng, description, privacy: (string|*), pic: (string|*), domainID: string, rate: string, name, time, category, key, lat}}
 */
export function convertDomainModelLocationIntoViewLocation(dmObj, pos, revs) {
    return {
        key: pos,
        lat: dmObj.lat,
        lng: dmObj.lng,
        time: dmObj.dateTime,
        description: dmObj.description,
        pic: dmObj.img,
        name: dmObj.name,
        category: dmObj.category,
        privacy: dmObj.privacy,
        locOwner: dmObj.locOwner,
        rate: '',
        comments: revs,
        domainID: dmObj.locID
    };
}
//Convert from domain to POD (1)
export function convertDomainModelLocationIntoPODLocation(dmObj){
    return buildThing(createThing({ name: dmObj.locID }))
        .addStringNoLocale(SCHEMA_LOMAP.name, dmObj.name)
        .addStringNoLocale(SCHEMA_LOMAP.loc_latitude, dmObj.lat)
        .addStringNoLocale(SCHEMA_LOMAP.loc_longitude, dmObj.lng)
        .addStringNoLocale(SCHEMA_LOMAP.descrip, dmObj.description)
        .addStringNoLocale(SCHEMA_LOMAP.ident, "".concat(dmObj.locID))
        .addStringNoLocale(SCHEMA_LOMAP.category, dmObj.category)
        .addStringNoLocale(SCHEMA_LOMAP.dateModified, dmObj.dateTime)     // time
        .addStringNoLocale(SCHEMA_LOMAP.accessCode, dmObj.privacy)    // privacy
        .addUrl(SCHEMA_LOMAP.type, SCHEMA_LOMAP.place)
        .build();
}

//Convert from POD to domain (n)
export function convertPODLocationIntoDomainModelLocation (podObj, userID) {
    return new LocationLM(
        Number(getStringNoLocale(podObj, SCHEMA_LOMAP.loc_latitude)),       // CoorLat,
        Number(getStringNoLocale(podObj, SCHEMA_LOMAP.loc_longitude)),      // CoorLng,
        getStringNoLocale(podObj, SCHEMA_LOMAP.name),                       // name,
        getStringNoLocale(podObj, SCHEMA_LOMAP.descrip),                    // description,
        getStringNoLocale(podObj, SCHEMA_LOMAP.category),                   // category
        getStringNoLocale(podObj, SCHEMA_LOMAP.accessCode),                 // privacy
        getStringNoLocale(podObj, SCHEMA_LOMAP.dateModified),               // date
        userID,                                                             // owner
        getStringNoLocale(podObj, SCHEMA_LOMAP.ident)                      // id
    );
}

//Convert from view to domain (1)
export function convertViewReviewIntoDomainModelReview(locatID, userID) {
    return new ReviewLM(
        locatID,        //locatID 
        userID,         //user 
        new Date()     //date 
    );
}
//Convert from domain to view (1)
export function convertDomainModelReviewIntoViewReview(dmObj) {
    //TODO:
    /* DomainModelReview looks like:
            ItemReviewed, user, time, revID (opt)
            comment, rate, media
    */
    return {
        comment: dmObj.comment, 
        commentpic: base64ToImg(dmObj.media),
        ratingStars: getStars(dmObj.rate)
    };
}
//Convert from domain to POD (1)
export function convertDomainModelReviewIntoPODReview(dmObj, privacy){
    return buildThing(createThing({ name: dmObj.revID }))
        .addStringNoLocale(SCHEMA_LOMAP.rev_comment, dmObj.comment)
        .addStringNoLocale(SCHEMA_LOMAP.rev_rate, dmObj.rate)
        .addStringNoLocale(SCHEMA_LOMAP.rev_reviewer, dmObj.user)
        .addStringNoLocale(SCHEMA_LOMAP.ident, "".concat(dmObj.revID))
        .addStringNoLocale(SCHEMA_LOMAP.rev_date, dmObj.time)     //time
        .addStringNoLocale(SCHEMA_LOMAP.rev_locat, dmObj.ItemReviewed)
        .addStringNoLocale(SCHEMA_LOMAP.accessCode, privacy)    // privacy
        .addUrl(SCHEMA_LOMAP.type, SCHEMA_LOMAP.review)
        .build();
}

//Convert from POD to domain (n)
export function convertPODReviewIntoDomainModelReview (podObj) {
    let review = new ReviewLM(
        getStringNoLocale(podObj, SCHEMA_LOMAP.rev_locat),          // locatID
        getStringNoLocale(podObj, SCHEMA_LOMAP.rev_reviewer),       // user
        getStringNoLocale(podObj, SCHEMA_LOMAP.dateModified),       // date
        getStringNoLocale(podObj, SCHEMA_LOMAP.ident)               // reviewID

    );
    // comment
    let com = getStringNoLocale(podObj, SCHEMA_LOMAP.rev_comment);
    if(com){
        review.comment = com;
    }
    // rate
    let rate = getStringNoLocale(podObj, SCHEMA_LOMAP.rev_rate);
    if(rate){
        review.rate = Number(rate);
    }

    return review;
}
