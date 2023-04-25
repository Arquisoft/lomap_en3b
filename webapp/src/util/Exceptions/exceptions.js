export { 
    LocationFormatException, 
    InvalidFormatException, 
    ParsinErrorException, 
    CoordinatesInvalidFormatException
};

/**
 * LocationFormatException class to manage error while parsing the conversion from object to string
 */
class LocationFormatException extends Error {
    constructor(obj) {
        super(`${obj} does not conform to the expected format for a location`);
    }
}
/**
 * InvalidFormatException class to manage error while parsing the conversion from string to LocationLM object
 */
class InvalidFormatException extends Error {
    constructor(obj) {
        super(`${obj} does not conform to the expected format for creating a location`);
    }
}
/**
 * ParsinErrorException class to manage error while parsing the conversion from string to LocationLM object
 */
class ParsinErrorException extends Error {
    constructor(obj) {
        super(`${obj} does not conform to the expected format for creating a location. Size missmatch`);
    }
}
/**
 * CoordinatesInvalidFormatException class to manage error while setting Coordinates values.
 */
class CoordinatesInvalidFormatException extends Error {
    constructor(obj) {
        super(`${obj} invalid value for coordinate.\n\tLatitude must be within [-90,90]\n\tLongitude must be within [-180,180]`);
    }
}

/**
 * StringInvalidFormatException class to manage error while setting string values.
 */
export function StringInvalidFormatException(obj) {
    throw {
        name: 'StringInvalidFormat',
        message: '${obj} invalid value for string. It must be valid value, not empty.'
    };
}

export class ReviewInvalidFormatException extends Error {
    constructor(obj) {
        super(`${obj} invalid value for string. It must be valid value, not empty.`);
    }
}
export class ReviewInvalidFormatForCommentException extends Error {
    constructor(obj) {
        super(`${obj} invalid value for string. It must not contain \\n, not empty.`);
    }
}
