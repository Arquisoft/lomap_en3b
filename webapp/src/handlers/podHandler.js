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
    let pods = await getPodUrlAll(session.info.webId, {fetch : fetch});
    let podWithFolder;
    console.log("WEB ID: "+session.info.webId)
    let i = 0;
    while (!anyContainer && i < pods.length) {//While there are pods left and none of them has a lomap folder
        console.log(pods[i])
        anyContainer = await checkForLomapInPod(pods[i]);
        if (anyContainer) {
            podWithFolder = pods[i];
        }

        i++;
        
    }
    if(!podWithFolder){//If no pod has that folder, i return the set of pods associated to that user.
       await requestAccessToLomap(session);
      await createLomapContainer(pods[0])


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
export async function requestAccessToLomap( session){

    //this part sets the requested access (if granted) to expire in 5 minutes.
    let accessExpiration = new Date( Date.now() +  5 * 60000 );

    // Call `issueAccessRequest` to create an access request
    const requestVC = await issueAccessRequest( //WE CREATE A NEW ACCESS REQUEST.
        //Vc stands for Verifiable credential
        {

            "access":  { read: true , write:true},//the permissions to be asking
            "resources":session.webId+'lomap/' ,   // Array of URLs=in this case lomaps folder url
            "resourceOwner": session.webId,
            "expirationDate": accessExpiration,
            "purpose": [ "https://localhost:3000/" ]
        },
        { fetch : session.fetch ,updateAcr:true}//update acr makes the request grant effective if given
    );
    console.log(requestVC);
    await redirectToAccessManagementUi(
        requestVC.id,
        window.location.href,
        {
            fallbackAccessManagementUi: session.info.webId
        }
    );
}
export async function createLomapContainer(pod) {
    await createContainerAt(pod + "lomap/");
}
