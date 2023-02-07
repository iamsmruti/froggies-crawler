const puppeteer = require('puppeteer');
const bot = async (url) => {
    const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
    const page = await browser.newPage();
    await page.setRequestInterception(true);

    //if the page makes a  request to a resource type of image or stylesheet then abort that request
    page.on('request', request => {
        if (request.resourceType() === 'image' || request.resourceType() === 'stylesheet' || request.resourceType() === 'font' || request.resourceType() === 'manifest' || request.resourceType() === 'script' || request.resourceType() === 'texttrack' || request.resourceType() === 'fetch' || request.resourceType() === 'eventsource' || request.resourceType() === 'websocket' || request.resourceType() === 'xhr' || request.resourceType() === 'other')
            request.abort();
        else
            request.continue();
    });

    await page.goto(url);

    const grabCode = await page.evaluate(() => {
        const val = document.querySelector('#ContentPlaceHolder1_tr_tokenHolders > div > div.col-md-8 > div > div').innerText
        return val;
    })

    console.log('scrapping done!!')

    await page.close();
    await browser.close();
    return grabCode;

}
module.exports = bot;