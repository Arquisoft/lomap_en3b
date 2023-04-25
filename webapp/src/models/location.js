// Import uuid for generating id
import {v4 as uuidv4} from 'uuid';
import {StringInvalidFormatException} from "../util/Exceptions/exceptions";


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
        checkStringInvalidFormat(name, 'name' );
        this.name = name;
        this.description = descrip;
        checkStringInvalidFormat(cat, 'cat' );
        this.category = cat;
        checkStringInvalidFormat(priv, 'priv' );
        this.privacy = priv;
        this.dateTime = date;
        this.locID = id;
    }


}

function checkStringInvalidFormat (value, str){
    if(!value){
        throw new StringInvalidFormatException( String(str + '=' + value));
    }
}
