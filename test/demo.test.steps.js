import logger from "lh-pptr-framework/logger/logger.js";
import HomePage from '../pages/demoqa/homePage.js';
import { beforeHook, beforeEachHook, afterEachHook, afterHook } from 'lh-pptr-framework/settings/mochaHooks.js';
import * as params from 'lh-pptr-framework/settings/testParams.js';

let browser;
const Home = new HomePage();
const pages = [Home];

// Extend the common beforeHook with additional setup
const customBeforeHook = async () => {
    await beforeHook(); // Perform the common setup first (browser startup)
    browser = await params.getBrowserInstance();
    for (const page of pages) {
        page.init(browser.page); // Sets instance of puppeteer page to page objects
    }
};

// Specify all mocha hooks
before(customBeforeHook);
beforeEach(beforeEachHook);
afterEach(afterEachHook);
after(afterHook);

it(`[N]_${Home.getURL()}`, async function () {
    await Home.navigationValidate(browser, this)
}).timeout(params.testTime);

it("[T]_Click_on_Elements", async function () {
    await Home.clickOnElements(browser, this)
}).timeout(params.testTime);
