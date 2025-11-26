import * as settingsRepository from '@functions/repositories/settingsRepository';

/**
 * @param shop
 * @returns {Promise<void>}
 */
export async function createDefaultSettings(shop) {
  if (await settingsRepository.findByShopId(shop.id)) return;
  await settingsRepository.create(shop.id, {
    position: 'bottom-left',
    hideTimeAgo: false,
    truncateProductName: false,
    displayDuration: 3,
    firstDelay: 5,
    popsInterval: 2,
    maxPopsDisplay: 10,
    includedUrls: '',
    excludedUrls: '',
    allowShow: 'all'
  });
}
