//Import convertor functions
import {
    fromStringToLocation,
    fromLocationToString
} from '../util/dataConvertor.js';

// Import from "@inrupt/solid-client"
import {
    addUrl,
    addStringNoLocale,
    createThing,
    getSolidDataset,
    getThingAll,
    getStringNoLocale,
    saveSolidDatasetAt,
    setThing
} from "@inrupt/solid-client";

import { SCHEMA_INRUPT, RDF, AS } from "@inrupt/vocab-common-rdf";

var myDataset;
/**
 * This method writes new data in the POD. It does not return nothing
 * @param {string} SELECTED_POD is the user's pod where data is gonna be stored
 * @param {string} writePath is the path within the pod where to write. It must be like: path/fileName
 * @param {string} locList is a list of new Locations (that are not stored in the POD yet)
 * @param {SolidDataset} mySolidDatase is the PODDataset with the current stored information
 */
async function WriteList(SELECTED_POD, writePath, locList, mySolidDatase) {
    //Hardcoding url given as a parameter.
    const readingListUrl = `${SELECTED_POD}+${writePath}`;

    try {
        // Get the current things in the writePath
        let items = getThingAll(mySolidDatase);
    } catch (error) {
        console.error(error.message);
    }

    // Add locations to the Dataset
    let i = 0;
    locList.forEach((loc) => {
        if (title.trim() !== "") {
            let item = createThing({ name: loc.locID });
            item = addUrl(item, RDF.type, AS.Article);
            item = addStringNoLocale(item, SCHEMA_INRUPT.name, fromLocationToString(loc));
            mySolidDatase = setThing(mySolidDatase, item);
            i++;
        }
    });
    try {
        // Save the SolidDataset
        await saveSolidDatasetAt(readingListUrl, mySolidDatase, { fetch: fetch } );
    } catch (error) {
        console.log(error);
        labelCreateStatus.textContent = "Error" + error;
        labelCreateStatus.setAttribute("role", "alert");
    }

}
/**
 * This method reads from the user's Solid POD.
 * @param {string} SELECTED_POD is the user's pod where data is gonna be stored
 * @param {string} writePath is the path within the pod where to write. It must be like: path/fileName
 * @returns a list of locations
 */
async function ReadList(SELECTED_POD, writePath) {
    const readingListUrl = `${SELECTED_POD}+${writePath}`;

    // Make authenticated requests by passing `fetch` to the solid-client functions.
    myDataset = await getSolidDataset(
        readingListUrl,
        { fetch: fetch }    // fetch function from authenticated session
        //the user must be someone with Read access to the specified URL.
    );

    let items = getThingAll(myDataset);

    let listcontentAux = [];
    for (let i = 0; i < items.length; i++) {
        let item = getStringNoLocale(items[i], SCHEMA_INRUPT.name); //string 
        if (item !== null) {
            //Convert string to list of locations
            listcontentAux.push(fromStringToLocation(listcontentAux));
        }
    }
    //Returning array
    return listcontentAux;
}