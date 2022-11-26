const fetch = require('node-fetch');
const cheerio = require('cheerio');
const prisma = require('../../client');

module.exports = async function scrapeHartvilleMarketplace() {
  const source = 'https://hartvillehardware.com/events/';
  const response = await fetch(source);
  const html = await response.text();
  const $ = cheerio.load(html);


  $('section.o-fullwidth.no-padding-bot').each(async (i, el) => {
    const titleWrapper = $(el).find('h2');
    const title = $(titleWrapper).text().replace(/\s\s+/g, '');
    const image = $(el).find('img');
    const dateWrapper = $(titleWrapper).next();

    const dateTime = $(dateWrapper)?.text().replace(/\s\s+/g, '');

    const descriptionWrapper = $(dateWrapper).next();
    const description = $(descriptionWrapper).html();

    const link = $(descriptionWrapper).find('a')?.attr('href')?.replace(/\s\s+/g, '') || '';

    const event = {
      data: {
        title,
        content: description,
        // startsAt: `${dateTime.split('\n')[0]} ${dateTime.split('\n')[1].split('-')[0].trim()}`,
        // endsAt: `${dateTime.split('\n')[0]} ${dateTime.split('\n')[1].split('-')[1].trim()}`,
        imageUri: image.attr('src'),
        location: 'Hartville Hardware',
        source,
      },
    };

    await prisma.event.create(event);
  });

  return { message: `Events from ${source} have been added.` };
}