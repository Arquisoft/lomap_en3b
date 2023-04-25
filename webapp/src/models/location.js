// Import uuid for generating id
import {v4 as uuidv4} from 'uuid';


/**
 * This class represents our domain model Locations
 * It will have the following fields:
 *      - CoorLat
 *      - CoorLng
 *      - Name
 *      - Description
 *      - Category
 *      - Privacy
 *      - Date
 *      - LocID
 *      - Owner
 */
export class LocationLM {
    /** User's webID */
    locOwner = "";

    constructor(coorLat, coorLng, name, descrip, cat, priv, date, id = uuidv4()) {
        this.lat = coorLat;
        this.lng = coorLng;
        this.name = name;
        this.description = descrip;
        this.category = cat;
        this.privacy = priv;
        this.dateTime = date;
        this.locID = id;
    }


}