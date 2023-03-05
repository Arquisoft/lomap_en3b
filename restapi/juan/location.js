// Import uuid fron generating id
import { 
    v4 as uuidv4 
} from 'uuid';
// Import exception 
import {
    CoordinatesInvalidFormatException
} from './Exceptions.js';  

/**
 * Location LoMap class
 */
class LocationLM {
    //Attributes should be private and access by setter/getters 
    constructor(id, CoorLat, CoorLng) {
        this.locID = id;
        this.coords = new Coordinates(CoorLat, CoorLng);
    }
    /**
     * If
     */
    generateID(){
      this.locID = uuidv4();
    }
    toString(){
        return this.locID + "-" + this.coords.lat + "-" + this.coords.lng;
    }
    getCoordinates(){
        return this.coords;
    }
}

/**
 * Coordinates for LoMap Location class
 */
class Coordinates{
    //Attributes should be private and access by setter/getters 
    constructor(latitud, longitud){
        check((latitud>= -90 && latitud<= 90), latitud, 'latitude');
        this.lat = latitud;

        check((longitud>= -180 && longitud<= 180), longitud, 'longituded' )
        this.lng = longitud;
    }
}

function check (cond, value, str){
    if(!cond){
        throw new CoordinatesInvalidFormatException(new String(str + '=' + value));
    }
}

export { 
    LocationLM, 
    Coordinates
};
