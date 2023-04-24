import {LocationLM} from "../models/location";
import {Review} from "../models/review";
import * as util from "./schemaStrings";
import {
    createThing,
    buildThing,
    getStringNoLocale
} from "@inrupt/solid-client";
import { SCHEMA_INRUPT, RDF} from "@inrupt/vocab-common-rdf";


export function convertViewLocationIntoDomainModelLocation(viewobj, userWebid){
    //Key has to be changed to be unique
    console.log("Aquiii");

    let loc = new LocationLM(
        viewobj.lat,
        viewobj.lng,
        viewobj.name,
//        "Not working",
        viewobj.description,
//        "Not working",
        viewobj.category,
//        "Not working",
        viewobj.privacy,
//        "public",
        viewobj.time
        //viewobj.key
    ); 
    loc.userID = userWebid;
    console.log(loc);
    if(loc.name === ""){
        loc.name = "Not working";
    }
    if(loc.category === ""){
        loc.category = "Not working";
    }
    if(loc.privacy === ""){
        loc.privacy = "public";
    }
    if(loc.description === ""){
        loc.description = "Not working";
    }
    console.log(loc);
    return loc;
}
function convertDomainModelLocationIntoViewLocation(dmobj, pos){
    //TODO: Change pos
    return {
        key: pos,
        lat: dmobj.lat,
        lng: dmobj.lng,
        time: new Date(),
        description: dmobj.description,
        name: dmobj.name,
        category: dmobj.category,
        privacy: dmobj.privacy,
        comments: []
    };
}
export function convertViewLocationsIntoDomainModelLocations(viewobjs, userWebid){
    let ret = [];
    viewobjs.forEach( (obj) =>
    {
        ret.push(convertViewLocationIntoDomainModelLocation(obj, userWebid));
    });
    return ret;
}
/**
 * This method converts Locations from our domain model (LocationLM)
 * into locations for the view model.
 * @param {Array} dmobjs array of LocationLm 
 * @returns an array with view format
 */
export function convertDomainModelLocationsIntoViewLocations(dmobjs){
    let ret = [];
    for (let i = 0; i < dmobjs.length; i++) {
        ret.push(convertDomainModelLocationIntoViewLocation(dmobjs[i], i));
    }
    return ret;
}

//POD Access
export function convertPODLocationIntoDomainModelLocation (podObj){
    //Convert into LocationLM
    return new LocationLM(
        Number(getStringNoLocale(podObj, util.LATITUDE)),       // CoorLat,
        Number(getStringNoLocale(podObj, util.LONGITUDE)),      // CoorLng,
        getStringNoLocale(podObj, util.NAME),                   // name,
        getStringNoLocale(podObj, util.DESCRIP),                // description,
        getStringNoLocale(podObj, util.CAT),                    // category
        getStringNoLocale(podObj, SCHEMA_INRUPT.accessCode),    // privacy
        getStringNoLocale(podObj, SCHEMA_INRUPT.dateModified),  // date    
        getStringNoLocale(podObj, util.IDENT),                  // id    
        );
}

export function convertDomainModelLocationIntoPODLocation(dmObjs){
        //Create Thing
        return buildThing(createThing({ name: dmObjs.locID }))
        .addUrl(RDF.type, util.PLACE)                                   // Place
        .addStringNoLocale(util.NAME, dmObjs.name)                      // Nanme
        .addStringNoLocale(util.LATITUDE, dmObjs.lat)                   // Latitude
        .addStringNoLocale(util.LONGITUDE, dmObjs.lng)                  // Longitude
        .addStringNoLocale(util.DESCRIP, dmObjs.description)            // Description
        .addStringNoLocale(util.IDENT, "".concat(dmObjs.locID))         // ID
        .addStringNoLocale(SCHEMA_INRUPT.dateModified, dmObjs.date)     // time
        .addStringNoLocale(SCHEMA_INRUPT.accessCode, dmObjs.privacy)    // privacy
        .addStringNoLocale(util.CAT, dmObjs.category)                   // category
        .build();

}


export function convertViewReviewIntoDomainModelReview(viewobj){
    //TODO:
}
export function convertDomainModelReviewIntoViewReview(dmobj, pos){
    //TODO:
}
export function convertViewReviewsIntoDomainModelReviews(viewobjs){
    let ret = [];
    viewobjs.forEach( (obj) =>
    {
        ret.push(convertViewReviewIntoDomainModelReview(obj));
    });
    return ret;
}
export function convertDomainModelReviewsIntoViewReviews(dmobjs){
    let ret = [];
    dmobjs.forEach( (obj) =>
    {
        ret.push(convertDomainModelReviewIntoViewReview(obj));
    });
    return ret;
}

//POD Access
export function convertPODReviewIntoDomainModelReview (podObj){
    //Convert into Review

    //Item_reviewed & Id
    let review = new Review(
        getStringNoLocale(podObj, util.REV_LOCAT),
        getStringNoLocale(podObj, util.IDENT));
    //Comment
    review.comment = getStringNoLocale(podObj, util.REV_COMMENT);
    //Rate
    review.rate = getStringNoLocale(podObj, util.REV_RATE);
    //Media
    review.media = getStringNoLocale(podObj, util.REV_MEDIA);
    //Owner
    review.user = getStringNoLocale(podObj, util.REV_REVIEWER);
    //Date
    review.date = getStringNoLocale(podObj, util.REV_DATE);
    
    return review;
}

export function convertDomainModelReviewIntoPODReview(dmObjs, locThingID){
        //Create Thing
        return buildThing(createThing({ name: dmObjs.revID }))
        .addUrl(RDF.type, util.REVIEW)                          // Review
        .addStringNoLocale(util.REV_COMMENT, dmObjs.comment)    // Comment
        .addStringNoLocale(util.REV_RATE, dmObjs.rate)          // Rate
        .addStringNoLocale(util.REV_LOCAT, locThingID)          // Item_reviewed
        .addStringNoLocale(util.REV_MEDIA, dmObjs.media)        // Media
        .addStringNoLocale(util.IDENT, "".concat(dmObjs.revID)) // ID
        .addStringNoLocale(util.REV_REVIEWER, dmObjs.user)      // Owner
        .addStringNoLocale(util.REV_DATE, dmObjs.date)          // Date
        .build();
}