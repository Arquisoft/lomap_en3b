import {v4 as uuidv4} from "uuid";
import {checkCoordinates, checkStringInvalidFormat, is_in_city} from "../util/utilMethods";

export class LocationLM {
    locOwner;
    img;
    /**
     * Creates a new LocationLM object with the specified parameters.
     *
     * @param {number} coorLat - The latitude coordinate of the location.
     * @param {number} coorLng - The longitude coordinate of the location.
     * @param {string} name - The name of the location.
     * @param {string} descrip - The description of the location.
     * @param {string} cat - The category of the location.
     * @param {string} priv - The privacy setting of the location.
     * @param date - The date and time the location was created.
     * @param {string} owner - The username of the user who created the location.
     * @param {string} [id] - The ID of the location (optional).
     */
    constructor(coorLat, coorLng, name, descrip, cat, priv, date,
                owner, id = uuidv4()) {
        //checkCoordinates(!is_in_city(coorLat, coorLng));
        this.lat = coorLat;
        this.lng = coorLng;
        checkStringInvalidFormat(name, 'name' );
        this.name = name;
        this.description = descrip;
        checkStringInvalidFormat(cat, 'category' );
        this.category = cat;
        checkStringInvalidFormat(priv, 'privacy' );
        this.privacy = priv;
        this.dateTime = new Date(date);
        this.locOwner = owner;
        this.locID = id;
    }
}

