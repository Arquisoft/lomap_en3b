import { 
    v4 as uuidv4 
} from 'uuid';

class LocationLM {
    //Attributes should be private and access by setter/getters 
    constructor(id, CoorLat, CoorLng) {
        this.locID = id;
        this.coords = new Coordinates(CoorLat, CoorLng);
    }
    generateID(){
      this.locID = uuidv4();
    }
    toString(){
        return this.locID + "-" + this.coords.lat + "-" + this.coords.lng;
    }
}

class Coordinates{
    //Attributes should be private and access by setter/getters 
    constructor(latitud, longitud){
        if(latitud>= -90 && latitud<= 90 ){
            this.lat = latitud;
        }
        if(longitud>= -180 && longitud<= 180 ){
            this.lng = longitud;
        }
    }
}

export { LocationLM };
