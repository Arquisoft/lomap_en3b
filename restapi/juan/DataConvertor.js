//Import Location class
import {
    LocationLM
} from './location.js';

//DataModel -> String
function fromLocationToStringList (list) {
    listLoc = [];
    list.forEach(element => {
        if(element instanceof LocationLM){
            listLoc.push(element.toString());
        } else{
            throw new LocationFormatException(String(element));
        }
    });
    return listLoc;
}
function fromLocationToString (element) {
    if(element instanceof LocationLM){
        return element.toString();
    } else{
        throw new LocationFormatException(String(element));
    }
}

//String -> DataModel
function fromStringToLocationList(str) {
    const list = element.split("\n");
    listLoc = [];
    list.forEach(element => {
        const myArray = element.split("\:");
        if(validValue(myArray[0], myArray[1], myArray[2])){
            const loc = new Location(myArray[0], myArray[1], myArray[2]);
            listLoc.push(loc);
        } else {
            throw new InvalidFormatException(String(element));
        }
    });
    return listLoc;
}

function fromStringToLocation(str) {
    const myArray = str.split("\:");
    if(validValue(myArray[0], myArray[1], myArray[2])){
        return new Location(myArray[0], myArray[1], myArray[2]);
    } else {
        throw new InvalidFormatException(String(element));
    }
}

//
function validValue(str, n1, n2) {
    if(typeof str == 'string'){
        if(isNumber(n1)){
            if(isNumber(n2)){
                return true;
            }
        }
    }
    return false;
}

function isNumber(n) { 
    return !isNaN(parseFloat(n)) && !isNaN(n - 0) 
}

class LocationFormatException extends Error {
    constructor(obj) {
        super(`${obj} does not conform to the expected format for a location`);
    }
}

class InvalidFormatException extends Error {
    constructor(obj) {
        super(`${obj} does not conform to the expected format for creating a location`);
    }
}

export { fromStringToLocation, fromLocationToString};
