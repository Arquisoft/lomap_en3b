import {
    addUrl,
    createSolidDataset,
    getFile,
    getSolidDataset,
    getThingAll,
    getUrl,
    saveFileInContainer,
    saveSolidDatasetAt,
    setThing
} from "@inrupt/solid-client";
import {SCHEMA_LOMAP} from "../util/schema";
import {
    convertDomainModelLocationIntoPODLocation,
    convertDomainModelReviewIntoPODReview,
    convertPODLocationIntoDomainModelLocation,
    convertPODReviewIntoDomainModelReview
} from "../util/convertor";

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
                //Convert into LocationLM object
                location= convertPODLocationIntoDomainModelLocation(locationThing, userIDWeb)
                location.locOwner = userIDWeb;

                // media
                let mediaURL = getUrl(locationThing, SCHEMA_LOMAP.rev_hasPart);
                if(mediaURL){
                    let aux = await getImageFromPod(mediaURL, session);
                    location.img = "data:image/png;base64,".concat(aux);
                }
                //Add locationLM into List
                locationsRetrieved.push(location);

            } catch (error) {
                //TODO:
                /*
                if (error instanceof StringInvalidFormatException ) {
                    //TODO: Some argument where not valid
                    console.error('StringInvalidFormatException:', error.message);
                } else if (error instanceof CoordinateNotInDomain){
                    //TODO: Some argument where not valid
                    console.error('CoordinateNotInDomain:', error.message);
                }else{
                    console.error(error);
                }
                 */
            }
        }
    }

    //Return list
    return locationsRetrieved;

}

export async function writeLocationWithImg(resourceURL, session, loc, imgResourceURL) {
    return writeLocation(resourceURL, session, loc, true, imgResourceURL)
}

export async function writeLocationWithoutImg(resourceURL, session, loc) {
    return writeLocation(resourceURL, session, loc, false);
}


/**
 * This method save a Location into the user's pod inside a given URL
 * @param {String} resourceURL The URL of the SolidDataset where to store the Location
 * @param {*} session - The authentication session used to access the user's pod.
 * @param {LocationLM} loc - The location related to the comment
 * @param {boolean} cond - The condition the handle if a review has a picture associated or not
 * @param {string} imgResourceURL - The URL of the SolidDataset where the image should be store
 * @param {LocationLM} loc - The location with the data to store
 * @returns {Promise<void>}
 */
