import {CoordinateNotInDomain, StringInvalidFormatException} from "./Exceptions/exceptions";

const OVIEDO = {
    oviedo_lat: 43.3603,
    oviedo_lon: -5.8448,
    distance: 15
};
//Other cities
/*
const GIJON = {
    oviedo_lat: 43.5322,
    oviedo_lon: -5.6611,
    distance: 15
};
const MADRID = {
    oviedo_lat: 40.4168,
    oviedo_lon: -3.7038,
    distance: 45
};
const BARCELONA = {
    oviedo_lat: 41.3851,
    oviedo_lon: 2.1734,
    distance: 45
};
 */

/**
 * Checks if a given latitude and longitude coordinate is within a specified distance from city (default: Oviedo, Asturias, Spain)
 * @param {number} lat - Latitude of the coordinate to check
 * @param {number} lon - Longitude of the coordinate to check
 * @param {number} city_lat - Latitude of the city's center point (default: OVIEDO.oviedo_lat)
 * @param {number} city_lon - Longitude of the city's center point (default: OVIEDO.oviedo_lon)
 * @param {number} distance - Maximum distance in kilometers from the city's center point (default: OVIEDO.distance)
 * @returns {boolean} - true if the coordinate is within the specified distance, false otherwise
 */
export function is_in_city(lat, lon, city_lat = OVIEDO.oviedo_lat,
                      city_lon = OVIEDO.oviedo_lon, distance = OVIEDO.distance) {

    // Convert latitude and longitude to radians
    const lat_r = toRadians(lat);
    const lon_r = toRadians(lon);
    const oviedo_lat_r = toRadians(city_lat);
    const oviedo_lon_r = toRadians(city_lon);

    // Calculate distance between the two points using Haversine formula
    const delta_lat = oviedo_lat_r - lat_r;
    const delta_lon = oviedo_lon_r - lon_r;
    const a = Math.sin(delta_lat/2)**2 + Math.cos(lat_r) * Math.cos(oviedo_lat_r) * Math.sin(delta_lon/2)**2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const distance_km = 6371 * c;

    // Check if distance is within the specified distance
    return distance_km <= distance;
}

// Helper function to convert degrees to radians
function toRadians(degrees) {
    return degrees * Math.PI / 180;
}
// Helper function to check if coordinates are within the specified city
export function checkCoordinates(cond) {
    if (cond) {
        throw new CoordinateNotInDomain("The coordinate is not within the specified city.");
    }
}

// Helper function to check if a string value is defined
export function checkStringInvalidFormat (value, name){
    if(!value){
        throw new StringInvalidFormatException(`${name} must be defined`);
    }
}
