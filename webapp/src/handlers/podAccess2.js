import {v4 as uuidv4} from "uuid";
import {
    buildThing,
    createSolidDataset,
    createThing, getFile,
    getSolidDataset,
    saveSolidDatasetAt,
    setThing, saveFileInContainer,
    addUrl,
    getThingAll,
    getStringNoLocale,
    getUrl
} from "@inrupt/solid-client";
import {SCHEMA_LOMAP} from "../util/schema";
import {
    CoordinateNotInDomain,
    StringInvalidFormatException
} from "../util/Exceptions/exceptions";
import {LocationLM} from "../models/location";
import {ReviewLM} from "../models/new/review";

/* ------------------- LOCATION ------------------- */
/**
 * This method returns a list od LocationLM locations that are read from the user's pod
 * @param {String} resourceURL The URL of the SolidDataset from where to retrieve the locations
 * @param {*} session - The authentication session used to access the user's pod.
 * @param {String} userIDWeb - Owner of the locations
 * @returns {Promise<*[]>}
 */
export async function readLocations(resourceURL,session, userIDWeb) {
    let locationThings=await getThingsFromDataset(resourceURL,session);
    let location,locationThing;
    let locationsRetrieved = [];
    if(locationThings) {//Check if the list of things retrieved from the resource is not undefined nor null.
        //Convert into LocationLM object
        for (let i = 0; i < locationThings.length; i++) {
            //Get a Thing
            locationThing =locationThings[i];

            try {
                let podObj = locationThing;
                //Convert into LocationLM object
                location= new LocationLM(
                    Number(getStringNoLocale(podObj, SCHEMA_LOMAP.loc_latitude)),       // CoorLat,
                    Number(getStringNoLocale(podObj, SCHEMA_LOMAP.loc_longitude)),      // CoorLng,
                    getStringNoLocale(podObj, SCHEMA_LOMAP.name),                       // name,
                    getStringNoLocale(podObj, SCHEMA_LOMAP.descrip),                    // description,
                    getStringNoLocale(podObj, SCHEMA_LOMAP.category),                   // category
                    getStringNoLocale(podObj, SCHEMA_LOMAP.accessCode),                 // privacy
                    getStringNoLocale(podObj, SCHEMA_LOMAP.dateModified),               // date
                    getStringNoLocale(podObj, SCHEMA_LOMAP.ident),                      // id
                );
                location.locOwner = userIDWeb;

                //Add locationLM into List
                locationsRetrieved.push(location);

            } catch (error) {
                if (error instanceof StringInvalidFormatException ) {
                    //TODO: Some argument where not valid
                    console.error('StringInvalidFormatException:', error.message);
                } else if (error instanceof CoordinateNotInDomain){
                    //TODO: Some argument where not valid
                    console.error('CoordinateNotInDomain:', error.message);
                }else{
                    console.error(error);
                }
            }
        }
    }

    //Return list
    return locationsRetrieved;

}

/**
 * This method save a Location into the user's pod inside a given URL
 * @param {String} resourceURL The URL of the SolidDataset where to store the Location
 * @param {*} session - The authentication session used to access the user's pod.
 * @param {LocationLM} loc - The location with the data to store
 * @returns {Promise<void>}
 */
export async function writeLocation(resourceURL, session, loc) {
    //Get dataSet
    let dataset = await getDataset(resourceURL, session);

    //Create Thing
    let locationThing = buildThing(createThing({ name: loc.locID }))
        .addStringNoLocale(SCHEMA_LOMAP.name, loc.name)
        .addStringNoLocale(SCHEMA_LOMAP.loc_latitude, loc.lat)
        .addStringNoLocale(SCHEMA_LOMAP.loc_longitude, loc.lng)
        .addStringNoLocale(SCHEMA_LOMAP.descrip, loc.description)
        .addStringNoLocale(SCHEMA_LOMAP.ident, "".concat(loc.locID))
        .addStringNoLocale(SCHEMA_LOMAP.category, loc.category)
        .addStringNoLocale(SCHEMA_LOMAP.dateModified, loc.dateTime)     // time
        .addStringNoLocale(SCHEMA_LOMAP.accessCode, loc.privacy)    // privacy
        .addUrl(SCHEMA_LOMAP.type, SCHEMA_LOMAP.place)
        .build();

    //Add Thing into DataSet
    dataset = setThing(dataset, locationThing);

    //Save dataSet into POD
    await saveNew(resourceURL, dataset, session);
}

/* ------------------- REVIEW ------------------- */
/**
 * This function reads a list of reviews from the user's POD and returns them as a list ReviewLM
 * @param {String} resourceURL The URL of the SolidDataset from where to retrieve the reviews
 * @param {*} session - The authentication session used to access the user's pod.
 * @returns {Promise<ReviewLM[]>}
 */
