import {
    getPodUrlAll,
    createContainerAt,
    getSolidDataset,


} from "@inrupt/solid-client";
import {issueAccessRequest, redirectToAccessManagementUi} from "@inrupt/solid-client-access-grants";


/**
 * This method gets all the pods relative to a user given the session from a logged in user and looks for the corresponding "lomap" folder in which 
 * all the application information is going to be stored.
 * @param {} session 
 */
export async function checkForLomap(session) {

    let anyContainer = false;
    let pods = await getPodUrlAll(session.info.webId, {fetch : session.fetch});
    let podWithFolder;
    let i = 0;
    while (!anyContainer && i < pods.length) {//While there are pods left and none of them has a lomap folder
        let currentPod=pods[i].replace("/profile/card#me","")//Remove profile url string.
        anyContainer = await checkForLomapInPod(currentPod);
        if (anyContainer) {
            podWithFolder = pods[i];
        }

        i++;
        
    }
    if(!podWithFolder){//If no pod has that folde
        console.log("Logeado al intentar crear contenedor?" +session.info.isLoggedIn)
      podWithFolder=await createLomapContainer(pods[0].replace("/profile/card#me",""))


    }
    return  podWithFolder;
}

/**
 * This method checks if the lomap folder exists given a pod.
 * @param {} _pod 
 */
export async function checkForLomapInPod(pod) {
    try {
     let aux= await getSolidDataset(pod+"lomap");
      console.log(aux)
    } catch (error) {
       console.log("Not found lomap folder in pod, creating one...")
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
export async function requestAccessToLomap( session){

    //this part sets the requested access (if granted) to expire in 5 minutes.
    let accessExpiration = new Date( Date.now() +  5 * 60000 );
    const requestVC = await issueAccessRequest( //WE CREATE A NEW ACCESS REQUEST.

        //Vc stands for Verifiable credential
        {

            "access":  { read: true , write:true},//the permissions to be asking
            "resources":session.info.webId,
            "resourceOwner": session.info.webId,
            "expirationDate": accessExpiration,

        },

        { fetch : session.fetch ,updateAcr:true}//update acr makes the request grant effective if given
    );
    console.log("rvc"+requestVC)
    //we actually send the access request to the access management ui, so the user can accept the request.
    await redirectToAccessManagementUi(
        requestVC.id,
        window.location.href,
        {
            fallbackAccessManagementUi: session.info.webId
        }
    );
}
export async function createLomapContainer(pod) {
    console.log(pod)
    await createContainerAt(pod + "lomap/");
}
