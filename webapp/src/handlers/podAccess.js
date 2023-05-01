import{
    User
} from "../models/user";
import{
    Review
} from "../models/review";

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
    getStringNoLocale, getThing, addUrl, addStringNoLocale, saveFileInContainer
} from "@inrupt/solid-client";
import { SCHEMA_INRUPT, RDF} from "@inrupt/vocab-common-rdf";
import {getDefaultSession} from "@inrupt/solid-client-authn-browser";
import {checkForLomap} from "./podHandler";
import {LocationLM} from "../models/location";
import {CoordinatesInvalidFormatException, StringInvalidFormatException} from "../util/Exceptions/exceptions";

async function writeLocations(resourceURL, session, list) {
    let i = 0;
    let dataset;

    //Iterates the list
    for (const loc of list) {
        //GetDataSet - And remove the first time
        if(i == 0){
            //Get dataSet and Remove content
            dataset= await getDatasetAndRemoveContent(resourceURL,session);
        } else {
            //Get dataSet
            dataset= await getDataset(resourceURL,session);
        }
        //Create Thing
        let locationThing = buildThing(createThing({ name: "title" + i }))
            .addUrl(RDF.type, "https://schema.org/Place")
            .addStringNoLocale(SCHEMA_INRUPT.name, loc.name)
            .addStringNoLocale(SCHEMA_INRUPT.latitude, loc.lat)
            .addStringNoLocale(SCHEMA_INRUPT.longitude, loc.lng)
            .addStringNoLocale(SCHEMA_INRUPT.description, loc.description)
            .addStringNoLocale(SCHEMA_INRUPT.identifier, loc.key)
            .addStringNoLocale(SCHEMA_INRUPT.dateModified, loc.time)//time
            .addStringNoLocale(SCHEMA_INRUPT.accessCode, loc.privacy)//privacy
            .addStringNoLocale(SCHEMA_INRUPT.alternateName, loc.category)

            // date (?) - We need to think if it's needed.
            .build();
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
    window.alert("Saved");

}

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
async function writeReviews(user) {
    user.getReviews();
    await writeUserReviews(user.resourceURLPublic, user.publicReviews);
    await writeUserReviews(user.resourceURLPrivate, user.privateReviews);
}

/**
 *  This method saves in a given path the user's locations
 * @param {String} resourceURL user's POD path
 * @param {Array.<LocationLM>} list list of locations to save
 * @returns {null}
 */
async function writeLocIntoPOD(resourceURL, list, session) {
    let mySolidDataset;
    try {
        //Get existing dataSet
        let mySolidDataset = await getSolidDataset(resourceURL,
            {fetch: session.fetch}
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
                .addStringNoLocale(SCHEMA_INRUPT.latitude, loc.lat)
                .addStringNoLocale(SCHEMA_INRUPT.longitude, loc.lng)
                .addStringNoLocale(SCHEMA_INRUPT.description, loc.description)
                .addStringNoLocale(SCHEMA_INRUPT.identifier, loc.locID)
                .addStringNoLocale(SCHEMA_INRUPT.alternateName, loc.category)

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

async function writeUserReviews(resourceURL, list) {

    let myReviewSolidDataset;
    try {
        //Get existing dataSet
        let myReviewSolidDataset = await getSolidDataset(resourceURL,
            {fetch: getDefaultSession().fetch}
            // { fetch: fetch } //Other way
        );
        // Clear the list to override the whole list
        let items = getThingAll(myReviewSolidDataset);
        items.forEach((item) => {
            myReviewSolidDataset = removeThing(myReviewSolidDataset, item);
        });
    } catch (error) {
        if (typeof error.statusCode === "number" && error.statusCode === 404) {
            // if not found, create a new SolidDataset (i.e., the reading list)
            myReviewSolidDataset = createSolidDataset();
        } else {
            console.error(error.message);
        }
    }

    for (const rev of list) {
        // Create a New Thing to Add
        let locationThing = buildThing(createThing({name: rev.revID}))
            // ->   | revID
            .addStringNoLocale(SCHEMA_INRUPT.identifier, rev.revID)
            // Get Thing associated -> about  | locationID
            .addStringNoLocale("https://schema.org/about", rev.locationID)
            // -> (?)  | revScore
            .addStringNoLocale(SCHEMA_INRUPT.value, rev.revScore)
            // -> text  | revComment
            .addStringNoLocale("https://schema.org/text", rev.getCommentsToPOD())
            //This needs to be an url -> image  | revImg
            .addStringNoLocale("https://schema.org/image", rev.revImg)
            .addUrl(RDF.type, "https://schema.org/Review")
            .build();
        // Update the SolidDataset with New Things
        myReviewSolidDataset = setThing(myReviewSolidDataset, locationThing);
    }
    // Save the SolidDataset
    /*    const savedSolidDataset = */
    await saveSolidDatasetAt(
        resourceURL,
        myReviewSolidDataset,
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
                location= new LocationLM(
                    Number(getStringNoLocale(locationThing, SCHEMA_INRUPT.latitude)),   // CoorLat,
                    Number(getStringNoLocale(locationThing, SCHEMA_INRUPT.longitude)),  // CoorLng,
                    getStringNoLocale(locationThing,SCHEMA_INRUPT.name),                // name,
                    getStringNoLocale(locationThing, SCHEMA_INRUPT.description),        // description,
                    getStringNoLocale(locationThing, SCHEMA_INRUPT.alternateName),      // category
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

async function readReviews(resourceURL,session) {
    let reviewThings = await getThingsFromDataset(resourceURL, session);
    let review, reviewThing;
    let reviewsRetrieved = [];
    if (reviewThings) {//Check if the list of things retrieved from the resource is not undefined nor null.
        //Convert into Review object
        for (let i = 0; i < reviewThings.length; i++) {
            //Get a Thing
            reviewThing = reviewThings[i];
            try {
                //Convert into Review object
                review = new Review(
                    getStringNoLocale(reviewThing, "https://schema.org/about") , // CoorLng,
                    getStringNoLocale(reviewThing, SCHEMA_INRUPT.identifier)   // CoorLat,
                );
                review.addComment(getStringNoLocale(reviewThing, "https://schema.org/text"));
                review.addScore(getStringNoLocale(reviewThing,SCHEMA_INRUPT.value));
                review.addImg(getStringNoLocale(reviewThing, "https://schema.org/image"));

                //Add locationLM into List
                reviewsRetrieved.push(review);

            } catch (error) {
                if (error instanceof CoordinatesInvalidFormatException || error instanceof StringInvalidFormatException) {
                    console.error(error.message);
                }
            }
        }
    }

    //Return list
    return reviewsRetrieved;

}

export {
    writeLocations,
    readLocations
}
