import * as notificationsRepository from '@functions/repositories/notificationsRepository';
import {getCurrentShop} from '@functions/helpers/auth';

/**
 * @param ctx
 * @returns {Promise<void>}
 */
export async function getNotifications(ctx) {
  try {
    const shopId = getCurrentShop(ctx);
    const query = ctx.req.query;
    const notifications = await notificationsRepository.getNotifications(shopId, query);
    ctx.body = {...notifications, success: true};
  } catch (e) {
    ctx.status = 400;
    ctx.body = {success: false, message: e.message};
  }
}

/**
 * @param ctx
 * @returns {Promise<void>}
 */
export async function removeNotification(ctx) {
  try {
    const id = ctx.params.id;
    await notificationsRepository.remove(id);
    ctx.body = {message: 'Notifications Deleted', success: true};
  } catch (e) {
    ctx.status = 404;
    ctx.body = {success: false, message: e.message};
  }
}
