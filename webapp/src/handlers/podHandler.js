import {
    getPodUrlAll,
    createContainerAt,
    getSolidDataset,
    getThing,
    getUrlAll,
    getSolidDatasetWithAcl,
    hasResourceAcl,
    hasAccessibleAcl,
    hasFallbackAcl,
    createAcl,
    createAclFromFallbackAcl,
    getResourceAcl,
    setAgentResourceAccess,
    saveAclFor,
    createSolidDataset,
    saveSolidDatasetAt,
    setAgentDefaultAccess,
    getAgentResourceAccess
} from "@inrupt/solid-client";
import {issueAccessRequest, redirectToAccessManagementUi} from "@inrupt/solid-client-access-grants";
import {FOAF, VCARD} from "@inrupt/vocab-common-rdf";


/**
 * This method gets all the pods relative to a user given the session from a logged in user and looks for the corresponding "lomap" folder in which
 * all the application information is going to be stored.
 * @param {} session
 */
export async function checkForLomap(session) {

    let anyContainer = false;
    let pods = await getPodUrlAll(session.info.webId, {fetch: session.fetch});
    let podWithFolder;
    let i = 0;
    while (!anyContainer && i < pods.length) {//While there are pods left and none of them has a lomap folder
        let currentPod = pods[i].replace("/profile/card#me", "/")//Remove profile url string.
        anyContainer = await checkForLomapInPod(currentPod, session);
        if (anyContainer) {
            podWithFolder = pods[i];
        }

        i++;

    }
    if (!podWithFolder) {//If no pod has that folde

        podWithFolder = await createLomapContainer(pods[0].replace("/profile/card#me", "/"), session)


    }
    return podWithFolder;
}

/**
 * This method checks if the lomap folder exists given a pod.
 * @param {} _pod
 */
export async function checkForLomapInPod(pod, session) {
    try {

        let aux = await getSolidDataset(pod + "public/lomapen3b", {fetch: session.fetch});
        let aux2 = await getSolidDataset(pod + "private/lomapen3b", {fetch: session.fetch});

    } catch (error) {
        console.log("Not found lomap folder in pod, we'll try creating one...")
        return false;
    }
    console.log("Found lomap folder in pod.")
    await giveFriendsAccess(session, true);
    return true;
}

/**
 * This method is intended to be used to ask for access to the user's pod.
 * Once LoMap has reding & writting access granted, then we can create and modify resources to the folder.
 * @param session
 * @returns {Promise<void>}
 */
export async function requestAccessToLomap(session) {

    //this part sets the requested access (if granted) to expire in 5 minutes.
    let accessExpiration = new Date(Date.now() + 5 * 60000);
    const requestVC = await issueAccessRequest( //WE CREATE A NEW ACCESS REQUEST.

        //Vc stands for Verifiable credential
        {

            "access": {read: true, write: true},//the permissions to be asking
            "resources": session.info.webId,
            "resourceOwner": session.info.webId,
            "expirationDate": accessExpiration,

        },

        {fetch: session.fetch, updateAcr: true}//update acr makes the request grant effective if given
    );
    console.log("rvc" + requestVC)
    //we actually send the access request to the access management ui, so the user can accept the request.
    await redirectToAccessManagementUi(
        requestVC.id,
        window.location.href,
        {
            fallbackAccessManagementUi: session.info.webId
        }
    );
}

/**
 * Mock function that creates a mock locations.ttl file to test the friends stuff
 * @param session with the current session
 */
async function mockFiles(session, resource) {
    let currentUserLomapLocation = resource;
    let mockDataset = createSolidDataset();

    try {
        await saveSolidDatasetAt(currentUserLomapLocation, mockDataset, {fetch: session.fetch});
    } catch (e) {
        console.log(e);
    }
}

