import {
    getPodUrlAll,
    createContainerAt,
    getSolidDataset,
    getStringNoLocale,
    getThing,
    getUrlAll,
    acp_ess_2,
    asUrl,
    getAgentAccess,
    getPublicAccess,
    getSolidDatasetWithAcl,
    access,
    setAgentResourceAccess,
    getResourceAcl,
    getResourceInfo,
    getLinkedResourceUrlAll,
    getFallbackAcl,
    createAclFromFallbackAcl,
    saveAclFor,
    setAgentDefaultAccess,
    getResourceInfoWithAcl,
    getAgentDefaultAccess, hasAccessibleAcl, hasResourceAcl, hasFallbackAcl, createAcl
} from "@inrupt/solid-client";
import {issueAccessRequest, redirectToAccessManagementUi} from "@inrupt/solid-client-access-grants";
import {FOAF} from "@inrupt/vocab-common-rdf";
import {getAclServerResourceInfo, setAgentAccess} from "@inrupt/solid-client/universal";
import {fetch} from "@inrupt/solid-client-authn-browser";


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

        let aux = await getSolidDataset(pod + "lomap", {fetch: session.fetch});

    } catch (error) {
        console.log("Not found lomap folder in pod, we'll try creating one...")
        return false;
    }
    console.log("Found lomap folder in pod.")
    return true;
}

/**
 * This method is intended to be used to ask for access to the user's pod.
 * Once LoMap has reding & writting access granted, then we can create and modify resources to the folder.
 * @param session
 * @returns {Promise<void>}
 */
export async function giveLomapAccessToFriends(pod, session) {
    let friendsWebIds = await getFriendsWebIds(session.info.webId);

    for (let i = 0; i < friendsWebIds.length; i++) {
        const myDatasetWithAcl = await getSolidDatasetWithAcl(pod + "/lomap/", {fetch: session.fetch})
        const acl = await getResourceAcl(myDatasetWithAcl)
        await giveLomapAccessTo(friendsWebIds[i], pod, session, true);
        //await setAgentDefaultAccess(acl,"localhost:3000", {read: true, append: true, write: true, control: true})
        //await setAgentDefaultAccess(acl,friendsWebIds[i], {read: true, append: true, write: true, control: true})
        //await setAgentAccess(pod+"lomap/", "http://localhost:3000", {read: true, write : true},
        //  {fetch:session.fetch})
        // const access = await getAgentAccess(myDatasetWithAcl,friendsWebIds[i])
        //const access = await getAgentAccess(myDatasetWithAcl, "http://localhost:3000")
        //console.log("http://localhost:3000" + " has the following access: " + access.read.toString() + access.write.toString());
    }

}


async function giveLomapAccessTo(friendWebId, pod, session, access) {
    let resourceURL = pod + "/lomap/"
    let myDatasetWithAcl;
    try {
        myDatasetWithAcl = await getSolidDatasetWithAcl(resourceURL, {fetch:session.fetch});
        let resourceAcl;
        if (!hasResourceAcl(myDatasetWithAcl)) {
            if (!hasAccessibleAcl(myDatasetWithAcl)) {
            }
            if (!hasFallbackAcl(myDatasetWithAcl)) {
                resourceAcl = createAcl(myDatasetWithAcl);
            } else {
                resourceAcl = createAclFromFallbackAcl(myDatasetWithAcl);
            }
        } else {
            resourceAcl = getResourceAcl(myDatasetWithAcl);
        }

        let updatedAcl;
        if (access) {
            updatedAcl = setAgentDefaultAccess(
                resourceAcl,
                friendWebId,
                {read: true, append: true, write: false, control: false}
            );
        } else {
            updatedAcl = setAgentResourceAccess(
                resourceAcl,
                friendWebId,
                {read: false, append: false, write: false, control: false}
            );
        }
        await saveAclFor(myDatasetWithAcl, updatedAcl, {fetch: fetch});
    } catch (error) {
        console.log(error)
    }
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

export async function createLomapContainer(pod, session) {
    await createContainerAt(pod + "lomap/", {fetch: session.fetch});
}

// async function setUpPolicy(session, resourceURL) {
//     const agentsToMatch = (await getFriendsWebIds(session.info.webId)).map(f => f.replace("/card", ""));
//     const clientIDsToMatch = session.info.webId.replace("/card#me", "");
//
//     try {
//         // 1. Fetch the SolidDataset with its Access Control Resource (ACR).
//         let resourceWithAcr = await acp_ess_2.getSolidDatasetWithAcr(
//             resourceURL,            // Resource whose ACR to set up
//             { fetch: session.fetch }       // fetch from the authenticated session
//         );
//
//         // 2. Initialize a new Matcher.
//         let lomapFriendsMatcher = acp_ess_2.createResourceMatcherFor(
//             resourceWithAcr,
//             "lomap-friends-matcher"
//         );
//
//         // 3. For the Matcher, specify the Agent(s) to match.
//         agentsToMatch.forEach(agent => {
//             lomapFriendsMatcher = acp_ess_2.addAgent(lomapFriendsMatcher, agent);
//         })
//
//         // 4. For the Matcher, specify the Client ID(s) to match.
//         clientIDsToMatch.forEach(clientID => {
//             lomapFriendsMatcher = acp_ess_2.addClient(lomapFriendsMatcher, clientID);
//         })
//
//         // 5. Add the Matcher definition to the Resource's ACR.
//         resourceWithAcr = acp_ess_2.setResourceMatcher(
//             resourceWithAcr,
//             lomapFriendsMatcher
//         );
//
//         // 6. Create a Policy for the Matcher.
//         let lomapFriendsPolicy = acp_ess_2.createResourcePolicyFor(
//             resourceWithAcr,
//             "lomap-friends-policy",
//         );
//
//         // 7. Add the appFriendsMatcher to the Policy as an allOf() expression.
//         // Since using allOf() with a single Matcher, could also use anyOf() expression
//
//         lomapFriendsPolicy = acp_ess_2.addAllOfMatcherUrl(
//             lomapFriendsPolicy,
//             lomapFriendsMatcher
//         );
//
//         // 8. Specify the access modes (e.g., allow Read and Write).
//         lomapFriendsPolicy = acp_ess_2.setAllowModes(lomapFriendsPolicy,
//             { read: true, write: false }
//         );
//
//         // 9. Apply the Policy to the resource.
//         resourceWithAcr = acp_ess_2.addPolicyUrl(
//             resourceWithAcr,
//             asUrl(lomapFriendsPolicy)
//         );
//
//         // 10. Add the Policy definition to the resource's ACR.
//         resourceWithAcr = acp_ess_2.setResourcePolicy(
//             resourceWithAcr,
//             lomapFriendsPolicy
//         );
//
//         // 11. Save the modified ACR for the resource.
//         const updatedResourceWithAcr = await acp_ess_2.saveAcrFor(
//             resourceWithAcr,
//             { fetch: session.fetch }          // fetch from the authenticated session
//         );
//
//     } catch (error) {
//         console.error(error.message);
//     }
// }

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
 * Returns the profile for a given webId
 * @param webId containing the webId whose profile we want
 * @returns {Promise<Thing & {url: UrlString}>} with the profile we need
 */
async function getProfile(webId) {
    let dataset = await getSolidDataset(webId);
    return getThing(dataset, webId);
}

async function findName(webId) {
    if (webId === undefined)
        return "No name found";
    else {
        let profile = getProfile(webId);
        let name = getStringNoLocale(profile, FOAF.name);
        return name === null ? "No name found" : name;
    }
}
