import * as notificationsRepository from '@functions/repositories/notificationsRepository';
import {getShopByShopifyDomain} from '@avada/core';
import {getNotificationItem} from '@functions/services/notificationService';

/**
 * @param ctx
 * @returns {Promise<void>}
 */
export async function listenNewOrder(ctx) {
  try {
    ctx.status = 200;
    ctx.body = {success: true};
    const shopifyDomain = ctx.get('X-Shopify-Shop-Domain');
    const shop = await getShopByShopifyDomain(shopifyDomain);
    const orderData = ctx.req.body;
    const notification = await getNotificationItem(shop, orderData);
    await notificationsRepository.add(notification);
  } catch (e) {
    ctx.status = 200;
    ctx.body = {success: false, message: e.message};
  }
}
