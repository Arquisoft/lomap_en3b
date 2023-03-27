import{
    User
} from "../models/User";

// Import from "@inrupt/solid-client"
import {
    createThing,
    saveSolidDatasetAt,
    setThing,
    buildThing,
    createSolidDataset,
    getThingAll,
    getSolidDataset,
    removeThing, getStringNoLocale, getDecimal
} from "@inrupt/solid-client";
import { SCHEMA_INRUPT, RDF} from "@inrupt/vocab-common-rdf";
import {getDefaultSession} from "@inrupt/solid-client-authn-browser";
import {checkForLomap} from "./PodHandler";
import {LocationLM} from "../models/Location";
import {CoordinatesInvalidFormatException, StringInvalidFormatException} from "../util/Exceptions/Exceptions";

/**
 * Save user's session changes into de POD.
 * @param {User} user
 * @returns {Promise<void>}
 */
async function writeLocations(user) {
    //This can be parallel
    writeUserLocations(user.resourceURLPublic, user.publicLocat);
    writeUserLocations(user.resourceURLPrivate, user.privateLocat);
}

/**
 *
 * @param session
 * @param {User} user
 * @returns {Promise<void>}
 */
async function writeLocations1(session, user) {
    let resourceURL =  checkForLomap(session);
    //This can be parallel
    writeUserLocations(await resourceURL, user.publicLocat);
    return null;
}

/**
 *  This method saves in a given path the user's locations
 * @param {String} resourceURL user's POD path
 * @param {Array.<LocationLM>} list list of locations to save
 * @returns {null}
 */
async function writeUserLocations(resourceURL, list) {
    let mySolidDataset;
    try {
        //Get existing dataSet
        let mySolidDataset = await getSolidDataset(resourceURL,
            {fetch: getDefaultSession().fetch}
            // { fetch: fetch } //Other way
        );
        // Clear the list to override the whole list
        let items = getThingAll(mySolidDataset);
        items.forEach((item) => {
            mySolidDataset = removeThing(mySolidDataset, item);
        });
    } catch (error) {
        if (typeof error.statusCode === "number" && error.statusCode === 404) {
            // if not found, create a new SolidDataset (i.e., the reading list)
            mySolidDataset = createSolidDataset();
        } else {
            console.error(error.message);
        }
    }
    list.forEach(loc => {
            // Create a New Thing to Add
            let locationThing = buildThing(createThing({name: loc.locID}))
                .addStringNoLocale(SCHEMA_INRUPT.name, loc.name)
                .addDecimal(SCHEMA_INRUPT.latitude, loc.lat)
                .addDecimal(SCHEMA_INRUPT.longitude, loc.lng)
                .addStringNoLocale(SCHEMA_INRUPT.description, loc.description)
                .addStringNoLocale(SCHEMA_INRUPT.identifier, loc.locID)
                .addStringNoLocale(SCHEMA_INRUPT.alternateName, loc.cat)
                // date (?) - We need to think if it's needed.
                .addUrl(RDF.type, "https://schema.org/Place")
                .build();
            // Update the SolidDataset with New Things
            mySolidDataset = setThing(mySolidDataset, locationThing);
        }
    );
    // Save the SolidDataset
    /*    const savedSolidDataset = */
    await saveSolidDatasetAt(
        resourceURL,
        mySolidDataset,
        {fetch: getDefaultSession().fetch}      // fetch from authenticated Session
        //{ fetch: fetch } //Other way
    );
    return null;
}

/**
 * This method reads from the user's Solid POD.
 * @param {string} resourceURL is the path within the pod where to write. It must be like: path/fileName
 * @returns a list of locations
 */
async function readLocations(resourceURL) {
    let mySolidDataset;
    // Make authenticated requests by passing `fetch` to the solid-client functions.
    try {
        //Get existing dataSet
        mySolidDataset = await getSolidDataset(resourceURL,
            {fetch: getDefaultSession().fetch}
            // { fetch: fetch } //Other way
        );
    } catch (error) {
            console.error(error.message);
    }
    // Get all Things in a SolidDataset. Returns: Thing[]
    let items = getThingAll(mySolidDataset);
    //Initialize aux list
    let listcontentAux = [];
    for (let i = 0; i < items.length; i++) {
        //Get a Thing
        let item = items[i];
        try {
            //Convert into LocationLM object
            let loc = new LocationLM(
                getStringNoLocale(item, SCHEMA_INRUPT.identifier),      //id,
                getDecimal(item, SCHEMA_INRUPT.latitude),               // CoorLat,
                getDecimal(item, SCHEMA_INRUPT.longitude),              // CoorLng,
                getStringNoLocale(item, SCHEMA_INRUPT.name),            // name,
                getStringNoLocale(item, SCHEMA_INRUPT.description),     // description,
                getStringNoLocale(item, SCHEMA_INRUPT.alternateName),   // category
            );
            //Add locationLM into List
            listcontentAux.push(loc);
        } catch (error){
            if(error instanceof CoordinatesInvalidFormatException || error instanceof StringInvalidFormatException){
                //Handle error while parsing
            } else {
                console.error(error.message);
            }
        }
    }
    //Return list
    return listcontentAux;
}

export {
    writeLocations,
    writeLocations1
}