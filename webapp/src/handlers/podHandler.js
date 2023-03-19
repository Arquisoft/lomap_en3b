import {
    getPodUrlAll,
    createContainerAt,
    getSolidDataset,
    universalAccess,

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
    alert("Your webId: "+webid);
    let i = 0;
    while (!anyContainer && i < pods.length) {//While there are pods left and none of them has a lomap folder
        anyContainer = await checkForLomapInPod(pods[i]);
        if (anyContainer) {
            podWithFolder = pods[i];
        }

        i++;
        
    }
    if(!podWithFolder){//If no pod has that folder,
        // I want to make the user choose in which pod that folder is being created
        //For that im trying ot understand how access works and
        universalAccess.getPublicAccess(
            webid,
            {fetch:fetch}

        ).then((returnedAccess) => {
            if (returnedAccess === null) {
                console.log("Could not load access details for this Resource.");
            } else {
                console.log("Returned Public Access:: ", JSON.stringify(returnedAccess));
            }
        });
        await  createLomapContainer(pods[0]);
    }
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
    await createContainerAt(pod + "lomap");
}