export async function createLomapContainer(pod, session) {
    // create the lomap containers
    await createContainerAt(pod + "public/lomapen3b/", {fetch: session.fetch});
    await createContainerAt(pod + "private/lomapen3b/", {fetch: session.fetch});
    // create all the tl files used to store locations and reviews (all empty)
    await mockFiles(session, session.info.webId.replace("/profile/card#me", "/private/lomapen3b/locations.ttl"));
    await mockFiles(session, session.info.webId.replace("/profile/card#me", "/public/lomapen3b/locations.ttl"));
    await mockFiles(session, session.info.webId.replace("/profile/card#me", "/private/lomapen3b/reviews.ttl"));
    await mockFiles(session, session.info.webId.replace("/profile/card#me", "/public/lomapen3b/reviews.ttl"));
    // create the containers that are going to store the images
    await createContainerAt(session.info.webId.replace("/profile/card#me", "/public/lomapen3b/images/"), {fetch: session.fetch});
    await createContainerAt(session.info.webId.replace("/profile/card#me", "/private/lomapen3b/images/"), {fetch: session.fetch});
    await giveFriendsAccess(session, true);
}

/**
 * It returns a list with the friends of the logged in user
 * @param webId Containing the webId whose friends we are returning
 * @returns {Promise<*[]>} Containing a List of the webIds of the friends
 */
export async function getFriendsWebIds(webId) {
    let profile = await getProfile(webId);
    let ids = getUrlAll(profile, FOAF.knows);

    let list = [];

    ids.forEach(friend => list.push(friend.split("#")[0])); //remove the right side of the "#"

    return list;
}

/**
 * Gives all the friends of the user in session access to the lomap info
 * @param session containing the current session
 */
async function giveFriendsAccess(session, access) {
    let currentUser = session.info.webId
    let friends = await getFriendsWebIds(currentUser);
    let resourceURL = currentUser.replace("/profile/card#me", "/") + "public/lomapen3b/";


    for (let i = 0; i < friends.length; i++) { //Set access to  public (friends only) resources
        await getAccessForFriend(friends[i].replace("/profile/card", "/") + "profile/card#me", resourceURL, session);

    }
}

async function getAccessForFriend(friend, location, session) {
    try {
        let datasetWithACL = await getSolidDatasetWithAcl(location, {fetch: session.fetch})
        let ACL = await getResourceAcl(datasetWithACL);
        let access = await getAgentResourceAccess(ACL, friend);
        if (!access.read || !access.append) {
            await setAccessToFriend(friend, location, true, session);
        }
    } catch (e) {
        console.log("Friend is not a lomapen3b user.")
    }
}

/**
 * Grant/ Revoke permissions of friends regarding a particular location
 * @param friend webID of the friend whose access edit
 * @param location location to give permission to
 * @param access boolean containing the value regarding permissions
 * @param session object containing the current session info
 */
async function setAccessToFriend(friend, location, access, session) {
    let locationsURL = location + "locations.ttl";
    let reviewsURL = location + "reviews.ttl";
    let imagesURL = location + "images/";

    await giveAccessToFile(locationsURL, friend, session);
    await giveAccessToFile(reviewsURL, friend, session);
    await giveAccessToFile(imagesURL, friend, session);
    await giveDefaultAccessToFile(imagesURL, friend, session);

    // Fetch the SolidDataset and its associated ACL, if available:
    let myDatasetWithAcl;
    try {
        myDatasetWithAcl = await getSolidDatasetWithAcl(location, {fetch: session.fetch});
        // Obtain the SolidDataset's own ACL, if available, or initialise a new one, if possible:
        let resourceAcl;
        if (!hasResourceAcl(myDatasetWithAcl)) {
            if (!hasAccessibleAcl(myDatasetWithAcl)) {
                //  "The current user does not have permission to change access rights to this Resource."
            }
            if (!hasFallbackAcl(myDatasetWithAcl)) {
                // create new ACL
                resourceAcl = createAcl(myDatasetWithAcl);
            } else {
                // create ACL from fallback
                resourceAcl = createAclFromFallbackAcl(myDatasetWithAcl);
            }
        } else {
            // get the ACL of the dataset
            resourceAcl = getResourceAcl(myDatasetWithAcl);
        }

        let updatedAcl;
        if (access) {
            // give permissions
            updatedAcl = setAgentResourceAccess(
                resourceAcl,
                friend,
                {read: true, append: true, write: false, control: false}
            );
        } else {
            // cancel permissions
            updatedAcl = setAgentResourceAccess(
                resourceAcl,
                friend,
                {read: false, append: false, write: false, control: false}
            );
        }
        // save the ACL
        await saveAclFor(myDatasetWithAcl, updatedAcl, {fetch: session.fetch});
    } catch (error) {
        console.log(error)// catch any error
    }
}

