import {LocationLM} from "../models/location";

export function convertViewLocationsIntoDomainModelLocations(viewobjs, userWebid){
    let ret = [];
    viewobjs.forEach( (obj) =>
    {
        ret.push(convertViewLocationIntoDomainModelLocation(obj, userWebid));
    });
    return ret;
}

export function convertViewLocationIntoDomainModelLocation(viewobj, userWebid){
    //Key has to be changed to be unique
    let loc = new LocationLM(
        viewobj.lat,
        viewobj.lng,
        viewobj.nombre,
        viewobj.description,
        viewobj.category,
        viewobj.privacy,
        viewobj.time
        //viewobj.key
    ); 
    loc.userID = userWebid;
    return loc;
}