export async function readReviews(resourceURL,session) {
    let reviewThings=await getThingsFromDataset(resourceURL,session);
    let review,reviewThing;
    let reviewsRetrieved = [];
    if(reviewThings) {//Check if the list of things retrieved from the resource is not undefined nor null.
        //Convert into LocationLM object
        for (let i = 0; i < reviewThings.length; i++) {
            //Get a Thing
            reviewThing = reviewThings[i];

            try {
                let podObj = reviewThing;
                //Convert into LocationLM object
                review = new ReviewLM(
                    getStringNoLocale(podObj, SCHEMA_LOMAP.rev_locat),          // locatID
                    getStringNoLocale(podObj, SCHEMA_LOMAP.rev_reviewer),       // user
                    getStringNoLocale(podObj, SCHEMA_LOMAP.dateModified),       // date
                    getStringNoLocale(podObj, SCHEMA_LOMAP.ident)               // reviewID

                );
                // comment
                let com = getStringNoLocale(podObj, SCHEMA_LOMAP.rev_comment);
                if(com){
                    review.comment = com;
                }
                // rate
                let rate = getStringNoLocale(podObj, SCHEMA_LOMAP.rev_rate);
                if(rate){
                    review.rate = Number(rate);
                }
                // media
                let mediaURL = getUrl(podObj, SCHEMA_LOMAP.rev_hasPart);
                if(mediaURL){
                    //IMG url
                    let mediaThingURL = mediaURL.toString();

                    review.media = getImageFromPod(mediaThingURL, session);
                }

                //Add review into List
                reviewsRetrieved.push(review);

            } catch (error) {
                if (error instanceof StringInvalidFormatException) {
                    //TODO: Some argument where not valid
                    console.error('StringInvalidFormatException:', error.message);
                } else{
                    console.error(error);
                }
            }
        }
    }
    //Return list
    return reviewsRetrieved;
}

/**
 * This JavaScript function writes a new review by creating a new Thing with the review data and adding it
 *  to a SolidDataset located at the specified resourceURL.
 * @param resourceURL - The URL of the SolidDataset to save the review
 * @param {*} session - The authentication session used to access the user's pod.
 * @param {ReviewLM} rev - review object to convert into a Review Thing
 * @param {string} user - User id to identify who wrote the review
 * @param {string} locId - locationID to identify the location to where the review is referring
 * @param {string} privacy - Privacy level of the review, used to identify where it is going to be share with
 * @returns {Promise<string|*>} */
export function writeReviewWithoutIMG(resourceURL, session, rev, user, locId,
                                      privacy) {
    return writeReview(resourceURL, session, rev, user, locId, privacy, false);
}

//Associate image
/**
 * This JavaScript function writes a new review by creating a new Thing with the review data and adding it
 *  to a SolidDataset located at the specified resourceURL. This reviews has an image associated
 * @param resourceURL - The URL of the SolidDataset to save the review
 * @param {*} session - The authentication session used to access the user's pod.
 * @param {ReviewLM} rev - review object to convert into a Review Thing
 * @param {string} user - User id to identify who wrote the review
 * @param {string} locId - locationID to identify the location to where the review is referring
 * @param {string} privacy - Privacy level of the review, used to identify where it is going to be share with
 * @param {string} imageContainerUrl - The URL of the SolidDataset where the image should be store
 * @param imageFile - The image file
 * @returns {Promise<string|*>} */
export function writeReviewWithIMG(resourceURL, session, rev, user, locId,
                                   privacy, imageContainerUrl, imageFile) {
    return writeReview(resourceURL, session, rev, user, locId, privacy, true, imageContainerUrl, imageFile);
}

/**
 * This JavaScript function writes a new review by creating a new Thing with the review data and adding it
 *  to a SolidDataset located at the specified resourceURL.
 * @param resourceURL - The URL of the SolidDataset to save the review
 * @param {*} session - The authentication session used to access the user's pod.
 * @param {ReviewLM} rev - review object to convert into a Review Thing
 * @param {string} user - User id to identify who wrote the review
 * @param {string} locId - locationID to identify the location to where the review is referring
 * @param {string} privacy - Privacy level of the review, used to identify where it is going to be share with
 * @param {boolean} cond - if the review has an image
 * @param {string} imageContainerUrl - The URL of the SolidDataset where the image should be store
 * @param {*} imageFile - The image file
 * @returns {Promise<string|*>}
 */
