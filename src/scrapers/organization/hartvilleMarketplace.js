import fetch from 'node-fetch';
import cheerio from 'cheerio';
import prisma from '../../client.js';

export default async function scrapeHartvilleMarketplace() {
  const source = 'https://hartvillemarketplace.com/events/';
  const response = await fetch(source);
  const html = await response.text();
  const $ = cheerio.load(html);


  $('.single-event').each(async (i, el) => {
    const title = $(el).find('h5 > a').text().replace(/\s\s+/g, '');
    const image = $(el).find('img');
    const link = $(el).find('h5 > a').attr('href').replace(/\s\s+/g, '');

    // figure out start and end times
    const dateTime = $(el).find('.dates-times').text().replace(/\s\s+/g, '');
    const year = $(el).find('.dates-times').closest('.row').prev().text().split(' ')[1];
    const month = dateTime.split('\n')[0].split(', ')[1].split(' ')[0];
    const day = dateTime.split('\n')[0].split(', ')[1].split(' ')[1].replace(/\D/g,'');
    const startTime = dateTime.split('\n')[1].split('-')[0].trim();
    const endTime = dateTime.split('\n')[1].split('-')[1].trim();
    const startsAt = new Date(`${year}-${month}-${day} ${startTime}`);
    const endsAt = new Date(`${year}-${month}-${day} ${endTime}`);

    const event = {
      data: {
        title,
        pageLink: link,
        startsAt,
        endsAt,
        imageUri: image.attr('src'),
        location: 'Hartville MarketPlace',
      },
    };

    const exists = await prisma.event.findMany({
      where: {
        pageLink: link,
      }
    });

    if (exists.length) {
      return;
    }

    await prisma.event.create(event);
  })

  return { message: `Events from ${source} have been added.` };
}