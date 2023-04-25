import {User} from "../models/user";
import {LocationLM} from "../models/location";

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
}