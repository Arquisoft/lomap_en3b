import{
    User
} from "../models/user";

// Import from "@inrupt/solid-client"
import {
    createThing,
    saveSolidDatasetAt,
    setThing,
    buildThing,
    createSolidDataset,
    getThingAll,
    getSolidDataset,
    removeThing
} from "@inrupt/solid-client";
import { SCHEMA_INRUPT, RDF} from "@inrupt/vocab-common-rdf";
import {getDefaultSession} from "@inrupt/solid-client-authn-browser";
import {checkForLomap} from "./podHandler";

/**
 * Save user's session changes into de POD.
 * @param {User} user
 * @returns {Promise<void>}
 */
async function writeLocations(user) {
    pod = checkForLomap()
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
                // date (?)
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

export {
    writeLocations,
    writeLocations1
}