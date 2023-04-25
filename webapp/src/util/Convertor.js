import {LocationLM} from "../models/location";
import {
    createThing,
    buildThing
} from "@inrupt/solid-client";
import { SCHEMA_INRUPT, RDF} from "@inrupt/vocab-common-rdf";
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
