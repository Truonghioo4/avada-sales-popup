import * as notificationsRepository from '@functions/repositories/notificationsRepository.js';
import * as settingsRepository from '@functions/repositories/settingsRepository.js';
import {getShopByShopifyDomain} from '@avada/core';
import {presentDataTimeAgo} from '@functions/presenters/notificationPresenter';

/**
 *
 * @param ctx
 * @returns {Promise<{data: *[], error: *}|{notifications: *, settings: any}>}
 */
export async function getClientNotifications(ctx) {
  try {
    const {shopifyDomain} = ctx.query;
    const shop = await getShopByShopifyDomain(shopifyDomain);
    const [notifications, settings] = await Promise.all([
      notificationsRepository.getNotifications(shop.id),
      settingsRepository.getByShopId(shop.id)
    ]);
    return (ctx.body = {
      notifications: notifications.data.map(notification => presentDataTimeAgo(notification)),
      settings
    });
  } catch (e) {
    return (ctx.body = {
      data: [],
      error: e.message
    });
  }
}
