import{
    User
} from "../models/user";
import{
    Review
} from "../models/review";
import {
    convertViewLocationIntoDomainModelLocation,
    convertDomainModelLocationIntoPODLocation,
    convertPODLocationIntoDomainModelLocation,
    convertDomainModelLocationIntoViewLocation
} from "../util/dataConvertor";

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
    getStringNoLocale, addUrl, addStringNoLocale
} from "@inrupt/solid-client";
import {CoordinatesInvalidFormatException, StringInvalidFormatException} from "../util/exceptions/exceptions";


async function writeLocations(resourceURL, session, list) {
    let i = 0;
    let dataset;
    let locationThing;
    //Iterates the list
    for (const loc of list) {
        //GetDataSet - And remove the first time
        if(i === 0){
            //Get dataSet and Remove content
            dataset= await getDatasetAndRemoveContent(resourceURL,session);
        } else {
            //Get dataSet
            dataset= await getDataset(resourceURL,session);
        }
        
        //Create Thing
        let auxLoc = convertViewLocationIntoDomainModelLocation(loc);
        locationThing = convertDomainModelLocationIntoPODLocation(auxLoc);

        //Add Thing into DataSet
        dataset = setThing(dataset, locationThing);

        //Save dataSet into POD
        try {
            // Save the SolidDataset
            await saveSolidDatasetAt(
                resourceURL,
                dataset,
                {fetch: session.fetch}      // fetch from authenticated Session
            );
        } catch (error) {
            console.log(error);
        }
        i++;
    }
    //window.alert("Saved");
}

/**
 * TODO: Needs to be changed
 * @param {*} resourceURL 
 * @param {*} session 
 * @returns 
 */
async function getDatasetAndRemoveContent(resourceURL,session){
    let dataset,items;
    //Get DataSet
    dataset = await getDataset(resourceURL,{fetch:session.fetch})
    items = getThingAll(dataset);
    // Clear the list to override the whole list
    items.forEach((item) => {
        dataset = removeThing(dataset, item);
    });
    return dataset;
}

async function getDataset(resourceURL,session){
    let dataset,items;
    try {
        //Get DataSet
        dataset=await getSolidDataset(resourceURL,{fetch:session.fetch})
    } catch (error) {
        if (typeof error.statusCode === "number" && error.statusCode === 404) {
            // if not found, create a new SolidDataset
            dataset = createSolidDataset();
        } else {
            console.error(error.message);
        }
    }
    return dataset;
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
 * @param session
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
                let auxObj = convertPODLocationIntoDomainModelLocation(locationThing);
                location = convertDomainModelLocationIntoViewLocation(auxObj, i);

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
    readLocations
}
