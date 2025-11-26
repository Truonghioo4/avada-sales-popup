import {initShopify} from '@functions/services/shopifyService';
import appConfig from '@functions/config/app';

/**
 * @param shop
 * @returns {Promise<Shopify.IWebhook>}
 */
export async function createWebhooks(shop) {
  const shopify = initShopify(shop);
  return shopify.webhook.create({
    topic: 'orders/create',
    address: `https://${appConfig.baseUrl}/webhook/order/new`,
    format: 'json'
  });
}
