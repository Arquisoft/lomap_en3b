import {User} from "../models/user";
import {readLocations, writeLocationsNew, writeReviewsNew} from "./podAccess";
import {
    convertViewLocationsIntoDomainModelLocations,
    convertViewReviewsIntoDomainModelReviews
} from "../util/Convertor";
import {getFriendsWebIds} from "./podHandler";

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

    async retrieveLocationsFromPOD(session) {
        let friends = await getFriendsWebIds(this.user.userWebId);
        let resource = this.user.userWebId.concat("/private/lomap/locations.ttl");
        // Code to get the friends locations
        let locations = await readLocations(resource, session, this.user.userWebId);
        this.saveLocationsFromPOD(locations);
        resource = this.user.userWebId.concat("/public/lomap/locations.ttl");
        locations = await readLocations(resource, session, this.user.userWebId);
        this.saveLocationsFromPOD(locations);

        let friendsLocations = [];
        for (let i = 0; i < friends.length; i++) {
            try {
                let nameF = friends[i].replace("/profile/card", "/")
                //concat it with the previous locations (concat returns a new array instead of modifying any of the existing ones)
                resource = nameF + "public/lomap/locations.ttl";
                locations = await readLocations(resource, session, nameF);
                this.saveLocationsFromPOD(locations);

            } catch (err) {
                //Friend does not have LoMap??
                console.error(err);
            }
        }
    }

    getLocations(){
        return this.user.getAllLocations();
    }

    /**
     * This method assigns a list of locations to the current user.
     * @param {LocationLM[]} list list of locations of type LocationLM
     * @param {User} user POD's owner where the locations come from
     */
    saveLocationsFromPOD(list){
        this.user.addLocationsFromPOD(list);
    }

    saveReviewsFromPOD(list){
        this.user.addReviewsFromPOD(list);
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

    async saveReviewsToPOD() {
        //Get list of locations
        let revs = this.user.getNewReviews();

        if (revs.length !== 0) {
            //Iterate over the list saving the locations
            for (const rev of revs) {
                let owner = rev.user;
                let privacy = this.user.locations.get(rev.ItemReviewed).privacy;
                let resourceURL = owner.concat(privacy).concat(this.user.revResourceURL);

                //Insert in POD
                await writeReviewsNew(resourceURL, this.session, rev);
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
        let auxList = convertViewLocationsIntoDomainModelLocations(list);

        if(Array.isArray(auxList)) {
            this.user.addLocations(auxList, this.user.userWebId)
        }
    }

    updateUserReview(list, LocID){
        let ret = convertViewReviewsIntoDomainModelReviews(list);

        let auxList = ret[0];

        if(Array.isArray(auxList)) {
            this.user.addReviews(auxList, this.user.userWebId, LocID)
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