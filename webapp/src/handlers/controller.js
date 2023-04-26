import {User} from "../models/user";
import {writeLocationsNew} from "./podAccess";
import {convertViewLocationsIntoDomainModelLocations} from "../util/Convertor";

/**
 * Class to handle business logic
 */
export class Controller {
    /**
     * Constructor of the class. It initialises the object and sets the user's data
     * to start working with it. Also, it saves the current session to be used in
     * some methods.
     * @param sessionGiven
     */
    constructor(sessionGiven){
        this.session = sessionGiven;
        this.user = new User(sessionGiven);
    }

    /**
     * This method assigns a list of locations to the current user.
     * @param {LocationLM[]} list list of locations of type LocationLM
     * @param {User} user POD's owner where the locations come from
     */
    saveLocationsFromPOD(list, user=this.user){
        this.user.addLocationsFromPOD(list, user.userWebId);
    }

    /**
     * This method saves location from the user session
     * into the Solid PODs
     * @returns {Promise<void>}
     */
    async saveLocationsToPOD() {
        //Get list of locations
        let locats = this.user.getNewLocations();

        if (locats.length !== 0) {
            //Iterate over the list saving the locations
            for (const loc of locats) {
                let owner = loc.locOwner;
                let resourceURL = owner.concat(loc.privacy).concat(this.user.locResourceURL);

                //Insert in POD
                await writeLocationsNew(resourceURL, this.session, loc);
            }
            window.alert("Saved");
        }
    }

    /**
     * This method updates the locations of the user
     * @param {Object[]} list list of locations from the View layer
     * @returns {Object[]} a list of markers with the id of the domain layer
     */
    updateUserLocations(list){
        let ret = convertViewLocationsIntoDomainModelLocations(list);

        let auxList = ret[0];

        if(Array.isArray(auxList)) {
            this.user.addLocations(auxList, this.user.userWebId)
        }
        return ret[1];
    }

    /**
     * This method helps the view layer to know were an insertion to the pod can be performed
     * @returns {boolean} If nothing new return false, false otherwise
     */
    canAdd(){
        let aucx = this.user.newLocations;
        return aucx.length !== 0;
    }
}