/**
 * Sets the default access to a folder (the children of such folder inherit this access)
 * @param resource folder to edit
 * @param friend is given access
 * @param session containing the current authenticated session
 */
async function giveDefaultAccessToFile(resource, friend, session) {
    let myDatasetWithAcl;
    try {
        myDatasetWithAcl = await getSolidDatasetWithAcl(resource, {fetch: session.fetch}); // inventory
        // Obtain the SolidDataset's own ACL, if available, or initialise a new one, if possible:
        let resourceAcl;
        if (!hasResourceAcl(myDatasetWithAcl)) {
            if (!hasAccessibleAcl(myDatasetWithAcl)) {
                //  "The current user does not have permission to change access rights to this Resource."
            }
            if (!hasFallbackAcl(myDatasetWithAcl)) {
                // create new access control list
                resourceAcl = createAcl(myDatasetWithAcl);
            } else {
                // create access control list from fallback
                resourceAcl = createAclFromFallbackAcl(myDatasetWithAcl);
            }
        } else {
            // get the access control list of the dataset
            resourceAcl = getResourceAcl(myDatasetWithAcl);
        }

        let updatedAcl;
        // grant permissions
        updatedAcl = setAgentDefaultAccess(
            resourceAcl,
            friend,
            {read: true, append: true, write: false, control: false}
        );
        // save the access control list
        await saveAclFor(myDatasetWithAcl, updatedAcl, {fetch: session.fetch});
    } catch (error) { // catch any possible thrown errors
        console.log(error)
    }
}

/**
 * Gives access to the locations.ttl file
 * @param resource containing the path of such file
 * @param friend containing the webID of the friend we are giving access
 * @param session with the current session
 */
async function giveAccessToFile(resource, friend, session) {
    let myDatasetWithAcl;
    try {
        myDatasetWithAcl = await getSolidDatasetWithAcl(resource, {fetch: session.fetch}); // inventory
        // Obtain the SolidDataset's own ACL, if available, or initialise a new one, if possible:
        let resourceAcl;
        if (!hasResourceAcl(myDatasetWithAcl)) {
            if (!hasAccessibleAcl(myDatasetWithAcl)) {
                //  "The current user does not have permission to change access rights to this Resource."
            }
            if (!hasFallbackAcl(myDatasetWithAcl)) {
                // create new access control list
                resourceAcl = createAcl(myDatasetWithAcl);
            } else {
                // create access control list from fallback
                resourceAcl = createAclFromFallbackAcl(myDatasetWithAcl);
            }
        } else {
            // get the access control list of the dataset
            resourceAcl = getResourceAcl(myDatasetWithAcl);
        }

        let updatedAcl;
        // grant permissions
        updatedAcl = setAgentResourceAccess(
            resourceAcl,
            friend,
            {read: true, append: true, write: false, control: false}
        );
        // save the access control list
        await saveAclFor(myDatasetWithAcl, updatedAcl, {fetch: session.fetch});
    } catch (error) { // catch any possible thrown errors
        console.log(error)
    }
}


/**
 * Returns the profile for a given webId
 * @param webId containing the webId whose profile we want
 * @returns {Promise<Thing & {url: UrlString}>} with the profile we need
 */
async function getProfile(webId) {
    let dataset = await getSolidDataset(webId);
    return getThing(dataset, webId);
}


