export class CoordinateNotInDomain extends Error {
    constructor(message) {
        super(message);
        this.name = "CoordinateNotInDomain";
    }
}

export class StringInvalidFormatException extends Error {
    constructor(message) {
        super(message);
        this.name = "StringInvalidFormatException";
    }
}
