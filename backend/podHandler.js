import {
    getPodUrlAll,
    isContainer,
    getLinkedResourceUrlAll,
    createContainerAt
} from "@inrupt/solid-client";



/**
 * This method gets all the pods relative to a user given the session from a logged in user and looks for the corresponding "lomap" folder in which 
 * all the application information is going to be stored.
 * @param {} session 
 */
async function checkForLomap(session) {
    let anyContainer = false;
    let pods = getPodUrlAll(session.info.webid);
    let podWithFolder;
    console.log(pods);
    let i = 0;
    while (!anyContainer) {
        anyContainer = checkForLomapInPod(pods[i]);
        if (anyContainer)
            podWithFolder = pods[i];
        i++;
        
    }
    
    if (anyContainer == false)
        createLomapContainer(pods[0]);
}

/**
 * This method checks if the lomap folder exists given a pod.
 * @param {} _pod 
 */
async function checkForLomapInPod(pod) {
    let container = false;
    try {
        container = await isContainer(pod + "lomap/");
    } catch (error) {
        console.log(error);
    }
    console.log(pod + "lomap/");
    console.log(container);
    return container;
}

async function createLomapContainer(pod) {
    createContainerAt(pod + "lomap");
}