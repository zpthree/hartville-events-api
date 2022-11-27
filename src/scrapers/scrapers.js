import hartvilleMarketplace from './organization/hartvilleMarketplace.js';

export default async function runScraper() {
  // scrape organization websites
  await hartvilleMarketplace();
  // await require('./organization/hartvilleKitchen')();
  // await require('./organization/hartvilleHardware')();

  // scrape facebook pages

  // scrape facebook events
}