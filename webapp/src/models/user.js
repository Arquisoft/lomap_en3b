import {LocationLM} from "./location";
/**
 * User LoMap class
 */
class User{
    publicLocat = new Array();
    privateLocat = new Array();
    podURL;
    constructor() {
        this.resourceURLPublic = "Public pod-url";
        this.resourceURLPrivate = "Private pod-url";
    }

    /**
     * This method adds a new public location the user's list of public locations
     * @param {Number} CoorLat location's latitude
     * @param {Number} CoorLng location's longitude
     * @param {String} name location's name
     * @param {String} description location's description
     * @param {String} category location's category
     */
    addNewPublicLoc(CoorLat, CoorLng, name, description, category){
        let l = new LocationLM(CoorLat, CoorLng, name, description, category);
        let num = this.publicLocat.length;
        this.publicLocat.push(l);
        //Error handle
        if(this.publicLocat.length != (num +1)){
            //throw error
        }

    }
    /**
     * This method adds a new public location the user's list of public locations
     * @param {Number} CoorLat location's latitude
     * @param {Number} CoorLng location's longitude
     * @param {String} name location's name
     * @param {String} description location's description
     * @param {String} category location's category     */
    addNewPrivateLoc(CoorLat, CoorLng, name, description, category){
        let l = new LocationLM(CoorLat, CoorLng, name, description, category);
        let num = this.privateLocat.length;
        this.privateLocat.push(l);
        //Error handle
        if(this.privateLocat.length != (num +1)){
            //throw error
        }
    }

    /**
     *
     * @param {LocationLM} l
     */
    removePublicLoc(l){
        const index = this.publicLocat.indexOf(l);
        if(index > -1){
            let num = this.publicLocat.length;
            this.publicLocat.splice(index, 1);
            if(this.publicLocat.length != (num - 1)){
                //throw error
            }
        }
    }
    removePrivateLoc(l){
        const index = this.privateLocat.indexOf(l);
        if(index > -1){
            let num = this.privateLocat.length;
            this.privateLocat.splice(index, 1);
            if(this.privateLocat.length != (num - 1)){
                //throw error
            }
        }
    }
}

export {User};