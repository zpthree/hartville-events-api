module.exports = async function runScraper() {
  // scrape organization websites
  await require('./organization/hartvilleMarketplace')();
  // await require('./organization/hartvilleKitchen')();
  // await require('./organization/hartvilleHardware')();

  // scrape facebook pages

  // scrape facebook events
}