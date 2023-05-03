export default {
    transform: {
        "^.+\\.jsx?$": "js-jest"
    },
    testMatch: ["**/steps/*.js"],
    moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
    moduleNameMapper:{"^uuid$": "uuid"},
    preset: "jest-puppeteer",
    testTimeout: 30000
}