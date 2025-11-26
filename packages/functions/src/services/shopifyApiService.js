import {initShopify} from '@functions/services/shopifyService';
import {loadGraphQL} from '@functions/helpers/graphql/graphqlHelpers';
import {simplifyGraphqlResponse} from '@functions/helpers/graphql/simplifyGraphqlResponse';

/**
 * @param shop
 * @returns {Promise<*>}
 */
export async function getShopOrders(shop) {
  const shopify = initShopify(shop);
  const ordersQuery = loadGraphQL('/orders.graphql');
  const ordersGraphql = await shopify.graphql(ordersQuery);
  const option = {ignoreKeys: ['data', 'orders', 'edges', 'node']};
  const ordersSimplify = simplifyGraphqlResponse(ordersGraphql, option);
  return ordersSimplify.map(order => ({
    firstName: order?.customer?.firstName,
    city: order?.shippingAddress?.city,
    country: order?.shippingAddress?.country,
    productName: order?.lineItems[0]?.title,
    productId: order?.lineItems[0]?.product.id,
    timestamp: order?.createdAt,
    productImage: order?.lineItems[0]?.product?.featuredMedia?.preview?.image?.url
  }));
}

/**
 * @param shopify
 * @param order
 * @returns {Promise<{firstName: *, city: string, country: string, productName: *, productId: *, timestamp: *, productImage: *}>}
 */
export async function getNotificationItems(shopify, order) {
  const ordersQuery = loadGraphQL('/order.graphql');
  const ordersGraphql = await shopify.graphql(ordersQuery, {
    orderId: `gid://shopify/Order/${order.id}`
  });
  const option = {ignoreKeys: ['order', 'edges', 'node']};
  const ordersSimplify = simplifyGraphqlResponse(ordersGraphql, option);
  return {
    firstName: ordersSimplify?.customer?.firstName,
    city: ordersSimplify?.shippingAddress?.city,
    country: ordersSimplify?.shippingAddress?.country,
    productName: ordersSimplify?.lineItems[0]?.title,
    productId: ordersSimplify?.lineItems[0]?.product.id,
    timestamp: ordersSimplify?.createdAt,
    productImage: ordersSimplify?.lineItems[0]?.product?.featuredMedia?.preview?.image?.url
  };
}
