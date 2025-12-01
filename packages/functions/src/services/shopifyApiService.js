import {initShopify} from '@functions/services/shopifyService';
import {loadGraphQL} from '@functions/helpers/graphql/graphqlHelpers';

/**
 * @param shop
 * @returns {Promise<*>}
 */
export async function getShopOrders(shop) {
  const shopify = initShopify(shop);
  const ordersQuery = loadGraphQL('/orders.graphql');
  const ordersGraphql = await shopify.graphql(ordersQuery);
  return ordersGraphql.orders.nodes;
}

/**
 * @param shop
 * @param order
 * @returns {Promise<*>}
 */
export async function getShopOrderItem(shop, order) {
  const shopify = initShopify(shop);
  const orderQuery = loadGraphQL('/order.graphql');
  const orderGraphql = await shopify.graphql(orderQuery, {
    orderId: `gid://shopify/Order/${order.id}`
  });
  return orderGraphql.order;
}

/**
 * @param order
 * @returns {{firstName: *, city: string, country: string, productName: *, productId: *, timestamp: *, productUrl: *, productImage: *}}
 */
export function pickShopOrderField(order) {
  return {
    firstName: order?.customer?.firstName,
    city: order?.shippingAddress?.city,
    country: order?.shippingAddress?.country,
    productName: order?.lineItems?.nodes[0]?.title,
    productId: order?.lineItems?.nodes[0]?.product.id,
    timestamp: new Date(order?.createdAt),
    productUrl: order?.lineItems?.nodes[0]?.product?.onlineStorePreviewUrl,
    productImage: order?.lineItems?.nodes[0]?.product?.featuredMedia?.preview?.image?.url
  };
}