async function writeReview(resourceURL, session, rev, user, locId, privacy, cond, imageContainerUrl="", imageFile="") {
    let id = uuidv4();

    //Get dataSet
    let dataset = await getDataset(resourceURL, session);

    //Create Thing
    let reviewThing = buildThing(createThing({ name: id }))
        .addStringNoLocale(SCHEMA_LOMAP.rev_comment, rev.comment)
        .addStringNoLocale(SCHEMA_LOMAP.rev_rate, rev.rate)
        .addStringNoLocale(SCHEMA_LOMAP.rev_reviewer, user)
        .addStringNoLocale(SCHEMA_LOMAP.ident, "".concat(id))
        .addStringNoLocale(SCHEMA_LOMAP.rev_date, rev.time)     //time
        .addStringNoLocale(SCHEMA_LOMAP.rev_locat, locId)
        .addStringNoLocale(SCHEMA_LOMAP.accessCode, privacy)    // privacy
        .addUrl(SCHEMA_LOMAP.type, SCHEMA_LOMAP.review)
        .build();

    if(cond) {
        //Save image file into POD and get URL
        await saveImageToPod(imageContainerUrl, session, imageFile, id);

        //URL where it saved //TODO: CHECK if it's like this
        let imageUrl = imageContainerUrl.concat("/").concat(id);

        reviewThing = addUrl(reviewThing, SCHEMA_LOMAP.rev_hasPart, imageUrl);       //Img
    }

        //Add Thing into DataSet
    dataset = setThing(dataset, reviewThing);

    //Save dataSet into POD
    await saveNew(resourceURL, dataset, session);

    return id;
}

/* ------------------- IMG ------------------- */
/**
 *
 * @param {string} fileUrl - The URL of the image file to retrieve from the user's pod.
 * @param {*} session - The authentication session used to access the user's pod.
 * @returns {Promise<*>} - A promise that resolves to a Blob object containing the image file data.
 */
async function getImageFromPod(fileUrl, session) {
    try {
        // Get the file from the user's pod
        const file = await getFile(fileUrl, { fetch: session.fetch });

        // Return a blob from the file
        return new Blob([await file.arrayBuffer()], { type: file.type });
    } catch (error) {
        console.error(error);
    }
}

/**
 * Saves an image file to a container in the user's Solid Pod
 * @param {string} containerUrl - The URL of the container in the user's Pod to save the file to
 * @param {*} session - The user's Solid session object containing the authentication credentials
 * @param {File} file - The image file to be saved
 * @param {*} fileName - The name to be used for the saved image file
 * @returns {Promise<void>}
 */
async function saveImageToPod(containerUrl, session, file, fileName) {
    try {
        // Create a blob from the file
        const fileData = new Blob([await file.arrayBuffer()], { type: file.type });

        // Save the file to the specified container in the user's pod
        await saveFileInContainer(
            containerUrl,
            fileData,
            { slug: fileName, contentType: file.type, fetch: session.fetch }
        );

        console.log(`Image ${fileName} saved to ${containerUrl}`);
    } catch (error) {
        console.error(error);
    }
}

/* ------------------- UTIL ------------------- */
/**
 * Retrieves all Things from a SolidDataset at the specified resource URL using the provided session's fetch function.
 * @param {string} resourceURL - The URL of the SolidDataset to retrieve the Things from.
 * @param {Session} session - The session containing the authorization credentials and fetch function to use for
 *      the request.
 * @returns {Promise<Thing[]>} - A Promise that resolves with an array of all Things in the retrieved SolidDataset.
 * */
async function getThingsFromDataset(resourceURL,session){
    let dataset,allThings;
    dataset=await getSolidDataset(resourceURL,{fetch:session.fetch})
    allThings=getThingAll(dataset);
    return allThings;
}


/**
 * This asynchronous function retrieves a Solid dataset from a specified resource URL using the provided session's fetch
 *  function. If the resource is not found, it creates a new Solid dataset and returns it.
 * @param {string} resourceURL - The URL of the resource from which to retrieve the Solid dataset.
 * @param {Session} session - The session containing the fetch function to use for retrieving the dataset.
 * @returns Promise<{readonly type: "Dataset", readonly graphs: Readonly<Record<IriString, Graph> & {default: Graph}>}>}
 *      - A promise that resolves to the retrieved or newly created Solid dataset.
 */
async function getDataset(resourceURL,session){
    let dataset;
    try {
        //Get DataSet
        dataset=await getSolidDataset(resourceURL,{fetch:session.fetch})
    } catch (error) {
        if (typeof error.statusCode === "number" && error.statusCode === 404) {
            // if not found, create a new SolidDataset
            dataset = createSolidDataset();
        } else {
            console.error(error);
        }
    }
    return dataset;
}

/**
 * The function attempts to save the dataset at the specified resourceURL using the saveSolidDatasetAt function.
 * If the save is successful, nothing happens. If an error occurs during the save operation, the error is logged
 * to the console using console.log().
 * @param resourceURL - The URL of the resource to save the dataset to.
 * @param dataset - The SolidDataset to be saved.
 * @param session - The Session object containing authentication details.
 * @returns {Promise<void>}
 */
async function saveNew(resourceURL, dataset, session){
    try {
        // Save the SolidDataset
        await saveSolidDatasetAt(
            resourceURL,
            dataset,
            {fetch: session.fetch}
        );
    } catch (error) {
        console.error(error);
    }
}
