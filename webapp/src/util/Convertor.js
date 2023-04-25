import {LocationLM} from "../models/location";
import {
    createThing,
    buildThing,
    getStringNoLocale
} from "@inrupt/solid-client";
import { SCHEMA_INRUPT, RDF} from "@inrupt/vocab-common-rdf";
import {StringInvalidFormatException} from "./Exceptions/exceptions";
//Constants
const PLACE =  "https://schema.org/Place";
const LATITUDE = "https://schema.org/latitude";
const LONGITUDE = "https://schema.org/longitude";
const NAME = "https://schema.org/name";
const IDENT = "https://schema.org/identifier";
const CAT = "https://schema.org/alternateName";
const DESCRIP = "https://schema.org/description";


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
        Number(getStringNoLocale(podObj, LATITUDE)),       // CoorLat,
        Number(getStringNoLocale(podObj, LONGITUDE)),      // CoorLng,
        getStringNoLocale(podObj, NAME),                   // name,
        getStringNoLocale(podObj, DESCRIP),                // description,
        getStringNoLocale(podObj, CAT),                    // category
        getStringNoLocale(podObj, SCHEMA_INRUPT.accessCode),    // privacy
        getStringNoLocale(podObj, SCHEMA_INRUPT.dateModified),  // date
        getStringNoLocale(podObj, IDENT),                  // id
    );
}

/**
 *
 * @param viewobjs
 * @returns {Object[]}
 */
export function convertViewLocationsIntoDomainModelLocations(viewobjs){
    console.log(viewobjs);

    let ret = [];
    let listMyObjs = [];
    let listViewObjs = [];

    viewobjs.forEach( (obj) =>
    {
        let ret1 = convertViewLocationIntoDomainModelLocation(obj);
        if(ret1[0].length != 0) {
            console.log(ret1);
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
    console.log(viewobj);
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
        console.log(loc);

        ret.push(loc);

        //Set domain model id
        viewobj.domainID = loc.locID;
        ret.push(viewobj);
    } catch (e){
        if (e.name == 'StringInvalidFormat'){
            return [[],[]];
        }else {
            throw e; // let others bubble up
        }
    }
    //Return two values: viewobj updated and viewobj converted into Location LM
    return ret;
}


