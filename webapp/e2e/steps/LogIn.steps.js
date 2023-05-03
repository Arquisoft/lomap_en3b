import { defineFeature, loadFeature } from 'jest-cucumber';
import puppeteer from "puppeteer";


const feature = loadFeature('./features/insertLocation.feature');

let page;
let browser;

defineFeature(feature, test => {

    beforeAll(async () => {
        browser = process.env.GITHUB_ACTIONS
            ? await puppeteer.launch()
            : await puppeteer.launch({ headless: false, slowMo: 50 });
        page = await browser.newPage();

        await page
            .goto("http://localhost:3000", {
                waitUntil: "networkidle0",
            })
            .catch(() => {});
    });



    test('Insert a private location', ({given,when,then}) => {

        let webId;
        let passwd;


        given('An unauthenticated user', () => {
            webId = "https://lomaper.inrupt.net/"
            passwd="iWantToPass1234_"
        });


        when('I will select the inrupt option and presh finish', async () => {
            await page.goto('https://localhost:3000')
            await expect(page).toMatch('Welcome to LoMap');
            const select = await page.waitForSelector('div[aria-label="providers"]');
            await select.select('Inrupt.net');
            await expect(page).toClick('button', { name: 'lomapLoginButton' })
        });

        then('A confirmation message should be shown in the screen', async () => {
            await page.waitForNavigation()
            await page.waitForSelector("button",{ariaLabel:'Log Out option'})
        });
    })

    afterAll(async ()=>{
        browser.close()
    })

});

