import {getNotificationItems} from '@functions/services/shopifyApiService';
import * as notificationsRepository from '@functions/repositories/notificationsRepository';
import {getShopByShopifyDomain} from '@avada/core';
import {initShopify} from '@functions/services/shopifyService';

/**
 * @param ctx
 * @returns {Promise<void>}
 */
export async function listenNewOrder(ctx) {
  try {
    ctx.status = 200;
    ctx.body = {success: true};
    const shopifyDomain = ctx.get('X-Shopify-Shop-Domain');
    const shopData = await getShopByShopifyDomain(shopifyDomain);
    const shopify = initShopify(shopData);
    const orderData = ctx.req.body;
    const notification = await getNotificationItems(shopify, orderData);
    await notificationsRepository.add({shopId: shopData.id, shopifyDomain, ...notification});
  } catch (e) {
    ctx.status = 200;
    ctx.body = {success: false, message: e.message};
  }
}
