import {LocationLM} from "../models/location";
export function convertViewObjectIntoDomainModelObject(viewobj){
    let privacy = true;
    if(viewobj.privacy === 'public'){
        privacy = false;
    }
    return new LocationLM(
        viewobj.lat,
        viewobj.lng,
        viewobj.name,
        viewobj.description,
        viewobj.category,
        privacy,
        viewobj.rate,
        viewobj.key
    );
}
export function convertDomainModelObjectIntoViewObject(dmobj){
return {
    key: dmobj.locationID,
    lat: dmobj.lat,
    lng: dmobj.lat,
    time: new Date().getTime(),
    description: dmobj.description,
    name: dmobj.name,
    category: dmobj.category,
    privacy: dmobj.privacyText(),
    rate: dmobj.rating,
    };
}
export function convertViewObjectsIntoDomainModelObjects(viewobjs){
    let ret = [];
    viewobjs.forEach( (obj) =>
    {
        ret.push(convertViewObjectIntoDomainModelObject(obj));
    });
    return ret;
}
export function convertDomainModelObjectsIntoViewObjects(dmobjs){
    let ret = [];
    dmobjs.forEach( (obj) =>
    {
        ret.push(convertViewObjectIntoDomainModelObject(obj));
    });
    return ret;

}