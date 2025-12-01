import {
  getShopOrderItem,
  getShopOrders,
  pickShopOrderField
} from '@functions/services/shopifyApiService';
import * as notificationsRepository from '@functions/repositories/notificationsRepository';

/**
 *
 * @param shop
 * @returns {Promise<void>}
 */
export async function syncOrdersToNotifications(shop) {
  await notificationsRepository.removeByShopId(shop.id);
  const notifications = await getNotifications(shop);
  await notificationsRepository.add(notifications);
}

/**
 * @param shop
 * @returns {Promise<*>}
 */
export async function getNotifications(shop) {
  const orders = await getShopOrders(shop);
  return orders.map(order => ({
    ...pickShopOrderField(order),
    shopId: shop.id,
    shopifyDomain: shop.domain
  }));
}

/**
 * @param shop
 * @param data
 * @returns {Promise<{shopId: *, shopifyDomain: *, firstName: *, city: *, country: *, productName: *, productId: *, timestamp: *, productUrl: *, productImage: *}>}
 */
export async function getNotificationItem(shop, data) {
  const order = await getShopOrderItem(shop, data);
  return {
    ...pickShopOrderField(order),
    shopId: shop.id,
    shopifyDomain: shop.domain
  };
}
