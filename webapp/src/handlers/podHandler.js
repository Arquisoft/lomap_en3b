import {
    getPodUrlAll,
    createContainerAt,
    getSolidDataset,


} from "@inrupt/solid-client";


/**
 * This method gets all the pods relative to a user given the session from a logged in user and looks for the corresponding "lomap" folder in which 
 * all the application information is going to be stored.
 * @param {} session 
 */
export async function checkForLomap(session) {
    let anyContainer = false;
    alert("Your webId: "+session.info.webId);
    let pods = await getPodUrlAll(session.info.webId, {fetch : fetch});
    let podWithFolder;
    alert("Your webId: "+session.info.webId);
    let i = 0;
    while (!anyContainer && i < pods.length) {//While there are pods left and none of them has a lomap folder
        anyContainer = await checkForLomapInPod(pods[i]);
        if (anyContainer) {
            podWithFolder = pods[i];
        }

        i++;
        
    }
    if(!podWithFolder){//If no pod has that folder,



    }
    return  podWithFolder;
}

/**
 * This method checks if the lomap folder exists given a pod.
 * @param {} _pod 
 */
export async function checkForLomapInPod(pod) {

    try {
      await getSolidDataset(pod + "lomap/");
    } catch (error) {
        alert("Not found lomap folder in pod, creating one...")
        return false;
    }   
    alert("Found lomap folder in pod.")
    return true;
}

export async function createLomapContainer(pod) {
    await createContainerAt(pod + "lomap/");
}
