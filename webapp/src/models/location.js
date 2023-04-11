// Import uuid fron generating id
import { 
    v4 as uuidv4 
} from 'uuid';
// Import exception 
import {
    CoordinatesInvalidFormatException,
    StringInvalidFormatException
} from '../util/Exceptions/exceptions.js';

/**
 * Location LoMap class
 */
class LocationLM {
    //Attributes

    privateReview = new Array();
    constructor(CoorLat, CoorLng, name, description, category,privacy=false) {
        checkCoordinatesInvalidFormat((CoorLat>= -90 && CoorLat<= 90), CoorLat, 'latitude');
        this.lat = CoorLat;
        checkCoordinatesInvalidFormat((CoorLng>= -180 && CoorLng<= 180), CoorLng, 'longitude');
        this.lng = CoorLng;
        checkStringInvalidFormat(name, 'name' );
        this.name = name;
        checkStringInvalidFormat(description, 'description' );
        this.description = description;
        checkStringInvalidFormat(category, 'category' );
        this.category = category;
        this.locID = uuidv4();
        this.privacy=privacy;

    }



    addPublicReview() {

    }
}

function checkCoordinatesInvalidFormat (cond, value, str){
    if(!cond){
        throw new CoordinatesInvalidFormatException(new String(str + '=' + value));
    }
}
function checkStringInvalidFormat (value, str){
    if(!value){
        throw new StringInvalidFormatException(new String(str + '=' + value));
    }
}

export { 
    LocationLM
};
