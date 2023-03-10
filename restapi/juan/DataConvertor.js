//Import Location class
import {
    LocationLM
} from './location.js';
// Import exception 
import {
    LocationFormatException, 
    InvalidFormatException, 
    ParsinErrorException    
} from './Exceptions.js';  

//DataModel -> String
/**
 * This method converts a list of locations to a list of string of locations
 * @param {LocationLM} list list of locations objects
 * @returns {array} a list of strings representing the locations
 */
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
/**
 * This method converts a locations to a string
 * @param {LocationLM} element LocationLM object
 * @returns {string} the string representation of it
 */
function fromLocationToString (element) {
    if(element instanceof LocationLM){
        return element.toString();
    } else{
        throw new LocationFormatException(String(element));
    }
}

//String -> DataModel
/**
 * This method converts a list of string into a list of LocationLM
 * @param {string} strList list of string representation of locations
 * @returns a list of locations
 */
function fromStringToLocationList(strList) {
    const list = strList.split("\n");
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
/**
 * This method converts a string into a LocationLM
 * @param {string} str string representation of locations
 * @returns a location object
 */
function fromStringToLocation(str) {
    const myArray = str.split("\:");
    if(validValue(myArray[0], myArray[1], myArray[2])){
        if(myArray.length == 3){
            return new Location(myArray[0], myArray[1], myArray[2]);
        } else{
            throw new ParsinErrorException(String(element));
        }
    } else {
        throw new InvalidFormatException(String(element));
    }
}
/**
 * This method parse a list of location to a Json file. Write JSON Object to File in Node.js.
 * If error like "SyntaxError: Unexpected token i in JSON at position 0" it because
 * the list it's alrready a json.
 * @param {LocationLM} listLoc list of locations
 * @param {string} fileName name of the json file
 * @returns the path were the JSON is saved.
 */
function LocationToJSON (listLoc, fileName){
    if(checkExtension(fileName, ".json")){
        fileName += ".json"
    }

    //parse json - maybe it will be rmeoved
    listLoc = JSON.parse(listLoc);

    // stringify JSON Object
    var jsonData = JSON.stringify(listLoc);

    // file system module to perform file operations
    const fs = require('fs');

    fs.writeFile("output.json", jsonData, 'utf8', function (err) {
        if (err) {
            console.log("An error occured while writing JSON Object to File.");
            return console.log(err);
        }
    
        console.log("JSON file has been saved.");
    });

    return "./" + fileName;
}

/**
 * This function check is the fileName contains the extension already
 * @param {string} fName file name with out without extension
 * @param {string} ext extension to be checked if its contained the name.
 */
function checkExtension(fName, ext){
    return !(fName.endsWith(ext));
}
/**
 * This method checks if an array can be converted into a LocationLM object
 * @param {string} str string value that must be a string
 * @param {string} n1 string value that must be a number
 * @param {string} n2 string value that must be a number
 * @returns 
 */
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
/**
 * This method check that a given value in a number
 * @param {string} n string value to conver into a number
 * @returns true if n is a number, false otherwise
 */
function isNumber(n) { 
    return !isNaN(parseFloat(n)) && !isNaN(n - 0) 
}

export { 
    fromStringToLocation, 
    fromLocationToString, 
    LocationToJSON
};
