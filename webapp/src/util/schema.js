import {RDF, SCHEMA_INRUPT} from "@inrupt/vocab-common-rdf";

export const SCHEMA_LOMAP = {
    //Using schema.org
//Types
    place: "https://schema.org/Place",
    review: "https://schema.org/Review",
    mediaObject: "https://schema.org/MediaObject",
//Place
    loc_latitude: "https://schema.org/latitude",
    loc_longitude: "https://schema.org/longitude",
//Review
    rev_comment: "https://schema.org/reviewBody",
    rev_rate: "https://schema.org/reviewRating",
    rev_reviewer: "https://schema.org/accountablePerson",
    rev_date: "https://schema.org/dateCreated",
    rev_locat: "https://schema.org/contentLocation",
    rev_hasPart: "https://schema.org/hasPart",
//MediaObject
    media_locat: "https://schema.org/contentLocation",
    media_rev: "https://schema.org/review",
    media_url: "https://schema.org/contentUrl",
    media_date: "https://schema.org/uploadDate",
//Thing
    name: "https://schema.org/name",
    ident: "https://schema.org/identifier",
    category: "https://schema.org/additionalType",
    descrip: "https://schema.org/description",
//Inrupt
    dateModified: SCHEMA_INRUPT.dateModified,
    accessCode: SCHEMA_INRUPT.accessCode,
//RDF
    type: RDF.type
};