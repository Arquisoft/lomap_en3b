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
    removeThing,
    getStringNoLocale,
    getDecimal,
    toRdfJsDataset,
    getThing,
    getContainedResourceUrlAll,
    getStringNoLocaleAll, responseToResourceInfo, getResourceInfo
} from "@inrupt/solid-client";
import { SCHEMA_INRUPT, RDF} from "@inrupt/vocab-common-rdf";
import {getDefaultSession} from "@inrupt/solid-client-authn-browser";
import {checkForLomap} from "./podHandler";
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


async function getThingsFromDataset(resourceURL,session){
    let dataset,allThings;
     dataset=await getSolidDataset(resourceURL,{fetch:session.fetch})
    allThings=getThingAll(dataset);
    return allThings;



}
/**
 * This method reads from the user's Solid POD.
 * @param {string} resourceURL is the path within the pod where to write. It must be like: path/fileName
 * @returns a list of locations
 */
async function readLocations(resourceURL,session) {
    let locationThings=await getThingsFromDataset(resourceURL,session);
    let location,locationThing;
    let locationsRetrieved = [];
    if(locationThings) {//Check if the list of things retrieved from the resource is not undefined nor null.
        //Convert into LocationLM object
        for (let i = 0; i < locationThings.length; i++) {
            //Get a Thing
            locationThing =locationThings[i];

            try {

                //Convert into LocationLM object
               location= new LocationLM(

                    Number(getStringNoLocale(locationThing, SCHEMA_INRUPT.latitude)),               // CoorLat,
                   Number(getStringNoLocale(locationThing, SCHEMA_INRUPT.longitude)),              // CoorLng,
                    getStringNoLocale(locationThing,SCHEMA_INRUPT.name),            // name,
                    getStringNoLocale(locationThing, SCHEMA_INRUPT.description),     // description,
                    getStringNoLocale(locationThing, SCHEMA_INRUPT.alternateName),   // category
                );

                //Add locationLM into List
                locationsRetrieved.push(location);

            } catch (error) {
                if (error instanceof CoordinatesInvalidFormatException || error instanceof StringInvalidFormatException) {
                    console.error(error.message);
                    //Todo :handle?

                } else {
                    console.error(error.message);
                }
            }
        }
    }

    //Return list
    return locationsRetrieved;

}
export {
    writeLocations,
    writeLocations1,
    readLocations
}
