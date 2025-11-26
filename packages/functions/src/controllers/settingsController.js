import {getCurrentShop} from '@functions/helpers/auth';
import {getByShopId, save} from '@functions/repositories/settingsRepository';

/**
 * @param ctx
 * @returns {Promise<{message: string, success: boolean}>}
 */
export async function saveSettings(ctx) {
  try {
    const data = ctx.req.body;
    await save(data);
    return (ctx.body = {message: 'Update success', success: true});
  } catch (e) {
    ctx.body = {success: false, error: e, message: e.message};
    console.error(e);
  }
}

/**
 * @param ctx
 * @returns {Promise<{data: any, success: boolean}>}
 */
export async function getSettings(ctx) {
  try {
    const shopId = getCurrentShop(ctx);
    const settingData = await getByShopId(shopId);
    return (ctx.body = {data: settingData, success: true});
  } catch (e) {
    ctx.body = {data: [], success: false, error: e.message};
    console.error(e);
  }
}
