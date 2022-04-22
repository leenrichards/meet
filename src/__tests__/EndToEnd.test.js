import { getJestCucumberConfiguration } from 'jest-cucumber/dist/src/configuration';
import puppeteer from 'puppeteer';

describe('show/hide an event details', () => {
    let browser;
    let page;
    beforeAll(async () => {
        jest.setTimeout(30000);
        browser = await puppeteer.launch();

        page = await browser.newPage();
        await page.goto('http://localhost:3000/');
        await page.waitForSelector('.event');

    });


    //Close browswer after tests are complete
    afterAll(() => {
        browser.close();
    })

    // Test that no event description is shown when event element is collapsed    
    test('An event element is collapsed by default', async () => {
        const eventDetails = await page.$('.event-description');
        expect(eventDetails).toBeNull();
    });

    // Test that User can expand an event to see its details
    test('User can expand an event to see its details', async () => {
        await page.click('.summary');
        const eventDetails = await page.$('.event-description');
        expect(eventDetails).toBeDefined();
    });

    // Test that the user can collapse an event to hide its details
    test('User can collapse an event to hide its details', async () => {
        await page.click('.summary');
        const eventDetails = await page.$('.event-description');
        expect(eventDetails).toBeNull();
    });


    describe("Filter events by city.", () => {
        let browser;
        let page;
        jest.setTimeout(30000);
        beforeAll(async () => {
            browser = await puppeteer.launch();

            /* browser = await puppeteer.launch({
                 headless: false,
                 slowMo: 250, // slow down by 250ms
                 ignoreDefaultArgs: ["--disable-extensions"], // ignores default setting that causes timeout errors
             });*/
            page = await browser.newPage();
            await page.goto("http://localhost:3000/");
            await page.waitForSelector(".event");
        });

        afterAll(() => {
            browser.close();
        });

        test("When user hasn’t searched for a city, show upcoming events from all cities", async () => {
            const countEvents = await page.$$eval(".event", (element) => element.length);
            expect(countEvents).toBe(249);
        });
    });

});