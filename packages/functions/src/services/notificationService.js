import {getShopOrders} from '@functions/services/shopifyApiService';
import * as notificationsRepository from '@functions/repositories/notificationsRepository';

/**
 *
 * @param shop
 * @returns {Promise<void>}
 */
export async function syncOrdersToNotifications(shop) {
  await notificationsRepository.removeByShopId(shop.id);
  const orders = await getShopOrders(shop);
  const promises = orders.map(order =>
    notificationsRepository.add({
      shopId: shop.id,
      shopifyDomain: shop.domain,
      ...order,
      timestamp: new Date(order.timestamp)
    })
  );
  await Promise.all(promises);
}
