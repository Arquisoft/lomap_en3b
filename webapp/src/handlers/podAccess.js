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
    getStringNoLocale, addUrl, addStringNoLocale
} from "@inrupt/solid-client";
import { SCHEMA_INRUPT, RDF} from "@inrupt/vocab-common-rdf";
import {getDefaultSession} from "@inrupt/solid-client-authn-browser";
import {checkForLomap} from "./podHandler";
import {LocationLM} from "../models/location";
import {CoordinatesInvalidFormatException, StringInvalidFormatException} from "../util/Exceptions/exceptions";
import {convertViewObjectsIntoDomainModelObjects} from "../util/Convertor";

/**
 * Save user's session changes into de POD.
 * @param {User} user
 * @returns {Promise<void>}
 *
async function writeLocations(user, session) {
    //This can be parallel
    writeLocIntoPOD(user.resourceURLPublic, user.publicLocat, session);
    writeLocIntoPOD(user.resourceURLPrivate, user.privateLocat, session);
}
 */

async function writeLocations(resourceURL, session, list) {
    let i = 0;
    let dataset;
    let locationThing;
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
        locationThing = buildThing(createThing({ name: "title" + i }))
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
        //TODO: Save Reviews
        let resource = session.info.webId.replace("/profile/card#me", "/lomap/reviews.ttl")
        await writeUserReviews(resource, session, loc.comments, locationThing);

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
    //user.getReviews();
    //await writeUserReviews(user.resourceURLPublic, user.publicReviews);
    //await writeUserReviews(user.resourceURLPrivate, user.privateReviews);
    //TODO: Change

}

function convertList(list) {
    let ret = [];

    //TODO: Get values for: id, text, rate, user, date

    return ret;
}

async function writeUserReviews(resourceURL, session, list, locThing, user) {
    let j = 0;
    let dataset;
    let reviewList = convertList(list);
    //Iterates the list
    for (const rev of reviewList) {
        //GetDataSet - And remove the first time
        dataset= await getDataset(resourceURL,session);
        //Create Thing
        let reviewThing = buildThing(createThing({ name: "title" + j }))
            .addUrl(RDF.type, "https://schema.org/Review")
            .addStringNoLocale("https://schema.org/itemReviewed", locThing)
            .addStringNoLocale(SCHEMA_INRUPT.identifier, rev.key)
            .addStringNoLocale("https://schema.org/reviewBody", rev.text)
            .addStringNoLocale("https://schema.org/reviewRating", rev.rate)
            //.addStringNoLocale("https://schema.org/associatedMedia", rev.media)
            .addStringNoLocale("https://schema.org/accountablePerson", user)
            .addStringNoLocale("https://schema.org/dateCreated", rev.date)
            .build();
        //Add Thing into DataSet
        dataset = setThing(dataset, reviewThing);

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
        j++;
    }
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
