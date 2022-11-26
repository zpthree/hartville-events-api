const scrapeHartvilleMarketplace = require('./organization/hartvilleMarketplace');
const scrapeHartvilleKitchen = require('./organization/hartvilleKitchen');
const scrapeHartvilleHardware = require('./organization/hartvilleHardware');

module.exports = async function runScraper() {
  // scrape organization websites
  await scrapeHartvilleMarketplace();
  await scrapeHartvilleKitchen();
  await scrapeHartvilleHardware();

  // scrape facebook pages

  // scrape facebook events
}