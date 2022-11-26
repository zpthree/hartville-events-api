const chromium = require('chrome-aws-lambda');
const fetch = require('node-fetch');
const cheerio = require('cheerio');
const autoScroll = require('./lib/autoScroll');
const scrapes = require('./scraper');


module.exports = function(app) {
  app.get('/', async (req, res) => {
    // scrape facebook events
    // const facebook = async function getFacebookEvents() {
    //   const source = 'https://www.facebook.com/events/search?q=hartville&filters=eyJycF9ldmVudHNfbG9jYXRpb246MCI6IntcIm5hbWVcIjpcImZpbHRlcl9ldmVudHNfbG9jYXRpb25cIixcImFyZ3NcIjpcIjEwNDA1ODk1OTYzMTM5MlwifSIsImZpbHRlcl9ldmVudHNfZGF0ZV9yYW5nZTowIjoie1wibmFtZVwiOlwiZmlsdGVyX2V2ZW50c19kYXRlXCIsXCJhcmdzXCI6XCIyMDIyLTA1LTA2fjIwMjItMDYtMDZcIn0ifQ%3D%3D';
    //   const browser = await chromium.puppeteer.launch({
    //     args: chromium.args,
    //     defaultViewport: chromium.defaultViewport,
    //     executablePath: await chromium.executablePath,
    //     headless: true,
    //     ignoreHTTPSErrors: true,
    //   });

    //   let facebookEvents = await browser.newPage();

    //   await facebookEvents.goto(source);

    //   await facebookEvents.waitForSelector('[href*="/events/"]');

    //   await autoScroll(facebookEvents);

    //   return await facebookEvents.evaluate(() => {
    //     const _pageLinks = [];
    //     document.querySelectorAll('[href*="/events/"]').forEach(element => {
    //       if (element.firstChild === element.querySelector('[role="article"]')) {
    //         const link = `${element.href}`;
    //         const dateTime = element.querySelector('.d2edcug0.hpfvmrgz.qv66sw1b.c1et5uql.oi732d6d.ik7dh3pa.ht8s03o8.e9vueds3.j5wam9gi.lrazzd5p.oo9gr5id')?.innerText;
    //         console.log(element.querySelector('.d2edcug0.hpfvmrgz.qv66sw1b.c1et5uql.oi732d6d.ik7dh3pa.ht8s03o8.e9vueds3.j5wam9gi.lrazzd5p.oo9gr5id'));
    //         const title = element.querySelector('object[type="nested/pressable"] a')?.innerText;
    //         const location = element.querySelector('.d2edcug0.hpfvmrgz.qv66sw1b.c1et5uql.oi732d6d.ik7dh3pa.ht8s03o8.jq4qci2q.a3bd9o3v.lrazzd5p.m9osqain')?.innerText;
    //         const image = element.querySelector('img');

    //         _pageLinks.push({
    //           link,
    //           dateTime,
    //           title,
    //           location,
    //           image: {
    //             src: image.src,
    //             alt: image.alt,
    //             height: image.height,
    //             width: image.width,
    //           },
    //           source: {
    //             id: `facebook`,
    //             url: `https://www.facebook.com/events/search?q=hartville&filters=eyJycF9ldmVudHNfbG9jYXRpb246MCI6IntcIm5hbWVcIjpcImZpbHRlcl9ldmVudHNfbG9jYXRpb25cIixcImFyZ3NcIjpcIjEwNDA1ODk1OTYzMTM5MlwifSIsImZpbHRlcl9ldmVudHNfZGF0ZV9yYW5nZTowIjoie1wibmFtZVwiOlwiZmlsdGVyX2V2ZW50c19kYXRlXCIsXCJhcmdzXCI6XCIyMDIyLTA1LTA2fjIwMjItMDYtMDZcIn0ifQ%3D%3D`,
    //           },
    //         });
    //       }
    //     });

    //     return _pageLinks;
    //   });
    // }

    // const events = [
    //   ...await hartvillemarketplace(),
    //   ...await hartvillekitchen(),
    //   ...await hartvillehardware(),
    //   ...await facebook(),
    // ];

    // Create a customer and connect to a user

    const scrapesRes = await scrapes();
    res.json({ message: 'success' });
  })
}