import {LocationLM} from "../models/location";
import {
    createThing,
    buildThing,
    getStringNoLocale
} from "@inrupt/solid-client";
import { SCHEMA_INRUPT, RDF} from "@inrupt/vocab-common-rdf";
import {Review} from "../models/review";
//Constants
const PLACE =  "https://schema.org/Place";
const LATITUDE = "https://schema.org/latitude";
const LONGITUDE = "https://schema.org/longitude";
const NAME = "https://schema.org/name";
const IDENT = "https://schema.org/identifier";
const CAT = "https://schema.org/alternateName";
const DESCRIP = "https://schema.org/description";

const REVIEW = "https://schema.org/Review";
const REV_COMMENT = "https://schema.org/reviewBody";
const REV_RATE = "https://schema.org/reviewRating";
const REV_MEDIA = "https://schema.org/associatedMedia";
const REV_REVIEWER = "https://schema.org/accountablePerson";
const REV_DATE = "https://schema.org/dateCreated";
const REV_LOCAT = "https://schema.org/contentLocation";


/**
 *
 * @param {LocationLM} dmObjs
 * @returns {*}
 */
export function convertDomainModelLocationIntoPODLocation(dmObjs){
    //Create Thing
    return buildThing(createThing({ name: dmObjs.locID }))
        .addUrl(RDF.type, PLACE)                                   // Place
        .addStringNoLocale(NAME, dmObjs.name)                      // Name
        .addStringNoLocale(LATITUDE, dmObjs.lat)                   // Latitude
        .addStringNoLocale(LONGITUDE, dmObjs.lng)                  // Longitude
        .addStringNoLocale(DESCRIP, dmObjs.description)            // Description
        .addStringNoLocale(IDENT, "".concat(dmObjs.locID))         // ID
        .addStringNoLocale(SCHEMA_INRUPT.dateModified, dmObjs.dateTime)     // time
        .addStringNoLocale(SCHEMA_INRUPT.accessCode, dmObjs.privacy)    // privacy
        .addStringNoLocale(CAT, dmObjs.category)                   // category
        .build();
}

/**
 *
 * @param podObj
 * @returns {LocationLM}
 */
export function convertPODLocationIntoDomainModelLocation (podObj){
    //Convert into LocationLM
    return new LocationLM(
        Number(getStringNoLocale(podObj, LATITUDE)),            // CoorLat,
        Number(getStringNoLocale(podObj, LONGITUDE)),           // CoorLng,
        getStringNoLocale(podObj, NAME),                        // name,
        getStringNoLocale(podObj, DESCRIP),                     // description,
        getStringNoLocale(podObj, CAT),                         // category
        getStringNoLocale(podObj, SCHEMA_INRUPT.accessCode),    // privacy
        getStringNoLocale(podObj, SCHEMA_INRUPT.dateModified),  // date
        getStringNoLocale(podObj, IDENT),                       // id
    );
}

/**
 *
 * @param viewobjs
 * @returns {Object[]}
 */
export function convertViewLocationsIntoDomainModelLocations(viewobjs){

    let ret = [];
    let listMyObjs = [];
    let listViewObjs = [];

    viewobjs.forEach( (obj) =>
    {
        let ret1 = convertViewLocationIntoDomainModelLocation(obj);
        if(ret1[0].length !== 0) {

            listMyObjs.push(ret1[0]);
            listViewObjs.push(ret1[1]);
        }
    });
    ret.push(listMyObjs);
    ret.push(listViewObjs);

    return ret;
}

/**
 *
 * @param viewobj
 * @returns {Object[]}
 */
function convertViewLocationIntoDomainModelLocation(viewobj){
    let ret = [];

    try {
        let loc = new LocationLM(
            viewobj.lat,
            viewobj.lng,
            viewobj.name,
            viewobj.description,
            viewobj.category,
            viewobj.privacy,
            viewobj.time
        );

        ret.push(loc);

        //Set domain model id
        viewobj.domainID = loc.locID;
        //TODO: //Set owner
        viewobj.owner = "";
        ret.push(viewobj);
    } catch (e){
        if (e.name === 'StringInvalidFormat'){
            return [[],[]];
        }else {
            throw e; // let others bubble up
        }
    }
    //Return two values: viewobj updated and viewobj converted into Location LM
    return ret;
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
        getStringNoLocale(podObj, REV_LOCAT),
        getStringNoLocale(podObj, IDENT));
    //Comment
    review.comment = getStringNoLocale(podObj, REV_COMMENT);
    //Rate
    review.rate = getStringNoLocale(podObj, REV_RATE);
    //Media
    review.media = getStringNoLocale(podObj, REV_MEDIA);
    //Owner
    review.user = getStringNoLocale(podObj, REV_REVIEWER);
    //Date
    review.date = getStringNoLocale(podObj, REV_DATE);

    return review;
}

export function convertDomainModelReviewIntoPODReview(dmObjs, locThingID){
    //Create Thing
    return buildThing(createThing({ name: dmObjs.revID }))
        .addUrl(RDF.type, REVIEW)                          // Review
        .addStringNoLocale(REV_COMMENT, dmObjs.comment)    // Comment
        .addStringNoLocale(REV_RATE, dmObjs.rate)          // Rate
        .addStringNoLocale(REV_LOCAT, locThingID)          // Item_reviewed
        .addStringNoLocale(REV_MEDIA, dmObjs.media)        // Media
        .addStringNoLocale(IDENT, "".concat(dmObjs.revID)) // ID
        .addStringNoLocale(REV_REVIEWER, dmObjs.user)      // Owner
        .addStringNoLocale(REV_DATE, dmObjs.date)          // Date
        .build();
}

