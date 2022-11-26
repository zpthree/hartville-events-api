const fetch = require('node-fetch');
const cheerio = require('cheerio');
const prisma = require('../../client');

module.exports = async function scrapeHartvilleKitchen() {
  const source = 'https://hartvillekitchen.com/events/';
  const response = await fetch(source);
  const html = await response.text();
  const $ = cheerio.load(html);


  $('.event-listing').each(async (i, el) => {
    const title = $(el).find('.event-details h3').text().replace(/\s\s+/g, '');
    const image = $(el).find('img');
    const date = $(el).find('.event-details p:first-of-type').text().replace(/\s\s+/g, '');
    const time = $(el).find('.event-details p:last-of-type').text().replace(/\s\s+/g, '');
    const link = $(el).find('.event-details > a').attr('href').replace(/\s\s+/g, '');

    const event = {
      data: {
        title,
        content: link,
        // startsAt: time.split('-')[0].trim(),
        // endsAt: time.split('-')[1].trim(),
        imageUri: image.attr('src'),
        location: 'Hartville Kitchen',
        source,
      },
    };

    await prisma.event.create(event);
  });

  return { message: `Events from ${source} have been added.` };
}