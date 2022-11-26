const chromium = require('chrome-aws-lambda');
const fetch = require('node-fetch');
const cheerio = require('cheerio');
const { prisma } = require('../../index');

module.exports = async function scrapeHartvilleMarketplace() {
  const source = 'https://hartvillemarketplace.com/events/';
  const _events = [];
  const response = await fetch(source);
  const html = await response.text();
  const $ = cheerio.load(html);


  $('.single-event').each(async (i, el) => {
    const title = $(el).find('h5 > a').text().replace(/\s\s+/g, '');
    const image = $(el).find('img');
    const dateTime = $(el).find('.dates-times').text().replace(/\s\s+/g, '');
    const link = $(el).find('h5 > a').attr('href').replace(/\s\s+/g, '');

    const event = {
      data: {
        title,
        content: link,
        // startsAt: `${dateTime.split('\n')[0]} ${dateTime.split('\n')[1].split('-')[0].trim()}`,
        // endsAt: `${dateTime.split('\n')[0]} ${dateTime.split('\n')[1].split('-')[1].trim()}`,
        imageUri: image.attr('src'),
        location: 'Hartville MarketPlace',
        source,
      },
    };

    await prisma.event.create(event);
  })

  return { message: `Events from ${source} have been added.` };
}