import {User} from "../models/user";
import {LocationLM} from "../models/location";
import {writeLocationsNew} from "./podAccess";

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

    async saveLocationsToPOD() {
        //Get list of locations
        let locats = this.user.getNewLocations();

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