async function writeLocation(resourceURL, session, loc, cond, imgResourceURL = '') {
    //Get dataSet
    let dataset = await getDataset(resourceURL, session);

    //Create Thing
    let locationThing = convertDomainModelLocationIntoPODLocation(loc);

    if(cond) {
        let name = loc.locID.concat(".png")
        //Save image file into POD and get URL
        await saveImageToPod(imgResourceURL, session, loc.img, name);

        //URL where it saved
        let imageUrl = imgResourceURL.concat("/").concat(name);

        locationThing = addUrl(locationThing, SCHEMA_LOMAP.rev_hasPart, imageUrl);       //Img
    }


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
                //Convert into LocationLM object
                review = convertPODReviewIntoDomainModelReview(reviewThing)

                // media
                let mediaURL = getUrl(reviewThing, SCHEMA_LOMAP.rev_hasPart);
                if(mediaURL){
                    //IMG url
                    let mediaThingURL = mediaURL.toString();
                    review.media = getImageFromPod(mediaThingURL, session);
                }

                //Add review into List
                reviewsRetrieved.push(review);

            } catch (error) {
                //TODO:
                /*
                if (error instanceof StringInvalidFormatException) {
                    //TODO: Some argument where not valid
                    console.error('StringInvalidFormatException:', error.message);
                } else{
                    console.error(error);
                }
                 */
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
 * @param {string} privacy - Privacy level of the review, used to identify where it is going to be share with
 * @returns {Promise<string|*>} */
export function writeReviewWithoutIMG(resourceURL, session, rev, privacy) {
    return writeReview(resourceURL, session, rev, privacy, false);
}

//Associate image
/**
 * This JavaScript function writes a new review by creating a new Thing with the review data and adding it
 *  to a SolidDataset located at the specified resourceURL. This reviews has an image associated
 * @param resourceURL - The URL of the SolidDataset to save the review
 * @param {*} session - The authentication session used to access the user's pod.
 * @param {ReviewLM} rev - review object to convert into a Review Thing
 * @param {string} privacy - Privacy level of the review, used to identify where it is going to be share with
 * @param {string} imageContainerUrl - The URL of the SolidDataset where the image should be store
 * @returns {Promise<string|*>} */
export function writeReviewWithIMG(resourceURL, session, rev, privacy, imageContainerUrl) {
    return writeReview(resourceURL, session, rev, privacy, true, imageContainerUrl);
}

/**
 *
 * @param {ReviewLM[]} reviewsStored
 * @param {ReviewLM} rev
 * @returns {boolean}
 */
function checkForDuplicates(reviewsStored, rev) {
    if (reviewsStored) {
        for (let i = 0; i < reviewsStored.length; rev) {
            let review = reviewsStored[i];
            if(review.ItemReviewed === rev.ItemReviewed && review.user === rev.user &&
                review.comment === rev.comment && review.rate === rev.rate && review.media === rev.media){
                return false
            }
        }
    }
    return true;
}

/**
 * This JavaScript function writes a new review by creating a new Thing with the review data and adding it
 *  to a SolidDataset located at the specified resourceURL.
 * @param resourceURL - The URL of the SolidDataset to save the review
 * @param {*} session - The authentication session used to access the user's pod.
 * @param {ReviewLM} rev - review object to convert into a Review Thing
 * @param {string} privacy - Privacy level of the review, used to identify where it is going to be share with
 * @param {boolean} cond - if the review has an image
 * @param {string} imageContainerUrl - The URL of the SolidDataset where the image should be store
 * @returns {Promise<string|*>}
 */
async function writeReview(resourceURL, session, rev, privacy, cond, imageContainerUrl="") {
    //Get dataSet
    let dataset = await getDataset(resourceURL, session);

    //Check if it has been added before
    let reviewsStored = await readReviews(resourceURL,session);
    let added = checkForDuplicates(reviewsStored, rev);
    if(!added) {

        //Create Thing
        let reviewThing = convertDomainModelReviewIntoPODReview(rev, privacy);

        if (cond) {
            let name = rev.revID.concat(".png")
            //Save image file into POD and get URL
            await saveImageToPod(imageContainerUrl, session, rev.media, name);

            //URL where it saved
            let imageUrl = imageContainerUrl.concat("/").concat(name);

            reviewThing = addUrl(reviewThing, SCHEMA_LOMAP.rev_hasPart, imageUrl);       //Img
        }

        //Add Thing into DataSet
        dataset = setThing(dataset, reviewThing);

        //Save dataSet into POD
        await saveNew(resourceURL, dataset, session);
    }
    return rev.revID;
}

/* ------------------- IMG ------------------- */
/**
 * This method reads the file with the FileReader API and returns a Promise that resolves with the base64-encoded
 *  string when the file is read.
 * @param {string} fileUrl - The URL of the image file to retrieve from the user's pod.
 * @param {*} session - The authentication session used to access the user's pod.
 * @returns {Promise<unknown>} - A promise that resolves to a Blob object containing the image file data.
 */
async function getImageFromPod(fileUrl, session) {
    try {
        // Get the file from the container
        const imageBlob = await getFile(fileUrl, { fetch: session.fetch });

        // Convert the Blob object to a base64-encoded string
        // Do something with the base64-encoded image data
        return await new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result.split(',')[1]);
            reader.onerror = reject;
            reader.readAsDataURL(imageBlob);
        });

    } catch (error) {
        console.error(error);
    }
}

/**
 * The code takes a base64-encoded image, converts it to a Blob object, and saves it to a Solid pod using the
 *  saveFileInContainer method provided by Inrupt's library.
 * @param {string} containerUrl - The URL of the container in the user's Pod to save the file to
 * @param {*} session - The user's Solid session object containing the authentication credentials
 * @param {string} file - The image file to be saved
 * @param {*} fileName - The name to be used for the saved image file
 * @returns {Promise<void>}
 */
async function saveImageToPod(containerUrl, session, file, fileName) {
    try {
        // Remove the prefix data:image/xxx;base64, from the base64-encoded image string
        const base64Data = file.replace(/^data:image\/\w+;base64,/, '');
        // Decode the remaining base64-encoded string into a binary format
        const binaryData = atob(base64Data);
        const arrayBuffer = new ArrayBuffer(binaryData.length);

        // Populate a new Uint8Array with the binary data
        const uint8Array = new Uint8Array(arrayBuffer);
        for (let i = 0; i < binaryData.length; i++) {
            uint8Array[i] = binaryData.charCodeAt(i);
        }

        // Create a new Blob from the Uint8Array
        const blob = new Blob([uint8Array], { type: 'image/png' });

        // Save the image in the container
        const mimetype = "image/png";
        const options = { slug: fileName, contentType: mimetype, fetch: session.fetch };
        await saveFileInContainer(containerUrl, blob, options);

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
