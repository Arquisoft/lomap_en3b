import {
    getPodUrlAll,
    createContainerAt,
    getSolidDataset
} from "@inrupt/solid-client";

/**
 * This method gets all the pods relative to a user given the session from a logged in user and looks for the corresponding "lomap" folder in which 
 * all the application information is going to be stored.
 * @param {} session 
 */
export async function checkForLomap(webid) {
    let anyContainer = false;
    let pods = await getPodUrlAll(webid, {fetch : fetch});
    let podWithFolder;
    alert(webid);
    let i = 0;
    while (!anyContainer && i < pods.length) {
        anyContainer = await checkForLomapInPod(pods[i]);
        if (anyContainer) {
            podWithFolder = pods[i];
        }
        if (i == pods.length - 1) {
          await  createLomapContainer(pods[i]);
        }
        i++;
        
    }
}

/**
 * This method checks if the lomap folder exists given a pod.
 * @param {} _pod 
 */
export async function checkForLomapInPod(pod) {
    let lomap;
    try {
        lomap = await getSolidDataset(pod + "lomap/");
    } catch (error) {
        alert("Not found lomap folder in pod, creating one...")
        return false;
    }   
    alert("Found lomap folder in pod.")
    return true;
}

export async function createLomapContainer(pod) {
    createContainerAt(pod + "lomap");
}
